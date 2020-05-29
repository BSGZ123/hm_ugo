<template>
  <div>
    <!-- NavBar区域 -->
    <ugonavbar></ugonavbar>
    <!-- 编辑区域 -->
    <van-address-edit
      :address-info="addressInfo"
      :area-list="areaList"
      show-set-default
      @save="onSave"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
    />
  </div>
</template>

<script>
import areaList from "@/plugins/area.js";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      areaList: areaList,
      addressInfo: {
        addressDetail: "",
        city: "",
        country: "",
        county: "",
        isDefault: true,
        name: "",
        postalCode: "",
        province: "",
        tel: ""
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      let i = this.$route.query.id;
      this.addressInfo = this.$store.state.addressList.find(
        item => item.id == i
      );
    }
  },
  methods: {
    ...mapMutations(["addToAddressList", "editAddressById"]),
    onSave(content) {
      // 根据路由参数，判断是修改还是新增
      if (this.$route.query.id) {
        content.id = this.$route.query.id;
        console.log(content)
        this.editAddressById(content);
        this.$toast("修改成功");
      } else {
        debugger
        this.$toast("地址保存成功");
        this.addToAddressList(content);
      }
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapGetters(["defaultAddress"])
  }
};
</script>

<style lang="less" scoped>
</style>