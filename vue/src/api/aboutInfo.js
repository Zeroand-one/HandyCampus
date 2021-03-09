import request from '../utils/request'

// 关于我们查询
export function AboutFind() {
  return request({
    url: '/v1/api/admin/AboutFind',
    method: 'get',
  })
};

// 关于我们添加
export function AboutAdd(params) {
  return request({
    url: '/v1/api/admin/AboutAdd',
    method: 'post',
    data:params
  })
};

// 关于我们修改
export function AboutUpdata(params) {
  return request({
    url: '/v1/api/admin/AboutUpdata',
    method: 'post',
    data:params
  })
};
