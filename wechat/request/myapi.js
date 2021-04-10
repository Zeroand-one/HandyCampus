//引入封装的reuest请求
const { request } = require('../utils/api.js')
//基于业务封装的接口
module.exports={

	// info
  // 查询用户信息
	userAuthFind: (value)=>{
		return request('/user/userAuthFind', 'GET', { id: value},true);
	},
	// 修改用户信息
	userAuthUpdata: (params)=>{
		return request('/user/userAuthUpdata', 'POST', params ,true);
	},

	// about
  // 查询关于我们信息
	AboutFind: (value)=>{
		return request('/user/AboutFind', 'GET', { },true);
	},
}