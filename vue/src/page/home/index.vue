<template>
  <div class="title">欢迎使用后台管理系统</div>
</template>
<script>
// import left
export default {
  mounted() {
    this.$get("/v1/api/admin/index")
      .then((response) => {
        // console.log(response)
        if (response.code == 200) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
  width: 100%;
  font-size: 35px;
}
</style>