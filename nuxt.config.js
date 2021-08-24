const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const env = require('./env')

module.exports = {
  telemetry: false,
  env: {
    NUXT_ENV_BUILD_ENV: process.env.NUXT_ENV_BUILD_ENV || 'production'
  },
  server: {
    port: env[process.env.NUXT_ENV_BUILD_ENV].PORT,
    host: '0.0.0.0',
    timing: {
      total: true // 跟踪在服务器端渲染上花费的整个时间
    }
  },
  mode: process.env.NUXT_ENV_BUILD_ENV === 'production' ? 'universal' : 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: '前端程序猿',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      // {
      //   hid: 'description',
      //   name: 'description',
      //   content: '前端程序猿'
      // }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'http://sheep11.com/favicon.ico' }]
    // script: [
    //   {
    //     type: 'text/javascript',
    //     src: '/iconfont.js',
    //     async: true
    //   }
    // ]
  },
  render: {
    resourceHints: false
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ebecf0', height: '1px', duration: 3000 },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/index', { src: 'mavon-editor/dist/css/index.css' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/axios',
    // '@/plugins/dayjs',
    { src: '@/plugins/inject/combined-inject', ssr: true },
    // { src: '@/plugins/chart/vCharts', ssr: false },
    { src: '@/plugins/UI/element-ui', ssr: true },
    { src: '@/plugins/inject/vue-inject', ssr: false },
    { src: '@/plugins/filter', ssr: true },
    { src: '@/plugins/UI/clientOnlyElement', ssr: false },
    { src: '@/plugins/UI/customElement', ssr: true },
    { src: '@/plugins/i18n', ssr: true },
    { src: '@/plugins/vue-markdown.js', ssr: false }
    // { src: '@/plugins/UI/vue-infinite-scroll.js', ssr: false }
    // { src: '@/plugins/vue-clipboard2', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    '@nuxtjs/dayjs'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: false
  },
  proxy: {},
  /*
   ** Build configuration
   */
  build: {
    babel: {
      plugins: [
        'lodash',
        [
          'component',
          {
            libraryName: 'element-ui',
            style: false
            // styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    },
    transpile: [/^element-ui/],
    // 将主块中的 CSS 提取到一个单独的 CSS 文件中（自动注入模板）
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, { isClient, isDev }) {
      // lodash 按需引入，重要
      config.plugins.unshift(new LodashModuleReplacementPlugin({ shorthands: true }))
      if (isClient && !isDev) {
        // 删除console.log
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      }
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    }
  },
  router: {
    middleware: ['router', 'i18n']
  },
  // 注入scss变量和mixin到全局
  styleResources: {
    scss: ['./assets/css/variables.scss', './assets/css/_mixin.scss', './assets/css/_function.scss']
    // sass: ...
  }
}
