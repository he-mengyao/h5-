<template>
  <div>
    <navs>
      <template #left>
        <van-icon name="arrow-left" @click="back" size="20" color="#6296f3" />
      </template>
      <template #middle>
        <div>最近浏览</div>
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
          <div class="flex ai-c">
            <div class="red fw">{{ `￥ ${item.present_price}` }}</div>
            &nbsp;
            <span class="del">{{ item.orl_price }}</span>
          </div>
        </div>
        <van-icon name="close" class="close" @click="close(index)" />
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
    back() {
      this.$router.push("/my");
    },
    close(index) {
      this.list.splice(index, 1);
      localStorage.setItem("browseHistory", JSON.stringify(this.list));
    },
    go(item) {
      localStorage.setItem("id", item.id);
      this.$router.push("/detail");
    },
  },
  mounted() {
    this.list = this.$utils.getHistory({
      key: "browse",
    });
    console.log(this.list);
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