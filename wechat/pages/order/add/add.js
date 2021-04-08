var dateTimePicker = require('../../../utils/dateTimePicker.js');
const app = getApp()
Page({
  data: {
    key: "4OUBZ-4ZWC3-BSX37-3M5TK-YXCDV-ZTB45",
    referer: "腾讯位置服务地图选点",
    address: "",
    locationName: "",
    order_type: 0,
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
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTimeArray: obj1.dateTimeArray,
      dateTime: obj1.dateTime
    });
  },
  sendData(e){
    var _this=this
    _this.setData({
      order_type: e.id,
    })
    let StoragegetAddressInfo = wx.getStorageSync("getAddressInfo")
    let StoragesetAddressInfo = wx.getStorageSync("setAddressInfo")
    _this.setData({
      getAddressInfo: StoragegetAddressInfo,
      setAddressInfo: StoragesetAddressInfo
    })
    
    const a= _this.data.getAddressInfo
    const b= _this.data.setAddressInfo
    console.log(a,b,'o')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
  }, 
  handleOpen1 (e) {
    this.setData({
      visible1: true,
      selectType: e.currentTarget.dataset.type,
    });
    // 判断选择的类型给选择的值
    if(e.currentTarget.dataset.type=="goodsInfo") {
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
    } else if(e.currentTarget.dataset.type=="goodsWeight") {
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
    console.log(e.currentTarget.dataset.type,'e')
  },
  
  handleCancel1 () {
    this.setData({
      visible1: false
    });
  },
  handleClickItem1 (e) {
    var _this=this
    let selectgoods=this.data.actions1[e.detail.index].name
    if(_this.data.selectType=="goodsInfo"){
      _this.setData({
        goodsType: selectgoods,
        visible1: false
      })
    }else if(_this.data.selectType=="goodsWeight"){
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
    if (!textVal.trim()) {
      // 不合法
      wx.showToast({
        title: '输入不合法',
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
            let url = JSON.parse(result.data).url;
            this.UpLoadImgs.push(url);
            // 所有的图片都上传完毕了才触发  
            if (i === chooseImgs.length - 1) {
              wx.hideLoading();
              console.log("把文本的内容和外网的图片数组 提交到后台中");
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
  }
})