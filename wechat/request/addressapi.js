//引入封装的reuest请求
const { request } = require('../utils/api.js')
//基于业务封装的接口
module.exports={

	// list
  // 用户常用地址表列表查询
	oftenAddresFindId: (value)=>{
		return request('/address/oftenAddresFindId', 'GET', { id: value},true);
	},

	// addlist
  // 常用地址表添加
	oftenAddresAdd: (params)=>{
		return request('/address/oftenAddresAdd', 'POST', params ,true);
	},

  // 用户常用地址表信息查询
	oftenAddresFindInfoId: (params)=>{
		return request('/address/oftenAddresFindInfoId', 'GET', params,true);
	},

  // 常用地址表修改
	oftenAddresUpdate: (params)=>{
		return request('/address/oftenAddresUpdate', 'POST', params ,true);
	},

  // 常用地址表删除
	oftenAddresDelete: (params)=>{
		return request('/address/oftenAddresDelete', 'POST', params ,true);
	},

}