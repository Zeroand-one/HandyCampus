<template>
  <div class="className">
    <div class="classBut">
      <!-- <el-button type="primary" @click="addRolesTab">骑手申请</el-button> -->
      <div class="e"></div>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="searchInput"
        clearable
        @change="changeBlur"
      >
      </el-input>
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
          width="150"
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
          prop="address"
          align="center"
          label="地址"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="request_date"
          label="申请时间"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column align="center" prop="sex" label="性别">
          <template slot-scope="scope">
            <span v-if="+scope.row.sex == '0'">男</span>
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

        <el-table-column label="操作" align="center" width="200">
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
        <el-form-item label="昵称" prop="user_name">
          <el-input v-model="ruleForm.user_name" :disabled="disname"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" v-if="distype">
          <!-- :disabled="distype" 允许修改 -->
          <!-- <el-input v-model="ruleForm.name" :disabled="distype"></el-input> -->
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色" prop="user_type" v-if="distype">
          <el-radio-group v-model="ruleForm.user_type" size="small">
            <el-radio :label="0" border>用户</el-radio>
            <el-radio :label="1" border>骑手</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="地址" prop="address" v-if="distype">
          <el-input type="text" v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" v-if="distype">
          <el-radio-group v-model="ruleForm.sex" size="small">
            <el-radio :label="0" border>男</el-radio>
            <el-radio :label="1" border>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学号" prop="studenid">
          <el-input v-model="ruleForm.studenid"></el-input>
        </el-form-item>
        <el-form-item size="large" class="btn">
          <el-button type="primary" @click="onSubmit('ruleForm')">{{
            distype ? "确认修改" : "立即创建"
          }}</el-button>
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
import { courierFind, getCourierFindSearch } from "../../api/courier";
import { UsersAdd, UsersUpdate, UsersDelete } from "../../api/userA";
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
      distype: false, // 修改弹框
      dia_title: "创建骑手", //弹出框文字提示
      dialogVisible: false, //弹出框
      ruleForm: {
        //弹窗内容
        name: null,
        user_name: null,
        phone: "",
        address: "",
        studenid: "",
        user_type: "0",
        user_id: "",
      },
      rules: {
        user_name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        // studenid: [{ required: true, message: "请输入学号", trigger: "blur" }],
      },
      searchInput: "",
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    // 数据列表
    list() {
      // this.$get("/vue/courierFind")
      courierFind()
        .then((res) => {
          console.log(res.data);
          if (res.data.code == 200) {
            res.data.data.forEach((item) => {
              if (item.birthday) {
                item.birthday = moment(item.birthday).format("YYYY-MM-DD");
              }
              if (item.birthday) {
                item.request_date = moment(item.request_date).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
              }
            });
            this.tableData = res.data.data;
            this.data = this.tableData;
            this.dataTotal = this.tableData.length;
            this.tableData = this.tableData.slice(0, this.PageSize);
          } else {
            this.$message.error("获取失败！");
          }
        })
        .catch((err) => {
          this.$message.error(res.data.message);
          console.log(err);
        });
    },
    // 创建
    addRolesTab() {
      this.disname = false;
      this.distype = false;
      this.dia_title = "创建骑手";
      this.dialogVisible = true;
    },
    // 确认发布
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dia_title == "创建骑手") {
            //新建
            UsersAdd(this.ruleForm)
              .then((res) => {
                if (res.data.code == 200) {
                  this.ruleForm = {
                    user_name: null,
                    phone: "",
                    user_id: "",
                    user_type: "0",
                    studenid: "",
                  };
                  this.$message.success(res.data.message);
                  this.dialogVisible = false;
                  this.list();
                } else {
                  this.$message.error(res.data.message);
                }
              })
              .catch((err) => {
                this.$message.error(res.data.message);
                console.log(err);
              });
          } else {
            // 更新
            this.distype = true;
            UsersUpdate(this.ruleForm)
              .then((res) => {
                if (res.data.code == 200) {
                  this.ruleForm = {
                    name: null,
                    user_name: null,
                    address: "",
                    phone: "",
                    user_id: "",
                    user_type: "",
                    studenid: "",
                  };
                  this.$message.success(res.data.message);
                  this.dialogVisible = false;
                  this.list();
                } else {
                  this.$message.error("提交失败！");
                }
              })
              .catch((err) => {
                this.$message.error(res.data.message);
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
        phone: "",
        address: "",
        user_id: "",
        user_type: "0",
        studenid: "",
        sex: "",
        user_name: "",
      };
      this.dialogVisible = false;
    },
    // 编辑
    editTable(e) {
      this.disname = true;
      this.distype = true;
      this.id = e.id;
      this.ruleForm.name = e.name;
      this.ruleForm.user_name = e.user_name;
      this.ruleForm.phone = e.phone;
      this.ruleForm.user_id = e.user_id;
      this.ruleForm.sex = e.sex;
      this.ruleForm.address = e.address;
      this.ruleForm.user_type = e.user_type;
      this.ruleForm.studenid = e.studenid;
      this.dia_title = "编辑骑手";
      this.dialogVisible = true;
    },
    // 删除
    Delete(e) {
      this.$confirm("确认删除这个骑手吗？")
        .then((_) => {
          UsersDelete({ id: e.user_id })
            .then((res) => {
              console.log(res.data);
              if (res.data.code == 200) {
                this.$message.success(res.data.message);
                this.dialogVisible = false;
                this.list();
              }
            })
            .catch((err) => {
              this.$message.error(res.data.message);
              console.log(err);
            });
        })
        .catch((_) => {});
    },
    // 搜索
    changeBlur(queryString, cb) {
      getCourierFindSearch({ key: this.searchInput })
        .then((res) => {
          if (res.data.code == 200) {
            res.data.data.forEach((item) => {
              if (item.birthday) {
                item.birthday = moment(item.birthday).format(
                  "YYYY-MM-DD hh:mm:ss"
                );
              }
            });
            this.tableData = res.data.data;
            this.data = this.tableData;
            this.dataTotal = this.tableData.length;
            this.tableData = this.tableData.slice(0, this.PageSize);
          }
        })
        .catch((err) => {
          this.$message.error("获取失败！");
        });
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
  display: flex;
  justify-content: space-between;
  .el-input--prefix {
    width: 50%;
  }
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
