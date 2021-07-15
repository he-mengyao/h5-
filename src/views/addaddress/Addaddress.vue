<template>
  <div>
    <navs>
      <template #left>
        <van-icon name="arrow-left" color="#6daaf6" size="20" @click="back" />
      </template>
      <template #middle>
        <div>编辑地址</div>
      </template>
    </navs>
    <div class="div"></div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      :show-delete="flag"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :address-info="addressinfo"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
export default {
  name: "",
  props: {},
  data() {
    return {
      areaList,
      searchResult: [],
      addressinfo: {},
      flag: true,
    };
  },
  components: {},
  methods: {
    onSave(content) {
      let id = content.id ? content.id : "";
      this.$api
        .address({
          name: content.name,
          tel: content.tel,
          address: `${content.province}${content.city}${content.county}`,
          isDefault: content.isDefault,
          province: content.province,
          city: content.city,
          county: content.county,
          addressDetail: content.addressDetail,
          areaCode: content.areaCode,
          id: id,
        })
        .then((res) => {
          if (res.code === 200) {
            this.$toast(res.msg);
            this.$router.push("/address");
            localStorage.removeItem("text");
          }
        })
        .catch((err) => {
          console.log("新增地址请求失败");
        });
    },
    onDelete() {
      this.$toast("删除成功");
      this.$api
        .deleteAddress({
          id: this.addressinfo.id,
        })
        .then((res) => {
          if (res.code === 200) {
            this.$toast(res.msg);
            this.$router.push("/address");
          }
        })
        .catch((err) => {
          console.log("删除地址请求失败");
        });
    },
    onChangeDetail(val) {
      // console.log(val);
    },
    back() {
      this.$router.push("/address");
      localStorage.removeItem("text");
    },
  },
  mounted() {
    if (localStorage.getItem("text")) {
      this.addressinfo = {};
      this.flag = false;
    } else {
      this.addressinfo = JSON.parse(localStorage.getItem("address"));
      console.log(11);
    }
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>