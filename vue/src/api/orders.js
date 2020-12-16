import request from '../utils/request'

// 获取订单数据
export function orderFind(params) {
  return request({
    url: '/vue/orderFind',
    method: 'get',
    params:params
  })
};

// 增加订单
export function orderAdd(params) {
  return request({
    url: '/wechat/orderAdd',
    method: 'post',
    data:params
  })
};

// 更新订单
export function orderUpdate(params) {
  return request({
    url: '/wechat/orderUpdate',
    method: 'post',
    data:params
  })
};

// 更改图片
export function orderImg(params) {
  return request({
    url: '/wechat/orderImg',
    method: 'post',
    data:params
  })
};

// 删除图片
export function deleteImg(params) {
  return request({
    url: '/deleteImg',
    method: 'post',
    data:params
  })
};

// 删除订单
export function orderDelete(params) {
  return request({
    url: '/wechat/orderDelete',
    method: 'post',
    data:params
  })
};

// 订单开始时间搜索
export function orderStartTimeSearch(params) {
  return request({
    url: '/wechat/orderStartTimeSearch',
    method: 'post',
    data:params
  })
};

// 订单关键字搜索
export function orderKeySearch(params) {
  return request({
    url: '/wechat/orderKeySearch',
    method: 'get',
    params:params
  })
};
