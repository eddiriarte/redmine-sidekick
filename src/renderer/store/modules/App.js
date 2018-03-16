const state = {
  loading: false
}

const getters = {
  loaded: (state) => (state.loading === false)
}

const mutations = {
  SET_LOADING (state, loading) {
    state.loading = loading
  }
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
