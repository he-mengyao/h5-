<template>
  <div class="swipe">
    <van-swipe :autoplay="3000" indicator-color="#ef8c60">
      <van-swipe-item v-for="(item, index) in slides" :key="index">
        <img :src="item.image" alt="" @click="detail(item.goodsId)" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    slides: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    detail(id) {
      this.$router.push("/detail");
      localStorage.setItem("id", id);
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.swipe {
  width: 375px;
  height: 200px;
  background-color: pink;
  .van-swipe {
    height: 100%;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>