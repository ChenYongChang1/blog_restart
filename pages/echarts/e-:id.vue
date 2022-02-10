<template>
  <div class="d-content-center">
    <h1 class="echarts-title">{{ echarts.title }}echarts {{ strwordMap[echarts.tag] || echarts.tag }}配置项内容和展示</h1>
    <div v-show="showcode" class="show-code d-flex">
      <div>
        <h2>{{ echarts.description }}</h2>
        <div>配置项如下</div>
        <pre>
        {{ echarts.code }}
      </pre
        >
      </div>
      <div>
        <div>截图如下</div>
        <img :src="echarts.img" class="d-img d-img-cover" style="height:auto" alt="" />
      </div>
    </div>
    <client-only>
      <cc-echart :options="echarts.code"></cc-echart>
    </client-only>
    <div class="like-about">
      <h2>相似echarts图例：</h2>
      <div class="d-flex d-flex-warp">
        <a v-for="(item, index) in likeList" :key="`a-${index}`" :href="`/echarts/e-${item.id}`" :title="item.title">{{ item.title }}</a>
      </div>
    </div>
    <div class="menu dd-flex"><a href="/">天天</a>> <a href="/echarts/">echarts</a></div>
  </div>
</template>

<script>
import CcEchart from '@/components/base/CcEchart'
export default {
  name: 'Echart',
  components: { CcEchart },
  async asyncData({ isDev, route, store, env, params, app }) {
    const { id } = params
    const res = await store.dispatch('echarts/getEchartsOptions', { query: { id } })
    const echarts = app.$get(res, 'data.list.0', {})
    // const
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
    const queryJson = {}
    queryJson.$or = [
      {
        tag: `/${echarts.tag}/`
      }
    ]
    const like = await store.dispatch('echarts/getEchartsList', { query: queryJson })
    const list = app.$get(like, 'data.list')
    return {
      likeList: list.filter((item) => item.id !== id),
      strwordMap,
      showcode: true,
      id,
      echarts
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.showcode = false
    })
  },
  head() {
    const { title, tag, description } = this.echarts
    const strwordMap = {
      line: '折线',
      bar: '柱状',
      map: '地图',
      pie: '饼',
      liquidFill: '球'
    }
    return {
      title: `【${title}】图例配置项详细内容-echarts-陈永昌的博客`,
      meta: [
        { hid: 'description', name: 'description', content: `陈永昌的博客提供${title} echarts${strwordMap[tag] || tag}完整配置项 vue echarts配置项，Echarts Make A Pie已关闭，${description.slice(0, 10)}` },
        { name: 'keywords', content: `echarts` },
        { name: 'keywords', content: title }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.like-about {
  width: 100%;
  margin: 20px 0;
  a {
    display: block;
    margin-right: 10px;
    margin-top: 8px;
    padding: 4px 12px;
    border-radius: 4px;
    background: rgba($color: #000000, $alpha: 0.2);
    color: white;
  }
}
.echarts-title {
  margin: 24px 0;
}
.menu {
  height: 20px;
  line-height: 20px;
  margin: 24px 0;
}
</style>
