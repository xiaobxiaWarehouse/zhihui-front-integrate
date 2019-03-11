import { request, config, rsa } from '../utils';

const { api } = config;
const { USER_LOGIN, MODIFY_USER_MIMA } = api;
const { rsaEncrypt } = rsa;

// services层用于写http请求
export async function login(params) {
  return request({
    url: USER_LOGIN,
    method: 'POST',
    data: params,
  });
}

export async function checkLogin(params) {
  return request({
    url: USER_LOGIN,
    method: 'GET',
    data: params,
  });
}

export async function logout(params) {
  return request({
    url: USER_LOGIN,
    method: 'DELETE',
    data: params,
  });
}

export async function updatePassword(params) {
  let newParams = {};
  newParams.yuanmima = rsaEncrypt(params.oldPwd);
  newParams.xinmima = rsaEncrypt(params.newPwd);
  newParams.querenmima = rsaEncrypt(params.newPwd);
  return request({
    url: MODIFY_USER_MIMA,
    method: 'PATCH',
    data: newParams,
  });
}
