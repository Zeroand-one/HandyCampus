<template>
  <div class="className">
    <div class="classBut">
      <el-button type="primary" @click="addRolesTab">添加轮播</el-button>
    </div>
    <div class="classpage">
      <el-table :data="tableData" border stripe>
        <el-table-column prop="user_id" label="用户id"></el-table-column>
        <el-table-column prop="user_name" label="用户名"></el-table-column>
        <el-table-column
          prop="order_id"
          label="订单id"
          width="200"
        ></el-table-column>
        <el-table-column prop="order_state" label="订单状态"></el-table-column>
        <el-table-column prop="order_title" label="订单标题"></el-table-column>
        <el-table-column
          prop="order_body"
          label="订单内容"
          width="200"
        ></el-table-column>
        <el-table-column label="图片" width="200">
          <template slot-scope="scope">
            <img :src="scope.row.order_img" alt="" class="intropic"
          /></template>
        </el-table-column>
        <el-table-column
          prop="money"
          label="金额"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="start_date"
          label="创建时间"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="open_date"
          label="发布时间"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="receive_date"
          label="接收时间"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="transfer_date"
          label="转让时间"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="end_date"
          label="结束时间"
          width="150"
        ></el-table-column>
        <el-table-column prop="order_type" label="订单类型"></el-table-column>
        <el-table-column
          prop="courier_id"
          label="骑手id"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="courier_name"
          label="骑手姓名"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="user_estimate"
          label="用户评价"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="courier_back"
          label="骑手反馈"
          width="200"
        ></el-table-column>
        <el-table-column label="操作" width="300">
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
        <el-form-item label="轮播标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="轮播图片" prop="img">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="选择跳转" prop="title">
          <el-select v-model="ruleForm.link" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
export default {
  data() {
    return {
      tableData: [],
      dia_title: "创建轮播图", //弹出框文字提示
      dialogVisible: false, //弹出框
      ruleForm: {}, //弹窗内容
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        img: [{ required: true, message: "请上传轮播图片", trigger: "blur" }],
      },
    };
  },
  created() {
    this.list();
  },
  methods: {
    // 数据列表
    list() {
      this.$get("/vue/orderFind")
        .then((response) => {
          if (response.code == 200) {
            this.tableData = response.data;
            this.tableData.forEach((item) => {
              console.log(item);
              switch (item.order_state) {
                case 0:
                  item.order_state = "未发布";
                  break;
                case 1:
                  item.order_state = "草稿箱";
                  break;
                case 2:
                  item.order_state = "已发布";
                  break;
                case 3:
                  item.order_state = "骑手已接收";
                  break;
                case 4:
                  item.order_state = "转让";
                  break;
                default:
                  item.order_state = "完成";
                  break;
              }
              switch (item.order_type) {
                case 0:
                  item.order_type = "取快递";
                  break;
                case 1:
                  item.order_type = "取外卖";
                  break;
                case 2:
                  item.order_type = "代买";
                  break;
                case 3:
                  item.order_type = "代赠";
                  break;
                default:
                  item.order_type = "其他";
                  break;
              }
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
      this.dia_title = "创建轮播图";
      this.dialogVisible = true;
    },
    // 确认发布
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if ((this.dia_title = "创建轮播图")) {
            console.log("创建轮播图");
          } else {
            console.log("编辑轮播图");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 弹出框关闭确认
    handleClose() {
      this.ruleForm = {};
      this.dialogVisible = false;
    },
    // 编辑
    editTable(e) {
      this.ruleForm.title = e.title;
      this.ruleForm.img = e.img;
      this.ruleForm.link = e.link;
      this.dia_title = "编辑轮播图";
      this.dialogVisible = true;
    },
    // 删除
    Delete(e) {
      this.$confirm("确认删除这个轮播图吗？")
        .then((_) => {
          console.log(e.id);
        })
        .catch((_) => {});
    },
    // 图片上传成功后
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传中
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
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
  .intropic {
    width: 200px;
    height: 150px;
  }
}
</style>
