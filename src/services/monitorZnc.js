import { request, config } from 'utils';

const { api } = config;
const { GET_JIANCESHUJI_CHUANG, GET_CHUANG_DETAIL } = api;

export async function query(params) {
  return request({
    url: GET_JIANCESHUJI_CHUANG,
    method: 'GET',
    data: params,
  });
}

export async function getDetail(params) {
  const { bianhao, ...restParams } = params;
  return request({
    url: GET_CHUANG_DETAIL.replace(':bianhao', bianhao),
    method: 'GET',
    data: restParams,
  });
}
