const app = getApp()
let call = require('../../../utils/util.js')
import moment from "moment";
// pages/news/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:null,    //列表高度
    nav:[],     //次导航数据
    id:null,       //导航当前选择项
    page:1,       //页数
    pagesize:5,   //每页数据
    footer:true,  //数据为空、有数据（false）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = app.globalData.ClassId
    console.log(app.globalData.ClassId)
    this.Nav()
  },
  // 次导航数据
  Nav(){
    call.Get('/wechat/ClassFind',
    res => {
      if(res.code == 200){
        let that = this
        let obj=wx.createSelectorQuery();
        let id = null
        let nav = res.data
        obj.selectAll('.navd').boundingClientRect(function (rect) {
          that.setData({
            height: wx.getSystemInfoSync().windowHeight - rect[0].height
          })
        })
        obj.exec() ;
        if(!app.globalData.ClassId && res.data.length > 0){
          id = res.data[0].id
          this.List(res.data[0].id)
        }else{
          this.List(app.globalData.ClassId)
          id = app.globalData.ClassId
        }
        this.setData({nav,id})
      }
    })
  },
  // 次导航点击
  NavClick(e){
    let id = e.currentTarget.dataset.id
    this.setData({id,page:1})
    this.List(id)
  },
  // 数据列表
  List(data){
    let id = null
    if(data){
      id = data
    }else{
      id = this.data.id
    }
    let page = this.data.page
    let pagesize = this.data.pagesize
    call.Post('/wechat/NavList',{page,pagesize,id},
    res => {
      if(res.code == 200){
        let footer = true
        if(page == 1){
          this.setData({
            list:res.data
          })
        }else{
          this.setData({
            list:this.data.list.concat(res.data)
          })
        }
        res.data.forEach(item => {
          item.newtime = moment(item.newtime).format('YYYY-MM-DD HH:mm:ss')
        })
        if(res.data.length == pagesize){
          page = page+1
        }else{
          footer = false
        }
        this.setData({
          page,
          footer
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({page:1})
    this.List()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.footer){
      this.List()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})