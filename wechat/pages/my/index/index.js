//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},           //用户信息数据
    hasUserInfo: false,     //判断是否以获取用户信息
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),   //判断getUserInfo方法当前版本是否兼容
    // userInfo: wx.getStorageSync('userInfo')
    userState: 1, // 根据用户来确定是否接单状态 1--接单，0--用户
    user_type: 0,
    courierInfo: '申请骑手' // '切换':''
  },
  onShow(){
    const userinfo=wx.getStorageSync("userInfo");
    this.setData({userinfo});
    let userState = wx.getStorageSync("userState")
    let user_type = wx.getStorageSync("user_type")
    this.setData({
      userState,
      user_type
    })
  },
  onLoad: function () {
    // app.getSettings()
  },
  switchUserState(){
    let State = this.data.userState
    if(State==1){
      this.setData({
        userState: 0
      })
      wx.setStorageSync("userState", 0)
      wx.switchTab({
        url: '/pages/index/index'
      })
    }else if(State==0){
      this.setData({
        userState: 1
      })
      wx.setStorageSync("userState", 1)
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },  
  // 分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: "分享",
      path: '/pages/comprehensivePersonalTax/comprehensivePersonalTax',
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
})
