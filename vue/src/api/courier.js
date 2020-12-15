import request from '../utils/request'

// 骑手查询
export function courierFind() {
  return request({
    url: '/vue/courierFind',
    method: 'get',
  })
};

// 搜索骑手数据
export function getCourierFindSearch(params) {
  return request({
    url: '/vue/courierFindSearch',
    method: 'get',
    params:params
  })
};
