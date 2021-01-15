export const state = () => ({
  DB_NAME: 'cyctest',
  isShowLogin: false,
  userInfo: {
    name: 'cyc',
    id: 123
  }
})

export const mutations = {
  SET_LOGIN(state, login) {
    state.isShowLogin = login
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  }
}

export const getters = {}
export const actions = {
  async login({ commit, dispatch, state, rootState }, opt = {}) {
    const { query = {} } = opt
    const res = await this.$axios.post('/query/data', {
      db: state.DB_NAME,
      table: 'user',
      // remove: ['password'],
      jsonMessage: {
        name: query.name || Math.random(),
        password: query.password || Math.random()
      }
    })
    if (res.data.list.length > 0) {
      commit('SET_USER_INFO', res.data.list[0])
    }

    return res.data.list
  }
}
