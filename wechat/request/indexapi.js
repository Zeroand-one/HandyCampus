//引入封装的reuest请求
const { request } = require('../utils/api.js')
//基于业务封装的接口
module.exports={

  // 查询banner图
	indexBannerFind: (value)=>{
		return request('/index/indexBannerFind', 'GET', { },true);
	},
}