import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import moment from 'moment';
import X2JS from 'x2js';
import { getXmlData } from 'utils';
import {
  query,
  getDanganDetail,
  getShishiZnc,
  getShumianZnc,
  getZailichuangZnc,
  getLishiZnc,
  getShishiZncd,
  getShumianZncd,
  getZailichuangZncd,
  getLishiZncd,
  getZuijinDtz,
  getJibenZhx,
  getLishibiaodanDtz,
  getDingweiZhx,
  getTishiZhx,
  getLishitubiaoDtz,
  getRuzhuDetail,
  getMubanData,
  getMubanDataId,
} from 'services/dangan';
import { getJigou } from 'services/group';
import { pageSizeModel } from './common';

const conversionTime = (time) => {
  let h = Number(time.split(':')[0]);
  let m = Number(time.split(':')[1]);
  let total = (h * 60 * 60) + (m * 60);
  return total;
};

const alculationPercent = (time1, time2, count) => {
  return conversionTime(count) / (conversionTime(time1) + conversionTime(time2));
};

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

const setBedStatus = (state) => {
  switch (state) {
    case 0:
      return 1;
    case 1:
      return 2;
    default:
      return 0;
  }
};

export default modelExtend(pageSizeModel, {
  namespace: 'dangan',
  state: {
    jigouList: [],
    detaiData: null,
    detaiTabIndex: 1,
    cuurrNavIndex: 1,
    jiankangTabIndex: 1,
    shishiZnc: {
      shijian: undefined,
      hrList: [],
      rrList: [],
      mvList: [],
    },
    sleepZnc: {
      avgHrList: [],
      avgRRList: [],
      sleepQualityList: [],
      sleepList: [],
    },
    offbedZnc: [],
    lishiZnc: {
      hrList: [],
      rrList: [],
      mvList: [],
      bedList: [],
    },
    zuijinDtz: [],
    jibenZhx: {},
    lishibiaodanDtz: {
      list: [],
      next: null,
      prev: null,
    },
    dingweiZhx: [],
    tishiZhx: [],
    ruzhuDetail: null,
    ruzhuPgxml: null,
    jiluXml: null,
    ruzhuData: null,
    viewModalVisible: false,
    lishitubiaoDtz: {
      weightList: [],
      tempList: [],
      bgList: [],
      spo2List: [],
      hrList: [],
      bpList: [],
    },
    lishitubiaoValue: {
      signType: 'weight',
      zuijin: 1,
    },
    prev: [],
    qita: [],
    currentBgIndex: 1,
    zuijin: null,
  },
  reducers: {
    initState(state) {
      return {
        ...state,
        shishiZnc: {
          shijian: undefined,
          hrList: [],
          rrList: [],
          mvList: [],
        },
        sleepZnc: {
          avgHrList: [],
          avgRRList: [],
          sleepQualityList: [],
          sleepList: [],
        },
        offbedZnc: [],
        zuijinDtz: [],
        jibenZhx: {},
        lishibiaodanDtz: {
          list: [],
          next: null,
          prev: null,
        },
        dingweiZhx: [],
        tishiZhx: [],
        lishitubiaoDtz: {
          weightList: [],
          tempList: [],
          bgList: [],
          spo2List: [],
          hrList: [],
          bpList: [],
        },
      };
    },
    showViewModal(state, {payload}) {
      return {
        ...state,
        ...payload,
        viewModalVisible: true,
      };
    },
    hideViewModal(state, {payload}) {
      return {
        ...state,
        ...payload,
        viewModalVisible: false,
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
        detaiData: payload,
      };
    },
    changeDetaiTabIndex(state, { payload }) {
      return {
        ...state,
        detaiTabIndex: payload,
        cuurrNavIndex: 1,
      };
    },
    changeCuurrNavIndex(state, { payload }) {
      return {
        ...state,
        cuurrNavIndex: payload,
      };
    },
    updateShishiZnc(state, { payload }) {
      return {
        ...state,
        shishiZnc: {
          ...payload,
        },
      };
    },
    updateSleepZnc(state, { payload }) {
      return {
        ...state,
        sleepZnc: {
          ...payload,
        },
      };
    },
    updateOffbedZnc(state, { payload }) {
      const {offbedZnc, zuijin} = payload;
      return {
        ...state,
        offbedZnc,
        zuijin,
      };
    },
    updateZuijinDtz(state, {payload}) {
      return {
        ...state,
        zuijinDtz: payload,
      };
    },
    updateJibenZhx(state, {payload}) {
      return {
        ...state,
        jibenZhx: payload,
      };
    },
    updateLishibiaodanDtz(state, {payload}) {
      return {
        ...state,
        lishibiaodanDtz: {
          ...payload,
        },
      };
    },
    updateDingweiZhx(state, {payload}) {
      return {
        ...state,
        dingweiZhx: payload.list || [],
      };
    },
    updateTioshiZhx(state, {payload}) {
      return {
        ...state,
        tishiZhx: payload.list || [],
      };
    },
    changeJiankangTabIndex(state, {payload}) {
      return {
        ...state,
        jiankangTabIndex: payload,
      };
    },
    updateRuzhuDetail(state, {payload}) {
      return {
        ...state,
        ruzhuDetail: payload,
      };
    },
    updateRuzhuPgxml(state, {payload}) {
      let data = getXmlData(payload);
      return {
        ...state,
        ruzhuPgxml: data,
      };
    },
    updateJiluXml(state, {payload}) {
      let data = getXmlData(payload);
      return {
        ...state,
        jiluXml: data,
      };
    },
    updateRuzhuData(state, {payload}) {
      const {
        data, qita, createTime, id,
      } = payload;
      let index = qita.indexOf(id);
      return {
        ...state,
        ruzhuData: data,
        qita,
        createTime,
        currentBgIndex: index + 1,
      };
    },
    changeRuzhuData(state, {payload}) {
      return {
        ...state,
        ruzhuData: payload,
      };
    },
    updateLishitubiaoDtz(state, {payload}) {
      return {
        ...state,
        lishitubiaoDtz: {
          ...payload,
        },
        zuijin: payload.zuijin,
      };
    },
    changeLishitubiaoValue(state, {payload}) {
      return {
        ...state,
        lishitubiaoValue: payload,
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
        console.log('dangan setup: ', pathname);
        if (pathname === '/dangan/list') {
          dispatch({
            type: 'query',
            payload: queryString.parse(search),
          });
          dispatch({
            type: 'getJigou',
            payload: {},
          });
        } else if (pathname === '/dangan/detail') {
          dispatch({
            type: 'getDanganDetail',
            payload: {
              id: Number(queryString.parse(search).id),
              jigou: Number(queryString.parse(search).jigou),
            },
          });
        } else if (pathname === '/dangan/dataDetail') {
          dispatch({
            type: 'changeDetaiTabIndex',
            payload: 1,
          });
        } else if (pathname === '/dangan/jiankang') {
          dispatch({
            type: 'changeJiankangTabIndex',
            payload: 1,
          });
          dispatch({
            type: 'getRuzhuDetail',
            payload: {
              id: Number(queryString.parse(search).id),
              jigou: Number(queryString.parse(search).jigou),
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
      param.zhuangtai = payload.zhuangtai ? Number(payload.zhuangtai) : -1;
      param.pageNum = payload.page ? Number(payload.page) : 1;
      param.pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
      if (payload.keyword) {
        param.keyword = payload.keyword;
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

    *getDanganDetail({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getDanganDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateDetaiData',
          payload: result,
        });
      }
    },

    *getShishiZnc({ payload, callback }, { call, put, select }) {
      // yield put({ type: 'app/loading', payload: true });
      const res = yield call(getShishiZnc, payload);
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        const {shishiZnc} = yield select(_ => _.dangan);
        let {hrList, rrList, mvList} = shishiZnc;
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
          type: 'updateShishiZnc',
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

    *getShumianZnc({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getShumianZnc, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        if (result) {
          const {
            avgHr, avgRr, deepSleep, lightSleep, sleepStatus,
          } = result;
          let avgHrList = [
            { item: '心率', count: avgHr < 100 ? avgHr : 100 },
            { item: '心率2', count: avgHr < 100 ? 100 - avgHr : 0 },
          ];
          let avgRRList = [
            { item: '呼吸', count: avgRr < 100 ? avgRr : 100 },
            { item: '呼吸2', count: avgRr < 100 ? 100 - avgRr : 0 },
          ];
          let sleepQualityList = [
            { item: '睡眠质量', count: sleepStatus < 100 ? sleepStatus : 100 },
            {
              item: '睡眠质量2',
              count: sleepStatus < 100 ? 100 - sleepStatus : 0,
            },
          ];
          let sleepList = [
            { item: '深度睡眠', count: alculationPercent(deepSleep, lightSleep, deepSleep) * 100 },
            { item: '浅度睡眠', count: alculationPercent(deepSleep, lightSleep, lightSleep) * 100 },
          ];
          yield put({
            type: 'updateSleepZnc',
            payload: {
              avgHrList,
              avgRRList,
              sleepQualityList,
              sleepList,
            },
          });
        } else {
          yield put({
            type: 'updateSleepZnc',
            payload: {
              avgHrList: [],
              avgRRList: [],
              sleepQualityList: [],
              sleepList: [],
            },
          });
        }
      } else {
        yield put({
          type: 'updateSleepZnc',
          payload: {
            avgHrList: [],
            avgRRList: [],
            sleepQualityList: [],
            sleepList: [],
          },
        });
      }
    },

    *getZailichuangZnc({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getZailichuangZnc, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        let offbedZnc = result.map((item) => {
          return {
            name: moment(item.shijian).format('YYYY-MM-DD HH:mm:ss'),
            number: setBedStatus(item.bedStatus),
          };
        });
        yield put({
          type: 'updateOffbedZnc',
          payload: {
            offbedZnc,
            zuijin: payload.zuijin,
          },
        });
      }
    },

    *getLishiZnc({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getLishiZnc, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        const { yuanshi, zailichuang } = result;
        let hrList = [];
        let rrList = [];
        let mvList = [];
        yuanshi.forEach((item) => {
          hrList.push({ name: item.shijian, number: item.hr });
          rrList.push({ name: item.shijian, number: item.rr });
          mvList.push({ name: item.shijian, number: item.mv });
        });
        let offbedZnc = zailichuang.map((item) => {
          return {
            name: item.shijian,
            number: setBedStatus(item.bedStatus),
          };
        });
        yield put({
          type: 'updateShishiZnc',
          payload: {
            shijian: undefined,
            hrList,
            rrList,
            mvList,
          },
        });
        yield put({
          type: 'updateOffbedZnc',
          payload: {
            offbedZnc,
            zuijin: payload.zuijin,
          },
        });
      }
    },

    *getShishiZncd({ payload, callback }, { call, put, select }) {
      // yield put({ type: 'app/loading', payload: true });
      const res = yield call(getShishiZncd, payload);
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        const {shishiZnc} = yield select(_ => _.dangan);
        let {hrList, rrList, mvList} = shishiZnc;
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
          type: 'updateShishiZnc',
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

    *getShumianZncd({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getShumianZncd, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        if (result) {
          const {
            avgHr, avgRr, deepSleep, lightSleep, sleepStatus,
          } = result;
          let avgHrList = [
            { item: '心率', count: avgHr < 100 ? avgHr : 100 },
            { item: '心率2', count: avgHr < 100 ? 100 - avgHr : 0 },
          ];
          let avgRRList = [
            { item: '呼吸', count: avgRr < 100 ? avgRr : 100 },
            { item: '呼吸2', count: avgRr < 100 ? 100 - avgRr : 0 },
          ];
          let sleepQualityList = [
            { item: '睡眠质量', count: sleepStatus < 100 ? sleepStatus : 100 },
            {
              item: '睡眠质量2',
              count: sleepStatus < 100 ? 100 - sleepStatus : 0,
            },
          ];
          let sleepList = [
            { item: '深度睡眠', count: alculationPercent(deepSleep, lightSleep, deepSleep) * 100 },
            { item: '浅度睡眠', count: alculationPercent(deepSleep, lightSleep, lightSleep) * 100 },
          ];
          yield put({
            type: 'updateSleepZnc',
            payload: {
              avgHrList,
              avgRRList,
              sleepQualityList,
              sleepList,
            },
          });
        } else {
          yield put({
            type: 'updateSleepZnc',
            payload: {
              avgHrList: [],
              avgRRList: [],
              sleepQualityList: [],
              sleepList: [],
            },
          });
        }
      } else {
        yield put({
          type: 'updateSleepZnc',
          payload: {
            avgHrList: [],
            avgRRList: [],
            sleepQualityList: [],
            sleepList: [],
          },
        });
      }
    },

    *getZailichuangZncd({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getZailichuangZncd, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        let offbedZnc = result.map((item) => {
          return {
            name: moment(item.shijian).format('YYYY-MM-DD HH:mm:ss'),
            number: setBedStatus(item.bedStatus),
          };
        });
        yield put({
          type: 'updateOffbedZnc',
          payload: {
            offbedZnc,
            zuijin: payload.zuijin,
          },
        });
      }
    },

    *getLishiZncd({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getLishiZncd, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        const { yuanshi, zailichuang } = result;
        let hrList = [];
        let rrList = [];
        let mvList = [];
        yuanshi.forEach((item) => {
          hrList.push({ name: item.shijian, number: item.hr });
          rrList.push({ name: item.shijian, number: item.rr });
          mvList.push({ name: item.shijian, number: item.mv });
        });
        let offbedZnc = zailichuang.map((item) => {
          return {
            name: item.shijian,
            number: setBedStatus(item.bedStatus),
          };
        });
        yield put({
          type: 'updateShishiZnc',
          payload: {
            shijian: undefined,
            hrList,
            rrList,
            mvList,
          },
        });
        yield put({
          type: 'updateOffbedZnc',
          payload: {
            offbedZnc,
            zuijin: payload.zuijin,
          },
        });
      }
    },

    *getZuijinDtz({payload}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getZuijinDtz, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({
          type: 'updateZuijinDtz',
          payload: result,
        });
      }
    },

    *getJibenZhx({payload}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getJibenZhx, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({
          type: 'updateJibenZhx',
          payload: result,
        });
      }
    },

    *getLishibiaodanDtz({payload}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getLishibiaodanDtz, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result: {list, next}} = res;
        yield put({
          type: 'updateLishibiaodanDtz',
          payload: {
            list,
            next,
          },
        });
      }
    },

    *getDingweiZhx({payload}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getDingweiZhx, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result: {list, next}} = res;
        yield put({
          type: 'updateDingweiZhx',
          payload: {
            list,
            next,
          },
        });
      }
    },

    *getTishiZhx({payload}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getTishiZhx, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result: {list, next}} = res;
        yield put({
          type: 'updateTishiZhx',
          payload: {
            list,
            next,
          },
        });
      }
    },

    *getLishitubiaoDtz({payload}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getLishitubiaoDtz, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        const {
          weight, bg, temp, spo2, bp, hr,
        } = result;
        // 体重
        let weightList = weight.map((item) => {
          return {
            name: item.shijian,
            number: item.weight,
          };
        });
        // 体温
        let tempList = temp.map((item) => {
          return {
            name: item.shijian,
            number: item.temp,
          };
        });
        // 血糖
        let bgList = bg.map((item) => {
          return {
            name: item.shijian,
            number: item.bg,
          };
        });
        // 血氧
        let spo2List = spo2.map((item) => {
          return {
            name: item.shijian,
            number: item.spo2,
          };
        });
        // 心率
        let hrList = hr.map((item) => {
          return {
            name: item.shijian,
            number: item.hr,
          };
        });
        // 血氧
        let bpList = bp.map((item) => {
          return {
            x: item.shijian,
            y1: item.dbp,
            y2: item.sbp,
          };
        });

        yield put({
          type: 'updateLishitubiaoDtz',
          payload: {
            weightList,
            tempList,
            bgList,
            spo2List,
            hrList,
            bpList,
            zuijin: payload.zuijin,
          },
        });
      }
    },

    *getRuzhuDetail({payload}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getRuzhuDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({
          type: 'updateRuzhuDetail',
          payload: result,
        });
      }
    },

    *getMubanData({payload}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getMubanData, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {
          result: {
            neirong, muban, qita, createTime, id,
          },
        } = res;
        const {neirong: mubanXml} = muban;
        let x2js = new X2JS({
          arrayAccessFormPaths: [
            'document.section',
            'document.section.item',
            'document.section.item.option',
          ],
        });
        let jsonObj = x2js.xml2js(mubanXml);
        let data = null;
        if (neirong) {
          data = JSON.parse(neirong);
          for (let item in data) {
            if (data[item] && item !== 'pre0103' && item !== 'pre0106') {
              try {
                data[item] = JSON.parse(data[item]);
              } catch (e) {
                // console.log(e);
              }
            }
          }
        }
        if (payload.leixing === 1) {
          yield put({
            type: 'updateRuzhuPgxml',
            payload: jsonObj,
          });
        } else if (payload.leixing === 3) {
          yield put({
            type: 'updateJiluXml',
            payload: jsonObj,
          });
        }

        yield put({
          type: 'updateRuzhuData',
          payload: {
            qita,
            data,
            createTime,
            id,
          },
        });
      }
    },

    *getMubanDataId({payload}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getMubanDataId, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {
          result: {
            neirong, qita, createTime, id,
          },
        } = res;
        let data = JSON.parse(neirong);
        for (let item in data) {
          if (data[item] && item !== 'pre0103' && item !== 'pre0106') {
            try {
              data[item] = JSON.parse(data[item]);
            } catch (e) {
              // console.log(e);
            }
          }
        }

        yield put({
          type: 'updateRuzhuData',
          payload: {
            qita,
            data,
            createTime,
            id,
          },
        });
      }
    },
  },
});
