import requestUrl from '../../../utils/util.js'
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
  },
  onLoad: function (options) {
  },
  bindGetUserInfo: function (e) { //点击的“拒绝”或者“允许
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
        })
        console.log('userInfo',res.userInfo)
        wx.setStorageSync('userInfo', res.userInfo)
        wx.redirectTo({
          url: '/pages/login/login/login'
        })
      },
      fail:res => {
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function (res) {
            if (res.confirm) {}
          }
        })
      }
    })
  }
})