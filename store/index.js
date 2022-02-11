export const state = () => ({
  assToken: '',
  ossSign: {}
})

export const mutations = {
  SET_ASSTOKEN(state, assToken) {
    state.assToken = assToken
  },
  SET_OSSSIGN(state, ossSign) {
    state.ossSign = ossSign
  }
}

export const getters = {}
export const actions = {
  async getLogin({ commit }) {
    const res = await this.$axios.post('http://120.79.76.92/api2/user/login/', { name: 'cyc', password: 'Asd12345!' })
    commit('SET_ASSTOKEN', res.data.assToken)
    return res.data.assToken
  },
  async getOssSign({ commit }) {
    const res = await this.$axios.post('/add/sign', { dir: 'cyc-save' })
    commit('SET_OSSSIGN', res.data)
  },
  async getBaiduWords({ commit }, opt = {}) {
    const res = await this.$axios.get('/common/get_baidu_word?word=' + opt.word)
    return res.data || []
  },
  async uploadImg({ state, commit, dispatch }, file) {
    if (!state.ossSign.accessid) {
      await dispatch('getOssSign')
    }
    const request = new FormData()
    request.append('OSSAccessKeyId', state.ossSign.accessid) // Bucket 拥有者的Access Key Id。
    request.append('policy', state.ossSign.policy) // policy规定了请求的表单域的合法性
    request.append('Signature', state.ossSign.signature) // 根据Access Key Secret和policy计算的签名信息，OSS验证该签名信息从而验证该Post请求的合法性
    // ---以上都是阿里的认证策略
    let names = file.name.split('.')[file.name.split('.').length - 1]
    names = new Date().valueOf() + '' + Math.random() + '.' + names
    request.append('key', `${state.ossSign.dir}/${names}`) // 文件名字，可设置路径
    request.append('success_action_status', '200') // 让服务端返回200,不然，默认会返回204
    request.append('file', file)
    await this.$axios.post(state.ossSign.host, request, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: false
    })
    return `https://cyc-save.oss-cn-shanghai.aliyuncs.com/${state.ossSign.dir}/${names}`
  }
}
