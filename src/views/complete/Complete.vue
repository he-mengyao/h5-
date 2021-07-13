<template>
  <div class="body bgc-e">
    <navs class="nav bgc-w">
      <template #left>
        <van-icon name="arrow-left" @click="back" />
      </template>
      <template #middle>
        <div>我的订单</div>
      </template>
    </navs>
    <div class="div"></div>
    <van-tabs v-model="active">
      <van-tab title="全部">
        <div
          class="order bgc-w hidden"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="flex-b line-40">
            <div>订单编号：{{ item.order_id }}</div>
            <div class="status">交易完成</div>
            <van-divider />
          </div>
          <div
            v-for="(item1, index1) in item.order_list"
            :key="index1"
            class="item"
            @click="go(item1)"
          >
            <img :src="item1.image_path" alt="" />
            <div>{{ item1.name }}</div>
            <div class="orderprice">
              <div>{{ item1.present_price }}</div>
              <div class="sku">x&nbsp;{{ item1.count }}</div>
            </div>
          </div>
          <div class="line"></div>
          <div class="orderprice">
            <div>创建时间：{{ item.add_time }}</div>
            <div>收货地址：{{ item.address }}</div>
            <div>
              共{{ item.order_list.length }}件商品&nbsp;合计：&nbsp;{{
                item.mallPrice.toFixed(2)
              }}
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待支付">
        <div class="order bgc-w hidden">暂无内容</div></van-tab
      >
      <van-tab title="代发货"
        ><div class="order bgc-w hidden">暂无内容</div></van-tab
      >
      <van-tab title="待收货"
        ><div class="order bgc-w hidden">暂无内容</div></van-tab
      >
      <van-tab title="已完成">
        <div
          class="order bgc-w hidden"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="flex-b line-40">
            <div>订单编号：{{ item.order_id }}</div>
            <div class="status">交易完成</div>
            <van-divider />
          </div>
          <div
            v-for="(item1, index1) in item.order_list"
            :key="index1"
            class="item"
            @click="go(item1)"
          >
            <img :src="item1.image_path" alt="" />
            <div>{{ item1.name }}</div>
            <div class="orderprice">
              <div>{{ item1.present_price }}</div>
              <div class="sku">x&nbsp;{{ item1.count }}</div>
            </div>
          </div>
          <div class="line"></div>
          <div class="orderprice">
            <div>创建时间：{{ item.add_time }}</div>
            <div>收货地址：{{ item.address }}</div>
            <div>
              共{{ item.order_list.length }}件商品&nbsp;合计：&nbsp;{{
                item.mallPrice.toFixed(2)
              }}
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Navs from "../../components/navs/Navs.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      active: 4,
    };
  },
  components: { Navs },
  methods: {
    getData() {
      this.$api
        .myOrder()
        .then((res) => {
          if (res.code === 200) {
            this.list = res.list;
            // console.log(this.list);
          }
        })
        .catch((err) => {
          console.log("获取全部订单失败");
        });
    },
    back() {
      this.$router.push("/my");
    },
    go(item1) {
      console.log(item1);
      localStorage.setItem("id", item1.cid);
      this.$router.push("/detail");
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
.body {
  .nav {
    position: fixed;
    top: 0;
    left: 0;
  }
  .order {
    margin: 15px 12px 0;
    border-radius: 5px;
    padding: 10px;
    .status {
      color: #f08d60;
      margin-left: 40px;
    }
    .item {
      height: 100px;
      display: flex;
      justify-content: space-around;
      padding-top: 10px;
      img {
        width: 87px;
        height: 80px;
        border: 1px solid #eeeeee;
      }
    }
  }
}
.orderprice {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>