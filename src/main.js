import Vue from 'vue'
import './plugins'
// import './plugins/vuetify'
// import './plugins/firebase'
// import './plugins/axios'
// import './plugins/vue-toasted'
import './error'
import App from './App.vue'
import router from './router'
import store from './store'
// import test from './plugins/test'

Vue.config.productionTip = false

// Vue.config.errorHandler = e => {
//   console.log('here')
//   console.error(e.message)
// }

// test.foo()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
