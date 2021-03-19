<template>
  <!-- 底部导航栏 -->
  <van-tabbar v-model="tabActive" route>
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="medal-o">专题</van-tabbar-item>
    <van-tabbar-item icon="qr" to="/category">分类</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/buycart"
      >购物车</van-tabbar-item 
    >
    <van-tabbar-item icon="manager-o" to="/self">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      tabActive: 0
    }
  },
  // mounted() {
  //   switch (this.$route.path) {
  //     case '/':
  //       this.tabActive = 0
  //       break
  //     case '/category':
  //       this.tabActive = 2
  //       break
  //     case '/buycart':
  //       this.tabActive = 3
  //       break

  //     case '/self':
  //       this.tabActive = 4
  //     // default:
  //     //   this.tabActive = 0
  //   }
  // }
}
</script>

<style lang="scss" scoped></style>
