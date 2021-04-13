const { formatTimeString, formatTime  } = require('../../../utils/util.js');
const { orderListFind, orderListTypeFind } = require('../../../request/orderapi.js');
const app = getApp()
Page({

  data: {
    formdata:{}
  },
  onLoad: function (options) {
    this.getList(options)
  },
  onShow: function () {

  },
  getList(e) {
    let id = wx.getStorageSync("openId")
    let params={id:id}
    if(e.type==1){
      orderListFind({id:id}).then(res => {
        let data = res.data
        data.forEach(e => {
          e.start_date=formatTime(new Date(e.start_date))
        })
        this.setData({
          formdata: data
        })
      })
    }else if(e.type==2){
      params.type= e.type
      orderListTypeFind(params).then(res => {     
        let data = res.data
        data.forEach(e => {
          e.start_date=formatTime(new Date(e.start_date))
        })
        this.setData({
          formdata: data
        })
        console.log(res.data)
      })
    }else if(e.type==3){
      params.type= e.type
      orderListTypeFind(params).then(res => {     
        let data = res.data
        data.forEach(e => {
          e.start_date=formatTime(new Date(e.start_date))
        })
        this.setData({
          formdata: data
        })
        console.log(res.data)
      })
    }

  },
  clickGoto(e){
    let id = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/order/info/info?id='+id
    })
  },
  
  onPullDownRefresh: function () {
    // 标题栏显示刷新图标，转圈圈
    wx.showNavigationBarLoading()
    // 请求最新数据
    this.getList(true);
    setTimeout(() => {
      // 标题栏隐藏刷新转圈圈图标
      wx.hideNavigationBarLoading()
    }, 1000);
  },

/**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    setTimeout(() => {
      this.getList();
    }, 300);
  },
})