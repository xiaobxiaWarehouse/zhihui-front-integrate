import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import {
  query,
  getshebei,
  daoRushebei,
  shanchuShebei,
  xiugaiShebei,
  getZncDetail,
  getZncShishi,
  getZncBangding,
  getZncdDetail,
  getZncdShishi,
  getZncdBangding,
  getDtzDetail,
  getDtzBangding,
  getZhxBangding,
  deleteDaoruList,
  getdaoruShebei,
} from 'services/shebei';
import { getDetail } from 'services/monitorZnc';
import { getDetail as zncdDetail } from 'services/monitorZncd';
import { getDetail as dtzDetail } from 'services/monitorDtz';
import { getDetail as zhxDetail } from 'services/monitorZhx';
import { getJigou } from 'services/group';
import { pageSizeModel } from './common';

const unique = (array) => {
  let obj = {};
  array.sort((a, b) => {
    return a.name - b.name;
  }).forEach((item, index) => {
    obj[array[index].name] = array[index];
  });
  return Object.keys(obj).map((item) => {
    return {
      ...obj[item],
    };
  });
};

export default modelExtend(pageSizeModel, {
  namespace: 'shebei',
  state: {
    modalsignType: '-1',
    modalshitu: 1,
    detaiData: {
      list: [],
      next: null,
      kaishiSj: null,
      jieshuSj: null,
    },
    prev: [],
    modalVisible: false,
    deleteModalVisible: false,
    changeModalVisible: false,
    daoruModalVisible: false,
    zncModalVisible: false,
    zncdModalVisible: false,
    dtzModalVisible: false,
    zhxModalVisible: false,
    cancelModalVisible: false,
    canceldeleteModalVisible: false,
    currentPage: 0,
    jigouList: [],
    daoruList: [],
    shishiData: {
      shijian: undefined,
      hrList: [],
      rrList: [],
      mvList: [],
    },
    fileList: [],
    yizhi: {},
    tixing: 0,
  },
  reducers: {
    updatedtzDetaiData(state, { payload }) {
      return {
        ...state,
        modalsignType: payload.signType,
        detaiData: {
          ...payload,
        },
      };
    },
    updatezhxDetaiData(state, { payload }) {
      return {
        ...state,
        detaiData: {
          ...payload,
        },
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
    showcanceldeleteModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        canceldeleteModalVisible: true,
      };
    },
    hidecanceldeleteModal(state) {
      return {
        ...state,
        canceldeleteModalVisible: false,
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
    showDtzModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        dtzModalVisible: true,
      };
    },
    showZhxModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        zhxModalVisible: true,
      };
    },
    hideDtzModal(state) {
      return {
        ...state,
        dtzModalVisible: false,
      };
    },
    hideZhxModal(state) {
      return {
        ...state,
        zhxModalVisible: false,
      };
    },
    showCancelModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        cancelModalVisible: true,
      };
    },
    hideCancelModal(state) {
      return {
        ...state,
        cancelModalVisible: false,
      };
    },
    showZncdModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        zncdModalVisible: true,
      };
    },
    hideZncdModal(state) {
      return {
        ...state,
        zncdModalVisible: false,
      };
    },
    showZncModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        zncModalVisible: true,
      };
    },
    hideZncModal(state) {
      return {
        ...state,
        zncModalVisible: false,
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
    showChangeModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        changeModalVisible: true,
      };
    },
    hideChangeModal(state) {
      return {
        ...state,
        changeModalVisible: false,
      };
    },
    showDaoruModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        daoruModalVisible: true,
        fileList: [],
      };
    },
    hideDaoruModal(state) {
      return {
        ...state,
        daoruModalVisible: false,
      };
    },
    updateJigouList(state, { payload }) {
      return {
        ...state,
        jigouList: payload,
      };
    },
    updateShishiData(state, {payload}) {
      return {
        ...state,
        shishiData: {
          ...payload,
        },
      };
    },
    updateFileList(state, {payload}) {
      return {
        ...state,
        fileList: payload,
      };
    },
    updatecurrentPage(state, {payload}) {
      return {
        ...state,
        currentPage: payload,
      };
    },
    updateDaoruList(state, {payload}) {
      return {
        ...state,
        daoruList: payload,
      };
    },
    updateTixing(state, {payload}) {
      return {
        ...state,
        tixing: payload,
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
        if (pathname === '/shebei/list') {
          dispatch({
            type: 'query',
            payload: queryString.parse(search),
          });
          dispatch({
            type: 'getJigou',
            payload: {},
          });
        } else if (pathname === '/shebei/bangding') {
          const { leixing, bianhao } = queryString.parse(search);
          if (Number(leixing) === 1) {
            dispatch({
              type: 'getZncBangding',
              payload: {
                zhuangtai: -1,
                id: bianhao,
                page: queryString.parse(search).page,
                pageSize: queryString.parse(search).pageSize,
              },
            });
          } else if (Number(leixing) === 2) {
            dispatch({
              type: 'getZncdBangding',
              payload: {
                zhuangtai: -1,
                id: bianhao,
                page: queryString.parse(search).page,
                pageSize: queryString.parse(search).pageSize,
              },
            });
          } else if (Number(leixing) === 3) {
            dispatch({
              type: 'getDtzBangding',
              payload: {
                zhuangtai: -1,
                id: bianhao,
                page: queryString.parse(search).page,
                pageSize: queryString.parse(search).pageSize,
              },
            });
          } else if (Number(leixing) === 4) {
            dispatch({
              type: 'getZhxBangding',
              payload: {
                zhuangtai: -1,
                id: bianhao,
                page: queryString.parse(search).page,
                pageSize: queryString.parse(search).pageSize,
              },
            });
          }
          dispatch({
            type: 'querySuccess',
            payload: {
              list: [],
              page: null,
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
      param.zhuangtai = payload.zhuangtai ? Number(payload.zhuangtai) : -1;
      param.leixing = payload.leixing ? Number(payload.leixing) : -1;
      if (payload.jigou) {
        param.jigou = Number(payload.jigou);
      }
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

    *getdaoruShebei({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getdaoruShebei, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateDaoruList',
          payload: result,
        });
      }
    },

    *getshebei({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getshebei, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *deleteDaoruList({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(deleteDaoruList, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },
    *daoRushebei({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(daoRushebei, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    *shanchuShebei({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(shanchuShebei, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *xiugaiShebei({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(xiugaiShebei, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *getZncBangding({ payload = {} }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      let param = {};
      param.pageNum = payload.page ? Number(payload.page) : 1;
      param.pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
      param.zhuangtai = payload.zhuangtai ? Number(payload.zhuangtai) : -1;
      param.id = payload.id;
      const res = yield call(getZncBangding, param);
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

    *getZncdBangding({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      let param = {};
      param.pageNum = payload.page ? Number(payload.page) : 1;
      param.pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
      param.zhuangtai = payload.zhuangtai ? Number(payload.zhuangtai) : -1;
      param.id = payload.id;
      const res = yield call(getZncdBangding, param);
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

    *getDtzBangding({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      let param = {};
      param.pageNum = payload.page ? Number(payload.page) : 1;
      param.pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
      param.zhuangtai = payload.zhuangtai ? Number(payload.zhuangtai) : -1;
      param.id = payload.id;
      const res = yield call(getDtzBangding, param);
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

    *getZhxBangding({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      let param = {};
      param.pageNum = payload.page ? Number(payload.page) : 1;
      param.pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
      param.zhuangtai = payload.zhuangtai ? Number(payload.zhuangtai) : -1;
      param.id = payload.id;
      const res = yield call(getZhxBangding, param);
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

    *getZncDetail({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getZncDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *getZncShishi({ payload, callback }, { call, put, select }) {
      // yield put({ type: 'app/loading', payload: true });
      const res = yield call(getZncShishi, payload);
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        const {shishiData} = yield select(_ => _.shebei);
        let {hrList, rrList, mvList} = shishiData;
        let shijian = null;
        let hrs = hrList.map((item) => {
          return {
            name: item.name,
            number: item.number,
          };
        });
        let rrs = rrList.map((item) => {
          return {
            name: item.name,
            number: item.number,
          };
        });
        let mvs = mvList.map((item) => {
          return {
            name: item.name,
            number: item.number,
          };
        });

        result.forEach((item) => {
          hrs.push({ name: item.shijian, number: item.hr });
          rrs.push({ name: item.shijian, number: item.rr });
          mvs.push({ name: item.shijian, number: item.mv });
        });

        hrs = unique(hrs);
        rrs = unique(rrs);
        mvs = unique(mvs);

        const preMinutes = 3 * (60 * 1000);
        hrs = hrs.filter((item) => {
          return item.name >= hrs[hrs.length - 1].name - preMinutes;
        });
        rrs = rrs.filter((item) => {
          return item.name >= rrs[rrs.length - 1].name - preMinutes;
        });
        mvs = mvs.filter((item) => {
          return item.name >= mvs[mvs.length - 1].name - preMinutes;
        });

        shijian = hrs.length > 0 ? hrs[hrs.length - 1].name : shijian;
        yield put({
          type: 'updateShishiData',
          payload: {
            shijian,
            hrList: hrs,
            rrList: rrs,
            mvList: mvs,
          },
        });
        if (callback) {
          callback({
            shijian,
          });
        }
      }
    },

    *getZncdDetail({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getZncdDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *getZncdShishi({ payload, callback }, { call, put, select }) {
      // yield put({ type: 'app/loading', payload: true });
      const res = yield call(getZncdShishi, payload);
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        const {shishiData} = yield select(_ => _.shebei);
        let {hrList, rrList, mvList} = shishiData;
        let shijian = payload.kaishiSj;
        let hrs = hrList.map((item) => {
          return {
            name: item.name,
            number: item.number,
          };
        });
        let rrs = rrList.map((item) => {
          return {
            name: item.name,
            number: item.number,
          };
        });
        let mvs = mvList.map((item) => {
          return {
            name: item.name,
            number: item.number,
          };
        });

        result.forEach((item) => {
          hrs.push({ name: item.shijian, number: item.hr });
          rrs.push({ name: item.shijian, number: item.rr });
          mvs.push({ name: item.shijian, number: item.mv });
        });

        hrs = unique(hrs);
        rrs = unique(rrs);
        mvs = unique(mvs);

        const preMinutes = 5 * (60 * 1000);
        hrs = hrs.filter((item) => {
          return item.name >= hrs[hrs.length - 1].name - preMinutes;
        });
        rrs = rrs.filter((item) => {
          return item.name >= rrs[rrs.length - 1].name - preMinutes;
        });
        mvs = mvs.filter((item) => {
          return item.name >= mvs[mvs.length - 1].name - preMinutes;
        });

        shijian = hrs.length > 0 ? hrs[hrs.length - 1].name : shijian;
        if (callback) {
          callback({
            shijian,
          });
        }
        yield put({
          type: 'updateShishiData',
          payload: {
            shijian,
            hrList: hrs,
            rrList: rrs,
            mvList: mvs,
          },
        });
      }
    },

    *getDtzDetail({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getDtzDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
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

    *zncdDetail({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(zncdDetail, payload);
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
    *dtzDetail({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(dtzDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result: { list, next } } = res;
        const { signType } = payload;
        if (callback) {
          callback();
        }
        yield put({
          type: 'updatedtzDetaiData',
          payload: {
            signType,
            list,
            next,
            kaishiSj: payload.kaishiSj,
            jieshuSj: payload.jieshuSj,
          },
        });
      }
    },
    *zhxDetail({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(zhxDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result: { list, next } } = res;
        if (callback) {
          callback();
        }
        yield put({
          type: 'updatezhxDetaiData',
          payload: {
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
