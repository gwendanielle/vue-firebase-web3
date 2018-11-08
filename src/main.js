import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import firebase from 'firebase'

const MetaMaskCmp = () => import('./components/Shared/MetaMask.vue')

Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.component('app-metamask', MetaMaskCmp)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBT4saMjq5lCHqJWey-_Grjs8Vn11E6AGI',
      authDomain: 'sample-ethereum-firebase-dapp.firebaseapp.com',
      databaseURL: 'https://sample-ethereum-firebase-dapp.firebaseio.com',
      projectId: 'sample-ethereum-firebase-dapp'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
})
