
const app = getApp()
// let requireUrl = require('../../utils/util.js')
const { formatTimeString, formatTime  } = require('../../utils/util.js');
const { indexBannerFind, orderOpenListFind  } = require('../../request/indexapi.js');
const { userAuthFind  } = require('../../request/myapi.js');
import moment from "moment";

Page({

  data: {
    API_ROOT: app.globalData.API_ROOT,
    background:[], //轮播图
    list:[
      {
        id:0,
        img:"../../images/order_type/type0.png",
        title:"取快递",
        info:"代取校园附近快递"
      },
      {
        id:1,
        img:"../../images/order_type/type1.png",
        title:"取外卖",
        info:"代取校园外卖"
      },
      {
        id:2,
        img:"../../images/order_type/type2.png",
        title:"代买",
        info:"代买美食商品"
      },
      {
        id:3,
        img:"../../images/order_type/type3.png",
        title:"代赠",
        info:"代赠文件鲜花"
      },
      {
        id:4,
        img:"../../images/order_type/type4.png",
        title:"其他",
        info:"其他服务"
      }
    ],      //列表数据
    page:1,       //页数
    pagesize:5,   //每页数据
    Search:"",    //搜索内容
    footer:true,  //数据为空、有数据（false）
    userState: 1,
    formdata: {}
  },
  onLoad:async function (options) {
    this.getList()
    this.getUserInfoType()
    let userState = wx.getStorageSync("userState")
    this.setData({
      userState
    })
    this.getOrderList()
  },
  getUserInfoType(){
    // 根据用户来确定是否接单状态 1--接单，0--用户
    let id = wx.getStorageSync("openId")
    let userState = this.data.userState
    userAuthFind(id).then(res => {
      let data =res.data[0]
      if(data.user_type=='1' && userState=='1'){
        wx.setStorageSync("userState", 1)
        this.setData({
          userState
        })
        this.getOrderList()
      }
    })
  },
  // 获取banner列表
  getList() {
    let _this = this
    indexBannerFind().then(res => {
      if(res.code==200) {
        console.log(res.data)
        let imglist = res.data[0].img;
        let file_list = [];
        let backgroundList=[]
        if (imglist) {
          file_list = imglist.substring(1).split(",");
          let item = {};
          file_list.forEach((i) => {
            item = {};
            if (i != "") {
              item.id = i;
              item.title='1'
              item.url = _this.data.API_ROOT + "/banner/" + i;
            }
            backgroundList.push(item);
          });
          _this.setData({
            background:backgroundList
          })
        } else {
          this.fileList = [];
        }
      }
    })
  },
  // 骑手获取列表
  getOrderList(){
    orderOpenListFind().then(res => {
      let formdata=res.data
      formdata.forEach(e => {
        e.start_date=formatTime(new Date(e.start_date))
      })
      this.setData({
        formdata
      })
    })
  },
  // 骑手查看订单
  clickGoto(e){
    let id = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/courier/info/info?id='+id
    })
  },
  onPullDownRefresh: function () {
    // 标题栏显示刷新图标，转圈圈
    wx.showNavigationBarLoading()
    // 请求最新数据
    this.getOrderList(true);
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
      this.getOrderList();
    }, 300);
  },
})