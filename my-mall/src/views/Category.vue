<template>
  <div id="category">
    <!-- 搜索框 -->
    <van-search
      v-model="searchData"
      placeholder="商品搜索 共239万款好物"
      input-align="center"
    />

    <!-- 大列表侧边导航栏 -->
    <van-tree-select
      :items="items"
      :main-active-index.sync="activeIndex"
      height="calc(100vh - 104px)"
      @click-nav="changeRight"
    >
      <!-- 右边内容 -->
      <template slot="content">
        <div class="imgbanner">
          <img :src="bannerImg" alt="" width="100%" />
        </div>
        <van-grid :column-num="3">
          <!-- 循环右边得到每个图标内容 -->
          <!-- 点击去到分类商品列表 -->
          <van-grid-item
            v-for="(item, index) in subCategoryList"
            :key="index"
            :icon="item.wap_banner_url"
            :text="item.name"
            :to="'/categorylist/' + item.id"
          />
        </van-grid>
      </template>
    </van-tree-select>
    <!-- 底部标签 -->
    <tab-btn></tab-btn>
  </div>
</template>

<script>
// 导入公共底部标签
import tabBtn from '@/components/tabBtn.vue'
// 导入axios
import axios from 'axios'
// 导入api脚本
import api from '@/assets/config/api.js'
export default {
  data() {
    return {
      searchData: '',
      //   items: [{ text: '分组 1' }, { text: '分组 2' }],
      //   左边每个导航对应的值
      activeIndex: 0,
      //   分类总数据
      data: {},
      //   右边内容数据
      subCategoryList: [],
      //   顶部图片
      bannerImg: ''
    }
  },
  async created() {
    //   页面加载请求数据
    let res = await axios.get(api.CatalogList)
    let data = res.data
    // 得到分类页总数据
    this.data = data.data
    // 右边项数据
    this.subCategoryList = this.data.currentCategory.subCategoryList
    // console.log('this.data=>', this.data)
    // 顶部图片数据
    this.bannerImg = this.data.currentCategory.banner_url
  },
  computed: {
    //   items数据  左边栏数据
    items() {
      //   [{ text: '分组 1' }, { text: '分组 2' }]
      if (this.data.categoryList == undefined) {
        return []
      } else {
        let arr = []
        this.data.categoryList.forEach(item => {
          item.text = item.name
          //   把改变后的item给items
          arr.push(item)
          //   console.log(item);
        })
        // console.log('items=>', arr)
        return arr
      }
    }
  },
  methods: {
    //   点击改变内容得到新内容的索引
    changeRight(index) {
      //   console.log(index)
      //   把新的值给页面对应值
      this.activeIndex = index
    }
  },
  watch: {
    //   监听每次发生变化后页面的索引值
    activeIndex: async function() {
      if (this.items.length !== 0) {
        //   得到每个页面的id
        let id = this.items[this.activeIndex].id
        // console.log(id)
        // 通过id得到右边数据
        let res = await axios.get(api.CatalogCurrent, { params: { id } })
        //console.log(res)
        this.subCategoryList = res.data.data.currentCategory.subCategoryList
        this.bannerImg = this.items[this.activeIndex].img_url
        // console.log('右边最终数据=>', this.subCategoryList)
      } else {
        this.subCategoryList = []
      }
    }
  },
  components: {
    tabBtn
  }
}
</script>

<style lang="less" scoped>
#category {
  .imgbanner {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    padding-left: 0;
  }
}
</style>
