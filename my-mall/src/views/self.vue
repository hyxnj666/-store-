<template>
  <div id="self">
    个人中心
    <div class="content">
      <van-grid :column-num="3">
        <van-grid-item
          icon="label-o"
          text="我的订单"
        />
          <van-grid-item
          icon="vip-card-o"
          text="优惠券"
        />
          <van-grid-item
          icon="gift-card-o"
          text="礼品卡"
        />
          <van-grid-item
          icon="fire-o"
          text="我的收藏"
        />
          <van-grid-item
          icon="cluster-o"
          text="我的足迹"
        />
          <van-grid-item
          icon="gem-o"
          text="会员福利"
        />
          <van-grid-item
          icon="photo-o"
          text="地址管理"
        />
          <van-grid-item
          icon="photo-o"
          text="账号安全"
        />
          <van-grid-item
          icon="photo-o"
          text="联系客服"
        />
          <van-grid-item
          icon="photo-o"
          text="帮助中心"
        />
          <van-grid-item
          icon="photo-o"
          text="意见反馈"
        />
      </van-grid>
    </div>
    <tab-btn></tab-btn>
  </div>
</template>

<script>
import axios from 'axios'
import tabBtn from '@/components/tabBtn.vue'
export default {
  data() {
    return {}
  },
  created() {
      this.myList()
  },
  methods: {
      async myList(){
          let res = await axios.get(this.$root.api.OrderList)
          console.log(res);
      }
  },
  components: {
    tabBtn
  }
}
</script>

<style lang="less" scoped>
#self {
    box-sizing: border-box;
  .content {
    .van-grid-item {
      border: 1px solid #999;
    }
  }
}
</style>
