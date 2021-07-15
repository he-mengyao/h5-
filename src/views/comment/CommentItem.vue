<template>
  <div style="height: 100%">
    <navs>
      <template #left>
        <van-icon name="arrow-left" @click="back" size="20" color="#6296f3" />
      </template>
      <template #middle>
        <div>评价详情</div>
      </template>
    </navs>
    <div class="div"></div>
    <div style="padding: 0 10px">
      <div class="user">
        <div class="flex">
          <div>
            <img
              src="../../assets/icon.svg"
              alt=""
              style="height: 50px; width: 50px"
            />
          </div>
          <div class="user-rate">
            <div>{{ nickname }}</div>
            <div style="margin-top: 10px">
              <van-rate v-model="obj.rate" />
            </div>
          </div>
          <div class="time">{{ obj.comment_time }}</div>
        </div>
        <div>{{ `评价内容:${obj.content}` }}</div>
      </div>
      <div>
        <div v-for="(item, index) in obj.goods" :key="index" class="product">
          <img :src="item.image_path" alt="" />
          <div>{{ item.name }}</div>
          <div class="cart center" @click="addCart(item)">
            <van-icon name="shopping-cart-o" size="20" />
          </div>
        </div>
      </div>
    </div>
    <div class="center comment-back">
      <van-button type="primary" style="width: 90%" @click="back"
        >返回</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      obj: {},
      nickname: "",
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.push("/assess");
    },
    // 获取评价详情
    getData() {
      this.$api
        .evaluateOne({
          id: this.$route.query.id,
          _id: this.$route.query._id,
        })
        .then((res) => {
          if (res.code === 200) {
            this.obj = res.evaluateOne;
            if (res.evaluateOne.anonymous !== true) {
              this.nickname = this.obj.user[0].nickname;
            }
          }
        })
        .catch((err) => {
          console.log("获取单条评论失败");
        });
    },
    // 加入购物车
    addCart(item) {
      this.$api
        .addShop(item.id)
        .then((res) => {
          if (res.code === 200) {
            this.$toast(res.msg);
          }
        })
        .catch((err) => {
          console.log("加入购物车请求失败");
        });
    },
    back() {
      this.$router.back();
    },
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.user {
  position: relative;
  height: 100px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .user-rate {
    position: absolute;
    top: 15px;
    left: 65px;
  }
  .time {
    position: absolute;
    top: 28px;
    right: 0;
  }
}
.product {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
  }
  .cart {
    height: 40px;
    width: 40px;
    color: #ec463d;
    background-color: #fbe6e3;
    border-radius: 100%;
  }
}
.comment-back {
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
}
</style>