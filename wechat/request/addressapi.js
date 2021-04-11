//引入封装的reuest请求
const { request } = require('../utils/api.js')
//基于业务封装的接口
module.exports={

	// list
  // 查询用户信息
	oftenAddresFindId: (value)=>{
		return request('/address/oftenAddresFindId', 'GET', { id: value},true);
	},

	// addlist
  // 常用地址表添加
	oftenAddresAdd: (params)=>{
		return request('/address/oftenAddresAdd', 'POST', params ,true);
	},
}