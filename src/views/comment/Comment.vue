<template>
  <div>
    <navs>
      <template #left>
        <van-icon name="arrow-left" @click="back" size="20" color="#6296f3" />
      </template>
      <template #middle>
        <div>评价中心</div>
      </template>
    </navs>
    <div class="div"></div>
    <div class="product">
      <img :src="item.image_path" alt="" />
      <div class="rate">
        <div>商品评分</div>
        <van-rate v-model="score" />
      </div>
    </div>
    <div class="body">
      <van-field
        v-model="message"
        rows="1"
        type="textarea"
        placeholder="说说你的购买感受吧~~"
        style="background: #eeeeee; height: 270px"
      >
      </van-field>
      <van-checkbox v-model="checked" icon-size="24px" style="padding: 20px"
        >匿名评价</van-checkbox
      >
      <div class="center">
        <van-button type="primary" style="width: 90%" @click="submit"
          >提交</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      item: {},
      message: "",
      checked: false,
      score: 0,
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.push("/assess");
    },
    submit() {
      this.$api
        .comment({
          id: this.item.cid,
          rate: this.score,
          content: this.message,
          anonymous: this.checked,
          _id: this.item._id,
          order_id: this.item.order_id,
          image: [],
        })
        .then((res) => {
          if (res.code === 200) {
            this.$toast(res.msg);
            this.$router.push("/assess");
          }
        })
        .catch((err) => {
          console.log("评价请求失败");
        });
    },
  },
  mounted() {
    this.item = JSON.parse(localStorage.getItem("comment"));
    console.log(this.item);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.product {
  height: 110px;
  display: flex;
  align-items: center;
  img {
    width: 80px;
    height: 98px;
    margin: 0 50px 0 20px;
  }
  .rate {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>