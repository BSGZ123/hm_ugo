<template>
  <div>
    <!-- 搜索框区域 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @input="onChange"
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- 搜索的建议列表 -->
    <van-cell-group v-show="!isShowHistory">
      <van-cell
        v-for="item in suggestList"
        :key="item.goods_id"
        :title="item.goods_name"
        @click="goGoodsDetail(item.goods_id)"
      />
    </van-cell-group>
    <!-- 搜索历史记录 -->
    <div v-show="isShowHistory">
      <!-- 历史记录标题 左侧文字---右侧icon -->
      <div class="history_title">
        <span>历史记录:</span>
        <van-icon name="delete" @click="clearHistory"/>
      </div>
      <!-- 历史记录主题tag -->
      <van-tag
        class="tag"
        size="large"
        v-for="(item,index) in kwList"
        :key="index"
        @click="tagClick(item)"
      >{{ item }}</van-tag>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索框中的默认内容
      value: "",
      // 搜索建议列表
      suggestList: [],
      // 搜索历史列表
      kwList: [],
      isShowHistory: true
    };
  },
  created() {
    this.kwList = JSON.parse(window.localStorage.getItem("kw") || "[]");
  },
  methods: {
    onSearch() {
      this.value = this.value.trim();

      // 把用户填写的搜索关键词，保存到 Storage 中
      // 先判断去重
      if (this.kwList.indexOf(this.value) === -1) {
        this.kwList.unshift(this.value);
      }
      // 数组的 slice 方法，确保kw的长度为10 不用记录太多
      this.kwList = this.kwList.slice(0, 10);
      window.localStorage.setItem("kw", JSON.stringify(this.kwList));
      this.$router.push("/pages/goods_list?query=" + this.value);
    },
    onChange() {
      this.value = this.value.trim();
      if (!this.value) {
        return (this.suggestList = []);
      }
      // 把用户填写的搜索关键词，保存到 Storage 中
      // 先判断去重
      if (this.kwList.indexOf(this.value) === -1) {
        this.kwList.unshift(this.value);
      }
      // 数组的 slice 方法，确保kw的长度为10 不用记录太多
      this.kwList = this.kwList.slice(0, 10);
      window.localStorage.setItem("kw", JSON.stringify(this.kwList));
      this.isShowHistory = false;
      this.getSuggestList(this.value);
    },
    onCancel() {
      this.suggestList = [];
    },
    // 获取搜索建议列表
    async getSuggestList(searchStr) {
      const { data: res } = await this.$http.get("/goods/qsearch", {
        params: {
          query: searchStr
        }
      });

      if (res.meta.status !== 200) {
        return wepy.baseToast();
      }

      this.suggestList = res.message;
    },
    // 跳转到商品详情页
    goGoodsDetail(goods_id) {
      this.$router.push("/pages/goods_detail/" + goods_id);
    },
    // 清空历史记录
    clearHistory() {
      this.kwList = [];
      window.localStorage.setItem("kw", JSON.stringify(this.kwList));
    },
    tagClick(val) {
      this.value = val;
    }
  },
  watch: {
    // 通过监听推荐列表的长度来判断 是否显示搜索记录
    "suggestList.length": function(val) {
      if (val == 0) {
        this.isShowHistory = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.van-cell-group {
  margin-bottom: 50px;
}
.history_title {
  font-size: 14px;
  color: #6c6c6c;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  text:nth-child(1) {
    font-size: 13px;
    font-weight: bold;
  }
}
.tag {
  margin: 6px;
}
</style>