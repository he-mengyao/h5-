<template>
  <div>
    <navs>
      <template #left>
        <van-icon name="arrow-left" @click="back" size="20" color="#6296f3" />
      </template>
      <template #middle>
        <div>评价中心</div>
      </template>
    </navs>
    <div class="div"></div>
    <div class="img"><img src="../../assets/evaluate.jpg" alt="" /></div>
    <div class="assess-title hidden">
      <van-tabs v-model="active" sticky>
        <van-tab title="待评价">
          <van-pull-refresh v-model="refreshing">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div
                class="wait flex ai-c pr"
                v-for="(item, index) in list"
                :key="index"
              >
                <img :src="item.image_path" alt="" @click="detail(item.cid)" />
                <div>
                  <div class="cb comment-title" @click="detail(item.cid)">
                    {{ item.name }}
                  </div>
                  <van-button
                    plain
                    type="danger"
                    round
                    class="flex ai-c comment"
                    @click="goComment(item)"
                    ><van-icon name="comment" />&nbsp;评论晒单</van-button
                  >
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="已评价">
          <van-pull-refresh v-model="refreshing">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad1"
            >
              <div v-for="(item1, index1) in alreadyList" :key="index1">
                <div
                  class="wait flex ai-c pr"
                  v-for="(item, index) in item1.goods"
                  :key="index"
                >
                  <img :src="item.image_path" alt="" @click="detail(item.id)" />
                  <div>
                    <div class="cb comment-title" @click="detail(item.id)">
                      {{ item.name }}
                    </div>
                    <van-button
                      plain
                      round
                      class="flex ai-c comment"
                      @click="goCommentItem(item1)"
                      >查看评价</van-button
                    >
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "",
  props: {},
  data() {
    return {
      active: 2,
      page1: 1,
      page2: 1,
      list: [],
      alreadyList: [],
      // 刷新
      loading: false,
      finished: false,
      refreshing: false,
      num1: 0,
      num2: 0,
      // 展示数据
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.push("/my");
    },
    // 未评价
    tobeEvaluated() {
      this.$api
        .tobeEvaluated({
          page: this.page1,
        })
        .then((res) => {
          this.num1 = res.data.count;
          this.list = this.list.concat(res.data.list);
        })
        .catch((err) => {
          console.log("未评价请求失败");
        });
    },
    // 已评价
    alreadyEvaluated() {
      this.$api
        .alreadyEvaluated({
          page: this.page2,
        })
        .then((res) => {
          if (res.code === 200) {
            this.alreadyList = this.alreadyList.concat(res.data.list);
            this.num2 = res.data.count;
          }
        })
        .catch((err) => {
          console.log("评价已完成请求失败");
        });
    },
    // 去评价
    goComment(item) {
      localStorage.setItem("comment", JSON.stringify(item));
      this.$router.push("/comment");
    },
    // 查看评价
    goCommentItem(item1) {
      // console.log(item1);
      this.$router.push({
        path: "/commentitem",
        query: {
          id: item1.cid,
          _id: item1._id,
        },
      });
    },
    // 待评价下拉加载
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        this.page1++;
        this.tobeEvaluated();
        this.loading = false;
        if (this.list.length >= this.num1) {
          this.finished = true;
        }
      }, 1000);
    },
    // 已评价下拉刷新
    onLoad1() {
      setTimeout(() => {
        if (this.refreshing) {
          this.alreadyList = [];
          this.refreshing = false;
        }
        this.page2++;
        this.alreadyEvaluated();
        this.loading = false;
        if (this.alreadyList.length >= this.num2) {
          this.finished = true;
        }
      }, 1000);
    },
    // 点击图片或标题跳详情
    detail(id) {
      localStorage.setItem("id", id);
      this.$router.push("/detail");
    },
  },
  mounted() {
    this.tobeEvaluated();
    this.alreadyEvaluated();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.img {
  height: 160px;
  img {
    height: 100%;
    width: 100%;
  }
}
.assess-title {
  position: relative;
  top: -25px;
  left: 15px;
  width: 340px;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
}
.wait {
  height: 95px;
  border-bottom: 1px solid #eeeeee;
  img {
    width: 60px;
    height: 70px;
    margin-right: 46px;
  }
}
.comment-title {
  margin-bottom: 30px;
}
.comment {
  position: absolute;
  bottom: 5px;
  right: 0;
}
</style>