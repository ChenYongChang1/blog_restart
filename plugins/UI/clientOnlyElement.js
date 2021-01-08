import Vue from 'vue'
import 'video.js/dist/video-js.css'
import vueQr from 'vue-qr'
import infiniteScroll from '@/plugins/UI/vue-infinite-scroll'

Vue.use(vueQr)

const VueVideoPlayer = require('vue-video-player/dist/ssr')
const hls = require('videojs-contrib-hls') // 支持m38u格式
Vue.use(hls)
Vue.use(VueVideoPlayer)
Vue.use(infiniteScroll)
