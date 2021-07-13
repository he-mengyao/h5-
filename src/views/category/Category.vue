<template>
  <div>
    <navs>
      <template #middle> <div>商品分类</div></template>
    </navs>
    <div class="div"></div>
    <div class="side">
      <van-sidebar v-model="activeKey" style="position: fixed">
        <van-sidebar-item
          :title="item.mallCategoryName"
          v-for="(item, index) in list"
          :key="index"
          @click="click"
        />
      </van-sidebar>
      <div class="nav-categ">
        <van-tabs :ellipsis="false" @click="change" style="margin-left: 80px">
          <van-tab
            v-for="(item1, index1) in list1[index]"
            :key="index1"
            :title="item1.mallSubName"
            style="width: 100%"
          >
            <div style="padding-top: 40px">
              <div
                v-for="(item2, index2) in dataList"
                :key="index2"
                class="item-img"
                @click="go(item2)"
              >
                <img :src="item2.image_path" alt="" />
                <div>
                  <div class="red">{{ item2.name }}</div>
                  <div class="flex ai-c">
                    <div class="red fw">
                      {{ `￥ ${item2.present_price}` }}
                    </div>
                    &nbsp;
                    <div class="del">{{ item2.orl_price }}</div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="div-b"></div>
  </div>
</template>

<script>
import Navs from "../../components/navs/Navs.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      index: 0,
      activeKey: 0,
      list1: [],
      dataList: [],
      index1: 0,
      list: [],
    };
  },
  components: { Navs },
  methods: {
    // 一级标题点击
    click(index) {
      this.index = index;
      this.getData();
    },
    // 二级标题点击
    change(name) {
      this.index1 = name;
      this.getData();
      // console.log(this.list[this.index].bxMallSubDto[this.index1].mallSubId);
    },
    getData() {
      this.$api
        .classification({
          id: this.list[this.index].bxMallSubDto[this.index1].mallSubId,
        })
        .then((res) => {
          if (res.code === 200) {
            this.dataList = res.dataList;
          }
        })
        .catch((err) => {
          console.log("分类请求失败");
        });
    },
    go(item2) {
      localStorage.setItem("id", item2.id);
      this.$router.push("/detail");
    },
  },
  mounted() {
    this.list = JSON.parse(localStorage.getItem("category"));
    if (this.$route.query.mallCategoryId) {
      this.activeKey = this.$route.query.mallCategoryId;
      this.index = this.activeKey;
    } else {
      this.activeKey = 0;
    }
    // console.log(this.list);
    this.list.map((item) => {
      this.list1.push(item.bxMallSubDto);
    });
    this.getData();
    // console.log(this.items);
    // console.log(this.list1);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
// .van-tabs__wrap {
//   width: 80%;
// }
</style>