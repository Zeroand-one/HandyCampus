<template>
  <div class="className">
    <div class="classBut">
      <el-button type="primary" @click="addRolesTab">添加用户</el-button>
    </div>
    <div class="classpage">
      <el-table :data="tableData" border stripe>
        <el-table-column
          prop="user_id"
          label="id"
          width="100"
        ></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="user_name" label="昵称"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          width="350"
        ></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="{ row: { sex } }">
            <span v-if="+sex == '0'">男</span>
            <span v-else-if="+sex == '1'">女</span>
            <span v-else>未知</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话号码"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="studenid"
          label="学号"
          width="200"
        ></el-table-column>
        <el-table-column prop="user_type" label="用户类型"
          >骑手</el-table-column
        >

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" @click="editTable(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="Delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="dia_title"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
        style="width: 400px"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name" :disabled="disname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item size="large" class="btn">
          <el-button type="primary" @click="onSubmit('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      tableData: [], //数据列表
      id: null, //操作id
      disname: false, //昵称禁止操作
      dia_title: "创建用户", //弹出框文字提示
      dialogVisible: false, //弹出框
      ruleForm: {
        //弹窗内容
        name: null,
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    // 数据列表
    list() {
      this.$get("/vue/courierFind")
        .then((response) => {
          console.log(response);
          if (response.code == 200) {
            this.tableData = response.data;
            this.tableData.forEach((item) => {
              item.time = moment(item.time).format("YYYY-MM-DD hh:mm:ss");
              item.newtime = moment(item.newtime).format("YYYY-MM-DD hh:mm:ss");
              // item.time
            });
          }
        })
        .catch((err) => {
          this.$message.error(response.message);
          console.log(err);
        });
    },
    // 创建
    addRolesTab() {
      this.disname = false;
      this.dia_title = "创建用户";
      this.dialogVisible = true;
    },
    // 确认发布
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dia_title == "创建用户") {
            //新建
            this.$post("/vue/usersadd", this.ruleForm)
              .then((response) => {
                if (response.code == 200) {
                  this.ruleForm = {
                    name: null,
                    password: "",
                  };
                  this.$message.success(response.message);
                  this.dialogVisible = false;
                  this.list();
                }
              })
              .catch((err) => {
                this.$message.error(response.message);
                console.log(err);
              });
          } else {
            //更新
            this.$post("/vue/usersupdate", {
              id: this.id,
              password: this.ruleForm.password,
            })
              .then((response) => {
                if (response.code == 200) {
                  this.ruleForm = {
                    name: null,
                    password: "",
                  };
                  this.$message.success(response.message);
                  this.dialogVisible = false;
                  this.list();
                }
              })
              .catch((err) => {
                this.$message.error(response.message);
                console.log(err);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 弹出框关闭确认
    handleClose() {
      this.ruleForm = {
        name: null,
        password: "",
      };
      this.dialogVisible = false;
    },
    // 编辑
    editTable(e) {
      this.disname = true;
      this.id = e.id;
      this.ruleForm.name = e.name;
      this.ruleForm.password = e.password;
      this.dia_title = "编辑用户";
      this.dialogVisible = true;
    },
    // 删除
    Delete(e) {
      this.$confirm("确认删除这个用户吗？")
        .then((_) => {
          this.$post(`/vue/usersDelete`, { id: e.id })
            .then((response) => {
              console.log(response);
              if (response.code == 200) {
                this.$message.success(response.message);
                this.dialogVisible = false;
                this.list();
              }
            })
            .catch((err) => {
              this.$message.error(response.message);
              console.log(err);
            });
        })
        .catch((_) => {});
    },
  },
};
</script>
<style lang="scss"  scoped>
.classBut {
  margin: 20px;
}
.classpage {
  margin: 20px;
  .cell {
  }

  .intropic {
    width: 200px;
    height: 150px;
  }
}
.has-gutter .cell {
  text-align: center;
}
</style>
