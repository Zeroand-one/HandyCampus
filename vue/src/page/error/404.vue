<template>
  <div class="body">
    <isheader :headerNav="false"></isheader>
    <div :class="$store.state.isCollapse ? 'main on' : 'main'">
      <left></left>
      <div class="right">
        <div class="pageMain">
          <transition name="fade-page" mode="out-in">
            <div>
              <div class="error_pd">
                <p class="error_p">404页面</p>
                <router-link to="/"><el-button>返回首页</el-button></router-link>
              </div>
              <img src="/static/img/error.png" alt="" class="error">
            </div>
          </transition>
        </div>
      </div>
    </div>
    <transition
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutRight">
      <notice-bar v-if="$store.state.Notice"></notice-bar>
    </transition>
  </div>
</template>
<script>
import left from "@/components/left";
import isheader from "@/components/header";
import NoticeBar from "@/components/NoticeBar";
// import left 
export default {
  components: {
    left,
    isheader,
    NoticeBar,
  },
}
</script>
<style>
  @import './../../assets/css/public.css';
</style>
<style lang="scss" scoped>
.right{
  background:#b5c794;
  height:100%;
  .pageMain{
    margin:0px;
    position: relative;
    .error{
      display: block;padding:0px;width:100%;
    }
    .error_pd{
      position: absolute;width:100%;text-align: center;top:50px;left:0px;
      .error_p{color:#fff;font-size:20px;}
      .error_link{color:#fff;font-size:20px;}
    }
  }
}
</style>