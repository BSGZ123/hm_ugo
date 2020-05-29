<template>
  <div>
    <!-- NavBar区域 -->
    <van-sticky>
      <van-nav-bar v-if = "isHome" title="黑马优购"/>
      <van-nav-bar v-else title="黑马优购">
        <div class="left_arrow" @click="()=>{ $router.go(-1) }" slot="left">
          <van-icon name="arrow-left"/>
          <span>返回</span>
        </div>
      </van-nav-bar>
    </van-sticky>
    <!-- 内容 -->
    <router-view></router-view>
    <!-- tabbar区域 -->
    <van-tabbar active-color="#d81e06" v-model="active">
      <van-tabbar-item name="/home" to="/home">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.home_a : icon.home_n">
      </van-tabbar-item>
      <van-tabbar-item name="/cates" to="/cates">
        <span>分类</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.cates_a : icon.cates_n">
      </van-tabbar-item>
      <van-tabbar-item name="/search" to="/search">
        <span>搜索</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.search_a : icon.search_n">
      </van-tabbar-item>
      <van-tabbar-item name="/cart" to="/cart" :info="$store.getters.total">
        <span>购物车</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.cart_a : icon.cart_n">
      </van-tabbar-item>
      <van-tabbar-item name="/my" to="/my">
        <span>我的</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.my_a : icon.my_n">
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: '',
      wh: 0,
      icon: {
        home_n: "icons/home.png",
        home_a: "icons/home-active.png",
        cates_n: "icons/cates.png",
        cates_a: "icons/cates-active.png",
        search_n: "icons/search.png",
        search_a: "icons/search-active.png",
        cart_n: "icons/cart.png",
        cart_a: "icons/cart-active.png",
        my_n: "icons/my.png",
        my_a: "icons/my-active.png"
      }
    };
  },
  watch: {
    "$route.path": function(value) {
      this.active = value;
    }
  },
  computed: {
    isHome() {
      return (this.$route.path == "/" || this.$route.path == "/home") ? true : false
    }
  },
  created() {
    this.active = this.$route.path;
  }
};
</script>

<style lang="less" scoped>
</style>