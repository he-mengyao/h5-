<template>
  <div>
    <navs>
      <template #left>
        <van-icon name="arrow-left" color="#6daaf6" size="20" @click="back" />
      </template>
      <template #middle>
        <div>地址列表</div>
      </template>
    </navs>
    <div class="div"></div>
    <div class="address">
      <div v-if="list.length === 0">
        <van-empty description="暂无收货地址" />
      </div>
      <div>
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @select="select"
        ></van-address-list>
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
      chosenAddressId: "1",
      list: [],
    };
  },
  components: {},
  methods: {
    onAdd() {
      this.$router.push("/addaddress");
      localStorage.setItem("text", "新增");
    },
    onEdit(item, index) {
      this.$router.push("/addaddress");
      localStorage.setItem("address", JSON.stringify(item));
    },
    back() {
      if (localStorage.getItem("isAddress")) {
        this.$router.push("/my");
        localStorage.removeItem("isAddress");
      } else {
        this.$router.push("/settle");
      }
    },
    select(item, index) {
      if (localStorage.getItem("isAddress")) {
        this.$router.push("/addAddress");
        localStorage.setItem("address", JSON.stringify(item));
      } else {
        this.$router.push("/settle");
        localStorage.setItem("address", JSON.stringify(item));
      }
    },
    getData() {
      this.$api
        .getAddress()
        .then((res) => {
          if (res.code === 200) {
            this.list = res.address;
            this.$set(this.list, "id", "");
            this.list.map((item) => {
              item.id = item._id;
            });
          }
        })
        .catch((err) => {
          console.log("获取用户收货地址失败");
        });
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
.van-button--danger {
  border: 0 !important;
}
</style>