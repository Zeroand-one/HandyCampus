const { $Message } = require('../../../miniprogram_npm/iview-weapp/base/index');
const chooseLocation = requirePlugin('chooseLocation');
const { formatTimeString, formatTime  } = require('../../../utils/util.js');
const { oftenAddresAdd } = require('../../../request/addressapi.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    orderRequestType:"",
    getAddressName:"",
    getDetAddress:"",
    address_iphone:"",
    address_username:"",
    getAddressInfo:{},
    setAddressInfo:{},
    locationName:"",
    address:"",
    addressSchool:"",
    address_iphone:"",
    address_username:"",
    switchSchool: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.sendData(options)
    
  },
  sendData(e){
    var _this=this
    let StoragegetAddressInfo = wx.getStorageSync("getAddressInfo")
    let StoragesetAddressInfo = wx.getStorageSync("setAddressInfo")
    _this.setData({
      getAddressInfo: StoragegetAddressInfo,
      setAddressInfo: StoragesetAddressInfo
    })
    if(e.type ){
      _this.setData({
        orderRequestType: e.type,
      })
      try {
        wx.setStorageSync('orderRequestType', _this.data.orderRequestType)
      } catch (e) {
      }
    }else if(!_this.data.orderRequestType){
      wx.getStorage({
        key: 'orderRequestType',
        success: function (res) {
          _this.setData({
            orderRequestType: res.data,
          })
        }
      })
    }
    if(_this.data.orderRequestType=='set'){
      _this.setData({
        getAddressName: _this.data.setAddressInfo.setAddressName,
        getDetAddress: _this.data.setAddressInfo.setDetAddress,
        address_iphone: _this.data.setAddressInfo.address_iphone,
        address_username: _this.data.setAddressInfo.address_username,
      })
    }else if(_this.data.orderRequestType=='get'){
      _this.setData({
        getAddressName: _this.data.getAddressInfo.getAddressName,
        getDetAddress: _this.data.getAddressInfo.getDetAddress,
        address_iphone: _this.data.getAddressInfo.address_iphone,
        address_username: _this.data.getAddressInfo.address_username,
      })
      console.log(_this.data.getAddressInfo)
      console.log(_this.data.getDetAddress)
    }
    // 点击bug
    _this.setData({
      title: e.type=="get"?"开始地址":"目的地",
      getAddressName: e.getAddressName,
      getDetAddress: e.getDetAddress,
    })
    
  },
  // 详细地址
  bindgetDetAddress: function(e){
    var _this=this
    _this.setData({
      getDetAddress: e.detail.detail.value,
    })
    console.log(e)
  },
  bindAddressIphone: function(e){
    var _this=this
    _this.setData({
      address_iphone: e.detail.detail.value,
    })
  },
  bindAddressUsername: function(e){
    var _this=this
    _this.setData({
      address_username: e.detail.detail.value,
    })
    console.log(this.data)
  },
  formSubmit(e){
    // 对输入的值验证
    let data = e.detail.value
    let params = {
      address_username: data.address_username,
      address_iphone: data.address_iphone,
    }
    if(data.address_username && data.address_iphone && data.addressSchool) {
      params.address_det = '校园内',
      params.address_name = data.addressSchool
    }else if(data.address_username && data.address_iphone &&data.getDetAddress && this.data.getAddressName){
      params.address_det = data.getDetAddress,
      params.address_name = this.data.getAddressName
    }else {
      wx.showToast({
        title: '填写必要信息',
        icon: 'none',
        duration: 2000
      })
    }
    console.log(params)
    var _this=this
    if (_this.data.orderRequestType=="get") {
      _this.setData({
        getAddressInfo: {
          getAddressName: params.address_name,
          getDetAddress: params.address_det,
          address_iphone: params.address_iphone,
          address_username: params.address_username,
        }
      })
      try {
        wx.setStorageSync('getAddressInfo', _this.data.getAddressInfo)
      } catch (e) {
      }
      wx.redirectTo({
        url: '/pages/order/add/add'
      });
    }else if (_this.data.orderRequestType=="set") {
      _this.setData({
        setAddressInfo: {
          setAddressName: params.address_name,
          setDetAddress: params.address_det,
          address_iphone: params.address_iphone,
          address_username: params.address_username,
        }
      })
      try {
        wx.setStorageSync('setAddressInfo', _this.data.setAddressInfo)
      } catch (e) {
      }
      wx.redirectTo({
        url: '/pages/order/add/add'
      });
    }else {
      console.log(1)
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
        getDetAddress: "",
        getAddressName: ""
      })
    }else{
      this.setData({
        addressSchool: ""
      })
    }
  },
  onShow: function () {
    // 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
    // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    const location = chooseLocation.getLocation();
    if(location){
      this.setData({
        getDetAddress: location.address?location.address : "",
        getAddressName: location.name?location.name : ""
      });
    }
  },

  onUnload: function () {

  },

})