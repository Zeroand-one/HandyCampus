//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},           //用户信息数据
    hasUserInfo: false,     //判断是否以获取用户信息
    canIUse: wx.canIUse('button.open-type.getUserInfo'),   //判断getUserInfo方法当前版本是否兼容
    userInfo: wx.getStorageSync('userInfo')
  },
  onShow(){
    const userinfo=wx.getStorageSync("userInfo");
    this.setData({userinfo});
  },
  onLoad: function () {
    // app.getSettings()
  },
})
