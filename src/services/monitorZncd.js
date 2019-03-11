import { request, config } from 'utils';

const { api } = config;

const { GET_JIANCESHUJI_CHUANGDIAN, GET_CHUANGDIAN_DETAIL } = api;

export async function query(params) {
  return request({
    url: GET_JIANCESHUJI_CHUANGDIAN,
    method: 'GET',
    data: params,
  });
}

export async function getDetail(params) {
  const { bianhao, ...restParams } = params;
  return request({
    url: GET_CHUANGDIAN_DETAIL.replace(':bianhao', bianhao),
    method: 'GET',
    data: restParams,
  });
}
