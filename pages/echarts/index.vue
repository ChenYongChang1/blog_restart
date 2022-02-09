<template>
  <div class="echarts-box d-content-center d-flex d-flex-warp">
    <div v-for="(item, index) in list" :key="`echarts-${index}`" class="echart-row">
      <img class="d-img d-img-cover" :src="item.img" alt="" />
      <a :href="`/echarts/${item.id}`" :title="item.title" class="href" @click.stop>{{ item.title }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EchartsList',
  watchQuery: ['w', 'page'],
  async asyncData({ store, query, app }) {
    const { w = '', page = 1 } = query
    const queryJson = {}
    const word = decodeURIComponent(w)
    if (word) {
      queryJson.$or = [
        {
          title: `/${word}/`
        }
      ]
    }
    const res = await store.dispatch('echarts/getEchartsList', { query: queryJson, page })
    console.log(res, 'ddd')
    return {
      list: app.$get(res, 'data.list')
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
