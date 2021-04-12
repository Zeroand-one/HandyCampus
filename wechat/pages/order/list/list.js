const { formatTimeString, formatTime  } = require('../../../utils/util.js');
const { orderListFind } = require('../../../request/orderapi.js');
const app = getApp()
Page({

  data: {
    formdata:{}
  },
  onLoad: function (options) {
    this.getList()
  },
  onShow: function () {

  },
  getList() {
    let id = wx.getStorageSync("openId")
    orderListFind({id:id}).then(res => {
      let data = res.data
      data.forEach(e => {
        e.start_date=formatTime(new Date(e.start_date))
      })
      this.setData({
        formdata: data
      })
      console.log(res.data)
    })
  },
  clickGoto(e){
    let id = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/order/info/info?id='+id
    })
  }
})