import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import api from '@/assets/config/api.js'
import axios from 'axios'
export default new Vuex.Store({
  state: {
    token: null,
    userInfo:null,
    cartTotal:{
      goodsCount: 0,
      goodsAmount: 0,
      checkedGoodsCount: 0,
      checkedGoodsAmount: 0
    },
    cartList:[], 
  }, 
  mutations: {
    setToken(state, token) {
      state.token = token
      
    },
    setCarList(state, cartList) {
      state.cartList = cartList
    },
    setCartTotal(state,cartTotal) {
      state.cartTotal = cartTotal
    }
  },
  actions: {
    async AjaxCart(content,data) {
      let cartRes = await axios.get(api.CartList)
      // console.log(cartRes.data)
      content.commit('setCarList',cartRes.data.data.cartList)
      content.commit('setCartTotal',cartRes.data.data.cartTotal)
    }
  },
  getters: {
    isLogin(state) {
      return state.token&&state.userInfo
    }
  },
  modules: {
  }
})
