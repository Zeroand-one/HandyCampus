<template>
  <div>
    <div class="className">
      <p class="title">联系我们</p>
      <el-form ref="ruleForm" :model="ruleForm" label-width="150px" class="about">
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="ruleForm.QQ"></el-input>
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="ruleForm.wechat"></el-input>
        </el-form-item>
        <el-form-item size="large" class="btn">
          <el-button type="primary" @click="onSubmit('ruleForm')">更新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm:{},    //数据
      btnBool:true,   //更新、创建
    }
  },
  mounted() {
    this.aboutFind()
  },
  methods: {
    // 数据请求
    aboutFind(){
      this.$api.AboutFind(this.$get)
        .then(res => {
          if(res.code == 200){
            if(res.data.length > 0){
              this.btnBool = true
              this.ruleForm = res.data[0]
            }else{
              this.btnBool = false
            }
          }
        })
    },
    // 更新信息
    onSubmit(){
      if(this.btnBool){
        this.$api.AboutUpdata(this.$post,this.ruleForm)
          .then(res => {
            this.$message.success({message:res.data})
            this.aboutFind()
          })
      }else{
        this.$api.AboutAdd(this.$post,this.ruleForm)
          .then(res => {
            this.$message.success({message:res.data})
            this.aboutFind()
          })
      }
    },
  },
}
</script>