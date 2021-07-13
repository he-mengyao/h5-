<template>
  <div>
    <navs>
      <template #left>
        <van-icon name="arrow-left" size="20" @click="back" />
      </template>
      <template #middle>
        <div>订单结算</div>
      </template>
    </navs>
    <div class="div"></div>
    <!-- 地址 -->
    <div class="address center" @click="goAddress">
      <div v-if="Object.keys(defaultlist).length !== 0">
        <div class="location f20"><van-icon name="location-o" /></div>
        <div>
          <div class="flex-b mart-5">
            <div>收货人：{{ defaultlist.name }}</div>
            <div>{{ defaultlist.tel }}</div>
          </div>
          <div class="mart-5">收货地址：{{ defaultlist.address }}</div>
          <div style="color: #f6e0c6" class="mart-5">
            (收货不便时，可选择免费待收货服务)
          </div>
        </div>
        <div><van-icon name="arrow" class="arrow f20" /></div>
      </div>
      <div v-else class="clickaddress">点击添加收货地址</div>
    </div>
    <div class="caitiao"><img src="../../assets/caitiao.jpg" alt="" /></div>
    <!-- 商品 -->
    <div class="product" v-for="(item, index) in arr" :key="index">
      <div class="center f14">
        <img :src="item.image_path" alt="" class="border" />
        <div class="red pdlr-10" style="width: 220px">
          <div>{{ item.name }}</div>
          <div>{{ Number(item.present_price).toFixed(2) }}</div>
        </div>
        <div v-html="arr.length > 1 ? `x${item.count}` : `￥ ${count}`"></div>
      </div>
      <div class="line"></div>
    </div>
    <div class="settle flex-r ai-c">
      合计：<span class="red">{{ `￥ ${total.toFixed(2)}` }}</span
      >&nbsp;
      <van-button
        style="background: #eb544d; color: #fff; width: 100px"
        @click="submit(arr)"
        >提交订单</van-button
      >
    </div>
    <div class="div-b"></div>
  </div>
</template>

<script>
import Navs from "../../components/navs/Navs.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      arr: [],
      count: 0,
      defaultlist: {},
      total: 0,
      idDirect: false,
      orderId: [],
    };
  },
  components: { Navs },
  methods: {
    // 返回
    back() {
      if (localStorage.getItem("id")) {
        this.$router.push("/detail");
      } else {
        this.$router.push("/shopcar");
      }
    },
    goAddress() {
      this.$router.push("/address");
    },
    getData() {
      this.$api
        .getDefaultAddress()
        .then((res) => {
          if (res.defaultAdd) {
            this.defaultlist = res.defaultAdd;
          } else {
            this.getAddressList(); // 如果没有默认地址，就调用地址列表，取地址第一项
          }
          // console.log(this.defaultlist);
        })
        .catch((err) => {
          console.log("获取默认收货地址失败");
        });
    },
    submit(arr) {
      if (Object.keys(this.defaultlist).length !== 0) {
        this.$api
          .order({
            address: this.defaultlist.address,
            tel: this.defaultlist.tel,
            orderId: this.orderId,
            totalPrice: this.total,
            idDirect: this.idDirect,
            count: this.count,
          })
          .then((res) => {
            if (res.code === 200) {
              this.$toast("结算成功");
              this.$router.push("/all");
              let num = this.$store.state.num;
              num = num - arr.length;
              localStorage.setItem("num", num);
              this.$store.commit("setNum", num);
              localStorage.removeItem("count");
            }
          })
          .catch((err) => {
            console.log("提交订单请求失败");
          });
      } else {
        this.$toast("请先填写地址");
      }
    },
    getAddressList() {
      this.$api
        .getAddress()
        .then((res) => {
          if (res.code === 200) {
            if (res.address.length !== 0) {
              this.defaultlist = res.address[0];
            } else {
              this.defaultlist = {};
            }
          }
        })
        .catch((err) => {
          console.log("获取用户收货地址失败");
        });
    },
  },
  mounted() {
    // 判断地址,如果本地有地址，就用本地地址，如果没有，就调用默认地址
    if (!localStorage.getItem("address")) {
      this.getData();
    } else {
      this.defaultlist = JSON.parse(localStorage.getItem("address"));
    }
    localStorage.removeItem("address");
    this.arr = JSON.parse(localStorage.getItem("product"));
    // console.log(this.arr);
    // 获取产品提交订单时产品信息
    this.arr.map((item) => {
      if (localStorage.getItem("count")) {
        this.count = localStorage.getItem("count");
        this.total = this.count * item.present_price;
        this.idDirect = true;
        this.orderId.push(item.id);
      } else {
        this.count = this.arr[0].count;
        this.total += item.count * item.present_price;
        this.idDirect = false;
        this.orderId.push(item.id);
      }
    });
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.address {
  position: relative;
  height: 80px;
  .location {
    position: absolute;
    top: 40px;
    left: 12px;
  }
  .arrow {
    position: absolute;
    top: 40px;
    right: 12px;
  }
}

.product {
  margin-top: 15px;
  .center {
    padding: 10px 0;
  }
  img {
    width: 87px;
    height: 80px;
  }
}
.settle {
  position: fixed;
  background-color: #fff;
  right: 0;
  left: 0;
  bottom: 0;
}
.caitiao {
  width: 100%;
  height: 1px;
  img {
    height: 100%;
    width: 100%;
  }
}
.clickaddress {
  text-decoration: underline;
}
</style>