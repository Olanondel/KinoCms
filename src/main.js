import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import firebase from "firebase";


Vue.config.productionTip = false

let app

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }

  if (user) {
    app.$store.commit('setAuthData', {uid: user.uid})
    app.$store.dispatch('getCurrentUserData')
  } else {
    app.$store.commit('removeAuthData')
  }
})

