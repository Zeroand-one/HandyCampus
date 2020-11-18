
const app = getApp()
let call = require('../../utils/util.js')
import moment from "moment";
// pages/news/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background:[], //轮播图
    list:[],      //列表数据
    page:1,       //页数
    pagesize:5,   //每页数据
    Search:"",    //搜索内容
    footer:true,  //数据为空、有数据（false）
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    this.Banner()
    this.List()
  },
  // 轮播图请求
  Banner(){
    call.Get('/wechat/Banner',
    res => {
      if(res.code == 200){
        this.setData({background:res.data})
      }
    })
  },
  // 数据列表
  List(){
    let page = this.data.page
    let pagesize = this.data.pagesize
    call.Post('/wechat/List',{page,pagesize},
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
  // 搜索内容
  bindinput(e){
    this.setData({
      Search:e.detail.value
    })
  },
  // 搜索跳转
  search(){
    let Search = this.data.Search
    wx.navigateTo({
      url: `/pages/search/search?title=${Search}`,
    })
  },
  NavClass(e){
    app.globalData.ClassId = e.target.dataset.id
    wx.switchTab({
      url: `/pages/news/list/list`,
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