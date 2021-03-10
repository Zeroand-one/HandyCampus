// 引入SDK核心类，js文件根据自己业务，位置可自行放置
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const chooseLocation = requirePlugin('chooseLocation');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    locationName: "",
    order_type: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.Data(options.id)

  },
  Data(id){
    var _this=this
    _this.setData({
      order_type:id
    })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
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
      wx.navigateTo({
        url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
      });
  }
})