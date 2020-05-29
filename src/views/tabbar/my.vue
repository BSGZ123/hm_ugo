<template>
    <div :style="{ height : wh+'px' }">
        <img src="images/404.jpg" alt="">
    </div>
</template>

<script>
export default {
  data() {
    return {
      wh: 0
    };
  },
  created() {
    this.wh = document.documentElement.clientHeight - 46;
  }
};
</script>

<style lang="less" scoped>
div {
  position: relative;
}
img {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>