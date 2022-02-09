<template>
  <div>
    {{ echarts.title }}
    <client-only>
      <cc-echart :options="echarts.code"></cc-echart>
    </client-only>
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
    return {
      id,
      echarts
    }
  }
}
</script>

<style lang="scss" scoped></style>
