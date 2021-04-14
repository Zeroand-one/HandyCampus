// import requestUrl from './utils/request.js'
import requestUrl from './utils/util.js'

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    this.checkout()
  },
  //检验code
  checkout: function () {
    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
        console.log("未过期", wx.getStorageSync('session_key'))
      },
      fail: function () {
        //session_key 已经失效，需要重新执行登录流程
        console.log("过期了", wx.getStorageSync('session_key'))
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              console.log('code', res.code)
              let code=res.code
              requestUrl.Post("/user/getSessionKeyOpenid",{code},
              res=>{
                console.log(res.data,'res')
                wx.setStorageSync('openId', res.data.openid);
                wx.setStorageSync('session_key', res.data.session_key);
              })
            }
          }
        })
      }
    })
  },
  //检验授权的方法
  getSettings: function () {
    let that = this
    if (wx.getStorageSync('userInfo') ) { //授权了，可以获取用户信息了
      console.log('已授权')
    } else { //未授权，跳到授权页面
      wx.redirectTo({
        url: '/pages/login/authorize/authorize', //授权页面
      })
    }

  },
  globalData: {
    userInfo: "", //用户信息
    openId: "", //登录用户的唯一标识
    appid: '', //appid
    AppSecret: '', //secret秘钥
    token: '',
    ClassId: null,
    session_key: '',
    API_ROOT: 'http://127.0.0.1:3030', // 图片根地址
  },
  onHide: function () { //小程序退出时触发的事件
    console.log("小程序完全退出了")
  }
})