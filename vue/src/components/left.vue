<template>
  <div class="left">
    <el-menu
      class="el-menu-demo"
      @open="handleOpen"
      @close="handleClose"
      :default-openeds="this.default"
      :collapse="$store.state.isCollapse"
      :collapse-transition="false">
        <div v-for="(item, index) in allRoute" :key="index">
          <el-menu-item 
            :class="path == item.path + '/index' ? 'is-active' : ''" 
            v-if="item.hidden" 
            @click="Link(item.path,$event,'link')"
            :index="item.name">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
          <el-submenu :index='item.name' v-else-if="item.name != 'home'">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </template>
            <el-menu-item
              v-for="(citem, cindex) in item.children"
              :class="path == (item.path + '/' + citem.path) || path == ('/' + citem.path) ? 'is-active' : ''"
              :key="cindex"
              @click="Link(item.path,$event,citem.path)"
              v-show="!citem.hidden"
              :index="item.name + '/' + citem.name">
              <div class="link">
                <i :class="citem.meta.icon"></i>{{citem.meta.title}}
              </div>
            </el-menu-item>
          </el-submenu>
        </div>
    </el-menu>
  </div>
</template>

<script>
import { asyncRoutes } from "@/router";
export default {
  data() {
    return {
      allRoute: [...asyncRoutes],       //路由内容
      path:'',                          //路由地址
      default:[],                       //当前地址的列表
      isactive:false,                   //侧栏高亮
    };
  },
  created(){
    this.path = this.$route.fullPath
    this.default = [this.path.split('/')[1]]
  },
  methods: {
    Link(pathnav,e,pathitem){
      if(pathnav == '/'){
        this.$router.push({path: '/home'})
      }else{
        if(pathitem == 'link'){
          this.$router.push({path: pathnav + '/index'})
        }else{
          this.$router.push({path:pathnav + '/' + pathitem})
        }
      }
      
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  watch: {
    // 地址变化时侧栏高亮改变
    $route(to){
      this.path = to.fullPath
    }
  },
}
</script>
