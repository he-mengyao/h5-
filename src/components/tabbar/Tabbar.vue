<template>
  <div class="tabbar">
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="wap-nav"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace to="/shopcar" icon="shopping-cart" :badge="badge"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {
    badge() {
      if (localStorage.getItem("userInfo")) {
        if (this.$store.state.num <= 0) {
          return "";
        } else {
          return this.$store.state.num;
        }
      }
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>