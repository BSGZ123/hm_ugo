<template>
  <div>
    <!-- 空白的购物车 -->
    <div class="empty_cart" v-if="isEmpty">
      <img src="images/cart_empty@2x.png">
      <div>哎呦，购物车是空的噢~</div>
    </div>
    <!-- 非空购物车 -->
    <div class="cart-container" v-else>
      <!-- 购物车标题 -->
      <van-cell title="购物车列表" icon="shop-o"/>
      <!-- 购物车商品列表 -->
      <van-swipe-cell :right-width="65" v-for="item in shopCart" :key="item.id">
        <!-- 商品卡片区域 -->
        <van-card :title="item.name">
          <!-- 自定义商品的描述区域 -->
          <div slot="desc" class="desc">
            <!-- 商品的价格 -->
            <span class="price">￥{{item.price}}</span>
            <!-- 商品的数量 -->
            <van-stepper v-model="item.count" @change="updateGoodsCount(item)"/>
          </div>
          <!-- 自定义渲染缩略图的插槽 -->
          <div slot="thumb" class="thumb">
            <!-- 复选框 -->
            <van-checkbox
              v-model="item.isCheck"
              @change="updateGoodsStatus(item)"
              checked-color="#d81e06"
            ></van-checkbox>
            <!-- 缩略图 -->
            <img :src="item.pic" @click="goToDetail(item.id)">
          </div>
        </van-card>
        <!-- 左侧滑动按钮 -->
        <template slot="right">
          <van-button class="close" type="danger" @click="delGoods(item.id)">删除</van-button>
        </template>
      </van-swipe-cell>
      <!-- 购买提交区域 -->
      <van-submit-bar :disabled="disabled" @submit="submitOrder" :price="amount" button-text="提交订单">
        <van-checkbox class="fullCheck" checked-color="#d81e06" @change="allCheck" v-model="ac">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      fullChecked: false,
      shopCart: [],
      ac: false,
      disabled: false
    };
  },
  created() {
    this.shopCart = this.$store.state.shopCart;
  },
  methods: {
    // 映射mutations上的方法
    ...mapMutations([
      "addToShopCart",
      "updateGoodsCount",
      "updateGoodsStatus",
      "updateAllGoodsStatus",
      "removeGoodsById"
    ]),
    // 编程式导航，点击图片 跳转到商品详情
    goToDetail(id) {
      this.$router.push("/pages/goods_detail/" + id);
    },
    // 切换全选
    allCheck() {
      this.updateAllGoodsStatus(this.ac);
    },
    // 删除购物车商品
    delGoods(id) {
      this.removeGoodsById(id);
    },
    submitOrder() {
      this.$router.push("/order");
    }
  },
  computed: {
    isEmpty: function() {
      return this.shopCart.length > 0 ? false : true;
    },
    // 总价格，单位是 分
    amount() {
      let total = 0; // 单位是 元
      this.shopCart.forEach(x => {
        if (x.isCheck) {
          total += x.price * x.count;
        }
      });

      return total * 100;
    }
  },
  watch: {
    // 深度监听shopCart 来判断是否全选
    shopCart: {
      handler: function() {
        console.log('watch')
        const allCount = this.shopCart.length;
        let c = 0;
        this.shopCart.forEach(x => {
          if (x.isCheck) {
            c++;
          }
        });
        this.ac = allCount === c;
        if (c == 0) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.empty_cart {
  font-size: 14px;
  color: #666;
  text-align: center;
  padding-top: 200px;
  img {
    width: 90px;
    height: 90px;
  }
}
.cart-container {
  padding-bottom: 100px;
}

.desc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  .price {
    color: red;
    font-weight: bold;
    font-size: 12px;
  }
}

.van-card {
  border-bottom: 1px solid #eee;
  padding-left: 7px !important;
}

.thumb {
  display: flex;
  align-items: center;
  width: 118px;
  img {
    width: 90px;
    height: 90px;
    margin-left: 8px;
  }
}

.van-card__thumb {
  width: 118px !important;
}

.close {
  background-color: #ff4444;
  width: 65px;
  height: 100%;
  color: white;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fullCheck {
  margin-left: 7px;
}

.van-submit-bar {
  bottom: 50px;
}
</style>