import firebase from "firebase";
import db from '../../../firebase/firebaseInit'

export default {
  actions: {
    async register({ dispatch }, payload) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        const uid = await dispatch('getUid')

        await db.collection('Users').doc(uid).set({
          firstName: payload.firstName,
          lastName: payload.lastName,
          nickname: '',
          email: payload.email,
          password: payload.password,
          address: '',
          cardNumber: '',
          language: '',
          gender: '',
          phone: '',
          dob: '',
          city: '',
          confirmPassword: payload.password
        })
      } catch (err) {
        alert(err)
      }
    },
    async saveUserData({ dispatch }, payload) {
      try {

        const uid = await dispatch('getUid')

        await db.collection('Users').doc(uid).set({
          firstName: payload.firstName,
          lastName: payload.lastName,
          nickname: payload.nickname,
          email: payload.email,
          password: payload.password,
          address: payload.address,
          cardNumber: payload.cardNumber,
          language: payload.language,
          gender: payload.gender,
          phone: payload.phone,
          dob: payload.dob,
          city: payload.city,
          confirmPassword: payload.password,
          id: uid
        })

        dispatch('getCurrentUserData')
      } catch (err) {
        alert(err)
      }
    },
    async login(ctx, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        alert(e)
      }
    },
    async logout({commit}) {
      try {
        await firebase.auth().signOut()
        commit('removeAuthData')

        await this.$router.push('/')

      } catch (e) {
        console.log(e)
      }
    },
    async getCurrentUserData({dispatch, commit}) {
      let uid = await dispatch('getUid')

      let res = await db.collection('Users').doc(uid).get()

      let data = res.data()

      await firebase.auth().currentUser.updateProfile({
        displayName: `${data.firstName} ${data.lastName}`
      })

      commit('setCurrentUserProfile', data)
    },
    async getUid() {
      const user = firebase.auth().currentUser

      return user ? user.uid : null
    }
  },
  mutations: {
    setAuthData(state, { uid }) {
        state.isAuth = true
        state.uid = uid

      if (uid === 'elTOgrltdSW93B0bCKN45mfnpdl2') {
        state.isAdmin = true
      }
    },
    setCurrentUserProfile(state, payload) {
      state.currentUserProfile = payload
    },
    removeAuthData(state) {
      state.isAuth = false
      state.uid = null
      state.isAdmin = null
      state.currentUserProfile = null
    }
  },
  state: {
    isAuth: false,
    currentUserProfile: null,
    uid: null,
    isAdmin: null
  },
  getters: {
    isAuth(state) {
      return state.isAuth
    },
    currentUser(state) {
        return state.currentUserProfile ? state.currentUserProfile : null
    },
    uid: s => s.uid,
    currentUserFullName(state) {
      return `${state.currentUserProfile.firstName} ${state.currentUserProfile.lastName}`
    },
    isAdmin: state => state.isAdmin
  }
}