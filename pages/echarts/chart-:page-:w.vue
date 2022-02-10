<template>
  <div class=" d-content-center">
    <div>
      <el-input v-model="searchWord" style="" placeholder="搜索" @keydown.native.enter="search"></el-input>
    </div>
    <div class="echarts-box d-flex d-flex-warp">
      <div v-for="(item, index) in list" :key="`echarts-${index}`" class="echart-row d-pointer" @click="linkDetail(item.id)">
        <img class="d-img d-img-cover" :src="item.img" alt="" />
        <div class="echarts-text">
          <a :href="`/echarts/e-${item.id}`" :title="item.title" class="href" @click.stop>{{ item.title }}-{{ strwordMap[item.tag] || item.tag }}</a>
          <div v-if="item.description" class="desc-text">{{ item.description }}</div>
        </div>
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
    const wordMap = {
      折线: 'line',
      柱状: 'bar',
      地图: 'map',
      饼: 'pie',
      球: 'liquidFill'
    }
    const strwordMap = {
      line: '折线',
      bar: '柱状',
      map: '地图',
      pie: '饼',
      liquidFill: '球'
    }
    if (word && word !== '‡') {
      queryJson.$or = [
        {
          title: `/${word}/`
        },
        {
          tag: `/${wordMap[word] || word}/`
        }
      ]
    }
    const res = await store.dispatch('echarts/getEchartsList', { query: queryJson, page })
    // console.log(res, 'ddd')
    return {
      strwordMap,
      wordMap,
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
  },
  head() {
    return {
      title: `echarts图例配置项大全${this.page === 1 ? '' : `第${this.page}页`}-陈永昌的博客`,
      meta: [
        { hid: 'description', name: 'description', content: `陈永昌的博客提供echarts分享大全，vue echarts图例配置项，Echarts Make A Pie已关闭` },
        { name: 'keywords', content: `echarts` }
      ]
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
  .echarts-text {
    position: absolute;
    bottom: 0;
    height: 100%;
    left: 0;
    transform: translateY(calc(100% - 20px));
    width: 100%;
    background: rgba($color: #000000, $alpha: 0.2);
    color: white;
    transition: all 0.3s linear;
    padding: 0 12px;
    a {
      color: white;
      margin-bottom: 12px;
    }
  }
  &:hover {
    .echarts-text {
      background: rgba($color: #000000, $alpha: 0.25);
      transform: translateY(0);
      a {
        padding-top: 12px;
      }
    }
  }
  .href {
    display: block;
    width: 100%;
    line-height: 20px;
    font-size: 14px;
  }
  .desc-text {
    line-height: 20px;
    font-size: 14px;
  }
}
</style>
