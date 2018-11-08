import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import metamask from './metamask'

Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    user: user,
    shared: shared,
    metamask: metamask
  }
})
