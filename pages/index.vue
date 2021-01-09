<template>
  <div class="home-page d-content-center">
    <blog-list :page="page"></blog-list>
  </div>
</template>

<script>
import BlogList from '@/components/page/home/BlogList'
export default {
  components: { BlogList },
  asyncData({ params, query, store }) {
    const { page = 1 } = query
    return {
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
