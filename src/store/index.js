import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
const key = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    user: getItem(key)
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(key, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
