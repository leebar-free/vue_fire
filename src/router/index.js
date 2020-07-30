import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const levelCheck = (to, from, next) => {
  console.log('levelCheck...in :: ', store.state.claims.level)
  if (store.state.claims.level === undefined) next('/userProfile')
  next()    
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: levelCheck
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/about2',
    name: 'About2',
    component: () => import('../views/About2.vue')
  },
  {
    path: '/userProfile',
    name: 'userProfile',
    component: () => import('../views/userProfile.vue')
  },
  {
    path: '/lectures/card',
    name: 'card',
    component: () => import('../views/lectures/card.vue')
  },
  {
    path: '/lectures/layout',
    name: 'layout',
    component: () => import('../views/lectures/layout.vue')
  },
  {
    path: '/lectures/notes',
    name: 'notes',
    component: () => import('../views/lectures/notes.vue')
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('../views/sign.vue')
  },
  {
    path: '/lectures/axios',
    name: 'axios',
    component: () => import('../views/lectures/axios.vue')
  },
  {
    path: '/lectures/mother',
    name: 'mother',
    component: () => import('../views/lectures/mother.vue')
  },
  {
    path: '/lectures/vuex',
    name: 'vuex',
    component: () => import('../views/lectures/vuex.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const waitFirebase = () => {
	return new Promise((resolve, reject) => {
		let cnt = 0
		const tmr = setInterval(() => {
			if (store.state.firebaseLoaded) {
				clearInterval(tmr)
				resolve()
			} else if (cnt++ > 200) {
				clearInterval(tmr)
				reject(Error('파이어베이스 로드가 안되었습니다.'))
			}
		}, 10);
	})
}

router.beforeEach((to, from, next) => {
  console.log('router.beforeEach...in')
  // this.$Progress.start()
  Vue.prototype.$Progress.start()
  // if ( store.state.firebaseLoaded ) {
  //   next()
  // }
  waitFirebase()
  .then(() => next())
  .catch(e => Vue.prototype.$toasted.global.error(e.message))
})

router.afterEach((to, from) => {
  console.log('router.afterEach...in')
  Vue.prototype.$Progress.finish()
  // next()
})

export default router
