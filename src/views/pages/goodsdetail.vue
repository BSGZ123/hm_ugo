<template>
  <div class="goods_detail_container">
    <!-- NavBar区域 -->
    <ugonavbar></ugonavbar>
    <!-- 商品轮播图区域 -->
    <van-swipe :height="375" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in goodsInfo.pics" :key="index">
        <img :src="item.pics_big" @click="preview(index)">
      </van-swipe-item>
    </van-swipe>
    <!-- ===============================华丽的分割线=================================== -->
    <!-- 商品信息区域 -->
    <div class="goods_info">
      <!-- 价格、名称、运费 -->
      <div class="box1">
        <div class="price">￥{{goodsInfo.goods_price}}</div>
        <div class="goods_name">
          <div class="left">{{goodsInfo.goods_name}}</div>
          <div class="right">
            <van-icon name="star-o"></van-icon>
            <div>收藏</div>
          </div>
        </div>
        <div class="yunfei">快递：免运费</div>
      </div>
      <div class="sep_line"></div>
      <!-- 促销已选区域 -->
      <div class="box2">
        <!-- 促销 -->
        <div>
          <span>促销:&nbsp;</span>
          <span>满300元减30元</span>
        </div>
        <!-- 已选 -->
        <div>
          <span>已选:&nbsp;</span>
          <span>黑色/S/1件</span>
        </div>
      </div>
      <div class="sep_line"></div>
      <!-- 收货地址区域 -->
      <div class="box3" @click="()=>{ $router.push('/address_list') }">
        <div>
          <span>送至</span>
          <span>{{ $store.getters.addressDetail }}</span>
        </div>
        <van-icon name="arrow"></van-icon>
      </div>
      <div class="sep_line"></div>
    </div>
    <!-- ===============================华丽的分割线=================================== -->
    <!-- 商品详情区域 -->
    <van-tabs>
      <van-tab title="图文详情">
        <!-- {{goodsInfo.goods_introduce}} -->
        <div v-html="goodsInfo.goods_introduce"></div>
      </van-tab>
      <van-tab title="规格参数" class="tab2">
        <van-row v-for="(item,index) in goodsInfo.attrs" :key="index">
          <!-- 参数名 -->
          <van-col span="10">{{item.attr_name}}</van-col>
          <!-- 参数值 -->
          <van-col span="14">{{item.attr_value}}</van-col>
        </van-row>
      </van-tab>
    </van-tabs>
    <!-- 商品提交区域 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" @click="goToCart" :info="total" text="购物车"/>
      <van-goods-action-button type="warning" @click="addToShopCart(goodsInfo)" text="加入购物车"/>
    </van-goods-action>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      goodsInfo: {},
      goods_id: 0,
      previewImgList: []
    };
  },
  created() {
    this.goods_id = this.$route.params.goods_id;
  },
  mounted() {
    this.getGoodsInfo(this.goods_id);
  },
  methods: {
    // 获取商品详情数据
    async getGoodsInfo() {
      const { data: res } = await this.$http.get("/goods/detail", {
        params: { goods_id: this.goods_id }
      });

      if (res.meta.status !== 200) {
        return this.$toast("商品数据获取失败");
      }
      this.goodsInfo = res.message;
      this.previewImgList = res.message.pics.map(item => item.pics_big);
    },
    // 图片预览
    preview(i) {
      this.ImagePreview({
        images: this.previewImgList,
        startPosition: i
      });
    },
    goToCart() {
      this.$router.push("/cart");
    },
    ...mapMutations(["addToShopCart"])
  },
  computed: {
    ...mapState(["shopCart"]),
    ...mapGetters(["total"])
  }
};
</script>

<style lang="less" scoped>
.van-swipe {
  img {
    width: 100%;
    height: 100%;
  }
}

.goods_info {
  .sep_line {
    border-bottom: 6px solid #efefef;
  }
  .box1 {
    padding: 0 5px;
    .price {
      font-size: 20px;
      color: red;
      margin: 20px 0;
    }
    .goods_name {
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 13px;
        padding-right: 20px;
      }
      .right {
        width: 100px;
        text-align: center;
        border-left: 1px solid #eee;
        > i,
        div {
          font-size: 10px;
          position: relative;
          top: -20px;
        }
      }
    }
    .yunfei {
      font-size: 13px;
      color: #666;
      font-weight: bold;
      line-height: 40px;
    }
  }
  .box2 {
    font-size: 12px;
    padding: 0 10px;
    > div {
      line-height: 40px;
      span:nth-child(1) {
        margin-right: 20rpx;
      }
      span:nth-child(2) {
        color: #666;
      }
    }
  }
  .box3 {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    padding: 12px 10px 12px 10px;
    > div {
      span:nth-child(1) {
        margin-right: 10px;
      }
      span:nth-child(2) {
        color: #666;
      }
    }
  }
}

.tab2 {
  font-size: 12px;
  .van-row {
    border-top: 1px solid #eee;
    .van-col {
      padding: 25px 0 25px 10px;
      &:nth-child(1) {
        border-right: 1px solid #eee;
      }
    }
  }
}
</style>