<template>
  <div>
    <div class="className">
      <div class="classBut">
        <div class="add" @click="modul()">创建模块</div>
      </div>
      <div class="classpage">
        <el-table :data="tableData" border stripe>
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="name" label="模块名称"></el-table-column>
          <el-table-column prop="time" label="创建时间"></el-table-column>
          <el-table-column prop="newtime" label="修改时间"></el-table-column>
          <el-table-column prop="username" label="创建人"></el-table-column>
          <el-table-column prop="number" label="文章数"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="modul(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                @click="Delete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 模块编辑 -->
    <el-dialog
      :title="diaTitle"
      :visible.sync="dialogVisible"
      width="30%" center
      :before-close="handleClose">
      <el-form ref="Form" :model="form" :rules="rules">
        <el-form-item label="模块名称" label-width="80px" prop="name">
          <el-input v-model="form.name" placeholder="请输入模块名称" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary"  @click="resetForm('Form')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="CloseDialog"
      width="20%"
      center>
      <p style="text-align:center;">是否确定删除此类别？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CloseDialog = false">取 消</el-button>
        <el-button type="primary" @click="CloseDialogClick()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rules: {        //登陆验证
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
      },
      tableData:[],
      dialogVisible:false,  //模块编辑弹窗
      ModuleId:null,        //模块id
      diaTitle:"",          //弹窗名称
      diaBool:true,         //弹窗类型 添加/修改
      form:{
        name:"",
      },
      CloseDialog:false,    //删除弹窗
      CloseDialogId:null,   //删除id
    }
  },
  mounted() {
    this.list()
  },
  methods: {
    // 模块列表
    list(){
      this.$api.ClassFind(this.$get)
        .then(res => {
          if(res.code == 200){
            this.tableData = res.data
            this.tableData.forEach(item => {
              item.time = this.$moment(item.time).format('YYYY-MM-DD HH:mm:ss')
              item.newtime = this.$moment(item.newtime).format('YYYY-MM-DD HH:mm:ss')
            })
          }
        })
    },
    // 调用模块编辑弹窗
    modul(row){
      this.dialogVisible = true
      if(row){
        this.ModuleId = row.id
        this.diaTitle = "修改模块"
        this.diaBool = false
        this.form.name = row.name
      }else{
        this.diaTitle = "添加模块"
        this.diaBool = true
      }
    },
    // 弹窗提交
    resetForm(form){
      this.form.usernameId = this.$cookies.get('name').id
      this.$refs[form].validate((valid) => {
        if (valid) {
          if(this.diaBool){    //添加
            this.$api.ClassAdd(this.$post,this.form)
              .then(res => {
                if(res.code == 200){
                  this.$message.success({message:res.data});
                  this.form.name = ''
                  this.list()
                  this.dialogVisible = false
                }
              })
          }else{          //修改
            this.form.id = this.ModuleId
            this.$api.ClassUpdateName(this.$post,this.form)
              .then(res => {
                if(res.code == 200){
                  this.$message.success({message:res.data});
                  this.form.name = ''
                  this.list()
                  this.dialogVisible = false
                  delete this.form.id
                }else{
                  this.$message.error({message:res.data});
                }
              })
          }
        } else {
          return false;
        }
      });
    },
    // 取消模块编辑弹窗
    handleClose(){
      this.dialogVisible = false
      this.form.name = ""
    },
    // 删除弹窗
    Delete(row){
      this.CloseDialogId = row.id
      this.CloseDialog = true
    },
    CloseDialogClick(){
      let data = {id:this.CloseDialogId}
      this.$api.ClassDelete(this.$post,data)
        .then(res => {
          if(res.code == 200){
            this.$message.success({message:res.data});
            this.list()
            this.CloseDialog = false
          }else{
            this.$message.error({message:res.message});
            this.list()
            this.CloseDialog = false
          }
        })
    },
  },
}
</script>
