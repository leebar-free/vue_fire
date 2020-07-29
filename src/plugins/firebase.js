// Firebase App (the core Firebase SDK) is always required and must be listed first
import Vue from 'vue'
import * as firebase from "firebase/app";
import firebaseConfig from '../../firebaseConfig';
import store from '../store';
import router from '../router'

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyC1mgPXzWkjWetiBF-xZ7ajq2hFarelS00",
//     authDomain: "vue-fire-99d24.firebaseapp.com",
//     databaseURL: "https://vue-fire-99d24.firebaseio.com",
//     projectId: "vue-fire-99d24",
//     storageBucket: "vue-fire-99d24.appspot.com",
//     messagingSenderId: "991576110279",
//     appId: "1:991576110279:web:614056d86471c395363ae2",
//     measurementId: "G-7NZF6BPNE3"
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase.firestore().collection('test').add({ test: 'aaa' })
//     .then(r => console.log(r))
//     .catch(e => console.error(e))

Vue.prototype.$firebase = firebase

Vue.prototype.$isFirebaseAuth = false

firebase.auth().onAuthStateChanged(function(user) {
  Vue.prototype.$isFirebaseAuth = true
  // console.log("onAuthStateChanged...in")
  console.log(user)

  // store.commit('setUser', user)
  store.dispatch('getUser', user)
    .then (() => {
      if (user) {
        // User is signed in.
        console.log("onAuthStateChanged...in :: Exists user")
        router.push('/')
      } else {
        // No user is signed in.
        console.log("onAuthStateChanged...in :: Not Exists user")
        router.push('/sign')
      }
    })
});
