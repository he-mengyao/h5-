<template>
  <div class="floor hots">
    <div class="center">
      <div class="red center title">热销食品</div>
    </div>
    <div class="bd wrap">
      <div
        class="item col-center flex-1"
        v-for="(item, index) in hotsProduct"
        :key="index"
        :class="{ item1: index === 0 }"
        @click="detail(item.goodsId, item)"
      >
        <img :src="item.image" alt="" />
        <div class="name overflow">{{ item.name }}</div>
        <div class="center">
          <div>{{ `￥${item.mallPrice}` }}</div>
          &nbsp;
          <div class="red del">{{ `￥${item.price}` }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    hotsProduct: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    detail(id, item) {
      console.log(item);
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
.title {
  height: 40px;
  .floor1 {
    height: 18px;
    width: 18px;
  }
}
.bd {
  width: 100%;
  background-color: #fff;
  .item {
    height: 220px;
    border-right: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    padding-left: 5px;
    img {
      width: 140px;
      height: 140px;
    }
    .name {
      height: 18px;
      width: 177px;
      text-align: center;
    }
  }
}
.hots {
  padding-bottom: 5rem;
}
</style>