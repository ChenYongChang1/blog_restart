<template>
  <div class="home-page d-content-center">
    <blog-list :page="1" :blog-table-list="blogTableList" :count="count"></blog-list>
  </div>
</template>

<script>
import BlogList from '@/components/page/home/BlogList'
export default {
  components: { BlogList },
  async asyncData({ params, query, store }) {
    const queryJson = {}
    const res = await store.dispatch('acticle/getArticleList', { query: queryJson })
    const { list, count } = res.data
    console.log(list)
    return {
      blogTableList: list,
      count
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
