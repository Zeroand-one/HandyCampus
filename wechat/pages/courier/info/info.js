const { formatTimeString, formatTime  } = require('../../../utils/util.js');
const { orderInfoFind } = require('../../../request/orderapi.js');
const { userAuthFind  } = require('../../../request/myapi.js');
const { courierAddOrder  } = require('../../../request/courierapi.js');
const app = getApp()
Page({

  data: {
    fordata: {},
    imgList: [],
    API_ROOT: ''
  },
  onLoad: function (options) {
    var _this=this
    _this.sendData(options)
    _this.setData({
      API_ROOT: app.globalData.API_ROOT
    })
  },
  onShow: function () {

  },
  sendData(e){
    console.log(e)
    orderInfoFind(e).then(res => {
      let getData = res.data[0]
      for(let i in getData){
        if(i=='order_type'){
          switch (getData[i]) {
            case 0 :
            getData[i]='取快递'
              break;
            case 1 :
              getData[i]='取外卖'
              break;
            case 2 :
              getData[i]='代买'
              break;
            case 3 :
              getData[i]='代赠'
              break;
            default :
              getData[i]='其他'
          }
        }else if(i=='order_state'){
          switch (getData[i]) {
            case 0 :
            getData[i]='未发布'
              break;
            case 1 :
              getData[i]='草稿箱'
              break;
            case 2 :
              getData[i]='已发布'
              break;
            case 3 :
              getData[i]='骑手已接'
              break;
            case 4 :
              getData[i]='转让'
              break;
            default :
              getData[i]='完成'
          }
        }else if(!getData[i]){
          getData[i]='暂无'
        }else{
          if(i=='start_date' || i=='open_date' || i=='receive_date' || i=='transfer_date' || i=='end_date' ){
            getData[i]=formatTime(new Date(getData[i]))
          } 
        }
      }
      let img=[]
      let list=getData.order_img.split(',')
      list.splice(0,1)
      for (const i in list) {
        let item={
          id: i,
          url: this.data.API_ROOT+'/'+list[i]
        }
        img.push(item)
      }
      this.setData({
        fordata: getData,
        imgList: img
      })
    })
  },
  submit(){
    let id = wx.getStorageSync("openId")
    userAuthFind(id).then(res => {
      let data =res.data[0]
      let params={
        order_id: this.data.fordata.order_id,
        receive_date: formatTime(new Date()),
        courier_name: data.name,
        courier_id: data.user_id
      }
      courierAddOrder(params).then(res => {
        if(res.code==200){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      })
    })
  },
  //预览图片
  previewImg: function(e){
    var _this = this;
    let id = e.currentTarget.dataset.id;
    let url = e.currentTarget.dataset.url;
    let previewImgArr = [];
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    let data = _this.data.imgList;
    for (const i in data) {
      previewImgArr.push(data[i].url);
    }
    console.log(previewImgArr)
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: previewImgArr // 需要预览的图片http链接列表
    })
  }
})