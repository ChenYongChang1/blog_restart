import Vue from 'vue'
import infiniteScroll from 'vue-infinite-scroll'
const html2md = require('html-to-md')
export default () => {
  Vue.use(infiniteScroll)
}
Vue.prototype.$htmlMd = async (content) => {
  const options = {
    skipTags: ['header', 'time', 'link', 'path', 'div', 'html', 'body', 'dl', 'dd', 'dt', 'article'],
    emptyTags: ['svg', 'path', 'link', 'script'],
    ignoreTags: ['', 'svg', 'path', 'link', 'script', 'style', 'br', 'head', '!doctype', 'form']
  }
  return await html2md(content, options)
}
