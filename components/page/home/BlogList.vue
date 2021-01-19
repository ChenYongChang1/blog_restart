<template>
  <div class="blog-list-box">
    <blog-item v-for="item in blogTableList" :key="`blog-${item.id}`" :blog-row="item"></blog-item>
    <el-pagination background layout="prev, pager, next" :current-page="page" hide-on-single-page :total="count" @current-change="currentChange"> </el-pagination>
  </div>
</template>

<script>
import BlogItem from '@/components/page/home/BlogItem'
export default {
  name: 'BlogList',
  components: { BlogItem },
  watchQuery: true,
  props: {
    page: {
      type: Number,
      default: 1
    },
    count: {
      type: Number,
      default: 0
    },
    blogTableList: {
      type: Array,
      default: () => []
    }
  },
  fetch() {
    // await this.getArticleList()
  },
  data() {
    return {
      // blogTableList: [],
      // count: 0
    }
  },
  methods: {
    // async getArticleList(query = {}) {
    //   const res = await this.$store.dispatch('acticle/getArticleList', { query, page: this.page })
    //   this.blogTableList = res.data.list
    //   this.count = res.data.count
    // },
    currentChange(e) {
      console.log(e)
      this.$router.push(`?page=${e}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-list-box {
  width: 100%;
  min-height: calc(100vh - 170px);
  .el-pagination {
    margin: 20px 0;
  }
}
</style>
