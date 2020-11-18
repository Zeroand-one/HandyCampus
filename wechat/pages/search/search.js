let call = require('../../utils/util.js')
import moment from "moment";
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],   //列表数据
    Search:"",  //搜索内容
    footer:false,//无数据提示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Search:options.title
    })
    this.list(options.title)
  },
  // 搜索内容
  bindinput(e){
    let Search = e.detail.value
    this.setData({
      Search:e.detail.value
    })
  },
  list(Search){
    call.Post('/wechat/IndexQuery',{Search},
    res => {
      if(res.code == 200){
        if(res.data.length > 0){
          res.data.forEach(item => {
          item.newtime = moment(item.newtime).format('YYYY-MM-DD HH:mm:ss')
        })
        this.setData({
          list:res.data
        })
        }else{
          this.setData({
            footer:true,
            list:[]
          })
        }
      }
    })
  },
  // 搜索跳转
  search(){
    this.list(this.data.Search)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})