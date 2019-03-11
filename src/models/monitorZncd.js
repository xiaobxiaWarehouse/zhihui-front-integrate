import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import { query, getDetail } from 'services/monitorZncd';
import { getJigou } from 'services/group';
import { pageSizeModel } from './common';

export default modelExtend(pageSizeModel, {
  namespace: 'monitorZncd',
  state: {
    jigouList: [],
    modalshitu: 1,
    modalVisible: false,
    detaiData: {
      list: [],
      next: null,
      kaishiSj: null,
      jieshuSj: null,
    },
    prev: [],
  },
  reducers: {
    showModalVisible(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible: true,
      };
    },
    hideModalVisible(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible: false,
      };
    },
    updateJigouList(state, { payload }) {
      return {
        ...state,
        jigouList: payload,
      };
    },
    updateDetaiData(state, { payload }) {
      return {
        ...state,
        modalshitu: payload.shitu,
        detaiData: {
          ...payload,
        },
      };
    },
    changePrev(state, { payload }) {
      return {
        ...state,
        prev: payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        // console.log('monitorZncd setup: ', pathname);
        if (pathname === '/monitorZncd/list') {
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
      param.zhuangtai = payload.zhuangtai ? Number(payload.zhuangtai) : -1;
      param.zy = payload.zy ? Number(payload.zy) : -1;
      if (payload.keyword) {
        param.keyword = payload.keyword;
      }

      if (payload.jigou) {
        param.jigou = Number(payload.jigou);
      }
      if (payload.zy) {
        param.zy = Number(payload.zy);
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

    *getDetail({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result: { list, next } } = res;
        const { shitu } = payload;
        if (callback) {
          callback();
        }
        yield put({
          type: 'updateDetaiData',
          payload: {
            shitu,
            list,
            next,
            kaishiSj: payload.kaishiSj,
            jieshuSj: payload.jieshuSj,
          },
        });
      }
    },
  },
});
