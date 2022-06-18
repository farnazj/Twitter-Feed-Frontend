import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import feed from './modules/feed'
import loader from './modules/loader'
import websocket from './modules/websocket'

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
    feed,
    loader,
    websocket
  }
});

export default store;