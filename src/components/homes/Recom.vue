<template>
  <div class="mart-10">
    <div class="floor-title">商品推荐</div>
    <div class="floor-bd hidden flex" ref="wrapper">
      <div class="flex-1 flex" ref="cont">
        <div
          class="item col-center"
          v-for="(item, index) in recommend"
          :key="index"
          @click="detail(item.goodsId, item)"
        >
          <img :src="item.image" alt="" />
          <div style="width: 120px; height: 18px" class="overflow">
            {{ item.goodsName }}
          </div>
          <div class="flex ai-c">
            <div>{{ `￥${item.mallPrice}` }}</div>
            &nbsp;
            <div class="del sku">{{ `￥${item.price}` }}</div>
          </div>
          <div class="flex cw shopping hidden mart-10">
            <button class="shop center" @click.stop="checkLogin(item.goodsId)">
              <van-icon name="cart" />
            </button>
            <button class="look">查看详情</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "",
  props: {
    recommend: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    verScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical", // 点击可以滑动
          });
        } else {
          this.scroll.refresh(); //如果dom结构发生改变调用该方法
        }
      });
    },
    detail(id, item) {
      // console.log(item);
      this.$router.push("/detail");
      localStorage.setItem("id", id);
    },
    add(id) {
      if (this.$store.state.userInfo !== null) {
        this.$api
          .addShop(id)
          .then((res) => {
            this.$toast(res.msg);
            this.$api
              .getCard()
              .then((res) => {
                // console.log(res);
                this.$store.commit("setNum", res.shopList.length);
                localStorage.setItem("num", res.shopList.length);
              })
              .catch((err) => {
                console.log("请求购物车列表失败");
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$dialog.alert({
          title: "登录后才可启用此功能",
          message: "是否跳转登录/注册功能",
        });
      }
    },
    checkLogin(id) {
      this.$utils.checkLogin({
        key: "userInfo",
        next: this.add,
        item: id,
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      let timer = setTimeout(() => {
        // 其实我也不想写这个定时器的，这相当于又嵌套了一层$nextTick，但是不这么写会失败
        if (timer) {
          clearTimeout(timer);
          this.verScroll();
        }
      }, 0);
    });
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.floor-bd {
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  background-color: #fff;
  height: 180px;
  .item {
    height: 175px;
    width: 125px;
    border-right: 1px solid #eeeeee;
    padding-left: 5px;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .shopping {
    height: 20px;
    width: 100px;
    border-radius: 5px;
  }
  .shop {
    width: 33px;
    background-color: #f6ca57;
  }
  .look {
    background-color: #ed5b44;
    width: 77px;
  }
}
</style>