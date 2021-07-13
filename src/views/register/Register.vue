<template>
  <div class="box col ai-c">
    <div class="back" @click="back">
      <van-icon name="arrow-left" />
    </div>
    <div class="div"></div>
    <div class="register-box">
      <van-form>
        <div class="f24 cb marb-30 pdl-15 mart-30">登录/注册</div>
        <van-field
          v-model="username"
          placeholder="USERNAME"
          size="large"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          placeholder="PASSWORD"
          size="large"
          type="password"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="tel"
          type="tel"
          label="手机号码"
          placeholder="仅注册需要"
        />
        <van-field
          v-model="sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button size="small" type="primary">发送验证码</van-button>
          </template>
        </van-field>
        <van-field
          v-model="verify"
          center
          clearable
          label="验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <div v-html="code" @click="change"></div>
          </template>
        </van-field>
        <div></div>
        <div class="flex register-btn pdl-15" style="margin-top: 35px">
          <van-button
            size="large"
            type="primary"
            style="margin-right: 10px; width: 100px; height: 45px"
            @click="login"
            >登录</van-button
          >
          <van-button
            size="large"
            type="danger"
            style="width: 100px; height: 45px"
            @click="register"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import Navs from "../../components/navs/Navs.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      username: "",
      password: "",
      sms: "",
      tel: "",
      verify: null,
      code: "",
    };
  },
  components: {},
  methods: {
    login() {
      // console.log(this.username);
      // console.log(this.password);
      // console.log(this.verify);
      let that = this;
      if (this.username !== "" && this.password !== "" && this.verify !== "") {
        this.$api
          .login(that.username, that.password, that.verify)
          .then((res) => {
            // console.log(res.userInfo);
            if (res.code === 200) {
              this.$toast(res.msg);
              this.$router.push("/");
              localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
              this.$store.commit("setuserInfo", JSON.stringify(res.userInfo));
            } else {
              this.$toast(res.msg);
            }
          })
          .catch((err) => {
            console.log("请求失败");
          });
      } else {
        this.$toast("表单填写错误，请检查");
      }
    },
    register() {
      if (this.username !== "" && this.password !== "" && this.verify !== "") {
        this.$api
          .register(this.username, this.password, this.verify)
          .then((res) => {
            this.$toast(res.msg);
            // console.log(res);
            if (res.code === 200) {
              this.$router.push("/");
              localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
              this.$store.commit("setuserInfo", JSON.stringify(res.userInfo));
            }
          })
          .catch((err) => {
            console.log("请求失败");
          });
      } else {
        this.$toast("表单填写错误，请检查");
      }
    },
    getVerify() {
      this.$api
        .verify()
        .then((res) => {
          this.code = res;
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
    back() {
      this.$router.back();
    },
    change() {
      this.getVerify();
    },
  },
  mounted() {
    this.getVerify();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  height: 100%;
  width: 100%;
  background: url("../../assets/login.jpg") no-repeat;
  .register-box {
    height: 500px;
    width: 350px;
    margin-top: 70px;
    background-color: #fff;
    box-shadow: 0 5px 6px 3px rgba(0, 0, 0, 0.15);
  }
}
</style>