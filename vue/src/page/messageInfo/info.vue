<template>
  <div class="content">
    <!-- <h1>反馈详情</h1> -->
    <div class="msg_body">
      <div class="user_info">
        <div class="msgqq">用户QQ: {{ data.message_qq }}</div>
        <div class="msgemail">用户邮箱: {{ data.message_email }}</div>
      </div>
      <div class="msginfo">
        <h3>{{ data.message_title }}</h3>
        <div class="start_date">{{ data.start_date }}</div>
        <p>{{ data.message_body }}</p>
        <div class="img">
          <el-upload
            :action="API_ROOT + '/uploadFile'"
            list-type="picture-card"
            :file-list="fileList"
            :on-preview="handlePictureCardPreview"
          >
          </el-upload>
        </div>
      </div>
      <div class="write_back">
        <el-form
          ref="data"
          :model="data"
          label-width="80px"
          style="width: 100%"
        >
          <el-form-item label="回复：" prop="write_back">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="data.write_back"
            >
            </el-input>
          </el-form-item>
          <el-form-item size="large" class="btn">
            <el-button type="primary" @click="onSubmit(data)">回复</el-button>
          </el-form-item>
        </el-form>

        <!-- {{ data.write_back }} -->
      </div>
    </div>

    <!-- 查看图片 -->

    <el-dialog :visible.sync="PicturedialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import {
  messagesFindId,
  messagesFindRead,
  messagesUpdate,
  messagesDelete,
} from "../../api/messages";
export default {
  data() {
    return {
      id: 0,
      data: {
        message_email: "",
        message_qq: "",
        message_title: "",
        message_img: "",
        start_date: null,
        read_state: "",
        write_back: "",
      },
      dialogVisible: false,
      dialogImageUrl: "",
      API_ROOT: "",
      // 图片列表
      fileList: [],
      PicturedialogVisible: false,
    };
  },
  created() {},
  mounted() {
    this.API_ROOT = process.env.API_ROOT;
    this.id = this.$route.query.id;
    this.list();
  },
  methods: {
    list() {
      let id = this.id;
      this.fileList = [];
      messagesFindId({ id: id }).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.data[0];

          let file_list = [];
          if (data.message_img) {
            file_list = data.message_img.substring(1).split(",");
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
          } else {
            this.fileList = [];
          }
          this.data = data;
          this.data.start_date = moment(data.start_date).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          console.log(this.data.start_date, "data");
        } else {
          this.$message.error("获取失败！");
        }
      });
    },
    onSubmit(e) {
      console.log(e, "e");
      let param = { write_back: e.write_back, id: e.id };
      messagesUpdate(param).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("回复成功！");
          this.list();
        } else {
          this.$message.error("回复失败！");
        }
      });
    },
    // 放大图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.PicturedialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 90%;
  // margin: 0 auto;
  padding: 3%;
  padding-top: 5%;
  box-shadow: 2px 3px 5px 4px #999;
  h1 {
    margin: 0 auto;
    width: 100%;
    text-align: center;
  }
  .msg_body {
    .user_info {
      display: flex;
      justify-content: space-between;
    }
    .msginfo {
      widows: 100%;
      h3 {
        text-align: center;
      }
      .start_date {
        text-align: end;
      }
      p {
        text-indent: 36px;
      }
      .img {
        padding-top: 10px;
        /deep/ .el-upload {
          display: none;
        }
        /deep/ .el-upload-list__item-delete {
          display: none;
        }
      }
    }
    .write_back {
      .el-form {
        width: 100%;
      }
    }
  }
}
</style>