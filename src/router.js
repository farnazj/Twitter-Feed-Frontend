import Vue from 'vue'
import Router from 'vue-router'
import Feed from './views/Feed.vue'
import WaitingPage from './views/WaitingPage'
import PostStudy from './views/PostStudy'
import Consent from './views/Consent'
import Instructions from './views/Instructions'
import store from './store/store'

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
          path: '/standby',
          name: 'waitingPage',
          component: WaitingPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/feed',
          name: 'feed',
          component: Feed,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/post-study',
          name: 'postStudy',
          component: PostStudy,
        },
        {
          path: '/',
          name: 'consent',
          component: Consent
        },
        {
          path: '/instructions',
          name: 'instructions',
          component: Instructions
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