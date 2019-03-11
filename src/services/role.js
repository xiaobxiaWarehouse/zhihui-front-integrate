import {request, config } from 'utils';

const {api} = config;
const {
  GET_ROLE_CHAXUN,
  GET_ROLE_NAME,
  GET_ROLECHAXUN_PRIV,
} = api;

export async function query(params) {
  return request({
    url: GET_ROLE_CHAXUN,
    method: 'GET',
    data: params,
  });
}

export async function getRole(params) {
  return request({
    url: GET_ROLE_CHAXUN,
    method: 'GET',
    data: params,
  });
}

export async function addRole(params) {
  return request({
    url: GET_ROLE_CHAXUN,
    method: 'POST',
    data: params,
  });
}

export async function roleXq(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_ROLE_NAME.replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}

export async function bianjiRole(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_ROLE_NAME.replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}

export async function chaxunRolePriv(params) {
  return request({
    url: GET_ROLECHAXUN_PRIV,
    method: 'GET',
    data: params,
  });
}
