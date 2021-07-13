<template>
  <div>
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
import Navs from "../../components/navs/Navs.vue";
import Tabbar from "../../components/tabbar/Tabbar.vue";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: { Tabbar, Navs },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.navs {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: #eeeeee;
}
</style>