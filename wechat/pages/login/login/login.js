const app = getApp();
import requestUrl from '../../../utils/util.js'
var Mcaptcha = require('../../../utils/mcaptcha.js');
let _this ;
Page({
  data: {
    formData:{
      phone_number: '',
      // code: ''
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
    app.getSettings()
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
      // 注册
      let userInfo=wx.getStorageSync('userInfo')
      let sex= userInfo.gender==1?0:1
      let params= {
        user_id: wx.getStorageSync('openId') ,//用户的唯一标识
        user_name: userInfo.nickName, //微信昵称
        address: userInfo.city, //用户注册的市
        user_type: 0,
        phone: _this.data.formData.phone_number,
        sex: sex
      }
      console.log(params,'params')
      requestUrl.Post(
        // 将用户信息传给后台数据库
        "/user/userAuth",params,
        res => {
          if(res.code==200){
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
          }else{
            wx.showToast({
              title: '登录失败',
              duration:1000,
              mask:true
            })
          }
        }
      )


    }

  },

})