<template>
  <div>
    <!-- 轮播图区域 -->
    <van-swipe :height="175" :autoplay="3000" indicator-color="white">
      <van-swipe-item @click="goToDetail(item)" v-for="item in swipeList" :key="item.goods_id">
        <img :src="item.image_src" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 分类区域 -->
    <div class="cates">
      <div v-for="(item,index) in cateItem" :key="index">
        <router-link v-if="index == 0" to="/cates">
          <img :src="item.image_src" alt="">
        </router-link>
        <img v-else :src="item.image_src" alt="">
      </div>
    </div>
    <!-- 楼层区域 -->
    <div class="floor-container">
      <div class="floor-item" v-for="(item, index) in floorData" :key="index">
        <!-- 商品楼层图片标题 -->
        <img class="floor-item-title" :src="item.floor_title.image_src" alt="">
        <!-- 商品楼层图片内容 -->
        <div class="floor-item-box">
          <img
            class="floor-item-pic"
            v-for="(item, index) in item.product_list"
            :key="index"
            :src="item.image_src"
            :style="{ width:item.image_width/2 + 'px' }"
            @click="goToGoodsList(item)"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swipeList: [],
      cateItem: [],
      floorData: []
    };
  },
  created() {
    // this.getSwipeList();
    // this.getCateItem();
    // this.getFloorData();
    let p1 = this.$http.get("/home/swiperdata");
    let p2 = this.$http.get("/home/catitems");
    let p3 = this.$http.get("/home/floordata");
    Promise.all([p1, p2, p3]).then(result => {
      this.swipeList = result[0].data.message
      this.cateItem = result[1].data.message
      this.floorData = result[2].data.message
    })
  },
  methods: {
    // 获取home页 轮播图数据
    async getSwipeList() {
      const { data: res } = await this.$http.get("/home/swiperdata");
      if (res.meta.status !== 200) {
        return this.$toast.fail("数据加载失败");
      }
      this.swipeList = res.message;
    },
    // 获取home页 分类数据
    async getCateItem() {
      const { data: res } = await this.$http.get("/home/catitems");
      if (res.meta.status !== 200) {
        return this.$toast.fail("数据加载失败");
      }
      this.cateItem = res.message;
    },
    // 获取home页 商品楼层信息数据
    async getFloorData() {
      const { data: res } = await this.$http.get("/home/floordata");
      if (res.meta.status !== 200) {
        return this.$toast.fail("数据加载失败");
      }
      this.floorData = res.message;
    },
    goToDetail(detail) {
      console.log(detail);
      this.$router.push("/pages/goods_detail/" + detail.goods_id);
    },
    goToGoodsList(item) {
      this.$router.push(item.navigator_url);
    }
  }
};
</script>

<style lang="less" scoped>
.van-swipe {
  .van-swipe-item {
    img {
      width: 100%;
    }
  }
}
.cates {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  img {
    width: 64px;
    height: 70px;
  }
}

.floor-container {
  margin-bottom: 50px;
  .floor-item {
    .floor-item-title {
      height: 25px;
      width: 320px;
      display: block;
    }
    .floor-item-box {
      overflow: hidden;
      .floor-item-pic {
        float: left;
        height: 80px;
        margin: 4px;
        margin-top: 0;
        &:nth-child(1) {
          height: 180px;
        }
      }
    }
  }
}
</style>