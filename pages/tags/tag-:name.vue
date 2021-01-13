<template>
  <div class="home-page d-content-center">
    <el-timeline>
      <el-timeline-item v-for="item in artilceList" :key="`el-timeline-${item.id}`" :timestamp="$formatDate(item.time, 'yyyy-MM-dd')" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.desc }}</p>
        </el-card>
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
      notPage: true
    })
    console.log(res, 'asd')
    return {
      artilceList: [],
      name
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  padding-top: 30px;
}
</style>
