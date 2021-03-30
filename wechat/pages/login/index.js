const app = getApp();
var Mcaptcha = require('../../utils/mcaptcha.js');
let _this ;
Page({
  data: {
    formData:{
      phone_number: '',
      code: ''
    },
    second: 60,
    notbind: false,
    mcaptcha: {},
    imgCode:null,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    AuthorizedLogin: '授权登录',
    UserPhone: '手机号授权',
    lee: "",
    flag: true
  },
  onLoad: function (options) {
    _this = this;
    // 查看是否授权
    //获取用户本地是否是第一次进入新版本
    var versions = wx.getStorageSync('versions');
    if (versions == '1') {
      wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            //调用共通的登录方法
            wx.getUserInfo(
              function(userinfo) {
                _this.setData({
                  userinfo: userinfo
                })
              });
          } else {
            // 用户没有授权
            // 改变 isHide 的值，显示授权页面
            _this.setData({
              isHide: true
            });
          }
        }
      });
    } else {
      // 用户没有授权
      // 改变 isHide 的值，显示授权页面
      _this.setData({
        isHide: true
      });
    }
    _this.data.mcaptcha=new Mcaptcha({
      el: 'canvas',
      width: 80,
      height: 35,
      createCodeImg: ""
    });
    
  },

  //刷新验证码
  onTap(){
    _this.data.mcaptcha.refresh();
  },
  
  wxlogin: function() { //获取用户的openID
    var _this = this;
    //调用共通的登录方法
    wx.getUserInfo(
      function(userinfo) {
        _this.setData({
          userinfo: userinfo
        })
      });
  },
  //输入
  bindInput(e){
    let name = e.currentTarget.dataset.name;
    this.data.formData[name] = e.detail.value
    this.setData({
      formData: this.data.formData
    })
  },
  //输入
  codeImgInput(e){
    this.setData({
      imgCode: e.detail.value
    })
  },
  submit(e){
    let user = e.detail.rawData;
    if (_this.data.imgCode == '' || _this.data.imgCode==null) {
      wx.showToast({ title: '请输入图形验证码' })
      return;
    }
    //验证验证码
    let res = _this.data.mcaptcha.validate(_this.data.imgCode);
    if (!res) {
      wx.showToast({ title: '图形验证码错误' })
      return;
    }
    if(_this.data.formData.phone_number.length != 11){
      wx.showToast({
        title: '请输入11位手机号',
        icon: 'none'
      })
    } else{
      wx.showLoading({
        title: '登录中',
        mask: true
      })
      wx.showToast({
        title: '登录成功',
        duration:1000,
        mask:true
      })
      wx.setStorage({
        key: 'phone',
        data: _this.data.formData.phone_number,
        success(){
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/index/index'
            });
          },1000)
        }
      })
    }

  },

})