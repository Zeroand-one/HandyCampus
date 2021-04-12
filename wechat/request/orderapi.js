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
	orderListFind: (params)=>{
		return request('/order/orderListFind', 'GET', params ,true);
	},
}