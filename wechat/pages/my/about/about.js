
const { formatTimeString, formatTime  } = require('../../../utils/util.js');
const { AboutFind } = require('../../../request/myapi.js');
const app = getApp()

// pages/my/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:{},     //信息数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist()
  },
  // 信息获取
  getlist(){
    AboutFind().then(res => {
      console.log(res)
      if(res.code == 200){
        this.setData({details:res.data})
      }
    })

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