<template>
  <div :class="this.$store.state.isCollapse ? 'header on' : 'header'">
    <div class="LogoLink">
      <img src="@a/img/logo.png" alt="" class="logo" />后台管理系统
    </div>
    <div class="header_right">
      <div class="herile">
        <i
          :class="
            this.$store.state.isCollapse
              ? 'el-icon-s-unfold icon'
              : 'el-icon-s-fold icon'
          "
          @click="isCollapse"
        ></i>
        <p class="herile_p" v-if="path == '/home' && headerNav">
          <span class="hea_span1">首页</span>
        </p>
        <p class="herile_p" v-else-if="path != '/home' && headerNav">
          <span class="hea_span1">首页</span>
          <span class="">/</span>
          <router-link :to="titlink" class="hea_span">{{ tit1 }}</router-link>
          <span class="" v-if="tit2">/</span>
          <span class="hea_span1" v-if="tit2">{{ tit2 }}</span>
        </p>
      </div>
      <div class="herilr">
        <el-badge is-dot @click.native="toggleMsgShow">
          <i class="el-icon-message-solid iconFont"></i>
        </el-badge>
        <el-badge @click.native="toggleFull">
          <i class="el-icon-full-screen"></i>
        </el-badge>
        <el-dropdown class="heri_lr">
          <span class="el-dropdown-link">
            {{ admin.name }}<i class="el-icon-caret-bottom el-icon--right"></i>
            <img
              v-if="admin.avator"
              :src="admin.avator"
              alt=""
              class="usepic"
            />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/"
                ><i class="el-icon-s-home"></i>首页</router-link
              >
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/personal">
                <i class="el-icon-s-custom"></i>我的主页</router-link
              >
            </el-dropdown-item>
            <el-dropdown-item divided>
              <a @click="loginOut()"
                ><i class="el-icon-switch-button"></i>登出</a
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
 <script>
import { asyncRoutes } from "@/router";
import screenfull from "screenfull";
export default {
  data() {
    return {
      allRoute: [...asyncRoutes],
      path: "", //url地址
      tit1: "", //面包屑标题1
      tit2: "", //面包屑标题2
      UseName: "admin", //用户名
      titlink: "", //分级地址
      admin: {}, //用户信息
    };
  },
  props: {
    headerNav: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.admin = this.$cookies.get("name");
    this.path = this.$route.fullPath;
    let tit1 = this.path.split("/")[1];
    let tit2 = this.path.split("/")[2];
    if (tit1 == "personal") {
      this.tit1 = "个人中心";
      this.tit2 = "";
      return false;
    }
    this.allRoute.forEach((item) => {
      if (item.name == tit1) {
        this.tit1 = item.meta.title;
        this.titlink = item.redirect;
        item.children.forEach((citem) => {
          if (citem.path == tit2) {
            this.tit2 = citem.meta.title;
          }
        });
      }
    });
  },
  methods: {
    // 侧边导航开关
    isCollapse() {
      this.$store.commit("changetitle");
    },
    // 消息提示开关
    toggleMsgShow() {
      this.$store.commit("NoticeBar");
    },
    // 全屏开关
    toggleFull() {
      if (!screenfull.isEnabled) {
        this.$message({
          type: "warning",
          message: "不支持全屏",
        });
        return false;
      }
      screenfull.toggle();
    },
    // 退出登录
    loginOut() {
      this.$get("/vue/loginOut", this.ruleForm)
        .then((response) => {
          this.$message.success(response.message);
          this.$cookies.remove("token");
          this.$cookies.remove("name");
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    // 地址变化时侧栏高亮改变
    $route(to) {
      this.path = to.fullPath;
      let tit1 = to.fullPath.split("/")[1];
      let tit2 = to.fullPath.split("/")[2];
      if (tit1 == "personal") {
        this.tit1 = "个人中心";
        this.tit2 = "";
        return false;
      }
      this.allRoute.forEach((item) => {
        if (item.name == tit1) {
          this.tit1 = item.meta.title;
          item.children.forEach((citem) => {
            if (citem.path == tit2) {
              this.tit2 = citem.meta.title;
            }
          });
        }
      });
    },
  },
};
</script>
 <style lang="scss" scoped>
.heri_lr {
  line-height: 50px;
}
</style>