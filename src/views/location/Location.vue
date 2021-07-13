<template>
  <div class="box">
    <navs class="navs bgc-w">
      <template #left>
        <van-icon name="arrow-left" @click="back" />
      </template>
      <template #middle>
        <div>城市列表</div>
      </template>
    </navs>
    <div class="div"></div>
    <van-sticky>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        background="#eeeeee"
      />
    </van-sticky>
    <div>
      <div v-if="flag">
        <div class="currentCity">
          <div class="pdlr-10">当前城市</div>
          <div class="bgc-w pdlr-10 currentCity-item">
            <button @click="changeCity($store.state.city)">
              {{ currentCity ? currentCity : "定位中" }}
            </button>
          </div>
        </div>
        <div class="hotsCity">
          <div class="pdlr-10">热门城市</div>
          <div
            class="bgc-w pdlr-10 currentCity-item flex wrap"
            style="height: 100px"
          >
            <button
              v-for="(item, index) in hotCities"
              :key="index"
              @click="changeCity(item.name)"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
        <div ref="container" class="navigate">
          <van-index-bar
            highlight-color="#666665"
            :index-list="Object.keys(cities)"
          >
            <div v-for="(item, index) in Object.keys(cities)" :key="index">
              <van-index-anchor :index="item" class="zimu" />
              <van-cell
                :title="item1.name"
                v-for="(item1, index1) in Acities[index]"
                :key="index1"
                @click="changeCity(item1.name)"
              />
            </div>
          </van-index-bar>
        </div>
      </div>
      <div v-else>
        <div v-for="(item, index) in searchList" :key="index">
          <div class="area" @click="changeCity(item.name)">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navs from "../../components/navs/Navs.vue";
import city from "../../lib/city";
export default {
  name: "",
  props: {},
  data() {
    return {
      flag: true,
      value: "",
      hotCities: [],
      cities: {},
      Acities: [],
      searchList: [],
    };
  },
  components: { Navs },
  methods: {
    changeCity(city) {
      this.$store.commit("setCity", city);
      localStorage.setItem("city", city);
      this.$router.push("/");
    },
    back() {
      this.$router.back();
    },
  },
  mounted() {
    this.hotCities = city.data.hotCities;
    this.cities = city.data.cities;
    this.Acities = Object.values(this.cities);
  },
  computed: {
    currentCity() {
      return this.$store.state.city;
    },
  },
  watch: {
    value(val) {
      this.searchList = [];
      Object.values(this.cities).map((item) => {
        item.map((item1) => {
          this.searchList.push(item1);
        });
      });
      this.searchList = this.searchList.filter((item) => {
        return (
          item.name.includes(val) === true || item.spell.includes(val) === true
        );
      });
      if (val === "") {
        this.flag = true;
      } else {
        this.flag = false;
      }
      // console.log(this.searchList);
    },
  },
};
</script>

<style lang='scss' scoped>
.box {
  height: 100%;
  background-color: #eeeeee;
  .van-search__content {
    background-color: #ffffff;
  }
  .currentCity-item {
    height: 50px;
    display: flex;
    align-items: center;
    button {
      height: 30px;
      text-align: center;
      width: 100px;
      margin-right: 15px;
      border: 1px solid #eeeeee;
    }
  }
  .zimu {
    height: 30px;
    background-color: #eeeeee;
  }
}
.area {
  height: 40px;
  background: #fff;
  border-bottom: 1px solid #eee;
  line-height: 40px;
  padding: 0 15px;
}
</style>