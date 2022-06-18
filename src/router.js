import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Feed from './views/Feed.vue'
import WaitingPage from './views/WaitingPage'
import store from './store/store'

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        
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
          path: '/standby',
          name: 'waitingPage',
          component: WaitingPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/',
          name: 'feed',
          component: Feed,
          meta: {
            requiresAuth: true
          }
        },
        {
            path: '*',
            component: Feed,
            meta: {
              requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      console.log('to', to, 'from', from, store.getters['auth/isLoggedIn'])
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