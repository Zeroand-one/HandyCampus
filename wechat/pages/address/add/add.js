const chooseLocation = requirePlugin('chooseLocation');
const app = getApp()
let call = require('../../../utils/util.js')
Page({
  data: {
	address: "",
	locationName: ""
  },
  onShow: function () {
	// 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
	// 如果点击确认选点按钮，则返回选点结果对象，否则返回null
	const location = chooseLocation.getLocation();
	if(location){
		this.setData({
			address: location.address?location.address : "",
			locationName: location.name?location.name : ""
		});
		const pages = getCurrentPages();
		const currPage = pages[pages.length - 1];   //当前页面
		const prevPage = pages[pages.length - 2];  //上一个页面
		//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
		//不需要页面更新
		prevPage.setData({
			getAddressName: location.name?location.name : "",
			getDetAddress: location.address?location.address : "",
		})
	}
  },
    //显示地图
    showMap() {
      //使用在腾讯位置服务申请的key（必填）
      const key = "4OUBZ-4ZWC3-BSX37-3M5TK-YXCDV-ZTB45"; 
      //调用插件的app的名称（必填）
      const referer = "腾讯位置服务地图选点"; 
      wx.navigateTo({
        url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
      });
    },
    onUnload () {
      // 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
      chooseLocation.setLocation(null);
    },
    handleClickConfirm(){
      wx.redirectTo({
        url: '/pages/address/info/info?getAddressName='+this.data.locationName+'&getDetAddress='+this.data.address
      });
    },
    onLoad: function (options) {
      let id = app.globalData.ClassId
      console.log(app.globalData.ClassId)
      this.oftenAddresFind(22345234)
    },
    oftenAddresFind(id) {
      call.Get(`/oftenAddresFind?id=${id}`,
      res => {
        if(res.code == 200){
          // res.data.newtime = moment(res.data.newtime).format('YYYY-MM-DD HH:mm:ss')
          // this.data.Class.forEach(item => {
          // if(res.data.class == item.id){
          //     res.data.nav = item.name
          // }
          // })
          // this.setData({
          //     detail:res.data
          // })
          console.log(res.data)
        }
      })
    }
});