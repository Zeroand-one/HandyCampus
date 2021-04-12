const chooseLocation = requirePlugin('chooseLocation');
const { formatTimeString, formatTime  } = require('../../../utils/util.js');
const { oftenAddresAdd } = require('../../../request/addressapi.js');
const app = getApp()

Page({

  data: {
    locationName:"",
    address:"",
    addressSchool:"",
    address_iphone:"",
    address_username:"",
    switchSchool: false
  },
  onLoad: function (options) {

  },
  onShow: function () {
    // 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
    // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    const location = chooseLocation.getLocation();
    if(location){
      this.setData({
        address: location.address?location.address : "",
        locationName: location.name?location.name : ""
      });
    }
  },
  //显示地图
  showMap() {
    //使用在腾讯位置服务申请的key（必填）
    const key = "4OUBZ-4ZWC3-BSX37-3M5TK-YXCDV-ZTB45"; 
    //调用插件的app的名称（必填）
    const referer = "腾讯位置服务地图选点"; 
    let switchSchool = this.data.switchSchool
    if(switchSchool){
      wx.showToast({
        title: '无法定位，请填校园地址',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
      });
    }
  },
  switchSchoolChange(e){
    const detail = e.detail;
    this.setData({
      switchSchool: detail.value,
    })
    let switchSchool = this.data.switchSchool
    if(switchSchool){
      this.setData({
        address: "",
        locationName: ""
      })
    }else{
      this.setData({
        addressSchool: ""
      })
    }
  },
  formSubmit(e){
    let id = wx.getStorageSync("openId")
    let data = e.detail.value
    let params = {
      user_id: id,
      address_username: data.address_username,
      address_iphone: data.address_iphone,
    }
    if(data.address_username && data.address_iphone && data.addressSchool) {
      params.address_det = '校园内',
      params.address_name = data.addressSchool
      oftenAddresAdd(params).then(res => {
        console.log(res.message)
        wx.showToast({
          title: res.message,
          icon: 'success',
          duration: 2000
        })
        // wx.redirectTo({
        //   url: '/pages/address/list/list'
        // })
        wx.navigateBack({
          delta: 1
        })
      })
    }else if(data.address_username && data.address_iphone &&data.address && this.data.locationName){
      params.address_det = data.address,
      params.address_name = this.data.locationName
      oftenAddresAdd(params).then(res => {
        console.log(res.message)
        wx.showToast({
          title: res.message,
          icon: 'success',
          duration: 2000
        })
        // wx.redirectTo({
        //   url: '/pages/address/list/list'
        // })
        wx.navigateBack({
          delta: 1
        })
      })
    }else {
      wx.showToast({
        title: '填写必要信息',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onUnload () {
    // 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
    chooseLocation.setLocation(null);
  },
})