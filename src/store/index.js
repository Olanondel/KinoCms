import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/admin/users'
import auth from './modules/admin/auth'
import lang from './modules/admin/lang'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    auth,
    lang
  }
})