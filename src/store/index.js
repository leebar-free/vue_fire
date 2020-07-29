import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '원래 제목',
    user: null,
    token: '',
    claims: null
  },
  mutations: {
    setTitle (state, p) {
      state.title = p
    },
    setUser (state, user) {
      state.user = user
    },
    setToken (state, token) {
      state.token = token
    },
    setClaims (state, claims) {
      state.claims = claims
    },
  },
  actions: {
    getUser({commit}, user) {
      console.log("getUser...in")
      if (!user) return
      console.log("getUser...in2")

      return user.getIdToken()
        .then(token => {
          console.log('getIdToken...in...token...')
          console.log(token)
          commit('setUser', user)
          commit('setToken', token)
          return user.getIdTokenResult()
        })
        .then(r => {
          console.log('getIdToken...in...r.claims...')
          console.log(r)
          commit('setClaims', r.claims)
        })
        .catch(e => {
          console.error(e.message)
        })

    }
  },
  modules: {
  }
})
