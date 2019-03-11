import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import moment from 'moment';
import { getBeforeDay } from 'utils';
import { query } from 'services/tixing';
import { getJigou } from 'services/group';
import { pageSizeModel } from './common';

export default modelExtend(pageSizeModel, {
  namespace: 'tixing',
  state: {
    jigouList: [],
  },
  reducers: {
    updateJigouList(state, { payload }) {
      return {
        ...state,
        jigouList: payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname === '/tixing/list') {
          dispatch({
            type: 'query',
            payload: queryString.parse(search),
          });
          dispatch({
            type: 'getJigou',
            payload: {},
          });
        }
      });
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      let param = {};
      param.pageNum = payload.page ? Number(payload.page) : 1;
      param.pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
      param.kaishiSj = payload.kaishiSj
        ? payload.kaishiSj
        : moment(getBeforeDay()).format('YYYYMMDD');
      param.jieshuSj = payload.jieshuSj
        ? payload.jieshuSj
        : moment().format('YYYYMMDD');
      if (payload.keyword) {
        param.keyword = payload.keyword;
      }
      if (payload.leixing) {
        param.leixing = Number(payload.leixing);
      }
      if (payload.jigou) {
        param.jigou = Number(payload.jigou);
      }
      const res = yield call(query, param);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        const { list, ...page } = result;
        yield put({
          type: 'querySuccess',
          payload: {
            list,
            page,
          },
        });
      }
    },

    *getJigou({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getJigou, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateJigouList',
          payload: result,
        });
      }
    },
  },
});
