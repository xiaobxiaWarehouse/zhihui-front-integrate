import { request, config } from 'utils';

const { api } = config;
const { GET_SHEBEI_CAIJISHUJU } = api;

export async function query(params) {
  return request({
    url: GET_SHEBEI_CAIJISHUJU,
    method: 'GET',
    data: params,
  });
}
