<template>
  <div>
    <div class="className">
      <div class="classBut">
        <router-link class="add" to="/case/index"><i class="el-icon-back" style="margin-right:5px"></i>返回列表</router-link>
      </div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="AddForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" :disabled="bool" placeholder="请填写标题"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="class">
          <el-select v-model="ruleForm.class" :disabled="bool" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面" prop="img">
          <el-input v-model="ruleForm.img" type="hidden" class="inputHidden"></el-input>
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
        <el-form-item label="内容" prop="value">
          <input type="hidden" v-model="ruleForm.value">
          <UE ref="ue" :ide="id" v-on:input="input" ></UE>
        </el-form-item>
        <el-form-item label="点击量">
          <el-input v-model="ruleForm.onclick" :disabled="bool" placeholder="请输入点击量"></el-input>
        </el-form-item>
        <el-form-item size="large" class="btn">
          <el-button type="primary" @click="onSubmit('ruleForm')" v-if="!bool">更新</el-button>
          <el-button><router-link to="/case/index">返回列表</router-link></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import UE from '@/components/UE.vue'
export default {
  data() {
    return {
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'change' },
        ],
        class: [
          { required: true, message: '请选择分类', trigger: 'change' },
        ],
        img: [
          { required: true, message: '请上传轮播图片', trigger: 'change' },
        ],
        value: [
          { required: true, message: '请输入内容', trigger: 'change' },
        ],
      },
      API_ROOT:"",        //接口前缀地址
      FormImg:"",         //上传图片展示
      id:null,                      //编辑id
      ruleForm:{
        title:"",
        class:"",
        img:"",
        value:"",
        onclick:0
      },      //输出信息
      DetailsArry:[],         //详情数据
      options: [],        //分类信息
      bool:false,
    }
  },
  components: {
    UE,
  },
  mounted() {
    this.API_ROOT = process.env.API_ROOT
    this.$api.ClassFind(this.$get)
      .then((response) => {
        if(response.code == 200){
          this.options = response.data
        }
      })
      .catch(err => {
        console.log(err)
      })
    if(this.$route.query.id){
      let id = this.$route.query.id
      let bool = this.$route.query.bool
      this.details(id)
      if(bool == 1){
        this.bool = true
      }
    }
  },
  methods: {   
    // 确认发布
    onSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.username = this.$cookies.get('name').id
          if(this.$route.query.id){
            this.ruleForm.id = Number(this.$route.query.id)
            this.$api.ArticleUpdate(this.$post,this.ruleForm)
              .then((response) => {
                if(response.code == 200){
                  this.$message.success(response.data);
                  this.$router.push('/case/index')
                }else{
                  this.$message.error(response.message)
                }
              })
              .catch(err => {
                console.log(err)
              })
          }else{
            this.$api.ArticleAdd(this.$post,this.ruleForm)
              .then((response) => {
                if(response.code == 200){
                  this.$message.success(response.message);
                  this.$router.push('/case/index')
                }else{
                  this.$message.error(response.message)
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 图片上传成功后
    handleAvatarSuccess(res, file) {
      this.ruleForm.img = res.imgUrl
      this.FormImg = res.imgUrl
    },
    // 监听富文本输入框
    input(obj){
      this.ruleForm.value = obj.content
      console.log(this.ruleForm.value)
    },
    // 图片上传中
    beforeAvatarUpload(file) {
      const isJPG = file.type == 'image/jpeg' || file.type == 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if(this.bool){
        this.$message.error('预览状态无法上传图片')
        return false
      }
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 和 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 获取详情数据
    details(id){
      this.$api.ArticleDetails(this.$get,id)
        .then(res => {
          if(res.code == 200){
            this.ruleForm = res.data
            this.DetailsArry = res.data
            this.FormImg = this.ruleForm.img
            this.$refs.ue.getDefaultMsg(this.ruleForm.value);
          }else{
            this.$message.error({message:res.message})
          }
        })
    },
  },
}
</script>