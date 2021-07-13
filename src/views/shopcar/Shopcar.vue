<template>
  <div>
    <div>
      <navs class="nav">
        <template #middle>{{ title }}</template>
      </navs>
    </div>
    <div class="div"></div>
    <div>
      <shopcar-1 v-if="userInfo === null"></shopcar-1>
      <shopcar-2
        v-else-if="shopList.length === 0 && userInfo !== null"
      ></shopcar-2>
      <div v-else>
        <shopcar-3
          :shopList="shopList"
          v-if="shopList.length !== 0"
          @del="del"
        ></shopcar-3>
      </div>
    </div>
  </div>
</template>

<script>
import Navs from "../../components/navs/Navs.vue";
import Shopcar1 from "../../components/shopcarItem/Shopcar1.vue";
import Shopcar2 from "../../components/shopcarItem/Shopcar2.vue";
import Shopcar3 from "../../components/shopcarItem/Shopcar3.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      title: "购物车",
      shopList: [],
      userInfo: null,
    };
  },
  components: { Navs, Shopcar1, Shopcar2, Shopcar3 },
  methods: {
    getCard() {
      this.$api
        .getCard()
        .then((res) => {
          if (res.code === 200) {
            this.shopList = res.shopList;
            // console.log(this.shopList);
            localStorage.setItem("num", this.shopList.length);
            this.$store.commit("setNum", this.shopList.length);
          }
        })
        .catch((err) => {
          console.log("获取购物车数据失败");
        });
    },
    del() {
      this.getCard();
    },
  },
  mounted() {
    this.getCard();
    this.userInfo = localStorage.getItem("userInfo");
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid #eeeeee;
  background-color: #fff;
}
</style>