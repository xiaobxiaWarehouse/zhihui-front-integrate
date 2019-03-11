import {request, config} from 'utils';

const {api} = config;
const {
  GET_USER_CHAXUN,
  GET_USER_NAME,
  GET_USERLIST_ZHUANGTAI,
  GET_USERLIST_ROLE,
  GET_USERLIST_PRIV,
  GET_ALL_ROLE,
  GET_USER_CHONGZHIMIMA,
} = api;

export async function query(params) {
  return request({
    url: GET_USER_CHAXUN,
    method: 'GET',
    data: params,
  });
}

export async function getUser(params) {
  return request({
    url: GET_USER_CHAXUN,
    method: 'GET',
    data: params,
  });
}

export async function getRole(params) {
  return request({
    url: GET_ALL_ROLE,
    method: 'GET',
    data: params,
  });
}

export async function addUser(params) {
  return request({
    url: GET_USER_CHAXUN,
    method: 'POST',
    data: params,
  });
}

export async function UserXq(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_USER_NAME.replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}

export async function bianjiUser(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_USER_NAME.replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}

export async function userZhuangtai(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_USERLIST_ZHUANGTAI.replace(':id', id),
    method: 'PATCH',
    data: restParams,
  });
}

export async function fenpeiUser(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_USERLIST_ROLE.replace(':id', id),
    method: 'POST',
    data: restParams,
  });
}

export async function huoquroleUser(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_USERLIST_ROLE.replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}

export async function huoquprivUser(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_USERLIST_PRIV.replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}

export async function chongzhimima(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_USER_CHONGZHIMIMA.replace(':id', id),
    method: 'POST',
    data: restParams,
  });
}

