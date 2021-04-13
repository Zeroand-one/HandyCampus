<template>
  <div class="content">
    申请时间：{{ data.request_date }}
    <div class="box">
      <div class="textright">
        <p>生日：{{ data.birthday }}</p>
        <p>详细地址：{{ data.address }}</p>
        <p>性别：{{ data.sex }}</p>
        <p>学号：{{ data.studenid }}</p>
      </div>
      <div class="textleft">
        <p>用户ID: {{ data.user_id }}</p>
        <p>昵称：{{ data.user_name }}</p>
        <p>姓名：{{ data.name }}</p>
        <p>联系电话：{{ data.phone }}</p>
      </div>
    </div>
    <div class="btn">
      <el-button type="success" @click="onSubmit">同意</el-button>
      <el-button type="warning" @click="onSubmit">拒绝</el-button>
    </div>
  </div>
</template>
<script>
import moment from "moment";

import { courierAddFindId, courierManageId } from "../../api/courier";
export default {
  data() {
    return {
      id: 0,
      data: {},
    };
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    this.list();
  },
  methods: {
    list() {
      let id = this.id;
      courierAddFindId({ id: id }).then((res) => {
        console.log(res.data, "r");
        let data = res.data.data[0];
        this.data = data;
        this.data.birthday = moment(data.birthday).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.data.request_date = moment(data.request_date).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.data.sex = data.sex == 0 ? "男" : "女";
      });
    },
    onSubmit(e) {
      console.log(e.target.innerText, "e");
      let params = {
        id: this.id,
        user_type: 0,
      };
      let type = e.target.innerText;
      if (type == "同意") {
        params.user_type = 1;
        courierManageId(params).then((res) => {
          this.$message.success("同意！");
          this.$router.push({
            path: "/courier/index",
          });
        });
      } else {
        params.user_type = 0;
        courierManageId(params).then((res) => {
          this.$message.success("已拒绝");
          this.$router.push({
            path: "/user/index",
          });
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 90%;
  padding: 3%;
  padding-top: 5%;
  border-radius: 20px;
  box-shadow: 2px 3px 5px 4px #999;
  .box {
    display: flex;
    justify-content: space-between;
  }
  .btn {
    width: 40%;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-button:last-of-type {
      margin-left: 20px;
    }
  }
}
</style>