import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Feed from './views/Feed.vue'
import store from './store/store'

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
          path: '/',
          name: 'feed',
          component: Feed,
          meta: {
            requiresAuth: true
          }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        },
        {
            path: '*',
            component: Feed
        }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters['auth/isLoggedIn']) {
        next();
        window.scrollTo(0, 0);
        return;
      }
      else
        next('/login');
    } else {
      next();
    }
})

export default router;