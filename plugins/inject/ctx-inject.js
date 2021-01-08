/**
 * 将内容注入 context，在服务端调用，只要获得context，就可以使用该函数（例如在asyncData和fetch中）
 * 使用时，在nuxt.config.js配置：export default {plugins: ['~/plugins/ctx-inject.js']}
 * 调用：
 * export default {
 *    asyncData(context){
 *       context.app.myInjectedFunction('ctx!')
 *    }
 *  }
 * @param app
 * @param inject
 */
export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  app.myInjectedFunction = (string) => console.log('Okay, another function', string)
}
