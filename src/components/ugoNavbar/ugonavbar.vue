<template>
    <div>
        <!-- NavBar区域 -->
        <van-sticky>
            <van-nav-bar title="黑马优购">
                <div class="left_arrow" @click="()=>{ $router.go(-1) }" slot="left">
                    <van-icon name="arrow-left"/>
                    <span>返回</span>
                </div>
            </van-nav-bar>
        </van-sticky>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>