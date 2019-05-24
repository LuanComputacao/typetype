import racing from '@/api/racing'

const state = {
  racing: {}
}

const getters = {

}

const actions = {
  async getRacing ({ commit }) {
    commit('setRacing', await racing.getRacing())
  }

}

const mutations = {
  setRacing (state, racing) {
    state.racing = racing
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
