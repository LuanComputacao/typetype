import Vue from 'vue'
import Vuex from 'vuex'
import racing from './modules/racing'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    racing
  }
})
