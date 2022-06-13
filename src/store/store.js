import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import feed from './modules/feed'



Vue.use(Vuex)

let store = new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    auth,
    feed
  }
});

export default store;