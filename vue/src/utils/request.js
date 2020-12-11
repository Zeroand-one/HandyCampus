import axios from 'axios';
import Vue from 'vue';
import { Message,MessageBox  } from 'element-ui';
import Cookies from 'vue-cookies'

let v = new Vue();
let token = Cookies.get("token")
// service.defaults.timeout = 15000;
let service = axios.create({
  // baseURL: baseURL, // 请求接口的域名
  // baseURL: process.env.API_ROOT, // 请求接口的域名
  timeout: 9000 // 请求的超时
})

service.defaults.baseURL = process.env.API_ROOT; //测试
service.defaults.withCredentials = true          //跨域缓存
//http request 拦截器
service.interceptors.request.use(
  config => {
    if(token){
      config.headers = {
        'Content-Type':'application/json',
        'Authorization': token,
      }
    }else{
      config.headers = {
        'Content-Type':'application/json',
      }
    }
    return config;
  },
  error => {  
    return Promise.reject(err);
  }
);


//http response 拦截器
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

var  network = function(){
    if(window.navigator.onLine==true) {　
　　}else {　
      v.$message.error('网络不给力，请重试');
      return false
　　}
    // if(getIte){
    //   v.$message.error('服务器繁忙，请稍候再试');
      // console.log("网络问题")
    // }
}



export default service