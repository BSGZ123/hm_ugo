<template>
  <div class="cates-container" :style="{ height : wh+'px' }">
    <!-- 左侧滚动视图区域 -->
    <div class="left">
      <van-sidebar v-model="active" @change="onChange">
        <van-sidebar-item v-for="(item, index) in cateList" :title="item.cat_name" :key="index"/>
      </van-sidebar>
    </div>
    <!-- 右侧滚动视图区域 -->
    <div class="right">
      <!-- 循环创建二级分类 -->
      <div v-for="(item, index) in secondCate" :key="index">
        <van-row>
          <van-col span="24" style="text-align:center;">
            <span class="cate_title">/ {{item.cat_name}} /</span>
          </van-col>
        </van-row>
        <!-- 三级分类 -->
        <van-row>
          <div v-for="(item2,index2) in item.children" :key="index2">
            <van-col span="8" class="cell" @click="goGoodsList(item2.cat_id)">
              <img :src="item2.cat_icon" class="thumbImg">
              <div class="thumbTitle">{{item2.cat_name}}</div>
            </van-col>
          </div>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有分类的数据列表
      cateList: [],
      // 默认被激活的索引项
      active: 0,
      // 当前窗口可用的高度
      wh: 0,
      // 所有的二级分类数据
      secondCate: []
    };
  },
  mounted() {
    // 计算可视区域高度 屏幕可视区域高度 - navbar的高度
    this.wh = document.documentElement.clientHeight - 46;
    this.getCateList();
  },
  methods: {
    // 获取分类列表
    async getCateList() {
      const { data: res } = await this.$http.get("/categories");
      if (res.meta.status !== 200) {
        return this.$toast("获取数据失败");
      }
      this.cateList = res.message;
      this.secondCate = res.message[0].children;
    },
    // 左侧边栏change事件执行函数
    onChange(i) {
      this.secondCate = this.cateList[i].children;
    },
    goGoodsList(cat_id) {
      // console.log(cat_id);
      this.$router.push("/pages/goods_list?cid=" + cat_id);
    }
  }
};
</script>

<style lang="less" scoped>
div {
  color: #3c3c3c;
}
.cates-container {
  display: flex;
  box-sizing: border-box;
  padding-bottom: 50px;
  .left {
    overflow-y: auto;
    width: 85px;
  }
  .right {
    flex: 1;
    overflow-y: auto;
    .cate_title {
      font-size: 13px;
      font-weight: bold;
      display: inline-block;
      margin: 15px 0;
    }
    .cell {
      text-align: center;
      .thumbImg {
        width: 60px;
        height: 60px;
      }
      .thumbTitle {
        font-size: 12px;
      }
    }
  }
}
</style>