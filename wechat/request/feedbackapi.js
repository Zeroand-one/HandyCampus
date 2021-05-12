//引入封装的reuest请求
const { request } = require('../utils/api.js')
//基于业务封装的接口
module.exports={

	// 提交意见反馈 
	feedbackAdd: (params)=>{
		return request('/feedback/feedbackAdd', 'POST', params ,true);
	},
	// 提交意见反馈图片 
	feedbackAddImg: (params)=>{
		return request('/feedback/feedbackAddImg', 'POST', params ,true);
	},
	// info
	// 查看用户订单详情 
	feedbackInfoFind: (params)=>{
		return request('/feedback/feedbackInfoFind', 'GET', params ,true);
	},
}