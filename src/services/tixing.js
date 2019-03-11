import { request, config, FORM } from 'utils';

const { api } = config;
const {
  GET_TIXING_LIST,
} = api;

export async function query(params) {
  return request({
    url: GET_TIXING_LIST,
    method: 'GET',
    data: params,
  });
}
