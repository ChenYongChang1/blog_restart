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
    const { name } = params
    const { page = 1 } = query
    return {
      name,
      page: parseInt(page) || 1
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  padding-top: 30px;
}
</style>
