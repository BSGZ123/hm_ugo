<template>
  <div>
    <!-- NavBar区域 -->
    <ugonavbar></ugonavbar>
    <van-address-list
      v-model="chosenAddressId"
      :list="addressDetailList"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      chosenAddressId: ""
    };
  },
  created() {
    // 初始化默认选中的地址
    this.chosenAddressId = this.defaultAddress.id;
  },
  methods: {
    ...mapMutations(["chooseDefaultAddress"]),
    onAdd() {
      this.$router.push("/address_edit");
    },
    onEdit(item, index) {
      this.$router.push("/address_edit?id=" + item.id);
    },
    onSelect() {
      // 此处要注意使用$nextTick获取dom更新之后的数据 否则数据会在dom更新前获取 导致值更新的滞后
      this.$nextTick(() => {
        this.chooseDefaultAddress(this.chosenAddressId);
      });
    }
  },
  computed: {
    ...mapGetters(["defaultAddress", "addressDetailList"])
  }
};
</script>

<style lang="less" scoped>
</style>