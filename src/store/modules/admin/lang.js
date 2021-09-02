export default {
  actions: {
    getLang({commit}, lang) {
      commit('setLang', lang)
    }
  },
  mutations: {
    setLang(state, lang) {
      state.lang = lang
    }
  },
  state: {
    lang: 'ru'
  },
  getters: {
    currentLang(state) {
      return state.lang
    }
  }
}