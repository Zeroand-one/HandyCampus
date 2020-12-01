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
          height="10"
        >
          <template slot-scope="scope">
            <el-button type="info" @click="openOrderBody(scope.row)"
              >查看订单内容</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="图片" width="200">
          <!-- <template slot-scope="scope">
            <img :src="scope.row.order_img" alt="" class="intropic"
          /></template> -->
          <template slot-scope="scope">
            <el-button type="info" @click="openOrderImg(scope.row)"
              >查看订单图片</el-button
            >
          </template>
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
        <el-table-column prop="user_estimate" label="用户评价" width="200">
          <template slot-scope="scope">
            <el-button type="info" @click="openUserEstimate(scope.row)">
              查看用户评价
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="courier_back" label="骑手反馈" width="200">
          <template slot-scope="scope">
            <el-button type="info" @click="openCourierBack(scope.row)">
              查看骑手反馈
            </el-button>
          </template>
        </el-table-column>
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
            action="http://127.0.0.1:3030/"
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
    <!-- 查看内容弹出框 -->
    <el-dialog
      :title="body_title"
      :visible.sync="bodyDialogVisible"
      :before-close="bodyHandleClose"
      width="50%"
    >
      <p>{{ bodyDialog }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bodyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="bodyDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 查看图片弹框 -->
    <el-dialog
      title="查看图片弹框"
      :visible.sync="imgDialogVisible"
      :before-close="imgHandleClose"
      width="50%"
    >
      <el-upload
        :action="API_ROOT + '/uploadFile'"
        list-type="picture-card"
        :file-list="fileList"
        :on-preview="handlePictureCardPreview"
        :before-upload="beforeAvatarUpload"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgHandleClose">取 消</el-button>
        <el-button type="primary" @click="imgHandleClose">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import getNumList from "../../utils/getNumberList";
export default {
  data() {
    return {
      tableData: [],
      dia_title: "创建轮播图", //弹出框文字提示
      body_title: "查看订单内容", //弹出框文字提示
      dialogVisible: false, //添加弹出框
      bodyDialogVisible: false, // 查看内容
      bodyDialog: null, // 弹框内容
      dialogImageUrl: "",
      imgDialogVisible: false,
      API_ROOT: "", //接口前缀地址
      imgRuleForm: {}, //图片弹窗内容
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
      // 转态对应组
      statusList: [
        {
          id: 0,
          text: "未发布",
        },
        {
          id: 1,
          text: "草稿箱",
        },
        {
          id: 2,
          text: "已发布",
        },
        {
          id: 3,
          text: "骑手已接收",
        },
        {
          id: 4,
          text: "转让",
        },
        {
          id: 5,
          text: "完成",
        },
      ],
      // 类型对应组
      typeList: [
        {
          id: 0,
          text: "取快递",
        },
        {
          id: 1,
          text: "取外卖",
        },
        {
          id: 2,
          text: "代买",
        },
        {
          id: 3,
          text: "代赠",
        },
        {
          id: 4,
          text: "其他",
        },
      ],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        img: [{ required: true, message: "请上传轮播图片", trigger: "blur" }],
      },
      // 图片列表
      fileList: [],
    };
  },
  mounted() {
    this.API_ROOT = process.env.API_ROOT;
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
            let list = response.data;
            console.log(list, "ta");
            list.forEach((item) => {
              // item.order_img = "http://127.0.0.1:3030/" + item.order_img;
              this.statusList.forEach((e) => {
                if (e.id == item.order_state) {
                  item.order_state = e.text;
                }
              });
              this.typeList.forEach((e) => {
                if (e.id == item.order_type) {
                  item.order_type = e.text;
                }
              });
            });
            this.tableData = list;
          } else {
            this.$message.error(response.message);
          }
        })
        .catch((err) => {
          this.$message.error("获取失败");
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
    // 查看订单框打开
    openOrderBody(e) {
      this.bodyDialogVisible = true;
      this.body_title = "查看订单内容";
      // (this.ruleForm.order_body = e.order_body);
      this.bodyDialog = e.order_body;
    },
    // 查看框关闭
    bodyHandleClose() {
      this.bodyDialogVisible = false;
      this.bodyDialog = null;
    },
    // 查看用户反馈框打开
    openUserEstimate(e) {
      this.bodyDialogVisible = true;
      this.body_title = "查看用户反馈";
      if (e.user_estimate == null) {
        this.bodyDialog = "暂无";
      } else {
        this.bodyDialog = e.user_estimate;
      }
    },
    // 查看骑手反馈框打开
    openCourierBack(e) {
      this.bodyDialogVisible = true;
      this.body_title = "查看骑手反馈";
      if (e.courier_back == null) {
        this.bodyDialog = "暂无";
      } else {
        this.bodyDialog = e.courier_back;
      }
    },
    // 查看图片弹框
    openOrderImg(e) {
      this.imgDialogVisible = true;
      this.imgRuleForm.order_id = e.order_id;
      let file_list = e.order_img.substring(1).split(",");
      let item = {};
      file_list.forEach((i) => {
        item = {};
        if (i != "") {
          item.uid = Date.parse(new Date()) + Math.random() * 10;
          item.name = i;
          item.url = this.API_ROOT + "/" + i;
        }
        this.fileList.push(item);
      });
    },
    // 关闭弹框查看图片弹框
    imgHandleClose() {
      this.fileList = [];
      // console.log(1);
      this.imgDialogVisible = false;
      // this.$message.info("您以取消上传");
      // clearFiles();
    },
    // 上传成功
    handleSuccess(res, file, fileList) {
      console.log(res, file, fileList);
      file.name = res.imgUrl;
      let fileListStr = "";
      fileList.forEach((item) => {
        fileListStr += "," + item.name;
      });
      let parmas = {
        order_id: this.imgRuleForm.order_id,
        order_img: fileListStr,
      };
      this.$post("/wechat/orderImg", parmas)
        .then((res) => {
          this.$message.success(response.message);
          this.list();
        })
        .catch((err) => {
          // this.$message.error("上传成功");
          this.list();
        });
    },
    // 删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let fileListStr = "";
      fileList.forEach((item) => {
        fileListStr += "," + item.name;
      });
      let parmas = {
        order_id: this.imgRuleForm.order_id,
        order_img: fileListStr,
      };
      this.$post("/wechat/orderImg", parmas)
        .then((res) => {
          this.$message.success(response.message);
          this.list();
        })
        .catch((err) => {
          // this.$message.error("已修改");
          this.list();
        });
    },
    // 放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
