// pages/news/details/details.js
const app = getApp()
let call = require('../../../utils/util.js')
import moment from "moment";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},      //详情数据
    Class:[],       //模块数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ClassFind()
    this.Data(options.id)
  },
  ClassFind(){
    call.Get(`/wechat/ClassFind`,
    res => {
      if(res.code == 200){
        this.setData({Class:res.data})
      }
    })
  },
  // 详情数据
  Data(id){
    call.Get(`/wechat/ArticleDetails/${id}`,
    res => {
      if(res.code == 200){
        res.data.newtime = moment(res.data.newtime).format('YYYY-MM-DD HH:mm:ss')
        this.data.Class.forEach(item => {
          if(res.data.class == item.id){
            res.data.nav = item.name
          }
        })
        this.setData({
          detail:res.data
        })
      }
    })
  },
  // 模块导航跳转
  navclass(e){
    console.log(e)
    app.globalData.ClassId = e.target.dataset.id
    wx.switchTab({
      url: `/pages/news/list/list`,
    })
  },

})