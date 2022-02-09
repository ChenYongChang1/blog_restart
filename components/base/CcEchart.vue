<template>
  <div class="box-echarts d-flex">
    <div class="width-50">
      <el-input v-model="strOptions" type="textarea" placeholder=""></el-input>
    </div>
    <div class="width-50">
      <client-only>
        <echarts v-bind="$attrs" :options="echartOptions"></echarts>
      </client-only>
    </div>
  </div>
</template>

<script>
import Echarts from '@/components/base/Echarts'
export default {
  name: 'CcEchart',
  components: { Echarts },
  props: {
    options: {
      type: String,
      default: ''
    }
  },
  fetch() {
    this.strOptions = this.options
  },
  data() {
    return {
      strOptions: ''
    }
  },
  computed: {
    echartOptions() {
      if (!this.strOptions) {
        return {}
      }
      // eslint-disable-next-line no-var
      var echarts = this.$echarts
      const evStr = `(()=>{
          var option = ''
            ${this.strOptions}
            return option
        })()`
      // eslint-disable-next-line no-eval
      const options = eval(evStr)
      // eslint-disable-next-line no-undef
      return options
    }
  }
}
</script>

<style lang="scss" scoped>
.box-echarts {
  width: 100%;
  .el-textarea {
    width: 100%;
    height: 100vh;
    /deep/ .el-textarea__inner {
      width: 100%;
      height: 100%;
      resize: none;
    }
  }
  .width-50 {
    width: 50%;
    min-height: 300px;
  }
}
</style>
