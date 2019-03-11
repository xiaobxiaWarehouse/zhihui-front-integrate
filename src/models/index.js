import queryString from 'query-string';

import {
  getGaiyaoPlatform,
  getShebeiPlatform,
  getJianceshujuPlatform,
} from 'services/index';

const getShebeiYxZs = (type, item) => {
  switch (type) {
    case 1:
      return item.msgTotal - item.msgUnreliable;
    case 2:
      return item.msgTotal - item.msgUnreliable;
    case 3:
      return item.msgValid;
    default:
      return item.msgTotal - item.msgUnreliable;
  }
};

const shebeiWxZs = (type, item) => {
  switch (type) {
    case 1:
      return item.msgUnreliable;
    case 2:
      return item.msgUnreliable;
    case 3:
      return item.msgInvalid;
    default:
      return item.msgUnreliable;
  }
};

export default {
  namespace: 'index',
  state: {
    gaiyaoList: [],
    shebeiList: [],
    jianceshujuList: [],
    leixing: 1,
  },
  reducers: {
    updateGaiyaoList(state, { payload }) {
      return {
        ...state,
        gaiyaoList: payload,
      };
    },
    updateShebeiList(state, { payload }) {
      return {
        ...state,
        shebeiList: payload,
      };
    },
    updateJianceshujuList(state, { payload }) {
      const {newList} = payload;
      return {
        ...state,
        jianceshujuList: newList,
      };
    },
    updateLeixing(state, {payload}) {
      return {
        ...state,
        leixing: payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        console.log('index setup: ', pathname);
        const query = queryString.parse(search);
        if (pathname === '/index') {
          dispatch({
            type: 'updateLeixing',
            payload: 1,
          });
          dispatch({
            type: 'getGaiyaoPlatform',
            payload: {
              shitu: 1,
            },
          });
          dispatch({
            type: 'getShebeiPlatform',
            payload: {
              shitu: 1,
            },
          });
          dispatch({
            type: 'getJianceshujuPlatform',
            payload: {
              shitu: 1,
              leixing: 1,
              pageSize: 24,
              pageNum: 1,
            },
          });
        }
      });
    },
  },
  effects: {
    *getGaiyaoPlatform({ payload }, { put, call }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getGaiyaoPlatform, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {
          result: {
            jituanZs,
            jigouZs,
            renyuanZs,
            shebeiBdZs,
            shebeiZs,
          },
        } = res;
        yield put({
          type: 'updateGaiyaoList',
          payload: [jituanZs, jigouZs, renyuanZs, shebeiBdZs, shebeiZs],
        });
      }
    },

    *getShebeiPlatform({ payload }, { put, call }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getShebeiPlatform, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result: { chuang, chuangdian, duotizheng } } = res;
        let list = [
          {
            groupName: '智能床',
            总数量: chuang.shebeiZs,
            已绑定设备: chuang.shebeiBdZs,
            在用设备: chuang.shebeiZyZs,
          },
          {
            groupName: '智能床垫',
            总数量: chuangdian.shebeiZs,
            已绑定设备: chuangdian.shebeiBdZs,
            在用设备: chuangdian.shebeiZyZs,
          },
          {
            groupName: '多体征设备',
            总数量: duotizheng.shebeiZs,
            已绑定设备: duotizheng.shebeiBdZs,
            在用设备: duotizheng.shebeiZyZs,
          },
        ];
        yield put({
          type: 'updateShebeiList',
          payload: list,
        });
      }
    },

    *getJianceshujuPlatform({ payload }, { put, call }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getJianceshujuPlatform, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result: { list } } = res;
        let newList = list.map((item) => {
          return {
            x: item.shijian,
            y1: item.msgTotal,
            y2: getShebeiYxZs(payload.leixing, item),
            y3: shebeiWxZs(payload.leixing, item),
            设备数量: item.devTotal,
          };
        });
        yield put({
          type: 'updateJianceshujuList',
          payload: {
            newList,
          },
        });
      }
    },
  },
};
