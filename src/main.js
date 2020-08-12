import 'babel-polyfill'
import Vue from 'vue'
import './plugins'
import vuetify from './plugins/vuetify'
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

// const opts = {   
//   router,
//   store,
//   render: h => h(App) }
// Vue.use(Vuetify);

// new Vue({
//   vuetify: new Vuetify(opts)
// }).$mount('#app')

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
