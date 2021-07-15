<template>
  <div class="pdlr-10">
    <div class="ding">
      <div class="top both-center mar-20">
        <div class="fl center">
          <input type="checkbox" v-model="checked" @change="checkAll" />{{
            checked ? "取消全选" : "全选"
          }}
        </div>
        <div class="fr">
          <div class="flex ai-c">
            合计：<span class="price">{{ Number(total).toFixed(2) }}</span>
          </div>
          <div>请确认订单</div>
        </div>
      </div>
      <div class="btn-setting">
        <div
          class="line"
          v-if="
            checked ||
            shopList.some((item) => {
              return item.check === true;
            })
          "
        ></div>
        <div
          class="flex-r mart-5"
          v-if="
            checked ||
            shopList.some((item) => {
              return item.check === true;
            })
          "
        >
          <van-button
            color="#d4317d"
            style="height: 40px"
            @click="
              del(
                shopList.filter((item) => {
                  return item.check === true;
                })
              )
            "
            >删除</van-button
          >&nbsp;
          <van-button color="#d4317d" style="height: 40px" @click="settle"
            >去结算</van-button
          >
        </div>
      </div>
    </div>
    <div style="height: 110px"></div>
    <div class="product">
      <div v-for="(item, index) in shopList" :key="index">
        <div class="flex product-item">
          <input
            type="checkbox"
            v-model="item.check"
            @change="checkChange(item)"
          />
          <img
            :src="item.image_path"
            alt=""
            class="borde br"
            @click="detail(item.id)"
          />
          <div class="flex col item both">
            <div class="red" @click="detail(item.id)">{{ item.name }}</div>
            <div class="flex-b">
              <div class="red" style="font-weight: 400">
                {{ item.present_price.toFixed(2) }}
              </div>
              &nbsp; &nbsp;
              <div class="flex">
                <div class="reduce" @click="reduce(item)">-</div>
                <input type="text" v-model="item.count" />
                <div class="reduce" @click="increase(item)">+</div>
              </div>
            </div>
          </div>
        </div>
        <div class="line"></div>
      </div>
    </div>
    <div class="div-b"></div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    shopList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      checked: false,
    };
  },
  components: {},
  methods: {
    reduce(item) {
      item.count > 1 ? item.count-- : (item.count = 1);
    },
    increase(item) {
      item.count++;
    },
    checkAll() {
      this.shopList.map((item) => {
        item.check = this.checked;
      });
    },
    checkChange(item) {
      this.checked = this.shopList.every((item) => {
        return item.check === true;
      });
      // console.log(this.shopList);
    },
    del(arr) {
      this.$dialog
        .confirm({
          title: "购物车删除",
          message: "您确定删除商品吗？",
        })
        .then(() => {
          // on confirm
          let arr1 = [];
          // 得到选中的数据，将cid组成一个数组
          arr.map((item) => {
            arr1.push(item.cid);
          });
          this.$api
            .deleteShop(arr1)
            .then((res) => {
              if (res.code === 200) {
                this.$toast(res.msg);
                let num = this.shopList.filter((item) => {
                  return item.check !== true;
                }).length;
                // 将删除这个操作传给父组件
                this.$emit("del", true);
                // 将本地存储和 vuex的下标进行改变
                localStorage.setItem("num", num);
                this.$store.commit("setNum", num);
              }
            })
            .catch((err) => {
              console.log("删除商品请求失败");
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    settle() {
      let product = [];
      this.shopList.map((item) => {
        if (item.check === true) {
          product.push(item);
        }
      });

      localStorage.setItem("product", JSON.stringify(product));
      this.$router.push("/settle");
    },
    detail(id) {
      // console.log(item);
      this.$router.push("/detail");
      localStorage.setItem("id", id);
    },
  },
  mounted() {
    this.shopList.map((item) => {
      this.$set(item, "id", item.cid);
    });
  },
  computed: {
    total() {
      let sum = 0;
      this.shopList.map((item) => {
        if (item.check === true) {
          sum += item.present_price * item.count;
        }
      });
      return sum;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.ding {
  position: fixed;
  top: 40px;
  width: 100%;
  padding: 0 25px 0 0;
  background-color: #fff;
}
.btn-setting {
  height: 40px;
}
input {
  width: 40px;
  text-align: center;
}
.item {
  width: 200px;
}
</style>