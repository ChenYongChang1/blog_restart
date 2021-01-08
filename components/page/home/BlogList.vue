<template>
  <div class="blog-list-box">
    <blog-item></blog-item>
    <blog-item></blog-item>
    <blog-item></blog-item>
  </div>
</template>

<script>
import BlogItem from '@/components/page/home/BlogItem'
export default {
  name: 'BlogList',
  components: { BlogItem }
}
</script>

<style lang="scss" scoped>
.blog-list-box {
  width: 100%;
  min-height: calc(100vh - 170px);
}
</style>
