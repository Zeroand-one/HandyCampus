import axios from 'axios';
import Vue from 'vue';
import { Message,MessageBox  } from 'element-ui';
import Cookies from 'vue-cookies'

let v = new Vue();
let token = Cookies.get("token")
axios.defaults.timeout = 15000;
axios.defaults.baseURL = process.env.API_ROOT; //测试
axios.defaults.withCredentials = true          //跨域缓存
//http request 拦截器
axios.interceptors.request.use(
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
axios.interceptors.response.use(
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

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      if(url !== '/vue/login'){
        if(response.data.code == 20022){
          MessageBox.alert(
            '登录已过期，请再次登录',
            '提示', {
                distinguishCancelAndClose: true,
                // showConfirmButton:false,
                type: 'warning',
                center: true,
                showClose: false,
                closeOnClickModal:true,
            }
          ).then(() => {
            // 删除cookie
            Cookies.remove("token")
            this.$router.push("/login")
          })
        }
      }
      resolve(response.data);
    })
    .catch(err => {
      network();
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
      .then(response => {
        if(response.data.code == 20022){
          MessageBox.alert(
            '登录已过期，请再次登录',
            '提示', 
            {
              distinguishCancelAndClose: true,
              type: 'warning',
              center: true,
              showClose: false,
              closeOnClickModal:true,
            }
          ).then(() => {
            // 删除cookie
            Cookies.remove("token")
            this.$router.push("/login")
          })
        }
        resolve(response.data);
      })
      .catch(err => {
        network();
        reject(err)
      })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
      .then(response => {
      resolve(response.data);
      },err => {
        reject(err)
      })
  })
}
 /**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function deletes(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.delete(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}