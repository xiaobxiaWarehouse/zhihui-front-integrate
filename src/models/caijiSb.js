import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import moment from 'moment';
import { getBeforeDay } from 'utils';
import { query } from 'services/caijiSb';
import { pageSizeModel } from './common';

export default modelExtend(pageSizeModel, {
  namespace: 'caijiSb',
  state: {
    shebeiList: [],
    next: null,
    prev: [],
  },
  reducers: {
    updateShebeiList(state, { payload }) {
      const { list, next } = payload;
      return {
        ...state,
        shebeiList: list,
        next,
      };
    },
    updatePrev(state, { payload }) {
      return {
        ...state,
        prev: payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        console.log('caijiSb setup: ', pathname);
        if (pathname === '/caijiSb/list') {
          dispatch({
            type: 'query',
            payload: queryString.parse(search),
          });
          dispatch({
            type: 'updatePrev',
            payload: [],
          });
        }
      });
    },
  },
  effects: {
    *query({ payload = {} }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      let param = {};
      param.leixing = payload.leixing ? Number(payload.leixing) : 1;
      param.kaishiSj = payload.kaishiSj
        ? payload.kaishiSj
        : moment(getBeforeDay()).format('YYYYMMDD');
      param.jieshuSj = payload.jieshuSj
        ? payload.jieshuSj
        : moment().format('YYYYMMDD');
      if (payload.nextSj) {
        param.nextSj = payload.nextSj;
      }
      const res = yield call(query, param);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        const { list, next } = result;
        yield put({
          type: 'updateShebeiList',
          payload: {
            list,
            next,
          },
        });
      }
    },
  },
});
