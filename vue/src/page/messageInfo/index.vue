<template>
  <div class="className">
    <div class="classBut">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="searchInput"
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
          label="id值"
          prop="id"
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
          prop="message_email"
          align="center"
          width="200"
          label="邮箱"
        ></el-table-column>
        <el-table-column
          prop="message_title"
          align="center"
          label="标题"
        ></el-table-column>
        <el-table-column prop="read_state" align="center" label="阅读状态">
          <template slot-scope="{ row: { read_state } }">
            <span v-if="read_state == '0'">未读</span>
            <span v-else>已读</span>
          </template>
        </el-table-column>
        <el-table-column prop="user_type" align="center" label="是否回复">
          <template slot-scope="{ row: { write_back } }">
            <span v-if="!write_back">未回复</span>
            <span v-else>已回复</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" @click="viewDetails(scope.row)"
              >查看</el-button
            >
            <el-button type="danger" @click="Delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
  messagesFindAll,
  messagesFindRead,
  messagesUpdate,
  messagesDelete,
  messagesFindReadId,
} from "../../api/messages";
export default {
  data() {
    return {
      tableData: [], //数据列表
      table: [], //缓存数据列表
      dataTotal: 0,
      currentPage4: 1, // 当前页数
      PageSize: 5, // 当前个数
      id: null, //操作id
      ruleForm: {
        //弹窗内容
        user_name: null,
        name: null,
        password: "",
        phone: "",
        address: "",
        studenid: "",
        user_type: "0",
        user_id: "",
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
      messagesFindAll()
        .then((response) => {
          console.log(response);
          if (response.data.code == 200) {
            this.tableData = response.data.data;
            this.data = this.tableData;
            this.dataTotal = this.tableData.length;
            this.tableData = this.tableData.slice(0, this.PageSize);
            this.tableData.forEach((item) => {
              item.time = moment(item.time).format("YYYY-MM-DD hh:mm:ss");
              item.newtime = moment(item.newtime).format("YYYY-MM-DD hh:mm:ss");
              // item.time
            });
          }
        })
        .catch((err) => {
          this.$message.error("获取失败！");
        });
    },
    // 查看
    viewDetails(e) {
      this.disname = true;
      this.distype = true;
      this.id = e.id;
      messagesFindReadId({ id: this.id }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data);
        }
      });
      this.$router.push({
        path: "/messageInfo/info",
        query: { id: this.id },
      });
    },
    // 删除
    Delete(e) {
      console.log(e, "e");
      this.$confirm("确认删除这个反馈吗？")
        .then((_) => {
          messagesDelete({ id: e.id }).then((res) => {
            console.log(res.data);
            if (res.data.code == 200) {
              this.$message.success(res.data.data);
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
    // 翻页
    handleCurrentChange(e) {
      let data = this.data;
      let pageprev = (e - 1) * this.PageSize;
      let pagenext = this.PageSize * e;
      this.currentPage4 = e;
      this.tableData = data.slice(pageprev, pagenext);
      console.log(this.currentPage4, e, "1", this.PageSize);
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
