<template>
  <div id="buycart">
    <div class="info">
      <span>30天无忧退货</span>
      <span>48小时快速退款</span>
      <span>满88元免邮费</span>
    </div>
    <div class="content">{{ content }}</div>
    <!-- 购物车商品信息 -->
    <div v-if="this.flag" class="list">
      <div class="cartItem" v-for="(item, index) in cartList" :key="index">
        <van-checkbox
          @change="checkEvent($event, item)"
          v-model="item.checked"
        ></van-checkbox>
        <van-image
          fit="cover"
          width="70"
          height="70"
          :src="item.list_pic_url"
        />
        <div class="proBrief">
          <div class="title">
            <span>{{ item.goods_name }}</span>
            <span class="num">X{{ item.number }}</span>
          </div>
          <p class="brief">{{ item.goods_specifition_name_value }}</p>
          <p class="price">￥ {{ item.retail_price }}</p>
        </div>
      </div>
    </div>
    <!-- ------------------------------ -->
    <div v-else class="list">
      <div class="cartItem" v-for="(item, index) in cartList" :key="index">
        <van-checkbox
          @change="checkEvent($event, item)"
          v-model="item.checked"
        ></van-checkbox>
        <van-image
          fit="cover"
          width="70"
          height="70"
          :src="item.list_pic_url"
        />
        <p class="price1">￥ {{ item.retail_price }}</p>
        <div class="proBrief1">
          <p class="brief1">{{ item.goods_specifition_name_value }}></p>
          <van-stepper v-model="item.number" @change="onChange(item)" />
        </div>
      </div>
    </div>
    <!-- ----------------------- -->
    <van-submit-bar
      class="msg"
      :price="cartTotal.checkedGoodsAmount * 100"
      :button-text="store"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll">全选</van-checkbox>
      <span class="change" @click="toggle">{{ msg }}</span>
    </van-submit-bar>
    <tab-btn></tab-btn>
  </div>
</template>

<script>
import axios from 'axios'
import tabBtn from '@/components/tabBtn.vue'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      checked: true,
      flag: true,
      msg: '编辑',
      value: 1,
      store: '提交订单',
      content: ''
    }
  },
  computed: {
    ...mapState(['cartTotal', 'cartList']),
    // checked
    checkedAll: {
      set(val) {
        console.log(val, '设置全选')
        // this.checked=val
        // return false
        // 把val值给商品选框
        this.cartList.forEach(item => {
          item.checked = val
        })
      },
      get() {
        // 全选
        if (this.cartTotal.goodsCount == this.cartTotal.checkedGoodsCount) {
          return true
        } else {
          return false
        }
      }
    }
  },

  created() {
    // ---------------初始化最新购物车数据
    this.$store.dispatch('AjaxCart')
    if (this.cartList.length == 0) {
      this.content = '购物车没有东西啦~'
    }
  },
  mounted() {
    console.log(this.cartTotal)
    // console.log(this.cartList)
  },
  methods: {
    // ----------------点击拿到商品最新信息
    async checkEvent(event, item) {
      // console.log(event)
      // console.log(item)
      // ----发送最新商品信息
      let res = await axios.post(this.$root.api.CartChecked, {
        isChecked: Number(event),
        productIds: item.product_id
      })
      let data = res.data.data
      // console.log(data)
      this.$store.commit('setCarList', data.cartList)
      this.$store.commit('setCartTotal', data.cartTotal)
    },

    // ----------------点击编辑
    toggle() {
      this.flag = !this.flag
      console.log(this.flag)
      if (this.flag) {
        this.msg = '编辑'
        this.store = '提交订单'
      } else {
        this.msg = '完成'
        this.store = '删除所选'
      }
    },
    // 改变数量
    async onChange(event) {
      // console.log(event)
      let res = await axios.post(this.$root.api.CartUpdate, {
        goodsId: event.goods_id,
        number: event.number,
        productId: event.product_id,
        id: event.id
      })
      // console.log(res.data)
      let data = res.data.data
      // console.log(data)
      this.$store.commit('setCarList', data.cartList)
      this.$store.commit('setCartTotal', data.cartTotal)
    },

    // 提交订单
    async onSubmit() {
      // 判断是提交订单
      if (this.flag) {
        // axios.
        this.$router.push('/order')
        console.log(this.cartList);
        // 筛选已选择的商品
        this.cartList.forEach(item=> {
          if(item.checked==1) {{
            console.log(item.product_id);
          }}
        })
      } else {
        // 判断是删除商品
        let arr = []
        this.cartList.forEach(item => {
          if (item.checked == 1) {
            // console.log(item.product_id);
            arr.push(item.product_id)
          }
        })
        // console.log(arr)
        // 删除商品
        let res = await axios.post(this.$root.api.CartDelete, {
          productIds: arr.join(',')
        })
        let data = res.data.data
        // console.log(data)
        this.$store.commit('setCarList', data.cartList)
        this.$store.commit('setCartTotal', data.cartTotal)
        console.log(this.cartList)
        if (this.cartList.length == 0) {
          this.content = '购物车没有东西啦~'
        }
      }
    }
  },
  components: {
    tabBtn
  }
}
</script>

<style lang="less" scoped>
#buycart {
  .info {
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    color: #999;
    height: 24px;
    line-height: 24px;
    background: #efefef;
    span {
      position: relative;
    }
    span::before {
      content: '';
      display: block;
      position: absolute;
      left: -10px;
      top: 8px;
      width: 4px;
      height: 4px;
      border-radius: 2px;
      border: 1px solid red;
    }
  }
  .cartItem {
    padding: 0 5px;
    display: flex;
    align-items: center;
    padding: 10px 5px;
    justify-content: space-around;
    .van-checkbox {
      margin: 0 5px;
    }
    .van-image {
      background: #efefef;
    }
    .proBrief {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      height: 70px;
      padding: 0 10px;
      p {
        margin: 0;
      }
      .title {
        width: 100%;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
      }
      .brief {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .msg {
    margin-bottom: 55px;
  }
  .change {
    margin-left: 20px;
  }
  .proBrief1 {
    height: 70px;
    padding: 0 10px;
    // float: right;
    .brief1 {
      color: #999;
      font-size: 12px;
    }
  }
  .content {
    margin-top: 30px;
  }
}
</style>
