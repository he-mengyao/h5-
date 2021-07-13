<template>
  <div class="my pdlf-5 col-center">
    <navs>
      <template #middle>
        {{ title }}
      </template>
    </navs>
    <div class="div"></div>
    <div class="bg cw col-center pr">
      <van-icon
        class="setting"
        name="setting"
        color="#fff"
        size="20px"
        @click="checkLogin('/saveuser')"
      ></van-icon>
      <div class="avatar br">
        <img :src="userInfo.avatar" alt="" class="br" v-if="userInfo" />
        <img src="../../assets/icon.svg" alt="" class="br" v-else />
      </div>
      <div class="fw f20 mart-10" v-if="userInfo">
        欢迎您：{{ userInfo.nickname }}
      </div>
      <div
        class="f14 mart-10"
        @click="login"
        v-html="userInfo ? '退出登录' : '去登录/注册'"
      ></div>
    </div>
    <div class="status around-center f14">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="col-center item"
        @click="checkLogin(item.path)"
      >
        <img :src="item.src" alt="" />
        {{ item.name }}
      </div>
    </div>
    <div class="sub f14" v-for="(item, index) in list1" :key="index">
      <div
        class="both-center"
        style="margin: 0 15px"
        @click="checkLogin(item.path)"
      >
        <div class="flex ai-c">
          <img :src="item.src" alt="" />{{ item.name }}
        </div>
        >
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
      title: "会员中心",
      list: [
        {
          name: "待付款",
          src: require("../../assets/代付款.png"),
          path: "/complete",
        },
        {
          name: "待发货",
          src: require("../../assets/代发货.png"),
          path: "/complete",
        },
        {
          name: "待收货",
          src: require("../../assets/代收货.png"),
          path: "/complete",
        },
        {
          name: "评价",
          src: require("../../assets/评价.png"),
          path: "/assess",
        },
        {
          name: "已完成",
          src: require("../../assets/已完成.png"),
          path: "/complete",
        },
      ],
      list1: [
        {
          name: "全部订单",
          src: require("../../assets/全部订单.png"),
          path: "/all",
        },
        {
          name: "收藏商品",
          src: require("../../assets/收 藏商品.png"),
          path: "/collect",
        },
        {
          name: "地址管理",
          src: require("../../assets/地址管理.png"),
          path: "/address",
        },
        {
          name: "最近浏览",
          src: require("../../assets/最近浏览.png"),
          path: "/current",
        },
      ],
    };
  },
  components: {},

  methods: {
    go(url) {
      if (url === "/address") {
        // 本地存储，判断地址列表返回的路径
        localStorage.setItem("isAddress", 111);
      }
      this.$router.push(url);
    },
    login() {
      this.$router.push("/register");
      if (this.userInfo !== null) {
        this.$api
          .loginOut()
          .then((res) => {
            if (res.code === 0) {
              this.$toast("退出成功");
            }
          })
          .catch((err) => {
            console.log("请求失败");
          });
      }
      localStorage.removeItem("userInfo");
      this.$store.commit("setuserInfo", null);
    },
    checkLogin(data) {
      this.$utils.checkLogin({
        key: "userInfo",
        next: this.go,
        item: data,
      });
    },
  },
  mounted() {
    // console.log(this.userInfo);
  },
  computed: {
    userInfo() {
      return JSON.parse(this.$store.state.userInfo);
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.nav {
  height: 40px;
}
.bg {
  height: 212px;
  width: 365px;
  background-color: #d13179;
  .setting {
    position: absolute;
    top: 15px;
    right: 20px;
  }
}
.status {
  height: 77px;
  width: 365px;
  img {
    width: 30px;
    height: 30px;
  }
}
.sub {
  width: 365px;
  & > div {
    height: 45px;
    border-top: 1px solid #eeeeee;
  }
  img {
    width: 20px;
    height: 20px;
  }
}
</style>