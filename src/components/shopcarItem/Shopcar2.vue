<template>
  <div class="col-center">
    <div class="order br"><img src="../../assets/shop.png" alt="" /></div>
    <div class="f18 marb-10">您的购物车还是空的</div>
    <van-button round style="height: 30px; border: 1px solid #999999" to="/"
      >去购物</van-button
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
  width: 200px;
  height: 200px;
  background-color: #eeeeee;
  padding: 30px;
  margin: 30px 0;
  img {
    height: 100%;
    width: 100%;
  }
}
</style>