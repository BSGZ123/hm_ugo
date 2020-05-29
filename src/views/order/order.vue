<template>
  <div class="order_container">
    <!-- NavBar区域 -->
    <ugonavbar></ugonavbar>
    <div class="choose_address_box" v-if="!isHaveAddres">
      <van-button type="info" size="small" @click="chooseAddress">+ 选择收货地址</van-button>
    </div>
    <!-- 收货人信息区域 -->
    <div class="address_box" v-else>
      <!-- 收货人，联系电话 -->
      <div class="box1">
        <span>收货人：{{defaultAddress.name}}</span>
        <div @click="chooseAddress">
          <span>联系电话：{{defaultAddress.tel}}</span>
          <van-icon name="arrow"/>
        </div>
      </div>
      <!-- 收货地址 -->
      <div class="box2">收货地址：{{addressDetail}}</div>
    </div>
    <!-- 分割线 -->
    <img src="images/cart_border@2x.png" class="sep_line">
    <!-- 商品列表 -->
    <div class="goods_list">
      <van-card
        v-for="item in cart"
        :key="item.id"
        :num="item.count"
        :price="item.price"
        :title="item.name"
        :thumb="item.pic"
      />
    </div>
    <!-- 登录后下单 -->
    <van-button type="primary" size="large" class="btnLogin">登录后下单</van-button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      isHaveAddres: false,
      cart: []
    };
  },
  created() {
    this.cart = this.$store.state.shopCart.filter(x => {
      if (x.isCheck) {
        return x;
      }
    })
    if (this.addressDetail != "请选择收货地址") {
      this.isHaveAddres = true;
    }
  },
  methods: {
    chooseAddress() {
      this.$router.push("/address_list");
    }
  },
  computed: {
    ...mapState(["addressList"]),
    ...mapGetters(["addressDetail", "defaultAddress"])
  }
};
</script>

<style lang="less" scoped>
.choose_address_box {
  text-align: center;
  padding: 30px 0;
}

.sep_line {
  height: 7px;
  width: 100%;
  display: block;
}

.address_box {
  font-size: 14px;
  padding: 0 10px;
  .box1 {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
  }
  .box2 {
    padding-bottom: 15px;
  }
}

.btnLogin {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.order_container {
  padding-bottom: 50px;
}
</style>