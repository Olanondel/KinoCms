import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import auth from './modules/auth'
import lang from './modules/lang'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    auth,
    lang
  }
})