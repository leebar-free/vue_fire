import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// const levelCheck = (to, from, next) => {
//   console.log('levelCheck...in...user :: ', store.state.user)
//   console.log('levelCheck...in...claims :: ', store.state.claims)
//   if (!store.state.user) return next('/sign')
//   if (!store.state.claims) return next('/userProfile')
//   next()
// }

const adminCheck = (to, from, next) => {
  console.log('adminCheck...in...user :: ', store.state.user)
  if (!store.state.user) {
    if (to.path !== '/sign') return next('/sign')
  } else {
    if (!store.state.user.emailVerified) return next('/userProfile')
    if (store.state.claims.level > 0) throw Error('관리자만 들어갈 수 있습니다.')
  }
  next()
}

const userCheck = (to, from, next) => {
  console.log('userCheck...in...user :: ', store.state.user)
  if (!store.state.user) {
    if (to.path !== '/sign') return next('/sign')
  } else {
    if (!store.state.user.emailVerified) return next('/userProfile')
    if (store.state.claims.level > 1) throw Error('사용자만 들어갈 수 있습니다.')
  }
  next()
}

const guestCheck = (to, from, next) => {
  console.log('guestCheck...in...user :: ', store.state.user)
  if (!store.state.user) {
    if (to.path !== '/sign') return next('/sign')
  } else {
    // if (!store.state.user.emailVerified) return next('/userProfile')
    if (store.state.claims.level > 2) throw Error('손님만 들어갈 수 있습니다.')
  }
  next()
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: guestCheck
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('../views/sign.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.user) return next('/')
      next()
    }
  },
  {
    path: '/userProfile',
    name: 'userProfile',
    component: () => import('../views/userProfile.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.user) return next('/sign')
      next()
    }
  },
  {
    path: '/admin/users',
    component: () => import('../views/admin/users.vue'),
    beforeEnter: guestCheck   //adminCheck, guestCheck
  },
  {
    path: '/test/lv0',
    component: () => import('../views/test/lv0.vue'),
    beforeEnter: adminCheck
  },
  {
    path: '/test/lv1',
    component: () => import('../views/test/lv1.vue'),
    beforeEnter: userCheck
  },
  {
    path: '/test/lv2',
    component: () => import('../views/test/lv2.vue'),
    beforeEnter: guestCheck
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
  {
    path: '/lectures/storage',
    name: 'storage',
    component: () => import('../views/lectures/storage.vue')
  },
  {
    path: '/lectures/grid',
    name: 'grid',
    component: () => import('../views/lectures/grid.vue')
  },
  {
    path: '/lectures/rdb',
    name: 'rdb',
    component: () => import('../views/lectures/rdb.vue')
  },
  // {
  //   path: '/test/lv0',
  //   name: 'lv0',
  //   component: () => import('../views/test/lv0.vue')
  // },
  // {
  //   path: '/test/lv1',
  //   name: 'lv1',
  //   component: () => import('../views/test/lv1.vue')
  // },
  // {
  //   path: '/test/lv2',
  //   name: 'lv2',
  //   component: () => import('../views/test/lv2.vue')
  // },
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

router.onError(e => {
  Vue.prototype.$Progress.finish()
  Vue.prototype.$toasted.global.error(e.message)
})

export default router
