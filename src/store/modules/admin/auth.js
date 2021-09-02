import firebase from "firebase";

export default {
  actions: {
    async login({commit}, payload) {
      let res = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)

      commit('setAuthData', res.user)
    },
    async register({commit}, payload) {
      let res = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)

      commit('setAuthData', res.user)
    },
  },
  mutations: {
    setAuthData(state, user) {
      try {
        state.isAuth = true
        state.user = user
      } catch (err) {
        alert(err)
      }
    }
  },
  state: {
    isAuth: false,
    user: null
  },
  getters: {
    isAuth(state) {
      return state.isAuth
    }
  }
}