<template>
  <div class="box f14">
    <!-- 导航 -->
    <navs class="navs hidden">
      <template #left>
        <div class="center" @click="location(city)">
          <div>{{ currentCity ? currentCity : "定位中" }}</div>
          &nbsp;
          <van-icon name="arrow-down" />
        </div>
      </template>
      <template #middle>
        <div>
          <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            style="width: 270px; margin-left: 10px"
            @focus="focus(value)"
          />
        </div>
      </template>
      <template #right>
        <div v-if="!flag" @click="cancel">{{ text }}</div>
      </template>
    </navs>
    <div style="height: 40px"></div>
    <div>
      <div v-if="flag">
        <!-- 轮播图 -->
        <swipe v-if="data.slides" :slides="data.slides" class="mart-5"></swipe>
        <!-- 分类 -->
        <categ v-if="data.category" :category="data.category"></categ>
        <!-- 广告 -->
        <div class="adpic">
          <img :src="adpic" alt="" />
        </div>
        <!-- 推荐商品 -->
        <recom v-if="data.recommend" :recommend="data.recommend"></recom>
        <!-- 楼层商品 -->
        <floor
          v-if="data.floor1"
          :floor="data.floor1"
          :floortitle="data.floorName.floor1"
        >
          <template #floor>
            <div class="floors center">1F</div>
          </template>
        </floor>
        <floor
          v-if="data.floor2"
          :floor="data.floor2"
          :floortitle="data.floorName.floor2"
        >
          <template #floor>
            <div class="floors center">2F</div>
          </template>
        </floor>
        <floor
          v-if="data.floor3"
          :floor="data.floor3"
          :floortitle="data.floorName.floor3"
        >
          <template #floor>
            <div class="floors center">3F</div>
          </template>
        </floor>
        <!-- 热销商品 -->
        <hots-product
          v-if="data.hotGoods"
          :hotsProduct="data.hotGoods"
        ></hots-product>
      </div>
      <!-- 搜索 -->
      <div v-else>
        <div>
          <!-- 显示历史记录 -->
          <div v-if="value === ''">
            <div class="flex-b h-40 pdlr-10">
              <div>搜索</div>
              <van-icon name="delete-o" @click="del" />
            </div>
            <div
              class="line-40 flex ai-c wrap"
              style="padding-left: 10px; border: 0"
            >
              <button
                v-for="(item, index) in historyArr"
                :key="index"
                class="center"
                @click="clickHistory(item.name)"
              >
                {{ item.name }}
              </button>
            </div>
          </div>
          <!-- 显示匹配列表 -->
          <div v-else>
            <div
              @click="detail(item.id, value)"
              class="searchlist"
              v-for="(item, index) in searchList"
              :key="index"
              v-html="
                item.name.replace(
                  value,
                  `<span style='color:#eb3323'}>${value}</span>`
                )
              "
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navs from "../components/navs/Navs.vue";
import Swipe from "../components/homes/Swipe";
import Categ from "../components/homes/Categ.vue";
import Recom from "../components/homes/Recom.vue";
import Floor from "../components/homes/Floor.vue";
import HotsProduct from "../components/homes/hotsProduct.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      text: "取消",
      value: "",
      city: "",
      data: {},
      adpic: "",
      searchList: [],
      flag: true,
      historyArr: [],
    };
  },
  components: {
    Navs,
    Swipe,
    Categ,
    Recom,
    Floor,
    HotsProduct,
  },
  methods: {
    cancel() {
      this.searchList = [];
      this.value = "";
      this.flag = true;
    },
    location(city) {
      this.$router.push("/location");
    },
    getData() {
      this.$api
        .recommend()
        .then((res) => {
          this.data = res.data;
          // console.log(this.data);
          this.adpic = this.data.advertesPicture.PICTURE_ADDRESS;
          localStorage.setItem("category", JSON.stringify(this.data.category));
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
    getLocation() {
      let that = this;
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB",
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          that.$store.commit("setCity", data.addressComponent.city);
          localStorage.setItem("city", data.addressComponent.city);
          // console.log(data);
        }

        function onError(data) {
          // 定位出错
          that.$toast("定位失败，请手动选择城市");
        }
      });
    },
    search(value) {
      this.$api
        .search(value)
        .then((res) => {
          this.searchList = res.data.list;
          // console.log(this.searchList);
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    focus(value) {
      this.flag = false;
    },
    detail(id, value) {
      this.$router.push("/detail");
      localStorage.setItem("id", id);
      this.$utils.saveHistory({
        key: "search",
        data: value,
        attr: "name",
      });
    },
    clickHistory(name) {
      this.value = name;
    },
    del() {
      this.historyArr = [];
      localStorage.removeItem("searchHistory");
    },
  },
  mounted() {
    this.getData();
    // console.log(this.currentCity);
    if (!this.currentCity) {
      this.getLocation();
    }
    this.historyArr = this.$utils.getHistory({
      key: "search",
    });
  },
  computed: {
    currentCity() {
      return this.$store.state.city;
    },
  },
  watch: {
    value(val) {
      if (val !== "") {
        this.search(val);
      } else {
        this.searchList = [];
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.box {
  background-color: #eeeeee;
  width: 100%;
  .navs {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background-color: #eeeeee;
  }
  .van-search {
    background-color: #eeeeee;
  }
  .adpic {
    img {
      width: 100%;
    }
  }
}
.floors {
  height: 18px;
  width: 18px;
  color: #ffffff;
  background-color: #ce4336;
  border-radius: 100%;
}
.searchlist {
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid #eeeeee;
  background-color: #fff;
}
button {
  height: 30px;
  margin: 5px;
  background-color: #eeeeee;
  padding: 0 15px;
}
</style>