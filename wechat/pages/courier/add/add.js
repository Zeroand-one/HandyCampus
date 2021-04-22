const { formatTimeString, formatTime  } = require('../../../utils/util.js');
const { userAuthFind,userAuthUpdata  } = require('../../../request/myapi.js');
const { userCourierAdd  } = require('../../../request/courierapi.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: '',
    name: '',
    birthday: null,
    sex: 0,
    phone: '',
    user_type: '',
    studenid: '',
    address: '',
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
    this.getlist()
  },
  getlist(){
    let id = wx.getStorageSync("openId")
    userAuthFind(id).then(res => {
      let data = res.data[0]
      if(data.birthday="Invalid date"){
        data.birthday=null
      }
      if(data.user_type==0){
        data.user_type='用户'
      }else{
        data.user_type=data.user_type==1?'工作员':'申请中'
      }
      this.setData({
        user_type: data.user_type,
        phone: data.phone,
        user_name: data.user_name,
        name: data.name,
        birthday: data.birthday,
        sex: data.sex==0?'男':'女',
        studenid: data.studenid,
        address: data.address,
        request_date: formatTime(new Date(data.request_date))
      })
      console.log(res.data,'da')
    })
  },
  bindDateChange: function(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  handleSexChange({ detail = {} }) {
    this.setData({
      sex: detail.value
    });
  },
  formSubmit(e) {
    let id = wx.getStorageSync("openId")
    let params = e.detail.value
    params.birthday=this.data.birthday
    params.sex=this.data.sex=='男'?0:1
    params.user_id = id
    params.user_type=2
    console.log(params,'pa')
    
    userCourierAdd(params).then( res => {
      console.log(res.message,'e')
      if(res.code==200){
        wx.showToast({
          title: '申请成功',
          icon: 'success',
          duration: 1000
        })
        this.getlist()
      }
    })
  },
})