<template>
  <div class="home" id="home">
    <!-- 搜索框 -->
    <van-search
      v-model="searchData"
      placeholder="商品搜索 共239万款好物"
      input-align="center"
      @search="onSearch"
    /> 
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" :width="375" :height="200">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="swiperimg" v-lazy="image.image_url" />
      </van-swipe-item>
    </van-swipe>

    <!-- 5个图标  -->
    <div class="tab">
      <van-grid :column-num="5">
        <van-grid-item
          v-for="(item, index) in channel"
          :key="index"
          icon="photo-o"
          :text="item.name"
        />
      </van-grid>
    </div>
    <!-- 品牌制造商直供 -->
    <div class="brandlist">
      <van-panel class="bigTitle" title="品牌制造商直供">
        <van-grid :column-num="2">
          <van-grid-item v-for="(item1, index1) in brandList" :key="index1">
            <van-image
              fit="cover"
              lazy-load
              :src="item1.new_pic_url"
              rel="external nofollow"
            />
            <h4 class="title">{{ item1.name }}</h4>
            <p class="price">{{ item1.floor_price }}元起</p>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>

    <!-- 新品首发 -->
    <div class="newlist">
      <van-panel title="新品首发">
        <van-grid :column-num="2">
          <van-grid-item v-for="(item2, index2) in newGoodsList" :key="index2">
            <van-image fit="cover" lazy-load :src="item2.list_pic_url" />
            <h4 class="title1">{{ item2.name }}</h4>
            <p class="price1">{{ item2.retail_price }}元起</p>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>

    <!-- 人气面板  -->
    <div class="hotlist">
      <van-panel title="人气推荐">
        <van-card
          v-for="(item3, index3) in hotGoodsList"
          :key="index3"
          :price="item3.retail_price"
          :desc="item3.goods_brief"
          :title="item3.name"
          :thumb="item3.list_pic_url"
        />
      </van-panel>
    </div>

    <!-- 专题精选 -->
    <div class="specific">
      <van-panel title="专题精选">
        <van-swipe :width="375" :height="240" :show-indicators="false">
          <van-swipe-item v-for="(item4, index4) in topicList" :key="index4">
            <van-image
              class="swiper"
              fit="cover"
              lazy-load
              :src="item4.item_pic_url"
              rel="external nofollow"
            />
            <h4 class="title2">{{ item4.title }}</h4>
            <p class="price2">{{ item4.subtitle }}</p>
          </van-swipe-item>
        </van-swipe>
      </van-panel>
    </div>

    <!-- 居家等导航 -->
    <div class="home">
      <van-panel
        v-for="item5 in categoryList"
        :key="item5.id"
        :title="item5.name"
      >
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item v-for="item6 in item5.goodsList" :key="item6.id">
            <van-image fit="cover" lazy-load :src="item6.list_pic_url" />
            <h4 class="title3">{{ item6.name }}</h4>
            <p class="price3">{{ item6.retail_price }}元起</p>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>

    <div style="height:50px"></div>
    <tab-btn></tab-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import api from '../assets/config/api'
import Vue from 'vue'
import { Lazyload } from 'vant'
import tabBtn from '@/components/tabBtn.vue'
Vue.use(Lazyload)

export default {
  name: 'Home',
  data: function() {
    return {
      searchData: '',
      data: {}
    }
  },
  methods: {
    async onSearch(){
      // console.log(1)
      let res = await axios.get(this.$root.api.SearchIndex)
      console.log(res);
    }
  },
  computed: {
    // 轮播图
    // 从data属性里获取bunner数据 变成计算属性images
    images() {
      if (typeof this.data.banner == 'object') {
        return this.data.banner
      } else {
        return []
      }
    },
    // 格子导航
    channel() {
      if (typeof this.data.banner == 'object') {
        return this.data.channel
      } else {
        return []
      }
    },
    // 品牌制造商直供
    brandList() {
      if (typeof this.data.banner == 'object') {
        return this.data.brandList
      } else {
        return []
      }
    },
    // 新品首发
    newGoodsList() {
      if (typeof this.data.newGoodsList == 'object') {
        return this.data.newGoodsList
      } else {
        return []
      }
    },
    // 人气面板
    hotGoodsList() {
      if (typeof this.data.hotGoodsList == 'object') {
        return this.data.hotGoodsList
      } else {
        return []
      }
    },
    // 专题精选
    topicList() {
      if (typeof this.data.topicList == 'object') {
        // console.log(this.data.topicList)
        return this.data.topicList
      } else {
        return []
      }
    },
    // 居家等导航
    categoryList() {
      if (typeof this.data.categoryList == 'object') {
        // console.log(this.data.topicList)
        return this.data.categoryList
      } else {
        return []
      }
    }
    // 底部导航栏
  },
  // 页面刷新时获取数据
  async mounted() {
    let res = await axios.get(api.IndexUrl)
    // console.log(res.data)
    // 把数据给data属性
    this.data = res.data.data
    // console.log(this.data)
  },
  components: {
    tabBtn
  }
}
</script>

<style lang="less">
#home {
  background-color: #eee;
  .van-grid-item {
    overflow: hidden;
  }
  .swiperimg {
    width: 375px;
    height: 200px;
  }
  .tab {
    margin-bottom: 8px;
  }
  .brandlist {
    .van-grid-item__content {
      padding: 0;
    }
    // .bigTitle {
    //   padding-top:  20px;
    // }
    .van-image {
      border: 1px solid #fff;
    }
    .title {
      position: absolute;
      top: 0px;
      left: 10px;
    }
    .price {
      position: absolute;
      top: 30px;
      left: 10px;
      font-size: 14px;
      color: #999;
    }
  }
  .newlist {
    .title1 {
      margin: 0;
      width: 90%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .price1 {
      margin: 0;
      width: 90%;
    }
  }
  .hotlist {
    margin-top: 8px;
    margin-bottom: 8px;
    .van-card__content {
      justify-self: center;
      text-align: left;
    }
    .van-card__title {
      font-weight: 900;
      font-size: 14px;
      color: #333;
      padding: 5px 0;
    }
    .van-card__price {
      color: red;
    }
    .van-card {
      margin: 0;
      border-top: 1px solid #ccc;
    }
  }
  .specific {
    .swiper {
      width: 350px;
      height: 180px;
    }
    margin-bottom: 8px;
    .title2 {
      position: absolute;
      z-index: 999;
      margin: 0;
      top: 190px;
      left: 12px;
    }
    .price2 {
      position: absolute;
      color: #999;
      font-size: 14px;
      z-index: 999;
      left: 12px;
      margin: 0;
      top: 210px;
      width: 80%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;
    }
  }
  .home {
    .van-grid-item__content {
      background-color: #eee;
    }
    .title3 {
      margin: 0;
      width: 90%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .price3 {
      margin: 0;
    }
  }
}
</style>
