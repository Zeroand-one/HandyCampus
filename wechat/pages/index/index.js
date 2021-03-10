
const app = getApp()
let call = require('../../utils/util.js')
import moment from "moment";
// pages/news/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background:[], //轮播图
    list:[
      {
        id:0,
        img:"../../images/order_type/type0.png",
        title:"取快递",
        info:"代取校园附近快递"
      },
      {
        id:1,
        img:"../../images/order_type/type1.png",
        title:"取外卖",
        info:"代取校园外卖"
      },
      {
        id:2,
        img:"../../images/order_type/type2.png",
        title:"代买",
        info:"代买美食商品"
      },
      {
        id:3,
        img:"../../images/order_type/type3.png",
        title:"代赠",
        info:"代赠文件鲜花"
      },
      {
        id:4,
        img:"../../images/order_type/type4.png",
        title:"其他",
        info:"其他服务"
      }
    ],      //列表数据
    page:1,       //页数
    pagesize:5,   //每页数据
    Search:"",    //搜索内容
    footer:true,  //数据为空、有数据（false）
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {

  },
  
  NavClass(e){
    app.globalData.ClassId = e.target.dataset.id
    wx.switchTab({
      url: `/pages/news/list/list`,
    })
  },

})