<template>
  <div class="className">
    <div class="classBut">
      <el-button type="primary" @click="addRolesTab">添加用户</el-button>
    </div>
    <div class="classpage">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" width="50" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="user_id"
          label="id"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="姓名"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="user_name"
          label="昵称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="password"
          label="密码"
        ></el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          width="350"
          align="center"
        ></el-table-column>
        <el-table-column align="center" prop="sex" label="性别">
          <template slot-scope="scope">
            <span v-if="+scope.rowsex == '0'">男</span>
            <span v-else-if="+scope.row.sex == '1'">女</span>
            <span v-else>未知</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          align="center"
          label="电话号码"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="studenid"
          label="学号"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column prop="user_type" align="center" label="用户类型"
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
          <el-input
            v-model="ruleForm.name"
            :disabled="disname"
          ></el-input> </el-form-item
        ><el-form-item label="昵称" prop="user_name">
          <el-input v-model="ruleForm.user_name" :disabled="disname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="studenid">
          <el-input v-model="ruleForm.studenid"></el-input>
        </el-form-item>
        <el-form-item size="large" class="btn">
          <el-button type="primary" @click="onSubmit('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 翻页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 25, 20]"
      :page-size="PageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataTotal"
    >
    </el-pagination>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      tableData: [], //数据列表
      table: [], //缓存数据列表
      dataTotal: 0,
      currentPage4: 1, // 当前页数
      PageSize: 5, // 当前个数
      id: null, //操作id
      disname: false, //昵称禁止操作
      dia_title: "创建用户", //弹出框文字提示
      dialogVisible: false, //弹出框
      ruleForm: {
        //弹窗内容
        name: null,
        user_name: null,
        password: "",
        phone: "",
        studenid: "",
        user_type: "0",
        user_id: "",
      },
      rules: {
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        user_name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        studenid: [{ required: true, message: "请输入学号", trigger: "blur" }],
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
            this.data = this.tableData;
            this.dataTotal = this.tableData.length;
            this.tableData = this.tableData.slice(0, this.PageSize);
            this.tableData.forEach((item) => {
              item.time = moment(item.time).format("YYYY-MM-DD hh:mm:ss");
              item.newtime = moment(item.newtime).format("YYYY-MM-DD hh:mm:ss");
              // item.time
            });
          } else {
            this.$message.error("获取失败！");
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
                    user_name: null,
                    password: "",
                    phone: "",
                    user_id: "",
                    user_type: "",
                    studenid: "",
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
      this.ruleForm.user_name = e.user_name;
      this.ruleForm.password = e.password;
      this.ruleForm.phone = e.phone;
      this.ruleForm.user_id = e.user_id;
      this.ruleForm.user_type = e.user_type;
      this.ruleForm.studenid = e.studenid;
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
    // 翻页
    handleCurrentChange(e) {
      let data = this.data;
      let pageprev = (e - 1) * this.PageSize;
      let pagenext = this.PageSize * e;
      this.tableData = data.slice(pageprev, pagenext);
      // console.log(this.currentPage4, "1", this.PageSize);
    },
    // 页几个
    handleSizeChange(e) {
      let data = this.data;
      this.PageSize = e;
      this.currentPage4 = 1;
      let pageprev = (this.currentPage4 - 1) * e;
      let pagenext = this.currentPage4 * e;
      this.tableData = data.slice(pageprev, pagenext);
      // console.log(this.currentPage4, this.PageSize);
      // console.log(this.tableData, "ta");
      // this.list();
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
.el-pagination {
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
}
</style>
