<template>
  <div class="home-page d-content-center">
    <blog-list></blog-list>
  </div>
</template>

<script>
import BlogList from '@/components/page/home/BlogList'
export default {
  components: { BlogList },
  async asyncData({ params, query, store }) {
    console.log(store)
    const res = await store.dispatch('acticle/getArticleList')
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  padding-top: 30px;
}
</style>
