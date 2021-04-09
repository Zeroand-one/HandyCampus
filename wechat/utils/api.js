const baseURL = 'http://127.0.0.1:3030/v1/api';
//在这里添加我们的专业域名
const subDomain = 'wechat';
/*
 *二次封装wx.request
 *
 */
module.exports = {
  /**
   * 二次封装wx.request
   * {String }url:请求的接口地址
   * {String} method:请求方式 GET,POST....
   * {Object} data:要传递的参数
   * { boolean }isSubDomain:表示是否添加二级子域名 true代表添加, false代表不添加
   */
  request: (url, method, data, isSubDomain) => {
    //这里使用ES6的写法拼接的字符串
    let _url = `${baseURL}/${isSubDomain ? subDomain: '' }${url}`;
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '正在加载',
      });
      wx.request({
        url: _url,
        data: data,
        method: method,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: (res) => {
            console.log('从接口获取到的数据', res);
            let {
              code
            } = res.data;
            if (code === 200) {
              resolve(res.data);
              wx.hideLoading();
            } else {
              wx.showToast({
                title: '数据请求错误',
              })
            }
          },
          fail() {
            reject('接口有误，请检查')
          }
      });
    });
  },
}