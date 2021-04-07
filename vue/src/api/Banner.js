import request from '../utils/request'

// 获取订单数据
export function indexBannerFind(params) {
  return request({
    url: '/v1/api/admin/indexBannerFind',
    method: 'get',
    params:params
  })
};


// 删除Banner图片
export function deleteBannerImg(params) {
  return request({
    url: '/deleteImg/Banner',
    method: 'post',
    data:params
  })
};

// 更改Banner图片
export function indexBannerImg(params) {
  return request({
    url: '/v1/api/admin/indexBannerImg',
    method: 'post',
    data:params
  })
};
