import Vue from 'vue'
import Vuex from 'vuex'
import dataset from "./modules/dataset";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dataset
  }
})
