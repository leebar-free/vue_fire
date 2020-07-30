import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '원래 제목',
    user: null,
    token: '',
    claims: null,
    firebaseLoaded: false
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
    setFirebaseLoaded (state) {
      state.firebaseLoaded = true
    },
  },
  actions: {
    async getUser({commit}, user) {
      console.log("getUser...in")
      commit('setFirebaseLoaded')
      commit('setUser', user)
      if (!user) return false
      console.log("getUser...in2")

      const token = await user.getIdToken()
      commit('setToken', token)
      const { claims } = await user.getIdTokenResult()
      commit('setClaims', claims)

      // user.getIdToken()
      //   .then(token => {
      //     console.log('getIdToken...in...token...')
      //     console.log(token)
      //     return user.getIdTokenResult()
      //   })
      //   .then(r => {
      //     console.log('getIdToken...in...r.claims...')
      //     console.log(r)
      //     commit('setClaims', r.claims)
      //   })
      //   .catch(e => {
      //     console.error(e.message)
      //   })

    }
  },
  modules: {
  }
})
