<template>
  <div>
    <div class="className">
      <p class="title">主页Banner修改</p>

      <el-upload
        :action="API_ROOT + '/uploadFile/Banner'"
        list-type="picture-card"
        :file-list="fileList"
        :on-preview="handlePictureCardPreview"
        :before-upload="beforeAvatarUpload"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <el-dialog :visible.sync="PicturedialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import {
  deleteBannerImg,
  indexBannerImg,
  indexBannerFind,
} from "../../api/Banner";
export default {
  data() {
    return {
      fileList: [],
      dialogImageUrl: "",
      imgDialogVisible: false,
      PicturedialogVisible: false,
      API_ROOT: "", //接口前缀地址
      imgRuleForm: {}, //图片弹窗内容
    };
  },
  mounted() {
    this.list();
    this.API_ROOT = process.env.API_ROOT;
  },
  methods: {
    // 数据请求
    list() {
      this.fileList = [];
      indexBannerFind().then((res) => {
        console.log(res, "re");
        let imglist = res.data.data[0].img;
        let file_list = [];
        if (imglist) {
          file_list = imglist.substring(1).split(",");
          let item = {};
          file_list.forEach((i) => {
            item = {};
            if (i != "") {
              item.name = i;
              item.url = this.API_ROOT + "/banner/" + i;
            }
            this.fileList.push(item);
            console.log(this.fileList);
          });
        } else {
          this.fileList = [];
        }
      });
    },
    // 放大图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.PicturedialogVisible = true;
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
    // 上传成功
    handleSuccess(res, file, fileList) {
      console.log(res, file, fileList);
      file.name = res.imgUrl;
      let fileListStr = "";
      fileList.forEach((item) => {
        fileListStr += "," + item.name;
      });
      let parmas = {
        img: fileListStr,
      };
      indexBannerImg(parmas)
        .then((res) => {
          this.$message.success(res.data.message);
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
        img: fileListStr,
      };
      indexBannerImg(parmas)
        .then((res) => {
          this.$message.success(res.data.message);
          this.list();
        })
        .catch((err) => {
          // this.$message.error("已修改");
          this.list();
        });
      deleteBannerImg({ filename: file.name })
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
};
</script>
<style lang="scss"  scoped>
/deep/
  .el-upload-list--picture-card
  .el-upload-list__item
  .el-upload-list__item-thumbnail {
  width: 185%;
}
</style>