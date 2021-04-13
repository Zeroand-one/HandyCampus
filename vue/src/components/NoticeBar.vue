<template>
  <div class="notificatBar">
    <div class="cardBox">
      <div class="cardHead">
        <p>消息中心</p>
        <i class="el-icon-close" @click="$store.commit('NoticeBar')"></i>
      </div>
      <ul class="conUl">
        <li
          v-for="item in msgList"
          @click="messagesReadId(item)"
          :key="item.id"
        >
          <router-link :to="item.link" class="conUl_link">
            <span class="conUl_sp0">{{ item.content }}</span>
            <span class="conUl_sp1">{{ item.time }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { messagesFindRead, messagesFindReadId } from "../api/messages";
import { courierAddFindList } from "../api/courier";
import getformat from "../utils/getformat";
export default {
  data() {
    return {
      msgList: [],
    };
  },
  created() {
    this.msgList = [];
    this.list();
  },
  methods: {
    list() {
      this.msgList = [];
      let read_state = 0;
      messagesFindRead(read_state).then((res) => {
        if ((res.data.code = 200)) {
          let list = res.data.data;
          console.log(list);
          list.forEach((e) => {
            let msg = {};
            msg.id = e.id;
            msg.content = e.message_title;
            msg.link = "/messageInfo/index";
            msg.time = new Date(e.start_date).getformat("yyyy-MM-dd HH:mm:ss");
            this.msgList.push(msg);
          });
        }
      });
      courierAddFindList().then((res) => {
        if ((res.data.code = 200)) {
          let list = res.data.data;
          console.log(list, "li");
          list.forEach((e) => {
            let msg = {};
            msg.id = e.user_id;
            msg.content = "申请骑手";
            msg.link = "/courier/add";
            msg.time = new Date(e.request_date).getformat(
              "yyyy-MM-dd HH:mm:ss"
            );
            this.msgList.push(msg);
          });
        }
      });
    },
    messagesReadId(e) {
      console.log(e, "e");
      if (e.content == "申请骑手") {
        this.$router.push({
          path: "/courier/add",
          query: { id: e.id },
        });
        this.$store.commit("NoticeBar");
        console.log(this.$store, "$store");
      } else {
        messagesFindReadId({ id: e.id }).then((res) => {
          if (res.data.code == 200) {
            this.list();
          }
        });
        this.$router.push({
          path: "/messageInfo/info",
          query: { id: e.id },
        });
        this.$store.commit("NoticeBar");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>