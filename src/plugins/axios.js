import Vue from 'vue'
import axios from "axios"
import moment from "moment"
import store from '../store'
import firebaseConfig from '../../firebaseConfig'

const firebaseAPI = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? `https://us-central1-${firebaseConfig.projectId}-99d24.cloudfunctions.net/` : `http://localhost:5001/${firebaseConfig.projectId}/us-central1/`,
    // baseURL: process.env.NODE_ENV === 'production' ? 'https://us-central1-vue-fire-99d24.cloudfunctions.net/' : 'http://localhost:5001/vue-fire-99d24/us-central1/',
    // baseURL: 'https://us-central1-vue-fire-99d24.cloudfunctions.net/',
    timeout: 10000,
    // headers: {'X-Custom-Header': 'foobar'}
});

// Add a request interceptor
firebaseAPI.interceptors.request.use(async (config) => {
    // Do something before request is sent
    // config.headers.authorization = Math.random()
    console.log("interceptors.request...in ::")
    // console.log(new Date(store.state.claims.iat * 1000))
    // console.log(moment(store.state.claims.exp * 1000).diff(moment(), 'seconds'))
    // console.log(store.state.claims)

    const dif = moment(store.state.claims.exp * 1000).diff(moment(), 'minutes')
    console.log(dif)
    if (dif < 10) await store.dispatch('getToken')

    config.headers.authorization = store.state.token
    return config
    }, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

// Vue.prototype.$axios = axios
Vue.prototype.$axios = firebaseAPI
