//引入封装的reuest请求
const { request } = require('../utils/api.js')
//基于业务封装的接口
module.exports={

	// add
	// 申请成为骑手
	userCourierAdd: (params)=>{
		return request('/user/userCourierAdd', 'POST', params ,true);
	},
}