import RedmineClient from '../../libs/Redmine/Client'

const state = {
  user: null,
  issue: null,
  selectedProject: null,
  projects: [],
  states: [],
  priorities: [],
  connection: null
}

// const getters = {
// }

const mutations = {
  SET_USER (state, { user }) {
    state.user = user
  },
  SET_CONNECTION (state, { connection }) {
    state.connection = connection
  },
  RESET_CONNECTION (state) {
    state = {
      user: null,
      issue: null,
      selectedProject: null,
      projects: [],
      states: [],
      priorities: [],
      connection: null
    }

    window.location = '/'
    console.error('There is no connection established to perform request!')
  },
  SET_PROJECTS (state, { projects }) {
    state.projects = projects
  },
  SET_SELECTED_PROJECT (state, { project }) {
    state.selectedProject = project
  }
}

const actions = {
  login ({ commit }, credentials) {
    state.connection.login(credentials.auth)
      .then((user) => {
        commit('SET_USER', { user })
      })
      .catch((e) => {
        console.error(e)
        commit('RESET_CONNECTION')
      })
  },
  LOAD_PROJECTS ({ commit, state }) {
    if (!(state.connection instanceof RedmineClient)) {
      commit('RESET_CONNECTION')
    }

    state.connection.projects()
      .then(projects => {
        commit('SET_PROJECTS', { projects })
      })
      .catch(e => {
        console.error(e)
        commit('RESET_CONNECTION')
      })
  },
  LOAD_SELECTED_PROJECT ({ commit, state }, { projectId }) {
    if (!(state.connection instanceof RedmineClient)) {
      commit('RESET_CONNECTION')
    }

    state.connection.projectById(projectId)
      .then(project => {
        commit('SET_SELECTED_PROJECT', { project })
      })
      .catch(e => {
        console.error(e)
        commit('RESET_CONNECTION')
      })
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}
