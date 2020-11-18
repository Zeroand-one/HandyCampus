<template>
  <div>
    <div class="className">
      <div class="title">个人信息</div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="AddForm">
        <el-form-item label="账号">
          <el-input v-model="ruleForm.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avator">
          <el-input v-model="ruleForm.avator" type="hidden" class="inputHidden"></el-input>
          <el-upload
            class="avatar-uploader"
            :action="API_ROOT+'/uploadFile'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="FormImg" :src="FormImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item size="large" class="btn">
          <el-button type="primary" @click="onSubmit('ruleForm')">更新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import UE from '@/components/UE.vue'
export default {
  data() {
    var email = (rule, value, callback) => {
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (value === '') {
        callback(new Error('请填写电子邮箱'));
      } else if (!regEmail.test(value)) {
        callback(new Error('请填写正确的邮箱地址'));
      } else {
        callback();
      }
    };
    return {
      ruleForm:{
        name:"",
        password:"",
        avator:"",
        email:""
      },      //输出信息
      API_ROOT:"",        //接口前缀地址
      FormImg:"",
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        avator: [
          { required: true, message: '请上传头像', trigger: 'change' },
        ],
        email: [{required: true, validator: email, trigger: "blur" }],
      }
    }
  },
  mounted() {
    this.ruleForm.name = this.$cookies.get('name').name
    this.ruleForm.password = this.$cookies.get('name').pass
    this.ruleForm.email = this.$cookies.get('name').email
    this.ruleForm.avator = this.$cookies.get('name').avator
    this.FormImg = this.$cookies.get('name').avator
    this.API_ROOT = process.env.API_ROOT
  },
  methods: {
    // 确认发布
    onSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.id = this.$cookies.get('name').id
          this.$post('/vue/UserUpdate',this.ruleForm)
            .then((response) => {
              if(response.code == 200){
                this.$message.success(response.message);
                this.$cookies.remove("token")
                this.$cookies.remove("name")
                this.$router.push('/login')
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 图片上传成功后
    handleAvatarSuccess(res, file) {
      this.ruleForm.avator = res.imgUrl
      this.FormImg = res.imgUrl
    },
    // 图片上传中
    beforeAvatarUpload(file) {
      const isJPG = file.type == 'image/jpeg' || file.type == 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 和 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
}
</script>
<style lang="scss" scoped>
.AddForm{margin-top:30px;}
</style>