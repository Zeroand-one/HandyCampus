<template>
  <div class="notificatBar">
    <div class="cardBox">
      <div class="cardHead">
        <p>消息中心</p>
        <i class="el-icon-close" @click="$store.commit('NoticeBar')"></i>
      </div>
      <ul class="conUl">
        <li v-for="item in msgList" :key="item.id">
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
          link: "",
          time: "2021-01-12",
        },
        {
          id: "3",
          content: "大哥要练葵花宝典吗？",
          link: "",
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
};
</script>