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
    const {
      query = {},
      page = 1,
      order = {
        orderBy: 'time',
        isDesc: 1
      }
    } = opt
    const res = await this.$axios.post('/query/data', {
      db: 'cyctest',
      table: 'article',
      page,
      pageSize: 10,
      order,
      jsonMessage: query
    })
    return res
  },
  /**
   * 添加博客
   */
  async addArticle({ commit, dispatch, state, rootState }, opt = {}) {
    const res = await this.$axios.post('/add/data', {
      db: 'cyctest',
      table: 'article',
      jsonMessage: opt
    })
    return res
  },
  /**
   * 获取标签
   */
  async getTagsList({ commit, dispatch, state, rootState }, opt = {}) {
    function groupByName(list, name = 'name') {
      const newList = []
      list.forEach((item) => {
        const row = newList.find((i) => i[name] === item[name]) || ''
        if (!row) {
          newList.push({ name: item[name], count: 1 })
        } else {
          row.count++
        }
      })
      return newList
    }
    const { query = {} } = opt
    const res = await this.$axios.post('/query/data', {
      db: 'cyctest',
      table: 'tags',
      jsonMessage: query
    })
    res.data.list = groupByName(res.data.list, 'name')
    return res
  },
  /**
   * 添加博客
   */
  async addTags({ commit, dispatch, state, rootState }, opt = {}) {
    const res = await this.$axios.post('/add/data', {
      db: 'cyctest',
      table: 'tags',
      jsonMessage: opt
    })
    return res
  }
}
