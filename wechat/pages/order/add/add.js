
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: "4OUBZ-4ZWC3-BSX37-3M5TK-YXCDV-ZTB45",
    referer: "腾讯位置服务地图选点",
    address: "",
    locationName: "",
    order_type: 0,
    getAddressName: "",
    getAddressInfo: {
      // getAddressName:"",
      // getDetAddress: "",
      // address_iphone: "",
      // address_username: "",
    },
    setAddressName: "",
    setAddressInfo: {
      // setAddressName: "",
      // setDetAddress: "",
      // address_iphone: "",
      // address_username: "",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    _this.sendData(options)
  },
  sendData(e){
    var _this=this
    _this.setData({
      order_type: e.id,
    })
    let StoragegetAddressInfo = wx.getStorageSync("getAddressInfo")
    let StoragesetAddressInfo = wx.getStorageSync("setAddressInfo")
    _this.setData({
      getAddressInfo: StoragegetAddressInfo,
      setAddressInfo: StoragesetAddressInfo
    })
    
    const a= _this.data.getAddressInfo
    const b= _this.data.setAddressInfo
    console.log(a,b,'o')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
  },
  onUnload () {

  },
  
})