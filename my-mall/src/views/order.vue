<template>
  <div id="order">
    <div v-if="flag == true" class="address1">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
    <div v-else class="bigbox">
      <div class="address" @click="handle">
        <van-divider />
        <van-radio-group v-model="radio" class="radio" checked-color="red">
          <van-radio name="1"></van-radio>
        </van-radio-group>
        <div class="box">
          <h3><span>张三</span><span> 130000000</span></h3>
          <p>湖南省衡阳市</p>
        </div>
      </div>

      <!-- 优惠券单元格 -->
      <div class="coupon">
        <!-- 优惠券单元格 -->
        <van-coupon-cell
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          @click="showList = true"
        />
        <!-- 优惠券列表 -->
        <van-popup
          v-model="showList"
          round
          position="bottom"
          style="height: 90%; padding-top: 4px;"
        >
          <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            @change="onChange"
            @exchange="onExchange"
          />
        </van-popup>
      </div>
      <div class="content">
        <van-cell-group>
          <van-cell
            title-style="text-align:left"
            title="商品合计"
            value="￥0"
          />
          <van-cell title-style="text-align:left" title="运费" value="￥0" />
          <van-cell title-style="text-align:left" title="优惠券" value="-￥0" />
        </van-cell-group>
      </div>
      <div class="sub">
        <span>合计:</span>
        <van-button type="danger" class="btn">去购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元'
}
export default {
  data() {
    return {
      radio: '1',
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ],
      flag: false,
      showList: false,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon]
    }
  },

  methods: {
    onChange(index) {
      this.showList = false
      this.chosenCoupon = index
    },
    onExchange(code) {
      this.coupons.push(coupon)
    },
    async getAddr() {
      let res = await axios.get(this.$root.api.AddressList)
      console.log(res)
    },
    handle() {
      this.flag = true
    },
    onAdd() {
      this.$router.push('/addr')
},
    onEdit(item, index) {
      Toast('编辑地址:' + index)
    }
  },
  created() {
    this.getAddr()
  }
}
</script>

<style lang="less" scoped>
#order {
  background-color: #eee;
  .address {
    box-sizing: border-box;
    display: flex;
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 10px;
    align-items: center;
    width: 100%;
    height: 100px;
    padding-left: 10px;
    .box {
      margin-left: 10px;
    }
    h3 {
      margin: 0;
    }
    p {
      margin: 0;
    }
    .van-divider {
      margin: 0;
    }
  }
  .content {
    margin-top: 10px;
    .one {
      color: red;
    }
  }
  .sub {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    span {
      // color: red;
      float: left;
      font-size: 20px;
    }
    .btn {
      // color: #fff;
      float: right;
    }
  }
}
</style>
