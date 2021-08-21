export const state = () => ({
  articleList: [],
  DB_NAME: process.env.NODE_ENV === 'production' ? 'blog' : 'cyctest'
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
      notPage = false,
      page = 1,
      order = {
        orderBy: 'time',
        isDesc: -1
      },
      remove
    } = opt
    const res = await this.$axios.post('/query/data', {
      db: state.DB_NAME,
      table: 'article',
      page: notPage ? undefined : page,
      pageSize: 10,
      order,
      remove,
      queryType: query.title ? 1 : 0,
      jsonMessage: {
        $and: [{ nshow: { $ne: true } }, query]
      }
    })
    return res
  },
  /**
   * 添加博客
   */
  async addArticle({ commit, dispatch, state, rootState }, opt = {}) {
    const res = await this.$axios.post('/add/data', {
      db: state.DB_NAME,
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
      db: state.DB_NAME,
      table: 'tags',
      jsonMessage: query
    })
    res.data.list = groupByName(res.data.list, 'name')
    return res
  },
  /**
   * 添加标签
   */
  async addTags({ commit, dispatch, state, rootState }, opt = {}) {
    const res = await this.$axios.post('/add/data', {
      db: state.DB_NAME,
      table: 'tags',
      jsonMessage: opt
    })
    return res
  },
  /**
   * 修改博客
   */
  async updataArticle({ commit, dispatch, state, rootState }, opt = {}) {
    const { id, json } = opt
    const res = await this.$axios.post('/update/replace', {
      db: state.DB_NAME,
      table: 'article',
      query: { id },
      jsonMessage: json
    })
    return res
  },
  /**
   * 删除博客
   */
  async daleteArticle({ commit, dispatch, state, rootState }, opt = {}) {
    const { id } = opt
    const res = await this.$axios.post('/delete/deleteone', {
      db: state.DB_NAME,
      table: 'article',
      jsonMessage: { id }
    })
    return res
  }
}
