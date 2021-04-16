
const { oftenAddresFindId, oftenAddresFindInfoId } = require('../../../request/addressapi.js');
const app = getApp()

Page({

  data: {
    formdata: null,
    orderRequestType: '',
    getAddressInfo:{},
    setAddressInfo:{},
  },
  onLoad: function (options) {
    this.sendData(options)
  },
  onShow: function () {
    this.getList()
  },
  sendData(e){
    var _this=this
    _this.setData({
      orderRequestType: e.type
    })
  },
  getList() {
    var _this=this
    const id=wx.getStorageSync("openId");
    oftenAddresFindId(id).then(res => {
      let data = res.data
      _this.setData({
        formdata: data
      })
    })
  },
  addAddress(e){
    let nid=e.currentTarget.dataset.nid
    console.log(nid,'e')
    oftenAddresFindInfoId({nid: nid}).then(res => {
      if(res.code==200){
        let params = res.data[0]
        if(this.data.orderRequestType=='get'){
          this.setData({
            getAddressInfo: {
              getAddressName: params.address_name,
              getDetAddress: params.address_det,
              address_iphone: params.address_iphone,
              address_username: params.address_username,
            }
          })
          wx.setStorageSync('getAddressInfo', this.data.getAddressInfo)
          wx.navigateBack({
            delta: 1
          })
        }else if(this.data.orderRequestType=='set'){
          this.setData({
            setAddressInfo: {
              setAddressName: params.address_name,
              setDetAddress: params.address_det,
              address_iphone: params.address_iphone,
              address_username: params.address_username,
            }
          })
          wx.setStorageSync('setAddressInfo', this.data.setAddressInfo)
          wx.navigateBack({
            delta: 1
          })
        }
      }
      
    })
  },
})