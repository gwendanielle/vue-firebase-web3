import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setSuccessTransferStatus (state, payload) {
      state.status = 'success'
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      console.log('email and pass' + payload.email)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            user.updateProfile({displayName: payload.eth_address})
              .then(
                user => {
                  commit('setLoading', false)
                  console.log('check user eth_address ' + user.eth_address)
                  const newUser = {
                    id: user.uid,
                    name: user.eth_address,
                    email: user.email,
                    photoUrl: user.photoURL
                  }
                  console.log('new user was created')
                  commit('setUser', newUser)
                }
              )
              .catch(
                error => {
                  console.log('the error is ' + error)
                  commit('setLoading', false)
                  commit('setError', error)
                }
              )
          }
        )
        .catch(
          error => {
            console.log('firebase error ' + error)
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.name,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserInGoogle ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      console.warn('check payload.name ' + payload.name)
      console.warn('check payload.eth_address ' + payload.eth_address)
      commit('setUser', {
        id: payload.uid,
        name: payload.name,
        email: payload.email,
        photoUrl: payload.photoURL
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
