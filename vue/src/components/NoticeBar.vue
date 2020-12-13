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
import getformat from "../utils/getformat";
export default {
  data() {
    return {
      msgList: [
        {
          id: "1",
          content: "大佬上线了",
          link: "",
          time: "2020-10-01",
        },
        {
          id: "2",
          content: "大哥别杀我",
          link: "/home",
          time: "2021-01-12",
        },
        {
          id: "3",
          content: "大哥要练葵花宝典吗？",
          link: "/user",
          time: "2021-02-16",
        },
        {
          id: "4",
          content: "密码修改成功！",
          link: "",
          time: "2021-04-26",
        },
      ],
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
            msg.time = new Date(e.start_date).getformat("yyyy-MM-dd hh:mm:ss");
            this.msgList.push(msg);
          });
        }
      });
    },
    messagesReadId(e) {
      console.log(e, "e");
      messagesFindReadId({ id: e.id }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data);
        }
      });
      this.$router.push({
        path: "/messageInfo/info",
        query: { id: e.id },
      });
      this.list();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>