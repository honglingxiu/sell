import Vue from "vue"
import  Vuex from "vuex"
import selectFoods from './modules/selectFoods'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    selectFoods
  }
})
