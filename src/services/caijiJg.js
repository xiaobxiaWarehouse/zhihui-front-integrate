import { request, config } from 'utils';

const { api } = config;
const { GET_JIGOU_CAIJISHUJU } = api;

export async function query(params) {
  return request({
    url: GET_JIGOU_CAIJISHUJU,
    method: 'GET',
    data: params,
  });
}
