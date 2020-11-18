<template>
  <div class="body">
    <isheader></isheader>
    <div :class="$store.state.isCollapse ? 'main on' : 'main'">
      <left></left>
      <div class="right">
        <div class="pageMain">
          <transition name="fade-page" mode="out-in">
            <router-view></router-view>
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
  @import './../assets/css/public.css';
</style>