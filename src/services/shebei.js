import { request, config, FORM } from 'utils';

const { api } = config;
const {
  GET_SHEBEI_LIST,
  GET_SHEBEI_XIUGAI,
  GET_SHEBEI_DAORU,
  GET_SHEBEI_ZNC,
  GET_SHEBEI_ZNCSS,
  GET_SHEBEI_ZNCBD,
  GET_SHEBEI_ZNCD,
  GET_SHEBEI_ZNCDSS,
  GET_SHEBEI_ZNCDBD,
  GET_SHEBEI_DTZ,
  GET_SHEBEI_DTZBD,
  GET_SHEBEI_ZHXBD,
  DELETE_DAORU_LIST,
} = api;

export async function query(params) {
  return request({
    url: GET_SHEBEI_LIST,
    method: 'GET',
    data: params,
  });
}

export async function getshebei(params) {
  return request({
    url: GET_SHEBEI_LIST,
    method: 'GET',
    data: params,
  });
}

export async function getdaoruShebei(params) {
  return request({
    url: GET_SHEBEI_DAORU,
    method: 'GET',
    data: params,
  });
}

export async function daoRushebei(params) {
  return request({
    type: FORM.FORM_DATA,
    url: GET_SHEBEI_DAORU,
    method: 'POST',
    data: params,
  });
}

export async function xiugaiShebei(params) {
  const { leixing, id, ...restParams } = params;
  return request({
    url: GET_SHEBEI_XIUGAI.replace(':bianhao', id).replace(':leixing', leixing),
    method: 'PUT',
    data: restParams,
  });
}

export async function shanchuShebei(params) {
  const { leixing, id, ...restParams } = params;
  return request({
    url: GET_SHEBEI_XIUGAI.replace(':bianhao', id).replace(':leixing', leixing),
    method: 'DELETE',
    data: restParams,
  });
}

export async function getZncDetail(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_SHEBEI_ZNC.replace(':bianhao', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getZncShishi(params) {
  const { bianhao, ...restParams } = params;
  return request({
    url: GET_SHEBEI_ZNCSS.replace(':bianhao', bianhao),
    method: 'GET',
    data: restParams,
  });
}

export async function deleteDaoruList(params) {
  const { daoruId, ...restParams } = params;
  return request({
    url: DELETE_DAORU_LIST.replace(':daoruId', daoruId),
    method: 'DELETE',
    data: restParams,
  });
}

export async function getZncBangding(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_SHEBEI_ZNCBD.replace(':bianhao', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getZncdDetail(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_SHEBEI_ZNCD.replace(':bianhao', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getZncdShishi(params) {
  const { bianhao, ...restParams } = params;
  return request({
    url: GET_SHEBEI_ZNCDSS.replace(':bianhao', bianhao),
    method: 'GET',
    data: restParams,
  });
}

export async function getZncdBangding(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_SHEBEI_ZNCDBD.replace(':bianhao', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getDtzDetail(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_SHEBEI_DTZ.replace(':bianhao', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getDtzBangding(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_SHEBEI_DTZBD.replace(':bianhao', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getZhxBangding(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_SHEBEI_ZHXBD.replace(':bianhao', id),
    method: 'GET',
    data: restParams,
  });
}
