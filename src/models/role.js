import queryString from 'query-string';
import modelExtend from 'dva-model-extend';
import {
  query,
  getRole,
  addRole,
  bianjiRole,
  roleXq,
  chaxunRolePriv,
} from 'services/role';
import { pageSizeModel } from './common';

export default modelExtend(pageSizeModel, {
  namespace: 'role',
  state: {
    checkAll: false,
    detaiData: [],
    rolePriv: [],
    roleList: [],
  },

  reducers: {
    updateRoleList(state, { payload }) {
      return {
        ...state,
        roleList: payload,
      };
    },
    updateDetaiData(state, { payload }) {
      const {rolePriv} = state;
      let privsCode = payload.privs.map((priv) => {
        return priv.code;
      });
      let newRolePriv = rolePriv.map((item) => {
        return {
          ...item,
          checked: item.children.every((k) => {
            return privsCode.indexOf(k.code) > -1;
          }),
          childrenValue: item.children.filter((k) => {
            return privsCode.indexOf(k.code) > -1;
          }).map((c) => {
            return c.id;
          }),
        };
      });
      return {
        ...state,
        detaiData: payload,
        rolePriv: newRolePriv,
      };
    },

    updateRolepriv(state, { payload }) {
      return {
        ...state,
        rolePriv: payload,
      };
    },
    checkedAll(state, { payload }) {
      return {
        ...state,
        checkAll: payload,
      };
    },

    indetermInate(state, { payload }) {
      return {
        ...state,
        indeterminate: payload,
      };
    },
    updateData(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname === '/role/list') {
          dispatch({
            type: 'query',
            payload: queryString.parse(search),
          });
        } else if (pathname === '/role/edit') {
          dispatch({
            type: 'chaxunRolePriv',
            payload: {
              type: -1,
              pageNum: 1,
              pageSize: 40,
              pattern: 'tree',
            },
            callback: () => {
              dispatch({
                type: 'roleXq',
                payload: {
                  id: Number(queryString.parse(search).id),
                },
              });
            },
          });
        } else if (pathname === '/role/detail') {
          dispatch({
            type: 'chaxunRolePriv',
            payload: {
              type: -1,
              pageNum: 1,
              pageSize: 40,
              pattern: 'tree',
            },
            callback: () => {
              dispatch({
                type: 'roleXq',
                payload: {
                  id: Number(queryString.parse(search).id),
                },
              });
            },
          });
        } else if (pathname === '/role/add') {
          dispatch({
            type: 'chaxunRolePriv',
            payload: {
              type: -1,
              pageNum: 1,
              pageSize: 40,
              pattern: 'tree',
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
      const res = yield call(query, param);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        const {list, ...page} = result;
        yield put({
          type: 'querySuccess',
          payload: {
            list,
            page,
          },
        });
      }
    },

    *getRole({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getRole, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result: { list } } = res;
        yield put({
          type: 'updateroleList',
          payload: list,
        });
      }
    },

    *addRole({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(addRole, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
        // const { result } = res;
        // yield put({
        //   type: 'updateRoleList',
        //   payload: result,
        // });
      }
    },

    *bianjiRole({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(bianjiRole, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *chaxunRolePriv({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(chaxunRolePriv, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
        const { result } = res;
        const rolePriv = result.map((item) => {
          return {
            code: item.code,
            label: item.name,
            value: item.id,
            id: item.id,
            description: item.description,
            type: item.type,
            childrenValue: [],
            checked: false,
            children: item.children.map((k) => {
              return {
                code: k.code,
                label: k.name,
                value: k.id,
                id: k.id,
                description: k.description,
                type: k.type,
              };
            }),
          };
        });

        yield put({
          type: 'updateRolepriv',
          payload: rolePriv,
        });
      }
    },

    *roleXq({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(roleXq, payload);
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
