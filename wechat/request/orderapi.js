//引入封装的reuest请求
const { request } = require('../utils/api.js')
//基于业务封装的接口
module.exports={

	// add
	// 订单地址表查询
	orderAddresFind: (order_id)=>{
		return request('/order/orderAddresFind', 'GET', { id: order_id},true);
	},
	// 新增订单 
	orderAdd: (params)=>{
		return request('/order/orderAdd', 'POST', params ,true);
	},
	// 新增订单地址 
	orderAddAddres: (params)=>{
		return request('/order/orderAddAddres', 'POST', params ,true);
	},
	// 订单传图 
	orderImg: (params)=>{
		return request('/order/orderImg', 'POST', params ,true);
	},

	// list
	// 查看用户订单详情
	orderListFind: (params)=>{
		return request('/order/orderListFind', 'GET', params ,true);
	},

	// mylist
	// 查看用户订单详情
	orderListTypeFind: (params)=>{
		return request('/order/orderListTypeFind', 'GET', params ,true);
	},

	// info
	// 查看用户订单详情 
	orderInfoFind: (params)=>{
		return request('/order/orderInfoFind', 'GET', params ,true);
	},
	// 用户评价 
	orderClientEstimate: (params)=>{
		return request('/order/orderClientEstimate', 'POST', params ,true);
	},
	// 用户支付订单 
	orderPay: (params)=>{
		return request('/order/orderPay', 'POST', params ,true);
	},
	// 骑手点击完成 
	orderFinish: (params)=>{
		return request('/order/orderFinish', 'POST', params ,true);
	},
	// 骑手反馈 
	orderCourierBack: (params)=>{
		return request('/order/orderCourierBack', 'POST', params ,true);
	},
}