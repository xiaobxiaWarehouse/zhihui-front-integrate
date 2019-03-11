import { request, config } from 'utils';

const { api } = config;
const {
  GET_DANGAN,
  GET_DANGANDETAIL,
  GET_SHISHI_ZNC,
  GET_SHUIMIAN_ZNC,
  GET_ZAILICHUANG_ZNC,
  GET_LISHI_ZNC,
  GET_SHISHI_ZNCD,
  GET_SHUIMIAN_ZNCD,
  GET_ZAILICHUANG_ZNCD,
  GET_LISHI_ZNCD,
  GET_ZUIJIN_DTZ,
  GET_JIBEN_ZHX,
  GET_LISHIBIAODAN_DTZ,
  GET_DINGWEI_ZHX,
  GET_TISHI_ZHX,
  GET_LISHITUBIAO_DTZ,
  GET_RUZHU_DETAIL,
  GET_MUBAN,
  GET_MUBAN_DATA,
  GET_MUBAN_DATA_ID,
} = api;

export async function query(params) {
  return request({
    url: GET_DANGAN,
    method: 'GET',
    data: params,
  });
}

export async function getDanganDetail(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_DANGANDETAIL.replace(':id', id).replace(':jigou', jigou),
    method: 'GET',
    data: restParams,
  });
}

export async function getShishiZnc(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_SHISHI_ZNC.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getShumianZnc(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_SHUIMIAN_ZNC.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getZailichuangZnc(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_ZAILICHUANG_ZNC.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getLishiZnc(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_LISHI_ZNC.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getShishiZncd(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_SHISHI_ZNCD.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getShumianZncd(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_SHUIMIAN_ZNCD.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getZailichuangZncd(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_ZAILICHUANG_ZNCD.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getLishiZncd(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_LISHI_ZNCD.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getZuijinDtz(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_ZUIJIN_DTZ.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getJibenZhx(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_JIBEN_ZHX.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getLishibiaodanDtz(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_LISHIBIAODAN_DTZ.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getDingweiZhx(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_DINGWEI_ZHX.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getTishiZhx(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_TISHI_ZHX.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getLishitubiaoDtz(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_LISHITUBIAO_DTZ.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getRuzhuDetail(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_RUZHU_DETAIL.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getMubanData(params) {
  const { suoyin, jigou, ...restParams } = params;
  return request({
    url: GET_MUBAN_DATA.replace(':jigou', jigou).replace(':suoyin', suoyin),
    method: 'GET',
    data: restParams,
  });
}

export async function getMubanDataId(params) {
  const {
    id, suoyin, jigou, ...restParams
  } = params;
  return request({
    url: GET_MUBAN_DATA_ID.replace(':jigou', jigou)
      .replace(':suoyin', suoyin)
      .replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getMuban(params) {
  const { leixing, ...restParams } = params;
  return request({
    url: GET_MUBAN.replace(':leixing', leixing),
    method: 'GET',
    data: restParams,
  });
}
