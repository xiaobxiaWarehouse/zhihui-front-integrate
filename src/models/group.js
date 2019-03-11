import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import {
  getJigou,
  addJigou,
  jigouXq,
  bianjiJigou,
  query,
  deleteList,
} from 'services/group';
import { pageSizeModel } from './common';

const getId = (list) => {
  return list.map((item) => {
    return item.id;
  });
};

export default modelExtend(pageSizeModel, {
  namespace: 'group',
  state: {
    modalVisible: false,
    viewModalVisible: false,
    jituanModalVisible: false,
    jigouModalVisible: false,
    deleteModalVisible: false,
    detaiData: {},
    jigouList: [],
    selectedRowKeys: [],
    confirmRowKeys: [],
  },
  reducers: {
    updateJigouList(state, { payload }) {
      return {
        ...state,
        jigouList: payload,
      };
    },
    updateDetaiData(state, { payload }) {
      const {jigouList} = state;
      let rowkeys = [];
      if (payload) {
        let list = getId(payload.leixing === 1 ? payload.suoshuJt : payload.xiashuJg);
        jigouList.forEach((item, index) => {
          if (list.indexOf(item.id) > -1) {
            rowkeys.push(index);
          }
        });
      }
      return {
        ...state,
        detaiData: payload,
        selectedRowKeys: rowkeys,
        confirmRowKeys: rowkeys,
      };
    },
    showDeleteModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        deleteModalVisible: true,
      };
    },
    hideDeleteModal(state) {
      return {
        ...state,
        deleteModalVisible: false,
      };
    },
    showjigouModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        jigouModalVisible: true,
      };
    },
    hidejigouModal(state) {
      return {
        ...state,
        jigouModalVisible: false,
      };
    },
    showjituanModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        jituanModalVisible: true,
      };
    },
    hidejituanModal(state) {
      return {
        ...state,
        jituanModalVisible: false,
      };
    },
    showModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible: true,
      };
    },
    hideModal(state) {
      return {
        ...state,
        modalVisible: false,
      };
    },
    showViewModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        viewModalVisible: true,
      };
    },
    hideViewModal(state) {
      return {
        ...state,
        viewModalVisible: false,
      };
    },
    updateSelectedRowKeys(state, { payload }) {
      return {
        ...state,
        selectedRowKeys: payload,
      };
    },
    updateConfirmRowKeys(state, { payload }) {
      return {
        ...state,
        confirmRowKeys: payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname === '/group/list') {
          dispatch({
            type: 'query',
            payload: queryString.parse(search),
          });
        } else if (pathname === '/group/details') {
          dispatch({
            type: 'jigouXq',
            payload: {
              id: Number(queryString.parse(search).id),
            },
          });
        } else if (pathname === '/group/edit') {
          dispatch({
            type: 'getJigou',
            payload: {
              leixing: Number(queryString.parse(search).leixing) === 2 ? 1 : 2,
            },
          });
          dispatch({
            type: 'jigouXq',
            payload: {
              id: Number(queryString.parse(search).id),
            },
          });
        } else if (pathname === '/group/addjigou') {
          dispatch({
            type: 'updateSelectedRowKeys',
            payload: [],
          });
          dispatch({
            type: 'updateConfirmRowKeys',
            payload: [],
          });
          dispatch({
            type: 'getJigou',
            payload: {
              leixing: 2,
            },
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
      if (payload.keyword) {
        param.keyword = payload.keyword;
      }
      if (payload.quBm) {
        param.quBm = payload.quBm;
      }
      if (payload.shengBm) {
        param.shengBm = payload.shengBm;
      }
      if (payload.shiBm) {
        param.shiBm = payload.shiBm;
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

    *addJigou({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(addJigou, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *deleteList({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(deleteList, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *jigouXq({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(jigouXq, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateDetaiData',
          payload: result,
        });
      }
    },

    *bianjiJigou({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(bianjiJigou, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },
  },
});
