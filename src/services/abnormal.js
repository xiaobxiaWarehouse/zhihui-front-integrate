import {request, config} from 'utils';

const {api} = config;
const {GET_YICHANG_YICHANGSHUJU } = api;

export async function query(params) {
  return request({
    url: GET_YICHANG_YICHANGSHUJU,
    method: 'GET',
    data: params,
  });
}
