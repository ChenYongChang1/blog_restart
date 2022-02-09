<template>
  <div class="d-content-center">
    <h1 class="echarts-title">{{ echarts.title }}echarts配置项内容和展示</h1>
    <div v-show="showcode" class="show-code d-flex">
      <div>
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
    return {
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
    const { title } = this.echarts
    return {
      title: `【${title}】图例配置项详细内容-echarts-陈永昌的博客`,
      meta: [
        { hid: 'description', name: 'description', content: `陈永昌的博客提供${title} echarts完整配置项 vue echarts完整配置项，Echarts Make A Pie已关闭，echarts踩坑记录` },
        { name: 'keywords', content: `echarts` },
        { name: 'keywords', content: title }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts-title {
  margin: 24px 0;
}
.menu {
  height: 20px;
  line-height: 20px;
  margin: 24px 0;
}
</style>
