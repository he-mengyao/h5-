<template>
  <div class="navbar bb">
    <div class="nav-left">
      <slot name="left"></slot>
    </div>
    <div class="middle">
      <slot name="middle"></slot>
    </div>
    <div class="nav-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.navbar {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: #fff;
  top: 0;
  left: 0;
  z-index: 99;
  .nav-left {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .nav-right {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>