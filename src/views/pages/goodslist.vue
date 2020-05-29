<template>
  <div>
    <!-- NavBar区域 -->
    <ugonavbar></ugonavbar>
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <van-list v-model="isloading" @load="onLoad" :finished="isover" finished-text="没有更多了">
        <van-card
          v-for="(item,index) in goodslist"
          :key="index"
          :num="item.goods_number"
          :price="item.goods_price"
          :title="item.goods_name"
          :thumb=" item.goods_small_logo"
          @click="goGoodsDetail(item.goods_id)"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询关键词
      query: "",
      // 商品分类的Id
      cid: "",
      // 页码值
      pagenum: 1,
      // 每页显示多少条数据
      pagesize: 10,
      // 商品列表数据
      goodslist: [],
      // 总数据条数
      total: 0,
      // 数据是否加载完毕的布尔值，默认为 false
      isover: false,
      // 表示当前数据是否正在请求中
      isloading: false,
      // 表示当前页面是否在刷新
      isRefresh: false
    };
  },
  created() {
    this.query = this.$route.query.query || "";
    this.cid = this.$route.query.cid || "";
  },
  mounted() {
    //   this.getGoodsList()
  },
  methods: {
    // 获取商品列表
    async getGoodsList() {
      this.isloading = true;
      const { data: res } = await this.$http.get("/goods/search", {
        params: {
          query: this.query,
          cid: this.cid,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      this.isRefresh = false;
      if (res.meta.status !== 200) {
        return this.$toast("数据获取失败");
      }
      if (res.message.total == 0) {
        this.isover = true;
      }
      this.goodslist = [...this.goodslist, ...res.message.goods];
      this.total = res.message.total;
      this.isloading = false;
    },
    // 下拉刷新
    onRefresh() {
      // 初始化必要的字段值
      this.pagenum = 1;
      this.total = 0;
      this.goodslist = [];
      this.isover = this.isloading = false;
      this.onLoad();
    },
    // 加载数据
    onLoad() {
      // 判断 如果没有数据
      if (this.isover) {
        return;
      }
      // 判断是否为第一次加载
      if (this.total == 0) {
        this.getGoodsList();
        return;
      }
      // 判断 数据是否加载完毕
      if (this.goodslist.length >= this.total) {
        this.isover = true;
        return;
      }
      // 加载更多
      this.pagenum++;
      this.getGoodsList();
    },
    // 返回上一页
    onClickLeft() {
      this.$router.go(-1);
    },
    // 跳转到商品详情
    goGoodsDetail(goods_id) {
      this.$router.push("/pages/goods_detail/" + goods_id);
    }
  }
};
</script>

<style lang="less" scoped>
</style>