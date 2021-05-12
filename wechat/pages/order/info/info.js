const { formatTimeString, formatTime  } = require('../../../utils/util.js');
const { orderInfoFind, orderClientEstimate, orderFinish, orderCourierBack } = require('../../../request/orderapi.js');
const app = getApp()
Page({

  data: {
    fordata: {},
    starIndex: 0,
    imgList: [],
    API_ROOT: '',
    userState: 1,
    feedbackValue: '',
    courierBackValue: ''
  },
  onLoad: function (options) {
    var _this=this
    _this.sendData(options)
    _this.setData({
      API_ROOT: app.globalData.API_ROOT
    })
  },
  onShow: function () {
    let userState = wx.getStorageSync("userState")
    this.setData({
      userState
    })
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
            getData[i]='未支付'
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
      if(getData.user_estimate){
        this.setData({
          starIndex: getData.estimate_star,
          feedbackValue: getData.user_estimate
        })
      }
      if(getData.courier_back){
        this.setData({
          courierBackValue: getData.courier_back,
        })
      }
      // 图片处理
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
  onStarChange(e){
    const index = e.detail.index;
    this.setData({
      'starIndex' : index
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
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: previewImgArr // 需要预览的图片http链接列表
    })
  },
  feedbackChange(e){
    const detail = e.detail;
    this.setData({
      feedbackValue: detail.value,
    })
  },
  feedback(){
    let order_id = this.data.fordata.order_id
    let params={
      order_id,
      user_estimate: this.data.feedbackValue,
      estimate_star: this.data.starIndex
    }
    console.log(params)
    orderClientEstimate(params).then(res => {
      if(res.code==200){
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 2000
        })
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  },
  // 支付
  submitPay(){
    let params={
      order_id: this.data.fordata.order_id,
      open_date: formatTime(new Date()),
      order_state: 2,
    }
    orderPay(params).then(res => {
      if(res.code==200){
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  },
  // 骑手点击完成
  submitFinish(){
    let params={
      order_id: this.data.fordata.order_id,
      end_date: formatTime(new Date()),
      order_state: 5,
    }
    orderFinish(params).then(res => {
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
  },
  // 提交反馈
  courierBackChange(e){
    const detail = e.detail;
    this.setData({
      courierBackValue: detail.value,
    })
  },
  // 提交反馈完成
  courierBackBtn(){
    let params={
      order_id: this.data.fordata.order_id,
      courier_back: this.data.courierBackValue,
    }
    orderCourierBack(params).then(res => {
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
  },
})