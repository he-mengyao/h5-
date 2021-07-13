<template>
  <div class="categ flex-a">
    <div
      v-for="(item, index) in category"
      :key="index"
      class="col-center flex-1"
      @click="goCateg(index)"
    >
      <img :src="item.image" alt="" />
      <div class="categ-item">{{ item.mallCategoryName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    category: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    goCateg(index) {
      this.$router.push({
        path: "/category",
        query: {
          mallCategoryId: index,
        },
      });
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.categ {
  margin: 15px 10px;
  height: 105px;
  width: 360px;
  background-color: #fff;
  border-radius: 10px;
  img {
    height: 50px;
    width: 50px;
  }
}
</style>