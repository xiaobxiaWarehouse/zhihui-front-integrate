import queryString from 'query-string';
import modelExtend from 'dva-model-extend';
import {
  query,
  getUser,
  getRole,
  addUser,
  bianjiUser,
  UserXq,
  userZhuangtai,
  fenpeiUser,
  huoquroleUser,
  chongzhimima,
} from 'services/user';
import { pageSizeModel } from './common';

export default modelExtend(pageSizeModel, {
  namespace: 'user',
  state: {
    modalVisible: false,
    userList: [],
    roleList: [],
    detaiData: {
      id: 1,
      bianhao: '001',
      gonghao: '00001',
      xingming: '王大爷',
      shouji: '18870222222',
      gangwei: '管理员',
      zhuangtai: 1,
      roles: [
        {id: 1, name: '管理员'},
        {id: 2, name: '经理'},
      ],
    },
  },
  reducers: {
    showModal(state, { payload }) {
      return {
        ...state,
        modalVisible: true,
      };
    },
    hideModal(state) {
      return {
        ...state,
        modalVisible: false,
      };
    },
    updateUserList(state, { payload }) {
      return {
        ...state,
        userList: payload,
      };
    },

    updateRoleList(state, { payload }) {
      return {
        ...state,
        roleList: payload,
      };
    },
    updateDetaiData(state, { payload }) {
      return {
        ...state,
        detaiData: payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        console.log(pathname);
        if (pathname === '/user/list') {
          dispatch({
            type: 'query',
            payload: queryString.parse(search),
          });
        } else if (pathname === '/user/edit') {
          dispatch({
            type: 'UserXq',
            payload: {
              id: Number(queryString.parse(search).id),
            },
          });
          dispatch({
            type: 'getRole',
            payload: {},
          });
        } else if (pathname === '/user/detail') {
          dispatch({
            type: 'UserXq',
            payload: {
              id: Number(queryString.parse(search).id),
            },
          });
          dispatch({
            type: 'getRole',
            payload: {},
          });
        } else if (pathname === '/user/add') {
          // dispatch({
          //   type: 'query',
          //   payload: {},
          // });
          dispatch({
            type: 'getRole',
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
      if (payload.keyword) {
        param.keyword = payload.keyword;
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

    *getUser({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getUser, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result: { list } } = res;
        yield put({
          type: 'updateUserList',
          payload: list,
        });
      }
    },

    *getRole({ payload = {} }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getRole, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateRoleList',
          payload: result,
        });
      }
    },

    *addUser({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(addUser, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *bianjiUser({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(bianjiUser, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *fenpeiUser({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(fenpeiUser, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *huoquroleUser({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(huoquroleUser, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *userZhuangtai({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(userZhuangtai, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *chongzhimima({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(chongzhimima, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *UserXq({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(UserXq, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateDetaiData',
          payload: result,
        });
      }
    },
  },
});
