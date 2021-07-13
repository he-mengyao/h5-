<template>
  <div class="col-center">
    <div class="order" style="margin-top: 20px">
      <img src="../../assets/order.gif" alt="" />
    </div>
    <div class="f18 marb-10">登录后才能查看订单</div>
    <van-button type="primary" style="height: 40px" to="/register"
      >请先登录</van-button
    >
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
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.order {
  img {
    width: 100%;
  }
}
</style>