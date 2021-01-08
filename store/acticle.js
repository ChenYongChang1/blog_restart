export const state = () => ({
  articleList: []
})

export const mutations = {
  SET_ARTICLE_LIST(state, articleList) {
    state.articleList = articleList
  }
}

export const getters = {}

export const actions = {
  /**
   * 获取他人博客
   * @param {*} param0
   * @param {*} opt
   */
  async getOtherBlogMd({ commit, dispatch, state, rootState }, opt = {}) {
    const { webUrl } = opt
    const res = await this.$axios.post('/add/article', {
      db: 'cyc',
      table: 'cyc',
      save_db: false,
      jsonMessage: {
        // resource: 'cnblogs',
        url: webUrl
      }
    })
    return res
  },
  /**
   * 获取文章列表
   */
  async getArticleList({ commit, dispatch, state, rootState }, opt = {}) {
    const res = await this.$axios.post('/query/data', {
      db: 'cyctest',
      table: 'test',
      page: 1,
      pageSize: 10,
      jsonMessage: opt
    })
    return res
  },
  /**
   * 添加博客
   */
  async addArticle({ commit, dispatch, state, rootState }, opt = {}) {
    const res = await this.$axios.post('/add/data', {
      db: 'cyctest',
      table: 'test',
      jsonMessage: opt
    })
    return res
  }
}
