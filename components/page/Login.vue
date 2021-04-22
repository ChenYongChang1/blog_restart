<template>
  <div>
    <el-dialog title="登陆" :visible="true" width="40%" :before-close="handleClose">
      <div>
        <el-input v-model="user.name" class="margin-bottom-5" placeholder="用户名"></el-input>
        <el-input v-model="user.password" class="margin-bottom-5" placeholder="密码"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    handleClose() {
      this.$store.commit('user/SET_LOGIN', false)
    },
    async login() {
      const res = await this.$store.dispatch('user/login', { query: this.user })
      if (res.length) {
        this.$store.commit('user/SET_LOGIN', false)
      }
      // console.log(res[0] || {})
      this.$cookies.set('user', res[0] || {}, { domain: this.$store.state.host, path: '/', maxAge: 60 * 60 * 24 * 90 })
      // console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.margin-bottom-5 {
  margin-bottom: 10px;
}
</style>
