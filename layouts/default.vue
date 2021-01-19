<template>
  <div class="day-blog">
    <login v-if="isShowLogin"></login>
    <header-main></header-main>
    <nuxt />
    <footer-main></footer-main>
  </div>
</template>
<script>
import HeaderMain from '@/components/layout/header/HeaderMain'
import FooterMain from '@/components/layout/footer/FooterMain'
import Login from '@/components/page/Login'
export default {
  components: { HeaderMain, FooterMain, Login },
  data() {
    return {}
  },
  computed: {
    isShowLogin() {
      return this.$store.state.user.isShowLogin
    }
  },
  mounted() {
    const agent = navigator.userAgent
    let normalTitle = ''
    this.$store.commit('user/SET_USER_INFO', { id: agent, name: 'custom' })
    document.onkeydown = (e) => {
      // 事件对象兼容
      const oEvent = e || event || window.event
      if (oEvent.ctrlKey && oEvent.keyCode === 13) {
        this.$store.commit('user/SET_LOGIN', true)
      }
    }
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden') {
        normalTitle = document.title
        document.title = agent === 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36' ? '傻🐶张笑彬？' : '怎么？不学习会？'
      } else {
        document.title = normalTitle
      }
    })
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.day-blog {
  min-height: 100vh;
  background-image: linear-gradient($bodyBg 1px, transparent 0), linear-gradient(90deg, $bodyBg 1px, transparent 0);
  background-size: 30px 30px, 30px 30px;
}
</style>
