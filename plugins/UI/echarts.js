import Vue from 'vue'
import 'v-charts/lib/style.css'
// import echarts from 'echarts/lib/echarts'
import * as echarts from 'echarts/lib/echarts.js'
import 'echarts/lib/component/graphic'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/markArea'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/map'
import 'echarts/map/js/world'
Vue.prototype.$echarts = echarts