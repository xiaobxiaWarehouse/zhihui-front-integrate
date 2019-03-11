import { request, config, rsa } from 'utils';

const { api } = config;
const {
  GET_GROUP_ALLJIGOU,
  GET_GROUP_BIANJI,
  GET_GROUP_CHAXUN,
  DELETE_GROUP_LIST,
} = api;

export async function getJigou(params) {
  return request({
    url: GET_GROUP_ALLJIGOU,
    method: 'GET',
    data: params,
  });
}

export async function query(params) {
  return request({
    url: GET_GROUP_CHAXUN,
    method: 'GET',
    data: params,
  });
}

export async function addJigou(params) {
  return request({
    url: GET_GROUP_CHAXUN,
    method: 'POST',
    data: params,
  });
}

export async function jigouXq(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_GROUP_BIANJI.replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}

export async function bianjiJigou(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_GROUP_BIANJI.replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}

export async function deleteList(params) {
  const { id, ...restParams } = params;
  return request({
    url: DELETE_GROUP_LIST.replace(':id', id),
    method: 'DELETE',
    data: restParams,
  });
}
