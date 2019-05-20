import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mobileCommon from './modules/mobileCommon'
import clock from './modules/clock'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    mobileCommon,
    clock   
  },
  getters
})
export default store
