import { request, config } from 'utils';

const { api } = config;
const {
  GET_GAIYAO_PLATFORM,
  GET_SHEBEI_PLATFORM,
  GET_JIANCESHUJU_PLATFORM,
} = api;

export async function getGaiyaoPlatform(params) {
  return request({
    url: GET_GAIYAO_PLATFORM,
    method: 'GET',
    data: params,
  });
}

export async function getShebeiPlatform(params) {
  return request({
    url: GET_SHEBEI_PLATFORM,
    method: 'GET',
    data: params,
  });
}

export async function getJianceshujuPlatform(params) {
  return request({
    url: GET_JIANCESHUJU_PLATFORM,
    method: 'GET',
    data: params,
  });
}
