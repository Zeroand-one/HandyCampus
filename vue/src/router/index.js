import Vue from 'vue'
import Router from 'vue-router'
import Layout from "@/layout";

// import store from "@/store";
import getTitle from "@/store/getTitle";

Vue.use(Router)

// 匹配路由
export const currencyRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@p/login/login.vue"),
    meta: { title: "登录" },
    hidden: true
  },
  {
    path: "/personal",
    name: "Personal",
    component: Layout,
    redirect: "/personal/index",
    hidden: true,
    children: [
      {
        path: "index",
        name: "Personal-index",
        component: () => import("@p/personal"),
        meta: { title: "个人中心" }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import("@p/error/404.vue"),
    meta: { title: "404" },
    hidden: true
  },{
    path: '*',
    redirect:'/404'
  }
]


export const asyncRoutes =[
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: "/home",
    meta: { title: "首页", icon: "el-icon-s-home" },
    hidden: true,
    children: [
      {
        path: "home",
        name: "home_index",
        component: () => import("@p/home"),
        meta: { title: "首页", icon: "el-icon-s-home" },
      }
    ]
  },
  {
    path:'/user',
    name:'user',
    hidden: true,
    component:Layout,
    redirect: "/user/index",
    meta: { title: "用户", icon: "el-icon-user-solid" },
    children: [
      {
        path: "index",
        name: "user_index",
        component: () => import("@p/user"),
        meta: { title: "用户中心", icon: "el-icon-user-solid" },
      }
    ]
  },
  {
    path: '/courier',
    name: 'courier',
    hidden: true,
    component: Layout,
    redirect: "/courier/index",
    meta: { title: "骑手", icon: "el-icon-bicycle" },
    children: [
      {
        path: "index",
        name: "courier_index",
        component: () => import("@p/courier"),
        meta: { title: "骑手列表", icon: "el-icon-bicycle" },
      },
      {
        path: "add",
        name: "courier_index_id",
        component: () => import("@p/courier/add.vue"),
        meta: { title: "申请骑手信息", icon: "el-icon-bicycle" },
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    hidden: true,
    component: Layout,
    redirect: "/order/index",
    meta: { title: "订单", icon: "el-icon-s-order" },
    children: [
    {
      path: "index",
      name: "order_index",
      component: () => import("@p/order"),
      meta: { title: "订单信息", icon: "el-icon-s-order" },
    }
    ]
  },
  {
    path: '/messageInfo',
    name: 'messageInfo',
    hidden: true,
    component: Layout,
    redirect: "/messageInfo/index",
    meta: { title: "反馈", icon: "el-icon-document" },
    children: [
    {
      path: "index",
      name: "messageInfo_index",
      component: () => import("@p/messageInfo"),
      meta: { title: "反馈信息", icon: "el-icon-message-solid" },
    },
    {
      path: "info",
      name: "messageInfo_index_id",
      component: () => import("@p/messageInfo/info.vue"),
      meta: { title: "反馈信息详情", icon: "el-icon-message-solid" },
    }
    ]
  },
  {
    path: '/oftenAddres',
    name: 'oftenAddres',
    hidden: true,
    component: Layout,
    redirect: "/oftenAddres/index",
    meta: { title: "地址", icon: "el-icon-location" },
    children: [
    {
      path: "index",
      name: "oftenAddres_index",
      component: () => import("@p/oftenAddres"),
      meta: { title: "地址簿", icon: "el-icon-location" },
    }
    ]
  },
  {
    path: '/Banner',
    name: 'Banner',
    hidden: true,
    component: Layout,
    redirect: "/Banner/index",
    meta: { title: "主页推荐", icon: "el-icon-suitcase" },
    children: [
    {
      path: "index",
      name: "Banner_index",
      component: () => import("@p/Banner"),
      meta: { title: "Banner", icon: "el-icon-suitcase" },
    }
    ]
  },
  // {
  //   path: '/messageInfo',
  //   name: 'messageInfo',
  //   hidden: true,
  //   component: Layout,
  //   redirect: "/messageInfo/info",
  //   meta: { title: "反馈信息", icon: "el-icon-document" },
  //   children: [
  //   {
  //     path: "info",
  //     name: "messageInfo_index_id",
  //     component: () => import("@p/messageInfo/info.vue"),
  //     meta: { title: "反馈信息详情", icon: "el-icon-message-solid" },
  //   }
  //   ]
  // },
  // {
  //   path: '/nav',
  //   name: 'nav',
  //   hidden: true,
  //   component: Layout,
  //   redirect: "/nav/index",
  //   meta: { title: "模块列表", icon: "el-icon-s-operation"},
  //   children: [
  //   {
  //     path: "index",
  //     name: "nav_index",
  //     component: () => import("@p/nav"),
  //     meta: { title: "模块列表", icon: "el-icon-video-camera-solid" },
  //   }
  //   ]
  // },
  // {
  //   path:'/case',
  //   name:'case',
  //   hidden: true,
  //   component:Layout,
  //   redirect: "/case/index",
  //   meta: { title: "文章", icon: "el-icon-folder" },
  //   children: [
  //     {
  //       path: "index",
  //       name: "case_index",
  //       component: () => import("@p/case"),
  //       meta: { title: "文章列表", icon: "el-icon-folder-opened" },
  //     },
  //     {
  //       path: "add",
  //       name: "case_add",
  //       component: () => import("@p/case/add"),
  //       meta: { title: "文章编辑", icon: "el-icon-folder-add" },
  //       hidden: true,
  //     }
  //   ]
  // },
  {
    path:'/about',
    name:'about',
    component:Layout,
    redirect: "/about/index",
    hidden: true,
    meta: { title: "关于我们", icon: "el-icon-s-custom" },
    children: [
      {
        path: "index",
        name: "about_index",
        component: () => import("@p/about"),
        meta: { title: "联系我们", icon: "el-icon-s-custom" },
      }
    ]
  },
  
]

const creatRouter = () => {
  return new Router({
    mode: 'history',  //去掉url中的#
    routes: [...currencyRoutes,...asyncRoutes],
    // 初始化页面位置
    scrollBehavior() {
      return { x: 0, y: 0 };
    }
  });
};
const router = creatRouter();

// 路由重复点击报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 导航守卫
router.beforeEach(async (to, from, next) => {
  // title 名称
  document.title = getTitle(to.meta.title);
  
  // if (to.path === "/user") {
    next();
  // } 
  // else {
//     if (store.getters.token) {
//       const hasRoles = store.getters.addRoutes.length > 0;
//       if (hasRoles || store.getters.isFindRouter) {
//         next();
//       } else {
//         var roles = [];
//         const addRoutes = await store.dispatch(
//           "permission/getAsyncRoutes",
//           roles
//         );
//         // window.console.log(addRoutes);
//         router.addRoutes(addRoutes);
//         // hack method to ensure that addRoutes is complete
//         // set the replace: true, so the navigation will not leave a history record
//         next({ ...to, replace: true });
//       }
//     } else {
//       next({
//         path: "/login",
//         query: {
//           redirect: to.fullPath
//         }
//       });
//     }
//   }
});

export default router;