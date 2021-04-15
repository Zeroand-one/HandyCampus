//引入封装的reuest请求
const { request } = require('../utils/api.js')
//基于业务封装的接口
module.exports={

	// 提交意见反馈 
	feedbackAdd: (params)=>{
		return request('/feedback/feedbackAdd', 'POST', params ,true);
	},
	// info
	// 查看用户订单详情 
	orderInfoFind: (params)=>{
		return request('/order/orderInfoFind', 'GET', params ,true);
	},
}