module.exports = {
  development: {
    PORT: 3000, // 开发服务器端口
    MODE: 'development',
    WWWROOT: '//0.0.0.0:8018',
    ENV_API: 'http://106.14.212.56/api2/',
    ENV_API_MOCK: 'http://easymock-esports8.cfesport.com/mock/5f1e4274a72cdc00200950b3/api/v1',
    // http://easymock-esports8.cfesport.com/mock/5f1e4274a72cdc00200950b3/api/v1/index
    // ENV_API: 'http://easymock-esports8.cfesport.com/mock/5f1e4274a72cdc00200950b3/api/v1', // 开发服务器接口地址
    CDN_ROOT: '',
    WSS_HOST: '',
    WSS_PORT: 8099,
    HOST: ''
  },
  test: {
    PORT: 9533, // 测试服务器端口
    MODE: 'test',
    ENV_API: 'http://106.14.212.56/api2/', // 开发服务器接口地址
    CDN_ROOT: '',
    WSS_HOST: '',
    WSS_PORT: 8099,
    HOST: ''
  },
  production: {
    PORT: 8099, // 正式服务器端口
    WWWROOT: '',
    MODE: 'production',
    ENV_API: 'http://106.14.212.56/api2/', // 正式服务器接口地址
    CDN_ROOT: '',
    WSS_HOST: '',
    WSS_PORT: 8099,
    HOST: ''
  }
}
