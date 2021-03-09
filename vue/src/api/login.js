import request from '../utils/request'

// 验证注册昵称是否已被注册
export function RegName(params) {
  return request({
    url: '/v1/admin/regname',
    method: 'get',
    params:params
  })
};

// 登录
export function login(params) {
  return request({
    url: '/v1/admin/login',
    method: 'get',
    params:params
  })
};

// 注册
export function register(params) {
  return request({
    url: '/v1/admin/register',
    method: 'post',
    data:params
  })
};
// 获取用户数据
