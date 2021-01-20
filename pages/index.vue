<template>
  <div class="home-page d-content-center">
    <blog-list :page="page" :blog-table-list="blogTableList" :count="count"></blog-list>
  </div>
</template>

<script>
import BlogList from '@/components/page/home/BlogList'
export default {
  components: { BlogList },
  watchQuery: ['w', 'page'],
  async asyncData({ params, query, store }) {
    const { page = 1, w = '' } = query
    const queryJson = {}
    if (w) {
      queryJson.$or = [
        {
          title: `/${w}/`
        },
        {
          desc: `/${w}/`
        },
        {
          tags: `/${w}/`
        }
      ]
    }
    const res = await store.dispatch('acticle/getArticleList', { query: queryJson, page: parseInt(page) })
    const { list, count } = res.data
    return {
      blogTableList: list,
      count,
      page: parseInt(page) || 1
    }
  },
  head() {
    return {
      title: `陈永昌的博客`,
      meta: [
        { hid: 'description', name: 'description', content: `陈永昌的博客提供技术分享学习` },
        { name: 'keywords', content: '' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  padding-top: 30px;
}
</style>
