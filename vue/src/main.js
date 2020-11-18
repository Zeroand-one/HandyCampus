// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
import animated from "animate.css";
import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'
import '../static/ueditor/ueditor.parse.min.js'
import Cookies from 'vue-cookies'
import {post,get,patch,put,deletes} from './utils/http'
import api from './utils/api'
import moment from 'moment'

//定义全局变量
Vue.prototype.$moment=moment;
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$deletes=deletes;

Vue.prototype.$api=api;
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(Cookies);
Vue.use(animated)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 登录拦截
var getIte = Cookies.get("token")
if(!getIte){
  router.push({
    path:"/login",
  })
}