<template>
  <div>
    <div class="className">
      <p class="title">联系我们</p>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="150px"
        class="about"
      >
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.about_email"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="ruleForm.about_QQ"></el-input>
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="ruleForm.about_wechat"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="ruleForm.about_phone"></el-input>
        </el-form-item>
        <el-form-item size="large" class="btn">
          <el-button type="primary" @click="onSubmit('ruleForm')"
            >更新</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { AboutFind, AboutAdd, AboutUpdata } from "../../api/aboutInfo";
export default {
  data() {
    return {
      ruleForm: {
        about_email: "",
        about_QQ: "",
        about_wechat: "",
        about_phone: "",
      }, //数据
      btnBool: true, //更新、创建
    };
  },
  mounted() {
    this.agetAboutFind();
  },
  methods: {
    // 数据请求
    agetAboutFind() {
      AboutFind().then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length > 0) {
            this.btnBool = true;
            let data = res.data.data;
            data.forEach((e) => {
              this.ruleForm.about_email = e.about_email;
              this.ruleForm.about_QQ = e.about_QQ;
              this.ruleForm.about_wechat = e.about_wechat;
              this.ruleForm.about_phone = e.about_phone;
            });
          } else {
            this.btnBool = false;
          }
        } else {
          this.$message.error("获取失败");
        }
      });
    },
    // 更新信息
    onSubmit() {
      if (this.btnBool) {
        this.ruleForm.id = 1;
        AboutUpdata(this.ruleForm).then((res) => {
          this.$message.success(res.data.data);
          this.agetAboutFind();
        });
      } else {
        AboutAdd(this.ruleForm).then((res) => {
          this.$message.success(res.data.data);
          this.agetAboutFind();
        });
      }
    },
  },
};
</script>