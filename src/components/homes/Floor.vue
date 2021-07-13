<template>
  <div class="floor hidden">
    <div class="center">
      <slot name="floor"></slot>
      &nbsp;
      <div class="red center title">{{ floortitle }}</div>
    </div>
    <div class="bd wrap">
      <div class="flex">
        <img
          :src="floor[0].image"
          alt=""
          class="item1"
          @click="detail(floor[0].goodsId)"
        />
        <div>
          <img
            :src="floor[1].image"
            alt=""
            class="item"
            @click="detail(floor[1].goodsId)"
          />
          <img
            :src="floor[2].image"
            alt=""
            class="item"
            @click="detail(floor[2].goodsId)"
          />
        </div>
      </div>
      <div class="flex">
        <img
          :src="floor[3].image"
          alt=""
          class="item"
          @click="detail(floor[3].goodsId)"
        />
        <img
          :src="floor[4].image"
          alt=""
          class="item"
          @click="detail(floor[4].goodsId)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    floor: {
      type: Array,
      required: true,
    },
    floortitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    detail(id) {
      this.$router.push("/detail");
      localStorage.setItem("id", id);
      // console.log(id);
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.title {
  height: 40px;
}
.bd {
  height: 292px;
  width: 100%;
  background-color: #fff;
  .item {
    width: 187px;
    height: 96px;
    border-right: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
  }
  .item1 {
    width: 187px;
    height: 195px;
    border-bottom: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
  }
}
</style>