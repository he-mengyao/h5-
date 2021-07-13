<template>
  <div>
    <navs>
      <template #left>
        <div style="padding-left: 10px">
          <van-icon
            name="arrow-left"
            color="#5198f2"
            size="20px"
            @click="back"
          />
        </div>
      </template>
      <template #middle>{{ title }}</template>
    </navs>
    <div class="line"></div>
    <div class="bd f14">
      <div>github</div>
      <van-divider />
      <div class="both-center">
        头像
        <img src="../../assets/icon.svg" alt="" class="avatar" />
      </div>
      <van-divider />
    </div>
    <van-form @submit="onSubmit">
      <van-field :placeholder="userInfo.username" label="用户名" disabled />
      <van-field
        v-model="userInfo.nickname"
        label="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <div class="flex ai-c" style="padding: 15px 0 0 15px">
        <label style="margin-right: 70px">性别</label>
        <van-radio-group v-model="userInfo.gender" direction="horizontal">
          <van-radio name="男">男</van-radio>
          <van-radio name="女">女</van-radio>
        </van-radio-group>
      </div>
      <van-divider />
      <van-field
        v-model="email"
        name="email"
        label="邮箱"
        placeholder="请输入邮箱"
        :rules="[
          {
            validator: validatorEmail,
            message: '请输入正确的邮箱',
          },
        ]"
      />
      <div>
        <div v-if="show">
          <van-field
            v-model="date"
            name="email"
            label="出生年月"
            placeholder="请选择日期"
            :rules="[{ required: true, message: '请选择日期' }]"
            @click-input="clickInput"
          />
        </div>
        <div v-else>
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirmTime"
            @cancel="cancel"
          />
        </div>
      </div>
      <br />
      <div class="center">
        <van-button type="primary" @click="save" style="width: 300px"
          >保存</van-button
        >
      </div>
      <div class="center mart-10">
        <van-button type="default" @click="back" style="width: 300px"
          >取消</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      title: "个人资料",
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      email: "",
      values: {},
      date: "",
      show: true,
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.back();
    },
    save() {
      if (
        this.userInfo.username !== "" &&
        this.userInfo.nickname !== "" &&
        this.email !== "" &&
        this.date !== ""
      ) {
        this.userInfo.year = dayjs(this.currentDate).format("YYYY");
        this.userInfo.month = dayjs(this.currentDate).format("MM");
        this.userInfo.day = dayjs(this.currentDate).format("DD");
        // 将保存后的用户信息存本地和vuex
        localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
        this.$store.commit("setuserInfo", JSON.stringify(this.userInfo));
        this.$router.push("/my");
      } else {
        this.$toast("表单填写有误，请检查");
      }
    },
    // 邮箱验证
    validatorEmail() {
      return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
        this.email
      );
    },
    onSubmit(values) {
      // console.log("submit", values);
    },
    // 点击年月日，弹出日期选择器
    clickInput() {
      this.show = false;
    },
    // 确定年月日
    confirmTime(value) {
      this.date = dayjs(value).format("YYYY年MM月DD日");
      this.currentDate = value;
      this.show = true;
    },
    // 年月日取消按钮
    cancel() {
      this.show = true;
    },
  },
  mounted() {
    this.date = `${this.userInfo.year}年${this.userInfo.month}月${this.userInfo.day}日`;
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.bd {
  padding: 20px;
}
</style>