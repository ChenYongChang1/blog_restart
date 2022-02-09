<template>
  <div class=" d-content-center">
    <div>
      <el-input v-model="searchWord" style="" placeholder="搜索" @keydown.native.enter="search"></el-input>
    </div>
    <div class="echarts-box d-flex d-flex-warp">
      <div v-for="(item, index) in list" :key="`echarts-${index}`" class="echart-row d-pointer" @click="linkDetail(item.id)">
        <img class="d-img d-img-cover" :src="item.img" alt="" />
        <a :href="`/echarts/e-${item.id}`" :title="item.title" class="href" @click.stop>{{ item.title }}</a>
      </div>
      <dd-pagination background :url="`/echarts/chart-{page}-${word || '‡'}`" layout="prev, pager, next" :current-page="page" :total="count"> </dd-pagination>
    </div>
  </div>
</template>

<script>
import DdPagination from '@/components/base/pagination/DdPagination'
export default {
  name: 'EchartsList',
  components: { DdPagination },
  async asyncData({ store, params, app }) {
    const { w = '', page = 1 } = params
    const queryJson = {}
    const word = decodeURIComponent(w)
    if (word && word !== '‡') {
      queryJson.$or = [
        {
          title: `/${word}/`
        }
      ]
    }
    const res = await store.dispatch('echarts/getEchartsList', { query: queryJson, page })
    // console.log(res, 'ddd')
    return {
      word,
      page: parseInt(page),
      list: app.$get(res, 'data.list'),
      count: app.$get(res, 'data.count')
    }
  },
  data() {
    return {
      searchWord: ''
    }
  },
  methods: {
    linkDetail(id) {
      this.$goPath(`/echarts/e-${id}`)
    },
    search() {
      this.$goPath(`/echarts/chart-1-${this.searchWord || '‡'}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts-box {
  margin-right: -20px;
  padding: 24px;
}
.echart-row {
  width: 200px;
  height: 200px;
  margin-right: 20px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  border: solid 1px $lineColor;
  margin-bottom: 24px;
  .href {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    background: rgba($color: #000000, $alpha: 0.1);
  }
}
</style>
