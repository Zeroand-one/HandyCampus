import request from '../utils/request'

// 获取用户数据
export function getUserData(params) {
  return request({
    url: '/v1/api/admin/usersFind',
    method: 'get',
    params:params
  })
};

// 搜索用户数据
export function getUserFindSearch(params) {
  return request({
    url: '/v1/api/admin/usersFindSearch',
    method: 'get',
    params:params
  })
};

// 增加用户
export function UsersAdd(params) {
  return request({
    url: '/v1/api/admin/usersadd',
    method: 'post',
    data:params
  })
};

// 更新用户数据
export function UsersUpdate(params) {
  return request({
    url: '/v1/api/admin/usersupdate',
    method: 'post',
    data:params
  })
};

// 删除用户数据
export function UsersDelete(params) {
  return request({
    url: '/v1/api/admin/usersDelete',
    method: 'post',
    data:params
  })
};