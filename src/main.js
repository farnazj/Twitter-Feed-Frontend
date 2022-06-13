import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'
import './assets/css/main.css'
import router from './router'
import store from './store/store'
import axios from 'axios'
// import consts from './services/constants'

Vue.config.productionTip = false
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App),
  vuetify
}).$mount('#app')
