import server from "../../../requests/admin/requests";

export default {
  actions: {
    async getUsers({commit}) {
      let res = await server.getData('Users')

      let data = res.map(el => {return el.data()})

      commit('setUsers', data)
    },
  },
  mutations: {
    setUsers(state, data) {
      state.users = data
    }
  },
  state: {
    users: []
  },
  getters: {
    allUsers(state) {
      return state.users
    }
  }
}