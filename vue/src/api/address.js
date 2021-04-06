import request from '../utils/request'

// 常用地址簿查询
export function adminOftenAddresFind() {
  return request({
    url: '/v1/api/admin/adminOftenAddresFind',
    method: 'get',
  })
};

// 常用地址簿修改
export function adminOftenAddresUpdate(params) {
  return request({
    url: '/v1/api/admin/adminOftenAddresUpdate',
    method: 'post',
    data:params
  })
};

// 常用地址簿删除
export function adminOftenAddresDelete(params) {
  return request({
    url: '/v1/api/admin/adminOftenAddresDelete',
    method: 'post',
    data:params
  })
};

// 搜索用户数据
export function adminOftenAddresKeySearch(params) {
  return request({
    url: '/v1/api/admin/adminOftenAddresKeySearch',
    method: 'get',
    params:params
  })
};
