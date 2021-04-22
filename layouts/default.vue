<template>
  <div class="day-blog">
    <login v-if="user.isShowLogin"></login>
    <header-main></header-main>
    <nuxt />
    <footer-main></footer-main>
    <div v-if="user.userInfo && user.userInfo.isadmin === 'c'" class="is-login" @click="loginOut">{{ user.userInfo && user.userInfo.name }}</div>
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
    user() {
      return this.$store.state.user
    }
  },
  mounted() {
    // console.log(this.$cookies.get('user'), "this.$cookies.get('token')")
    const agent = navigator.userAgent
    // let normalTitle = ''
    let user = this.$cookies.get('user') || {}
    if (!(user && user.id)) {
      user = { id: agent, name: 'custom' }
    }
    this.$store.commit('user/SET_USER_INFO', user)
    document.onkeydown = (e) => {
      // 事件对象兼容
      const oEvent = e || event || window.event
      if (oEvent.ctrlKey && oEvent.keyCode === 13) {
        this.$store.commit('user/SET_LOGIN', true)
      }
    }
    // document.addEventListener('visibilitychange', function() {
    //   if (document.visibilityState === 'hidden') {
    //     normalTitle = document.title
    //     document.title = '不继续看会了？'
    //   } else {
    //     document.title = normalTitle
    //   }
    // })
  },
  methods: {
    loginOut() {
      this.$cookies.remove('user')
      window.location.reload()
    }
  }
}
</script>
<style lang="scss" scoped>
.day-blog {
  min-height: 100vh;
  background-image: linear-gradient($bodyBg 1px, transparent 0), linear-gradient(90deg, $bodyBg 1px, transparent 0);
  background-size: 30px 30px, 30px 30px;
  .is-login {
    width: 30px;
    height: 20px;
    border-radius: 4px;
    background: #999;
    color: white;
    position: fixed;
    left: 10px;
    top: 20px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
