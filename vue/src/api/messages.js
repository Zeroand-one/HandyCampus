import request from '../utils/request'

// 查询全部反馈
export function messagesFindAll(params) {
  return request({
    url: '/vue/messagesFindAll',
    method: 'get',
    params:params
  })
};

// 查询未读反馈
export function messagesFindRead(params) {
  return request({
    url: '/vue/messagesFindRead',
    method: 'get',
    params:params
  })
};

// 根据id查询反馈
export function messagesFindId(params) {
  return request({
    url: '/vue/messagesFindId',
    method: 'get',
    params:params
  })
};

// 根据id修改查看状态
export function messagesFindReadId(params) {
  return request({
    url: '/vue/messagesFindReadId',
    method: 'post',
    data:params
  })
};

// 反馈回复
export function messagesUpdate(params) {
  return request({
    url: '/vue/messagesUpdate',
    method: 'post',
    data:params
  })
};

// 反馈删除
export function messagesDelete(params) {
  return request({
    url: '/vue/messagesDelete',
    method: 'post',
    data:params
  })
};
