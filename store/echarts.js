export const state = () => ({
  DB_NAME: process.env.NODE_ENV === 'production' ? 'blog' : 'cyctest'
})

export const mutations = {}

export const getters = {}

export const actions = {
  /**
   * 获取文章列表
   */
  async getEchartsList({ commit, dispatch, state, rootState }, opt = {}) {
    const { query = {}, page = 1 } = opt
    const res = await this.$axios.post('/query/data', {
      db: state.DB_NAME,
      table: 'echartslist',
      page: parseInt(page),
      pageSize: 10,
      pointer: ['id', 'title', 'img', 'description', 'tag'],
      jsonMessage: {
        nshow: { $ne: true },
        ...query
      }
    })
    return res
  },
  /**
   * 获取文章列表
   */
  async getEchartsOptions({ commit, dispatch, state, rootState }, opt = {}) {
    const { query = {} } = opt
    const res = await this.$axios.post('/query/data', {
      db: state.DB_NAME,
      table: 'echartslist',
      jsonMessage: {
        nshow: { $ne: true },
        ...query
      }
    })
    return res
  }
}
