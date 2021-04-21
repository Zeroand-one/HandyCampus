<template>
  <div class="login">
    <div class="slideShadow" v-show="showSlide">
      <transition>
        <div class="slideSty animated bounce">
          <slide-verify
            @success="onSuccess"
            @fail="onFail"
            :w="350"
            :h="175"
            ref="slideDiv"
          ></slide-verify>
          <div class="iconBtn">
            <i class="el-icon-circle-close" @click="showSlide = false"></i
            ><i class="el-icon-refresh" @click="refresh"></i>
          </div>
        </div>
      </transition>
    </div>
    <div class="loginBox">
      <h2 class="loginH2">后台管理系统</h2>
      <!-- 登陆 -->
      <div class="loginCon" v-if="Bool" key="login">
        <div class="titleDiv">
          <h3 @click="Bool = false"></h3>
          <!-- <h3 @click="Bool = false">立即注册</h3> -->
          <p>输入您的用户名和密码登录：</p>
          <i class="el-icon-key"></i>
        </div>
        <el-form ref="loginForm" :rules="rules" :model="ruleForm">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入账号"
              prefix-icon="el-icon-user"
              v-model="ruleForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password"
              show-password
              @keyup.enter.native="loginYz('loginForm')"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            class="loginBtn"
            @click="loginYz('loginForm')"
            >登录</el-button
          >
        </el-form>
      </div>
      <!-- 注册 -->
      <div class="loginCon" v-else key="reg">
        <div class="titleDiv">
          <h3 @click="Bool = true">立即登陆</h3>
          <p>输入您的基本信息</p>
          <i class="el-icon-key"></i>
        </div>
        <el-form ref="reg_ruleForm" :rules="reg_rules" :model="reg_ruleForm">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入账号"
              prefix-icon="el-icon-user"
              v-model="reg_ruleForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              placeholder="请输入邮箱"
              prefix-icon="el-icon-folder"
              v-model="reg_ruleForm.email"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="reg_ruleForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="con_password">
            <el-input
              placeholder="请再次输入密码"
              prefix-icon="el-icon-lock"
              v-model="reg_ruleForm.con_password"
              show-password
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            class="loginBtn"
            @click="reg('reg_ruleForm')"
            >注册</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import SlideVerify from "@/components/SlideVerify";
import { RegName, login, register } from "../../api/login";
export default {
  data() {
    var con_password = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.reg_ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var email = (rule, value, callback) => {
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (value === "") {
        callback(new Error("请填写电子邮箱"));
      } else if (!regEmail.test(value)) {
        callback(new Error("请填写正确的邮箱地址"));
      } else {
        callback();
      }
    };
    return {
      Bool: true, //登陆/注册切换
      showSlide: false, //提交验证
      ruleForm: {
        //登陆参数
        username: "",
        password: "",
      },
      reg_ruleForm: {
        //注册参数
        username: "",
        email: "",
        password: "",
        con_password: "",
      },
      rules: {
        //登陆验证
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在3到15个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      reg_rules: {
        //注册验证
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在3到15个字符", trigger: "blur" },
        ],
        email: [{ required: true, validator: email, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        con_password: [
          { required: true, validator: con_password, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // 显示提示框
    this.$cookies.remove("token");
    this.$cookies.remove("name");
  },
  methods: {
    // 登录
    loginYz(form) {
      console.log(123);
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.showSlide = true;
        } else {
          return;
        }
      });
    },
    // 验证注册昵称是否已被注册
    reg(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let data = { username: this.reg_ruleForm.username };
          // this.$api
          //   .RegName(this.$get, data)
          RegName(data)
            .then((res) => {
              if (res.data.code == 200) {
                this.showSlide = true;
              } else if (res.data.code == 2002) {
                this.$message.error(res.data.message);
              }
            })
            .catch((err) => {
              this.$message.error(err.message);
            });
        } else {
          return;
        }
      });
    },
    // 验证成功
    onSuccess() {
      this.showSlide = false;
      if (this.Bool) {
        this._login();
      } else {
        this._reg();
      }
    },
    // 验证失败处理
    onFail() {
      this.$message.error("验证失败");
    },
    // 重置验证
    refresh() {
      this.$refs.slideDiv.reset();
    },
    // 登录处理
    _login() {
      // this.$api
      //   .login(this.$get, this.ruleForm)
      login(this.ruleForm)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.message);
            this.$cookies.set("token", res.data.token);
            this.$cookies.set("name", res.data.name);
            this.$router.push("/");
          } else if (res.data.code == 500) {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 注册
    _reg() {
      let parmas = {
        name: this.reg_ruleForm.username,
        email: this.reg_ruleForm.email,
        pass: this.reg_ruleForm.password,
      };
      // this.$api
      //   .register(this.$post, )
      register(parmas)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.message);
            this.$router.go(0);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.message);
        });
    },
  },
  components: {
    SlideVerify,
  },
};
</script>
<style lang="scss" scoped>
@import "../../../static/css/login.scss";
</style>
<style>
.el-notification .el-icon-s-opportunity {
  color: #ffc107;
  font-size: 22px;
  margin-top: 2px;
}
</style>
