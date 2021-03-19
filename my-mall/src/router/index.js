import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入主页
import Home from '../views/Home.vue'
// 导入分类页
import Category from '@/views/Category.vue'
// 导入分类详情列表页
import CategoryList from '@/views/CategoryList.vue'
//  导入分类商品详情信息页
import Product from '@/views/product.vue'
// 导入购物车页面
import buycart from '@/views/buycart.vue'
// 提交订单页
import order from '@/views/order.vue'
// 我的页面
import self from '@/views/self.vue'
// 编辑地址页
import addr from '@/views/addr.vue'

// 登录
import login from '@/views/Login.vue'


import store from '../store/index'

let pusha = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return pusha.call(this, location).catch(err => err);
}
Vue.use(VueRouter)

const routes = [
  {
    // 主页面
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }, {
    // 分类页面
    path: '/category',
    name: 'category',
    component: Category
  }, {
    path: '/categorylist/:id',
    name: 'categorylist',
    component: CategoryList,
    props: true
  }, {
    path: '/product/:id',
    name: 'product',
    component: Product,
    props: true
  }, {
    path: '/buycart',
    name: 'buycart',
    component: buycart
  }, {
    path: '/order',
    name: 'order',
    component: order
  }, {
    path: '/self',
    name: 'self',
    component: self
  }, {
    path: '/addr',
    name: 'addr',
    component: addr
  }, {
    path: '/login',
    name: 'login',
    component: login
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(1);
  // to and from are both route objects. must call `next`.
  if (to.name == 'self') {
    let code = sessionStorage.getItem('code');
    console.log(code);
    if (code == 200) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})


export default router
