const { formatTimeString, formatTime  } = require('../../../utils/util.js');
const { oftenAddresFindId } = require('../../../request/addressapi.js');
const app = getApp()

Page({

  data: {
    formdata: null,
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
    this.getList()
  },
  getList() {
    var _this=this
    const id=wx.getStorageSync("openId");
    oftenAddresFindId(id).then(res => {
      let data = res.data
      _this.setData({
        formdata: data
      })
      console.log(data)
    })
  },
  toAddAdress() {
    wx.navigateTo({
      url: '/pages/address/addlist/addlist',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },
})