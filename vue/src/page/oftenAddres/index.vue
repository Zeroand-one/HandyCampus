<template>
  <div class="className">
    <div class="classBut">
      <div class="c"></div>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="searchInput"
        clearable
        @change="changeKeySearch"
      >
      </el-input>
    </div>
    <div class="classpage">
      <el-table :data="tableData" border stripe>
        <el-table-column
          type="index"
          label="序号"
          :index="(currentPage4 - 1) * PageSize + 1"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column
          label="nid值"
          prop="nid"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="user_id"
          label="user_id"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address_username"
          align="center"
          width="100"
          label="用户名"
        ></el-table-column>
        <el-table-column
          prop="address_iphone"
          align="center"
          label="手机号"
          width="140"
        ></el-table-column>
        <el-table-column
          prop="address_name"
          align="center"
          width="100"
          label="地名"
        ></el-table-column>
        <el-table-column
          prop="address_det"
          align="center"
          label="详细地址"
        ></el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" @click="editTable(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="Delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑 -->
    <el-dialog
      title="编辑"
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
        <el-form-item label="用户名" prop="address_username">
          <el-input
            v-model="ruleForm.address_username"
            :disabled="disname"
          ></el-input>
        </el-form-item>
        <el-form-item label="user_id" prop="user_id">
          <el-input v-model="ruleForm.user_id" :disabled="disname"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="address_iphone">
          <el-input v-model="ruleForm.address_iphone"></el-input>
        </el-form-item>
        <el-form-item label="地名" prop="address_name">
          <el-input type="text" v-model="ruleForm.address_name"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address_det">
          <el-input v-model="ruleForm.address_det"></el-input>
        </el-form-item>
        <el-form-item size="large" class="btn">
          <el-button type="primary" @click="onSubmit('ruleForm')"
            >确认修改</el-button
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
      :page-sizes="[5, 10, 15, 20]"
      :page-size="PageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataTotal"
    >
    </el-pagination>
  </div>
</template>
<script>
import moment from "moment";

import {
  adminOftenAddresFind,
  adminOftenAddresUpdate,
  adminOftenAddresDelete,
  adminOftenAddresKeySearch,
} from "../../api/address";
export default {
  data() {
    return {
      tableData: [], //数据列表
      table: [], //缓存数据列表
      dataTotal: 0,
      currentPage4: 1, // 当前页数
      PageSize: 5, // 当前个数
      id: null, //操作id
      id: null, //操作id
      disname: false, //昵称禁止操作
      distype: false, // 修改弹框
      dialogVisible: false, //弹出框
      ruleForm: {
        //弹窗内容
        address_username: "",
        address_iphone: "",
        address_name: "",
        address_det: "",
        user_id: "",
        nid: "",
      },
      rules: {},
      searchInput: "",
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    // 数据列表
    list() {
      adminOftenAddresFind()
        .then((response) => {
          console.log(response);
          if (response.data.code == 200) {
            this.tableData = response.data.data;
            this.data = this.tableData;
            this.dataTotal = this.tableData.length;
            this.tableData = this.tableData.slice(0, this.PageSize);
          }
        })
        .catch((err) => {
          this.$message.error("获取失败！");
        });
    },
    // 编辑
    editTable(e) {
      this.disname = true;
      this.distype = true;
      this.ruleForm.address_username = e.address_username;
      this.ruleForm.address_iphone = e.address_iphone;
      this.ruleForm.address_name = e.address_name;
      this.ruleForm.address_det = e.address_det;
      this.ruleForm.user_id = e.user_id;
      this.ruleForm.nid = e.nid;
      this.dialogVisible = true;
    },
    // 删除
    Delete(e) {
      this.$confirm("确认删除这个地址吗？")
        .then((_) => {
          adminOftenAddresDelete({ nid: e.nid }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.message);
              this.list();
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch((_) => {
          this.$message.info("已取消");
        });
    },
    // 确认修改
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.distype = true;
          //更新
          adminOftenAddresUpdate(this.ruleForm)
            .then((res) => {
              if (res.data.code == 200) {
                this.ruleForm = {
                  address_username: "",
                  address_iphone: "",
                  address_name: "",
                  address_det: "",
                  user_id: "",
                  nid: "",
                };
                this.$message.success("修改成功！");
                this.dialogVisible = false;
                this.list();
              } else {
                this.$message.error("提交失败！");
              }
            })
            .catch((err) => {
              this.$message.error(err);
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 弹出框关闭确认
    handleClose() {
      this.ruleForm = {
        address_username: "",
        address_iphone: "",
        address_name: "",
        address_det: "",
        user_id: "",
        nid: "",
      };
      this.dialogVisible = false;
    },
    // 搜索
    changeKeySearch(queryString, cb) {
      console.log(this.searchInput, "se");
      adminOftenAddresKeySearch({ key: this.searchInput })
        .then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data;
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
      this.currentPage4 = e;
      this.tableData = data.slice(pageprev, pagenext);
    },
    // 页几个
    handleSizeChange(e) {
      let data = this.data;
      this.PageSize = e;
      this.currentPage4 = 1;
      let pageprev = (this.currentPage4 - 1) * e;
      let pagenext = this.currentPage4 * e;
      this.tableData = data.slice(pageprev, pagenext);
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
