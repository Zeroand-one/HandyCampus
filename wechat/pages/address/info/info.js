const { $Message } = require('../../../miniprogram_npm/iview-weapp/base/index');

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
    setAddressInfo:{}
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
  // 点击确定时间 ******重复进点击会丢失值
  handleClickConfirm: function(e) {
    var _this=this
    if (_this.data.orderRequestType=="get") {
      _this.setData({
        getAddressInfo: {
          getAddressName: _this.data.getAddressName,
          getDetAddress: _this.data.getDetAddress,
          address_iphone: _this.data.address_iphone,
          address_username: _this.data.address_username,
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
          setAddressName: _this.data.getAddressName,
          setDetAddress: _this.data.getDetAddress,
          address_iphone: _this.data.address_iphone,
          address_username: _this.data.address_username,
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
      // $Message({
      //     content: '这是一条普通提醒'
      // });
    }
    
    
  },
  onShow: function () {

  },

  onUnload: function () {

  },

})