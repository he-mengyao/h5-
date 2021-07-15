<template>
  <div>
    <navs>
      <template #left>
        <van-icon name="arrow-left" @click="back" size="20" color="#6296f3" />
      </template>
      <template #middle>
        <div>我的收藏</div>
      </template>
    </navs>
    <div class="div"></div>
    <div class="bd">
      <div
        class="item-img flex bb pr"
        v-for="(item, index) in list"
        :key="index"
      >
        <img :src="item.image_path" alt="" @click="go(item)" />
        <div>
          <div @click="go(item)">{{ item.name }}</div>
          <br />
          <div class="red fw">{{ `￥ ${item.present_price}` }}</div>
        </div>
        <van-icon name="close" class="close" @click="close(item, index)" />
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
      list: [],
    };
  },
  components: { Navs },
  methods: {
    getData() {
      this.$api
        .getCollection()
        .then((res) => {
          if (res.code === 200) {
            this.list = res.data.list;
            // console.log(this.list);
          }
        })
        .catch((err) => {
          console.log("请求收藏列表失败");
        });
    },
    back() {
      this.$router.push("/my");
    },
    close(item, index) {
      this.$api
        .cancelCollection({
          id: item.cid,
        })
        .then((res) => {
          this.$toast(res.msg);
          this.list.splice(index, 1);
        })
        .catch((err) => {
          console.log("取消收藏获取失败");
        });
    },
    go(item) {
      localStorage.setItem("id", item.cid);
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
.close {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>