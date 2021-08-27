/**
 * axios 拦截器配置
 * @param app
 */
import { Message } from 'element-ui'
import env from '@/env'

const getUserAuth = async ($axios, store) => {
  const res = await $axios.post('http://106.14.212.56/api2/user/login/', { name: 'cyc', password: 'Asd12345!' })
  store.commit('SET_ASSTOKEN', res.data.assToken)
  return res.data.assToken
}

export default function({ app, $axios, store }) {
  $axios.defaults.baseURL = env[process.env.NUXT_ENV_BUILD_ENV].ENV_API
  $axios.defaults.withCredentials = true
  // $axios.defaults.headers.post.platform = 3 // 基本配置
  $axios.defaults.timeout = 30000
  // 请求拦截器
  $axios.onRequest(async (config) => {
    console.log('Making request to ', config.url)
    if (!store.state.assToken && config.url !== 'http://106.14.212.56/api2/user/login/') {
      const assToken = await getUserAuth($axios, store)
      config.headers.assToken = assToken
    } else {
      config.headers.assToken = store.state.assToken
    }

    return config
  })

  // 相应拦截器
  $axios.onResponse((res) => {
    if (res.status === 200) {
      // console.log(res.config.url, 'res.config')
      const whiteUrl = ['/common/get_baidu_word', 'cyc-save.oss-cn-shanghai.aliyuncs.com']
      if (res.data.code !== 200 && !whiteUrl.some((item) => res.config.url.includes(item))) {
        // eslint-disable-next-line no-unused-expressions
        console.log('接口请求出错', res.config.url)
        return Promise.reject(res.data)
      }
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res.data)
    }
  })

  // 错误回调
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // eslint-disable-next-line no-undef
      redirect('/400')
    }
  })
}
