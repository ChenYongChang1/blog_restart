/**
 * 将内容注入Vue实例，避免重复引入，在Vue原型上挂载注入一个函数，所有组件内都可以访问(不包含服务器端)
 * 需要使用时，nuxt.config.js中配置： export default {plugins: ['~/plugins/vue-inject.js']}
 * 注意：请使用箭头函数
 * 使用：
 * export default {
 *   mounted(){
 *    this.$myInjectedFunction('test')
 *   }
 * }
 */
import Vue from 'vue'

Vue.prototype.$setLocalStorage = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}
Vue.prototype.$getLocalStorage = (name) => {
  if (!name) return
  return window.localStorage.getItem(name)
}
Vue.prototype.$removeLocalStorage = (name) => {
  if (!name) return
  window.localStorage.removeItem(name)
}
