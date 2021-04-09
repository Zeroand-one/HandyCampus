var app = getApp();
//这里因为是本地调试，所以host不规范，实际上应该是备案的域名信息
var host = 'http://127.0.0.1:3030/v1/api/wechat';

// post封装
function Post(url, postData, doSuccess, doFail) {
  wx.request({
    url: host + url,
    data: postData,
    method: 'POST',
    success: function (res) {
      doSuccess(res.data);
    },
    fail: function () {
      wx.showLoading({
        title: '服务器问题',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      doFail();
    },
  })
}
// get封装
function Get(url, doSuccess, doFail) {
  wx.request({
    url: host + url,
    method: 'GET',
    success: function (res) {
      doSuccess(res.data);
    },
    fail: function () {
      wx.showLoading({
        title: '服务器问题',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      doFail();
    },
  })
}
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//时间日期转换成string
const formatTimeString = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('') + [hour, minute, second].map(formatNumber).join('')
}
module.exports = {
  formatTime,Post,Get,formatTimeString
}
