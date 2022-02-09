<template>
  <div ref="echarts" class="charts"></div>
</template>

<script>
export default {
  name: 'Echarts',
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    options: {
      handler(val) {
        if (process.client) {
          this.$nextTick(() => {
            const chart = this.$echarts.init(this.$refs.echarts)
            // 绘制图表
            if (chart) {
              chart.setOption(val)
            }
          })
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
