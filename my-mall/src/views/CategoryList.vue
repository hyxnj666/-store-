<template>
  <div id="categoryList">
    <!-- 搜索框 -->
    <van-search
      v-model="searchData"
      placeholder="商品搜索 共239万款好物"
      input-align="center"
    />
    <van-tabs v-model="tabActive" :title-active-color="'rgb(175, 1, 1)'">
      <!-- 顶部列表栏 -->
      <van-tab v-for="(item, index) in clist" :key="index" :title="item.name">
        <!-- 商品栏 -->
        <div class="content">
          <h4 class="title1">{{ item.name }}</h4>
          <p class="title2">{{ item.front_name }}</p>
        </div>
        <div class="goodsbox" v-if="item.plist">
          <!-- 商品宫格 -->
          <van-grid :border="true" :column-num="2">
            <!-- 点击去到商品详情 -->
            <van-grid-item
              :to="'/product/' + item1.id"
              v-for="(item1, index1) in item.plist.data"
              :key="index1"
            >
              <!-- 商品图片 -->
              <van-image
                lazy-load
                width="125"
                height="110"
                :src="item1.list_pic_url"
              />
              <h4 class="van-ellipsis">{{ item1.name }}</h4>
              <p>￥{{ item1.retail_price }}</p>
            </van-grid-item>
          </van-grid>
        </div></van-tab
      >
    </van-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  // 路由传进来的id
  props: ['id'],
  data() {
    return {
      searchData: '',
      // 选中的标题索引
      tabActive: '',
      //   标题对应的内容
      clist: []
    }
  },
  async created() {
    //   console.log(this.id);
    // console.log(this.$root.api);
    // ---------------------------获取分页数据
    let res = await axios.get(this.$root.api.GoodsCategory, {
      params: { id: this.id }
    })
    // console.log(res.data)
    // --------------------得到标题对应数据
    this.clist = res.data.data.brotherCategory
    // console.log(this.clist)
    // console.log(this.id)
    // -----------------根据点击id获取索引  判断点击的是哪个小分类
    var index = this.clist.findIndex(item => item.id == this.id)
    // console.log(index);
    // -----------把索引给选中标签
    this.tabActive = index
    // let id = this.clist.id
    // 循环商品标签列表  根据每项的id发送请求获得新的商品数据
    this.clist.forEach(async item => {
      item.plist = await this.getlist(item.id, 1)
      console.log(item.plist);
      this.$forceUpdate()
    })
    // console.log(this.clist)
  },
  methods: {
    async getlist(cid, page) {
      // 根据id获取详细商品数据
      let res = await axios.get(this.$root.api.GoodsList, {
        params: { categoryId: cid, page: page, size: 20 }
      })
      // console.log(res)
      return res.data.data
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
#categoryList {
  .content {
    padding-top: 20px;
    padding-bottom: 18px;
    background-color: rgb(245, 243, 243);
  }
  .title1 {
    margin: 0;
    color: #333;
  }
  .title2 {
    margin: 0;
    margin-top: 5px;
    font-size: 12px;
    color: #999;
  }
  .goodsbox {
    .van-ellipsis {
      width: 100%;
      margin: 0;
      margin-bottom: 5px;
      font-weight: 500;
      padding: 0 10px;
    }
    .van-grid-item {
      overflow: hidden;
      box-sizing: border-box;
    }
    p {
      margin: 0;
      color: rgb(175, 1, 1);
    }
  }
}
</style>
