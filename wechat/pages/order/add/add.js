const dateTimePicker = require('../../../utils/dateTimePicker.js');
const { formatTimeString, formatTime  } = require('../../../utils/util.js');
const { orderAddresFind,orderAdd, orderAddAddres, orderImg  } = require('../../../request/orderapi.js');
const app = getApp()

Page({
  data: {
    key: "4OUBZ-4ZWC3-BSX37-3M5TK-YXCDV-ZTB45",
    referer: "腾讯位置服务地图选点",
    address: "",
    locationName: "",
    order_type: 10,
    getAddressName: "",
    getAddressInfo: {
      // getAddressName:"",
      // getDetAddress: "",
      // address_iphone: "",
      // address_username: "",
    },
    setAddressName: "",
    setAddressInfo: {
      // setAddressName: "",
      // setDetAddress: "",
      // address_iphone: "",
      // address_username: "",
    },
    goodsType: "",
    goodsWeight: "",
    selectType: "",
    visible1: false,
    money: 0,
    actions1: [
      {
        id:1,
        name: '文件',
      },
      {
        id:2,
        name: '食品'
      },
      {
        id:3,
        name: '其他',
      }
    ],
    date: '2021-5-11',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    startYear: 2000,
    endYear: 2050,
    // 被选中的图片路径 数组
    chooseImgs: [],
    // 文本域的内容
    textVal: ""
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    _this.sendData(options)
    let dateTimeObjet = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    let lastArray = dateTimeObjet.dateTimeArray.pop();
    let lastTime = dateTimeObjet.dateTime.pop();

    this.setData({
      dateTimeArray: dateTimeObjet.dateTimeArray,
      dateTime: dateTimeObjet.dateTime
    });
  },
  sendData(e){
    var _this=this
    let orderType=wx.getStorageSync("order_type")
    // 优化逻辑，先判断是否主页进去，在判断缓存数据
    console.log(orderType,e.id , _this.data.order_type,'er')
    if( e.id  ) {
      _this.setData({
        order_type: e.id,
      })
      wx.setStorageSync("order_type", e.id)
    }else{
      if( orderType ){
        _this.setData({
          order_type: orderType,
        })
      }
    }
  },
  onShow: function (options) {
    var _this = this
    let StoragegetAddressInfo = wx.getStorageSync("getAddressInfo")
    let StoragesetAddressInfo = wx.getStorageSync("setAddressInfo")
    _this.setData({
      getAddressInfo: StoragegetAddressInfo,
      setAddressInfo: StoragesetAddressInfo
    })
  }, 
  handleOpen1 (e) {
    this.setData({
      visible1: true,
      selectType: e.currentTarget.dataset.type,
    });
    // 判断选择的类型给选择的值
    if(this.data.selectType=="goodsType") {
      this.setData({
        actions1: [
          {
            id:1,
            name: '文件',
          },
          {
            id:2,
            name: '食品'
          },
          {
            id:3,
            name: '其他',
          }
        ],
      });
    } else if(this.data.selectType=="goodsWeight") {
      this.setData({
        actions1: [
          {
            id:1,
            name: '5kg以下',
          },
          {
            id:2,
            name: '5kg-20kg'
          },
          {
            id:3,
            name: '20kg以上',
          }
        ],
      });
    }
  },
  
  handleCancel1 () {
    this.setData({
      visible1: false
    });
  },
  handleClickItem1 (e) {
    var _this=this
    let selectgoods=this.data.actions1[e.detail.index].name
    if(_this.data.selectType=="goodsType"){
      _this.setData({
        goodsType: selectgoods,
        visible1: false
      })
    }else if(_this.data.selectType=="goodsWeight"){
      // 计算价格
      if (e.detail.index==0) {
        _this.setData({
          money: 2
        })
      }else if (e.detail.index==1) {
        _this.setData({
          money: 3
        })
      }else if (e.detail.index==2) {
        _this.setData({
          money: 4
        })
      }
      _this.setData({
        goodsWeight: selectgoods,
        visible1: false
      })
    }
  },
  changeDateTime(e) {
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({ 
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  // 点击 “+” 选择图片
  handleChooseImg() {
    // 2 调用小程序内置的选择图片api
    wx.chooseImage({
      // 同时选中的图片的数量
      count: 9,
      // 图片的格式  原图  压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源  相册  照相机
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          // 图片数组 进行拼接 
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });
  },
  // 点击 自定义图片组件
  handleRemoveImg(e) {
    // 2 获取被点击的组件的索引
    const { index } = e.currentTarget.dataset;
    // 3 获取data中的图片数组
    let { chooseImgs } = this.data;
    // 4 删除元素
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },
  // 文本域的输入的事件
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  // 外网的图片的路径数组
  UpLoadImgs: [],
  // 提交按钮的点击
  handleFormSubmit() {
    const { textVal, chooseImgs } = this.data;
    
    let openId = wx.getStorageSync("openId")
    let order_type = wx.getStorageSync("order_type")
    let userInfo = wx.getStorageSync("userInfo") //改姓名
    let newDate =new Date()
    let DateStr = formatTimeString(new Date());
    let orderId =  DateStr +'' + Math.floor(Math.random()*1000)
    let getAddressInfo = this.data.getAddressInfo
    let setAddressInfo = this.data.setAddressInfo
    if (order_type==1) {
      this.setData({
        money: 1
      })
    }
    // 验证输入
    if (!userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        mask: true
      });
      return;
    }
    if (!getAddressInfo || !setAddressInfo) {
      wx.showToast({
        title: '请选择地址',
        icon: 'none',
        mask: true
      });
      return;
    }
    if (order_type==0 && (!this.data.goodsWeight || !this.data.goodsType)) {
      wx.showToast({
        title: '请选择快递信息',
        icon: 'none',
        mask: true
      });
      return;
    }
    // 显示正在等待的图片
    wx.showLoading({
      title: "正在上传中",
      mask: true
    });
    // 判断有没有需要上传的图片数组
    if (chooseImgs.length != 0) {
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          // 图片要上传到哪里
          url: app.globalData.API_ROOT + '/uploadFile',
          // 被上传的文件的路径
          filePath: v,
          // 上传的文件的名称 后台来获取文件  file
          name: "file",
          // 顺带的文本信息
          formData: {},
          success: (result) => {
            console.log(result);
            let url = JSON.parse(result.data).imgUrl;
            this.UpLoadImgs.push(url);
            // 所有的图片都上传完毕了才触发  
            if (i === chooseImgs.length - 1) {
              wx.hideLoading();
              this.setData({
                textVal: "",
                chooseImgs: []
              })
            }
          }
        });
      })
    }else{
      wx.hideLoading();
      console.log("只是提交了文本");
    }
    // 提交
    let params={
      order_body: textVal,
      user_id: openId,
      name: setAddressInfo.address_username,
      order_address: setAddressInfo.setAddressName,
      order_id: orderId,
      order_state: 0,
      order_weight: this.data.goodsWeight,
      goods_type: this.data.goodsType,
      start_date: formatTime(newDate),
      money: this.data.money,
      order_type: order_type
    }
    orderAdd(params).then(res => {
      console.log(res.message)
      // 订单添加成功后才添加地址
      let params2={
        order_adr_id:  orderId,
        get_address_det: getAddressInfo.getDetAddress,
        get_address_name: getAddressInfo.getAddressName,
        get_address_username: getAddressInfo.address_username,
        get_address_iphone: getAddressInfo.address_iphone,
        set_address_det: setAddressInfo.setDetAddress,
        set_address_name: setAddressInfo.setAddressName,
        set_address_username: setAddressInfo.address_username,
        set_address_iphone: setAddressInfo.address_iphone,
      }
      orderAddAddres(params2).then( res => {
        console.log(res.message)
        // 订单地址添加成功后添加图片
        let fileListStr = "";
        this.UpLoadImgs.forEach((item) => {
          fileListStr += "," + item;
        });
        console.log(this.UpLoadImgs)
        let params3 = {
          order_id: orderId,
          order_img: fileListStr
        }
        console.log(params3,'3')
        orderImg(params3).then(res => {
          console.log(res.message)
        })
      })
    })
    // 清除缓存
    wx.setStorageSync('getAddressInfo', '')
    wx.setStorageSync('setAddressInfo','')
    wx.setStorageSync('orderRequestType', '')
    wx.setStorageSync('order_type', '')
    setTimeout(function(){
      wx.navigateTo({
        url: '/pages/pay/pay?id=' + orderId
      });
    },1000)
  }
})