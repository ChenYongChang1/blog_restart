import Vue from 'vue'

export default ({ app, store }) => {
  /**
   * 点击触发登录
   * 使用方式
   * <button v-permission-click > </button>
   */
  Vue.directive('permission-click', {
    // 当被绑定的元素插入到 DOM 中时……
    bind(el, binding) {
      el.addEventListener('click', function() {
        if (store.state.login) {
          alert('请登录')
        }
      })
    }
  })
  /**
   * 权限显示
   * @type {DirectiveOptions}
   * <el-button v-permit="'view'" type="success">查看</el-button>
   */
  Vue.directive('permit', {
    bind(el, binding) {
      // 一行三目运算符就可
      // eslint-disable-next-line no-unused-expressions
      !store.getters.roles.includes(binding.value)
        ? el.parentNode.removeChild(el)
        : {}
    }
  })
}
