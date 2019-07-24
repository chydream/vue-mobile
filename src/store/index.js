import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mobileCommon from './modules/mobileCommon'
import clock from './modules/clock'
import menu from './modules/menu'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    mobileCommon,
    clock,
    menu   
  },
  getters
})
export default store
