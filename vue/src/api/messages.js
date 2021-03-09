import request from '../utils/request'

// 查询全部反馈
export function messagesFindAll(params) {
  return request({
    url: '/v1/admin/messagesFindAll',
    method: 'get',
    params:params
  })
};

// 查询未读反馈
export function messagesFindRead(params) {
  return request({
    url: '/v1/admin/messagesFindRead',
    method: 'get',
    params:params
  })
};

// 根据id查询反馈
export function messagesFindId(params) {
  return request({
    url: '/v1/admin/messagesFindId',
    method: 'get',
    params:params
  })
};

// 根据id修改查看状态
export function messagesFindReadId(params) {
  return request({
    url: '/v1/admin/messagesFindReadId',
    method: 'post',
    data:params
  })
};

// 反馈回复
export function messagesUpdate(params) {
  return request({
    url: '/v1/admin/messagesUpdate',
    method: 'post',
    data:params
  })
};

// 反馈删除
export function messagesDelete(params) {
  return request({
    url: '/v1/admin/messagesDelete',
    method: 'post',
    data:params
  })
};

// 反馈关键字搜索
export function messagesFindSearch(params) {
  return request({
    url: '/v1/admin/messagesFindSearch',
    method: 'get',
    params:params
  })
};
