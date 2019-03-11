import { request, config } from 'utils';

const { api } = config;
const { GET_JIANCESHUJI_ZHIHUIXIE, GET_ZHIHUIXIE_DETAIL } = api;

export async function query(params) {
  return request({
    url: GET_JIANCESHUJI_ZHIHUIXIE,
    method: 'GET',
    data: params,
  });
}

export async function getDetail(params) {
  const { bianhao, ...restParams } = params;
  return request({
    url: GET_ZHIHUIXIE_DETAIL.replace(':bianhao', bianhao),
    method: 'GET',
    data: restParams,
  });
}
