<template>
  <div id="product">
    <!-- 导航栏 -->
    <van-nav-bar
      left-text="返回"
      title="商品"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" :indicator-color="'#000'">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img class="swipeImg" v-lazy="item.img_url" />
      </van-swipe-item>
    </van-swipe>
    <!-- 物流描述 -->
    <div class="info">
      <span>30天无忧退货</span>
      <span>48小时快速退款</span>
      <span>满88元免邮费</span>
    </div>

    <!-- 商品描述 -->
    <div class="proInfo">
      <h3 class="title">{{ info.name }}</h3>
      <p class="brief">{{ info.goods_brief }}</p>
      <p class="price">￥{{ info.retail_price }}</p>
      
    </div>
    
    <van-cell @click="show" title="请选择规格数量" is-link />
    
    <!-- 商品参数 -->
    <div class="proParams">
      <h3>商品参数</h3>
      <div class="proItem" v-for="(item1, index1) in attribute" :key="index1">
        <span class="title">{{ item1.name }}</span>
        <span class="value">{{ item1.value }}</span>
      </div>
    </div>

    <!-- 商品详情 -->
    <div class="proDetail" v-html="info.goods_desc"></div>

    <!-- 加入购物车 -->
    
    <van-goods-action>
      <van-goods-action-icon
        to="/buycart"
        :badge="
          $store.state.cartTotal.goodsCount == 0
            ? ''
            : $store.state.cartTotal.goodsCount
        "
        icon="cart-o"
        text="购物车"
      />
      <van-goods-action-icon icon="star-o" text="已收藏" color="#ff5000" />
      <van-goods-action-button
        @click="chooseSku"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>

    <!-- 选择商品规格 -->
    <van-sku
      v-model="showSku"
      :sku="sku"
      :goods="goods"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
import axios from 'axios'

let sku = {
  // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
  // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
  tree: [
    {
      k: '颜色', // skuKeyName：规格类目名称
      v: [
        {
          id: '30349', // skuValueId：规格值 id
          name: '红色' // skuValueName：规格值名称
        },
        {
          id: '1215',
          name: '蓝色'
        }
      ],
      k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
    }
  ],
  // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
  list: [
    {
      id: 2259, // skuId，下单时后端需要
      price: 100, // 价格（单位分）
      's-1': '2', // 规格类目 k_s 为 s1 的对应规格值 id
      's-2': '3', // 规格类目 k_s 为 s2 的对应规格值 id
      stock_num: 110 // 当前 sku 组合对应的库存
    },
    {
      id: 2259, // skuId，下单时后端需要
      price: 100, // 价格（单位分）
      's-1': '1', // 规格类目 k_s 为 s1 的对应规格值 id
      's-2': '4', // 规格类目 k_s 为 s2 的对应规格值 id
      stock_num: 130 // 当前 sku 组合对应的库存
    }
  ],
  price: '1.00', // 默认价格（单位元）
  stock_num: 227 // 商品总库存
}

export default {
  props: ['id'],
  data() {
    return {
      // 总数据
      data: {},
      searchData: '',
      //   商品描述数据
      info: {},
      attribute: {},
      //   是否显示选择规格
      showSku: false,
      sku: sku,
      goods: {
        // 商品标题
        title: '测试商品',
        // 默认商品 sku 缩略图
        picture: ''
      }
    }
  },

  methods: {
    async getlist() {
      //   根据id获取总数据
      console.log(this.id)
      let res = await axios.get(this.$root.api.GoodsDetail, {
        params: { id: this.id }
      })
      // 总数据
      this.data = res.data.data
      // 商品描述
      this.info = this.data.info
      console.log(this.data)
      this.attribute = this.data.attribute
      //   默认商品图片
      this.goods.picture = this.info.primary_pic_url
      // 默认商品名字
      this.goods.title = this.info.name
      //   价格
      this.sku.price = this.info.retail_price
      // console.log(this.info);
      //   库存
      this.sku.stock_num = this.info.goods_number

      // 配置树
      let tree = []
      this.data.specificationList.forEach((item, index) => {
        let arr = []
        item.valueList.forEach(product => {
          arr.push({
            id: product.id, // skuValueId：规格值 id
            name: product.value // skuValueName：规格值名称
          })
        })
        tree.push({
          k: item.name, // skuKeyName：规格类目名称
          v: arr,
          k_s: 's-' + item.specification_id // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
        })
      })
      this.sku.tree = tree
    },
    //   点击返回按钮
    onClickLeft() {
      //   console.log(1)
      this.$router.go(-1)
    },
    // 点击购买
    onBuyClicked() {
      // 将订单页提交到订单页
    },
    // 点击加入购物车
    async onAddCartClicked(skuData) {
      // 选择商品规格并提交到购物车
      this.showSku = false
      // 获取选中商品规格参数，与此商品总数据对比拿到id参数
      // console.log(skuData)

      // 对应配套值
      let chooseContent =
        skuData.selectedSkuComb['s-1'] + '_' + skuData.selectedSkuComb['s-2']

      // 筛选  得到加入购物车商品的参数  主要是为了拿到商品的goodsId
      let resultPro = this.data.productList.filter((item, index) => {
        if (item.goods_specification_ids == chooseContent) {
          return true
        } else {
          return false
        }
      })
      // console.log(resultPro)

      //添加商品到购物车  得到后端发来的购物车数据
      let cartRes = await axios.post(this.$root.api.CartAdd, {
        goodsId: resultPro[0].goods_id,
        number: skuData.selectedNum,
        productId: resultPro[0].id
      })
      let data = cartRes.data.data
      // console.log(data)

      // 点击加入购物车显示购物车商品数量 调用vuex里的函数，把值发送过去
      this.$store.commit('setCarList', data.cartList)
      this.$store.commit('setCartTotal', data.cartTotal)
    },
    //底部购物车栏 点击加入购物车
    chooseSku() {
      // console.log(1)
      this.showSku = true
      // console.log(this.showSku)
    },
    // 点击选择商品规格显示详情
    show() {
      this.showSku = true
    }
  },
  created() {
    // 页面初始化渲染调用vuex里面的函数 后台服务器购物车的商品数量
    this.$store.dispatch('AjaxCart')
    this.getlist()
  },
  computed: {
    //   得到轮播图数据
    images() {
      if (this.data.gallery == undefined) {
        return []
      } else {
        return this.data.gallery
      }
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
}
#product {
  .swipeImg {
    width: 100%;
  }
  .info {
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    color: #999;
    height: 24px;
    line-height: 24px;
    background-color: #efefef;
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
  .proInfo {
    .title {
      font-weight: 500;
      padding: 10px 0 5px;
    }
    .brief {
      font-size: 12px;
      color: #999;
      padding: 3px;
    }
    .price {
      font-size: 16px;
      color: red;
      padding: 5px;
    }
  }
  .van-cell__title {
    text-align: left;
    font-size: 18px;
  }
  .proParams {
    padding-bottom: 20px;
    h3 {
      padding: 10px 0;
    }
    .proItem {
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      height: 24px;
      color: #999;
      font-size: 12px;
      background: #efefef;
      line-height: 24px;
      text-align: left;
      span.title {
        width: 45px;
        padding: 0 10px;
        border-right: 1px solid #ccc;
      }
      span.value {
        width: 260px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
<style lang="less">
#product {
  .proDetail {
    width: 100%;

    p {
      margin: 0;
      padding: 0;
      display: flex;
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
