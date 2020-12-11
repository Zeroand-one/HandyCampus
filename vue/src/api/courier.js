import request from '../utils/request'

// 骑手查询
export function courierFind() {
  return request({
    url: '/vue/courierFind',
    method: 'get',
  })
};
