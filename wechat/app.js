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

      // //获取用户本地是否是第一次进入新版本
      // var versions = wx.getStorageSync('versions');
      // console.log('versions:' + versions);
      // //判断是不是需要授权
      // if (versions == '1') {
      //   // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      //   wx.getUserInfo({
      //     success: function (res) {
      //       that.globalData.userInfo = res.userInfo
      //       console.log(that.globalData.userInfo)
      //     },
      //     fail: function () {
      //       wx.redirectTo({
      //         url: '/pages/login/login/login',
      //       })
      //     }
      //   })
      // } else {
      //   wx.setStorageSync('versions', '1')
      //     //未授权, 跳转登录页面
      //   wx.redirectTo({
      //     url: '/pages/login/login/login',
      //   })
      // }
      // // 获取用户信息
      // wx.getSetting({
      //   success: res => {
      //     if (res.authSetting['scope.userInfo']) {
      //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      //       wx.getUserInfo({
      //         success: res => {
      //           // 可以将 res 发送给后台解码出 unionId
      //           this.globalData.userInfo = res.userInfo
      //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      //             // 所以此处加入 callback 以防止这种情况
      //           if (this.userInfoReadyCallback) {
      //             this.userInfoReadyCallback(res)
      //           }
      //         }
      //       })
      //     }
      //   }
      // })
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
                  // this.globalData.openId=res.data.openid
                  // console.log(this.globalData.openId)
                  wx.setStorageSync('openId', res.data.openid);
                  wx.setStorageSync('session_key', res.data.session_key);
                })
                // ).then((res) => {
                //   console.log(res,'res')
                //   wx.setStorageSync('openId', res.data.data.openid);
                //   wx.setStorageSync('token', res.data.data.token);
                // }).catch((msg) => {
                //   console.log(msg)
                // })
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
      session_key: ''
    },
    onHide: function () { //小程序退出时触发的事件
      console.log("小程序完全退出了")
    }
})