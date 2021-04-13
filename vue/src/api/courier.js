import request from '../utils/request'

// 骑手查询
export function courierFind() {
  return request({
    url: '/v1/api/admin/courierFind',
    method: 'get',
  })
};

// 搜索骑手数据
export function getCourierFindSearch(params) {
  return request({
    url: '/v1/api/admin/courierFindSearch',
    method: 'get',
    params:params
  })
};

// 申请成为骑手查询列表
export function courierAddFindList(params) {
  return request({
    url: '/v1/api/admin/courierAddFindList',
    method: 'get',
    params:params
  })
};

// 申请成为骑手查询
export function courierAddFindId(params) {
  return request({
    url: '/v1/api/admin/courierAddFindId',
    method: 'get',
    params:params
  })
};

// 管理成为骑手账号
export function courierManageId(params) {
  return request({
    url: '/v1/api/admin/courierManageId',
    method: 'post',
    data:params
  })
};
