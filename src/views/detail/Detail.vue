<template>
  <div>
    <div v-if="Object.keys(data).length === 0"></div>
    <div v-else>
      <navs style="border: 0">
        <template #left>
          <div class="back">
            <van-icon name="arrow-left" @click="back" />
          </div>
        </template>
      </navs>
      <div class="div"></div>
      <div class="pdlr-10">
        <div class="product center bgc-w bb">
          <van-image-preview v-model="show" :images="images" @change="onChange">
            <template v-slot:index></template>
          </van-image-preview>
          <van-swipe :autoplay="3000" indicator-color="#f08e60">
            <van-swipe-item>
              <img :src="data.image_path" alt="" @click="changeShow" />
            </van-swipe-item>
            <van-swipe-item>
              <img :src="data.image_path" alt="" @click="changeShow" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="title f14" style="padding-top: 10px">{{ data.name }}</div>
        <div class="price red bb" style="padding-bottom: 20px">
          {{ `￥ ${data.present_price}` }}
        </div>
        <div class="flex-b line-40 sku">
          <div>运费：0</div>
          <div>剩余：{{ data.amount }}</div>
          <div class="center">
            {{ `${text}:` }}&nbsp;
            <van-icon
              name="like"
              size="20"
              @click="checkLogin(data, 1)"
              :class="{ red: text === '取消收藏' }"
            />
          </div>
        </div>
        <div class="line-40 flex-b">
          <div class="center">
            <van-icon name="shop-o" size="20" />&nbsp; 有赞的店&nbsp;
            <div class="bgc-red cw official center f12">官方</div>
          </div>
          <div>
            进入店铺
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="line-40">
          <van-tabs v-model="active" title-active-color="#ec5851">
            <van-tab title="商品详情">
              <div style="line-height: 0">
                <div v-html="data.detail"></div>
              </div>
            </van-tab>
            <van-tab title="商品评论">商品评论</van-tab>
          </van-tabs>
        </div>
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" />
          <van-goods-action-icon
            icon="shopping-cart-o"
            text="购物车"
            @click="goCart"
            :badge="badge"
          />
          <van-goods-action-button
            type="warning"
            text="加入购物车"
            @click="checkLogin(data.id, 2)"
          />
          <van-goods-action-button
            type="danger"
            text="立即购买"
            square
            @click="shop(data)"
          />
        </van-goods-action>
        <van-popup
          v-model="show1"
          closeable
          position="bottom"
          :style="{ height: '35%' }"
        >
          <div class="content">
            <div class="bd">
              <div class="flex content1">
                <img :src="data.image_path" alt="" class="border" />
                <div class="pdl-15">
                  <div class="name">{{ data.name }}</div>
                  <div class="red">{{ `￥ ${data.present_price}` }}</div>
                </div>
              </div>
              <van-divider />
              <div class="flex f12">
                <div style="margin-right: 30px">
                  <div>购买数量：</div>
                  <div>
                    剩余：{{ data.amount }}件<span class="red"
                      >&nbsp;每人限购50件</span
                    >
                  </div>
                </div>
                <div>
                  <van-stepper
                    v-model="value"
                    integer
                    min="1"
                    max="50"
                    @change="change"
                  />
                </div>
              </div>
              <van-divider />
            </div>
            <van-button
              color="#ec554c"
              style="width: 100%"
              @click="checkLogin(data, 3)"
              >立即购买</van-button
            >
          </div>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
import Navs from "../../components/navs/Navs.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      data: {},
      active: 0,
      show: false,
      index: 0,
      images: [],
      text: "收藏商品",
      show1: false,
      value: 1,
    };
  },
  components: {},
  methods: {
    // 获取商品信息
    getData(id) {
      this.$api
        .goods(id)
        .then((res) => {
          if (!res.goods.goodsOne) {
            this.$toast("商品已售完");
            this.$router.push("/");
          } else {
            this.data = res.goods.goodsOne;
            this.images.push(this.data.image);
            this.images.push(this.data.image);
            // console.log(this.data);
            this.$utils.saveHistory({
              username: JSON.parse(this.$store.state.userInfo).username,
              key: "browse",
              data: this.data,
              attr: "id",
            });
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    // 去往购物车
    goCart() {
      this.$router.push("/shopcar");
    },
    // 返回
    back() {
      this.$router.back();
      localStorage.removeItem("id");
    },
    // 图片预览，滑动查看
    onChange(index) {
      this.index = index;
    },
    // 图片预览
    changeShow() {
      this.show = true;
    },
    // 加入购物车
    add(id) {
      // console.log(id);
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
    },
    // 收藏与取消收藏
    collect(data) {
      this.isCollect();
      if (this.text === "收藏商品") {
        this.$api
          .collection(data)
          .then((res) => {
            if (res.code === 200) {
              this.$toast(res.msg);
              this.text = "取消收藏";
              // console.log(res);
            }
          })
          .catch((err) => {
            console.log("获取单个收藏失败");
          });
      } else if (this.text === "取消收藏") {
        this.$api
          .cancelCollection({ id: data.id })
          .then((res) => {
            if (res.code === 200) {
              this.$toast(res.msg);
              // console.log(res);
              this.text = "收藏商品";
            }
          })
          .catch((err) => {
            console.log("取消收藏获取失败");
          });
      }
    },
    // 是否收藏
    isCollect(id) {
      this.$api
        .isCollection({ id: id })
        .then((res) => {
          // console.log(res);
          if (res.isCollection === 0) {
            this.text = "收藏商品";
          } else {
            this.text = "取消收藏";
          }
        })
        .catch((err) => {
          console.log("查询是否收藏失败");
        });
    },
    // 立即购买弹出
    shop(data) {
      this.show1 = true;
    },
    // 立即购买
    immediShop(data) {
      let product = [data];
      localStorage.setItem("product", JSON.stringify(product));
      localStorage.setItem("count", this.value);
      this.$router.push("/settle");
    },
    // 检查用户是否登录
    checkLogin(data, index) {
      let text = null;
      if (index === 1) {
        this.$utils.checkLogin({
          key: "userInfo",
          next: this.collect,
          item: data,
        });
      } else if (index === 2) {
        this.$utils.checkLogin({
          key: "userInfo",
          next: this.add,
          item: data,
        });
      } else if (index === 3) {
        this.$utils.checkLogin({
          key: "userInfo",
          next: this.immediShop,
          item: data,
        });
      }
    },
    // 改变立即购买数量
    change(value) {
      this.$api
        .editCart({
          count: value,
          id: this.data.id,
          mallPrice: this.data.present_price,
        })
        .then((res) => {})
        .catch((err) => {
          console.log("加减购物车请求失败");
        });
    },
  },
  mounted() {
    let id = localStorage.getItem("id");
    this.getData(id);
    if (localStorage.getItem("userInfo")) {
      this.isCollect(id);
    } else {
      this.text = "收藏商品";
    }
  },
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
  watch: {
    value(val) {
      if (val >= 50) {
        this.value = 50;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.product {
  height: 385px;
  img {
    width: 100%;
    height: 100%;
  }
}
.official {
  width: 34px;
  height: 20px;
  border-radius: 3px;
}
.content {
  // position: relative;
  height: 35%;
  .content1 {
    height: 80px;
    img {
      // position: absolute;
      width: 85px;
      height: 80px;
      // top: -5px;
      // left: 0;
    }
    .name {
      width: 80%;
    }
  }
}
.bd {
  padding: 12px 12px 0;
}
</style>