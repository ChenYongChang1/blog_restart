<template>
  <div class="tags-page d-content-center">
    <el-timeline>
      <el-timeline-item v-for="item in artilceList" :key="`el-timeline-${item.id}`" :timestamp="$formatDate(item.time, 'yyyy-MM-dd')" placement="top">
        <a :href="`/article-${item.id}`">
          <el-card shadow="hover">
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </el-card>
        </a>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
// import BlogList from '@/components/page/home/BlogList'
export default {
  // components: { BlogList },
  async asyncData({ params, query, store }) {
    const { name } = params
    const res = await store.dispatch('acticle/getArticleList', {
      query: {
        tags: name
      },
      remove: ['handbook'],
      notPage: true
    })
    const artilceList = res.data.list
    return {
      artilceList,
      name
    }
  },
  head() {
    return {
      title: `天天提供【${this.name}】学习-前端学习-陈永昌的博客`,
      meta: [
        { hid: 'description', name: 'description', content: `陈永昌的博客更新提供【${this.name}】下的文章分类。` },
        { name: 'keywords', content: this.name }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-page {
  min-height: 80vh;
  padding-top: 30px;
}
</style>
