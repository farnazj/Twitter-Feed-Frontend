import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#03A9F4',
      }
    }
  },
  icons: {
    iconfont: 'mdi',
  }
});