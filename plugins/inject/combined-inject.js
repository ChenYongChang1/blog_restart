/**
 * 同时在context，Vue实例，甚至Vuex中同时注入，您可以使用inject方法,它是plugin导出函数的第二个参数。 将内容注入Vue实例的方式与在Vue应用程序中进行注入类似。系统会自动将$添加到方法名的前面
 * 使用时，在nuxt.config.js中配置：export default {plugins: ['~/plugins/combined-inject.js']}
 * 调用
 * export default {
 *    mounted(){
 *      this.$myInjectedFunction('works in mounted')
 *    },
 *    asyncData(context){
 *      context.app.$myInjectedFunction('works with context')
 *    }
 *}
 * @param app
 * @param inject
 */
export function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export function dateSeats(str) {
  if (str >= 0 && str < 10) {
    str = '0' + str
  }
  return str
}
export default ({ app, route, $dayjs }, inject) => {
  /**
   * 按照规则排序
   */
  inject('compare', (attr, rev) => {
    // 第二个参数没有传递 默认升序排列
    if (rev === undefined) {
      rev = 1
    } else {
      rev = rev ? 1 : -1
    }

    return function(a, b) {
      a = a[attr]
      b = b[attr]
      if (a < b) {
        return rev * -1
      }
      if (a > b) {
        return rev * 1
      }
      return 0
    }
  })
  /**
   * 获取以当天时间时间为标准的时间戳戳 精确到秒
   * @param index 增加或者减少的天数
   */
  inject('getDayTimes', (index = 0) => {
    const today = app.$todayTime()
    const start = new Date(today)
    start.setTime(start.getTime() + 3600 * 1000 * 24 * index)
    return parseInt(start.getTime() / 1000)
  })
  /**
   * 格式化秒数
   */
  inject('formatSecond', (second) => {
    if (!second) return '00:00'
    const m = Math.floor((second / 60) % 60) < 10 ? '0' + Math.floor((second / 60) % 60) : Math.floor((second / 60) % 60)
    const s = Math.floor(second % 60) < 10 ? '0' + Math.floor(second % 60) : Math.floor(second % 60)
    return m + ':' + s
  })
  /**
   * 判断是否为空
   */
  inject('isEmpty', (attr, type = 'String') => {
    if (type === 'String') {
      if (attr === '' || attr === null || attr === undefined) return true
    }
    if (type === 'Object') {
      if (JSON.stringify(attr) === '{}') return true
    }
    if (type === 'Array') {
      if (attr.length === 0) return true
    }
    return false
  })
  // inject('humpConversion', (val, symbol) => {
  //   symbol = symbol || '-'
  //   return val.replace(/([A-Z])/g, symbol + '$1').toLowerCase()
  // })
  inject('formatDate', (date, fmt) => {
    const newDate = new Date(parseInt(date))
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    const o = {
      'M+': newDate.getMonth() + 1,
      'd+': newDate.getDate(),
      'h+': newDate.getHours(),
      'm+': newDate.getMinutes(),
      's+': newDate.getSeconds(),
      'w+': newDate.getDay()
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const str = o[k] + ''
        fmt = fmt.replace(
          RegExp.$1,
          // eslint-disable-next-line no-undef
          RegExp.$1.length === 1 ? str : padLeftZero(str)
        )
      }
    }
    return fmt
  })
  inject('getWeek', function(txData) {
    const dateT = txData ? new Date(parseInt(txData)) : new Date()
    const weekMap = {
      0: '日',
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六'
    }
    return `星期${weekMap[dateT.getDay()]}`
  })
  /**
   * 构造formData
   */
  inject('newFormData', (obj) => {
    // eslint-disable-next-line valid-typeof
    if (!obj || (typeof obj === JSON.stringify(obj)) === '{}') return
    const formData = new FormData()
    const key = Object.keys(obj)
    key.forEach((item) => {
      formData.append(item, obj[item])
    })
    return formData
  })
  /**
   * cdn缩略图方法
   * @param width 宽
   * @param height 高
   */
  inject('getImgThumb', (width, height) => {
    const str = `?imageView2/1/w/${width}/h/${height}`
    return str
  })
  /**
   * 格式化秒数
   */
  inject('formatSTM', (value) => {
    let val
    if (value) {
      const result = parseInt(value)
      const m = Math.floor((result / 60) % 60) < 10 ? '0' + Math.floor((result / 60) % 60) : Math.floor((result / 60) % 60)
      const s = Math.floor(result % 60) < 10 ? '0' + Math.floor(result % 60) : Math.floor(result % 60)
      val = `${m}:${s}`
    } else {
      val = '00:00'
    }
    return val
  })
  /**
   * 防抖
   */
  inject('debounce', (fn, delay) => {
    let timer = null // 借助闭包
    return function() {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(fn, delay) // 简化写法
    }
  })
  /**
   * 获取最近几天的时间戳，精确到ms,以当天0点作为标准
   * num 支持负数
   */
  inject('recentDate', (num) => {
    const now = $dayjs(new Date().toLocaleDateString())
    return now.valueOf() + 3600 * 1000 * 24 * num
  })

  /**
   * 获取上一周的时间戳,以当天0点作为标准
   * num 支持负数
   */
  inject('getTime', (n) => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDay() // 返回星期几的某一天;
    const d = day === 0 ? n + 6 : n + (day - 1)
    now.setDate(now.getDate() - d)
    if (n === 0) {
      return $dayjs(new Date(now).toLocaleDateString()).valueOf() - 1000
    } else {
      return $dayjs(new Date(now).toLocaleDateString()).valueOf()
    }
  })
  /**
   * 时间戳毫秒转化为秒
   */
  inject('ms2m', (timestamp) => {
    if (!timestamp) return 0
    return parseInt(timestamp / 1000)
  })
  /**
   * 时间戳秒转化为毫秒
   */
  inject('m2ms', (timestamp) => {
    if (!timestamp) return 0
    return parseInt(timestamp * 1000)
  })
  /**
   * 获取当天的时间戳
   * type: start 0点时间戳   end  23:59分时间戳
   */
  inject('todayTime', (type = 'start') => {
    if (type === 'start') {
      return $dayjs(new Date().toLocaleDateString()).valueOf()
    } else {
      return $dayjs(new Date().toLocaleDateString()).valueOf() + (24 * 60 * 60 * 1000 - 1)
    }
  })
  /**
   * 获取任意一天的23：59的时间戳
   * 传入参数必须为指定天的00：00的时间戳
   */
  inject('getDayEnd', (timstamp) => {
    return timstamp + 246060 * 1000 - 1
  })
  /**
   * 高亮搜索文本，传入文本和搜索的词
   */
  inject('highLightSearchMsg', (msg, highLightStr, lightClass = 'dd-high-light') => {
    msg = app.$xssFilter(msg)
    highLightStr = app.$xssFilter(highLightStr)
    if (msg == null) {
      msg = ''
    }
    if (highLightStr == null) {
      highLightStr = ''
    }
    if (msg instanceof Object) {
      msg = JSON.stringify(msg)
    }
    if (highLightStr instanceof Object) {
      highLightStr = JSON.stringify(highLightStr)
    }
    if (!(msg instanceof String)) {
      msg = msg.toString()
    }
    if (!(highLightStr instanceof String)) {
      highLightStr = highLightStr.toString()
    }
    let htmlStr = ''
    if (highLightStr.length > 0) {
      if (msg.includes(highLightStr)) {
        assemblyStr(msg, highLightStr)
      } else {
        htmlStr = '<span>' + msg + '</span>'
      }
    } else {
      htmlStr = '<span>' + msg + '</span>'
    }
    function assemblyStr(msgAssembly, highLightAssembly) {
      if (msgAssembly.includes(highLightAssembly)) {
        const length = highLightAssembly.length
        const start = msgAssembly.indexOf(highLightAssembly)
        htmlStr = htmlStr + '<span>' + msgAssembly.substring(0, start) + '</span>' + '<span class="' + lightClass + '">' + highLightAssembly + '</span>'
        msgAssembly = msgAssembly.substring(start + length, msgAssembly.length)
        assemblyStr(msgAssembly, highLightAssembly)
      } else {
        htmlStr = htmlStr + '<span>' + msgAssembly + '</span>'
      }
    }
    return htmlStr
  })

  /**
   * 高亮搜索文本，传入文多个本和搜索的词 --- 数组形式
   */
  inject('highLightSearchMsgList', (msg, highLightStrList, color = '#f90') => {
    msg = msg.replace(/\n/g, '<br/>').replace(/\s\s/g, '&nbsp;&nbsp;')
    const formatStrAppName = highLightStrList.length > 0 ? colorKeyword(msg) : msg
    function sensitiveKeys(keys) {
      if (!sensitiveKeys.$map) {
        const map = {}
        let maxLength = 0
        for (let i = 0; i < keys.length; i++) {
          map[keys[i]] = 1
          maxLength = Math.max(keys[i].length, maxLength)
        }
        sensitiveKeys.$map = {
          map,
          length: maxLength
        }
      }
      return sensitiveKeys.$map
    }
    function colorKeyword(str) {
      const words = sensitiveKeys(highLightStrList)
      let output = []
      while (str) {
        let sub = str.substring(0, words.length)
        str = str.substring(words.length)
        while (!words.map[sub] && sub) {
          str = sub.charAt(sub.length - 1) + str
          sub = sub.slice(0, -1)
        }
        if (sub) {
          output.push(`<span style="background-color:${color};">`, sub, '</span>')
        } else {
          output.push(str.charAt(0))
          str = str.substring(1)
        }
      }
      output = output.join('')
      return output
    }
    return formatStrAppName
  })

  inject('goPath', (path, query) => {
    app.router.push({ path, query })
  })
  inject('getFilterAlias', (list, value, filed = 'value') => {
    const temp = list.filter((item) => item[filed] === value)
    return temp[0]
  })
  inject('Array2Map', (list, props) => {
    const obj = {}
    list.forEach((item) => {
      if (!obj[item[props]]) {
        obj[item[props]] = item
      }
    })
    return obj
  })
  inject('getListTime', (n) => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDay() // 返回星期几的某一天;
    const d = day === 0 ? n + 6 : n + (day - 1)
    now.setDate(now.getDate() - d)
    if (n === 0) {
      return $dayjs(new Date(now).toLocaleDateString()).valueOf() - 1000
    } else {
      return $dayjs(new Date(now).toLocaleDateString()).valueOf()
    }
  })
  inject('transformLineData', (list, title = 'name', stats = 'stats') => {
    const times = [] // 存放所有时间戳
    const columns = ['date']
    const rows = []
    // 初步处理的数据
    const lines = []
    list.map((item) => {
      const lineMap = {} // 构造数据map
      if (item[title]) {
        columns.push(item[title]) // 向columns 添加数据
        item[stats].map((cItem) => {
          times.push(cItem[0]) // 把所有时间戳聚合到times中
          lineMap[cItem[0]] = cItem[1]
        })
        lines.push({ lineMap, name: item[title] })
      }
    })
    // 对所有时间戳进行去重
    const tempTime = [...new Set(times)]
    tempTime.forEach((item) => {
      // 遍历时间戳进行取值
      const obj = { date: parseInt(item + '000') }
      lines.forEach((lItem) => {
        obj[lItem.name] = lItem.lineMap[item] || '-'
      })
      rows.push(obj)
    })
    rows.sort((a, b) => {
      return a.date - b.date
    })
    return { columns, rows }
  })
  // 补全时间戳版本
  inject('transformHistogram', (list, title = 'name', stats = 'stats') => {
    const times = [] // 存放所有时间戳
    const columns = ['date']
    const rows = []
    const lines = []
    list.map((item) => {
      const lineMap = {} // 构造数据map
      if (item[title]) {
        columns.push(item[title]) // 向columns 添加数据
        item[stats].map((cItem) => {
          times.push(cItem[0]) // 把所有时间戳聚合到tim ses中
          lineMap[cItem[0]] = cItem[1]
        })
        lines.push({ lineMap, name: item[title] })
      }
    })
    const res = [].concat(...times)
    const resData = res.filter((item, index) => index % 2 === 0)
    const maxDate = Math.max(...resData)
    const minDate = Math.min(...resData)
    const timeAllData = []
    for (let index = minDate; index < maxDate; index = index + 3600 * 24) {
      timeAllData.push(index)
    }
    timeAllData.forEach((item) => {
      const obj = { date: parseInt(item + '000') }
      lines.forEach((lItem) => {
        obj[lItem.name] = lItem.lineMap[item] || '-'
      })
      rows.push(obj)
    })
    return { columns, rows }
  })

  inject('secondsFormat', (myTime) => {
    const days = myTime / 1000 / 60 / 60 / 24
    const daysRound = Math.floor(days)
    const hours = myTime / 1000 / 60 / 60 - 24 * daysRound
    const hoursRound = Math.floor(hours)
    const minutes = myTime / 1000 / 60 - 24 * 60 * daysRound - 60 * hoursRound
    const minutesRound = Math.floor(minutes)
    const seconds = myTime / 1000 - 24 * 60 * 60 * daysRound - 60 * 60 * hoursRound - 60 * minutesRound
    return (daysRound !== 0 ? daysRound + '天' : '') + (hoursRound !== 0 ? hoursRound + '小时' : '') + (minutesRound !== 0 ? minutesRound + '分' : '')
  })
  inject('formatRate', (value, max = 5) => {
    value = parseFloat(value)
    if (!value) return 0
    return value >= max ? max : parseFloat(value.toFixed(1))
  })

  /**
   * 去数组最小值
   * @param value
   */
  inject('minArrayItem', (data, name) => {
    return Math.min.apply(
      Math,
      data.map((o) => {
        return o[name]
      })
    )
  })
  /**
   * 深拷贝函数
   * @param market
   */
  inject('deepClone', (data) => {
    if (!data || !(data instanceof Object) || typeof data === 'function') {
      return data || undefined
    }
    const constructor = data.constructor
    const result = new constructor()
    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        result[key] = app.$deepClone(data[key])
      }
    }
    return result
  })
  /**
   * 三位数字加一个逗号
   * 30,000
   */
  inject('thousandFilter', (value) => {
    if (!value) return '0'
    const intPart = Number(value).toFixed(0) // 获取整数部分
    return intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  })
  /**
   * 把数据格式化成筛选面板所需的格式
   * valueFiled  要格式化成value的字段名
   * nameFiled  要格式化成name的字段名
   */
  inject('genreFilter', (list, valueFiled = 'id', nameFiled = 'name') => {
    return list.map((i) => {
      return {
        name: i[nameFiled],
        alias: i[valueFiled].toString(),
        value: i[valueFiled]
      }
    })
  })
  /**
   * 数字过大显示
   */
  inject('numberFormat', (num, point = 2, lang = 'zh', concat = false) => {
    const fux = num < 0 ? -1 : 1
    const numStr = num ? Math.abs(num) + '' : ''
    const returnMessage = {
      value: {}
    }
    // 1万以内直接返回
    if (Math.abs(numStr) - 10000 < 0) {
      returnMessage.value = { value: fux * (numStr || 0), sub: '' }
    }
    // 大于8位数是亿
    else if (numStr.length > 8) {
      const decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
      returnMessage.value = {
        value: parseFloat(parseInt(num / 100000000) + '.' + decimal),
        sub: lang === 'zh' ? '亿' : 'e'
      }
    }
    // 大于6位数是十万 (以10W分割 10W以下全部显示)
    else if (numStr.length >= 5) {
      const decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
      returnMessage.value = {
        value: parseFloat(parseInt(num / 10000) + '.' + decimal),
        sub: lang === 'zh' ? '万' : 'w'
      }
    }
    if (!concat) {
      return returnMessage.value
    } else {
      return returnMessage.value.value + returnMessage.value.sub
    }
  })
  /**
   * 时间显示
   */
  inject('timeRecent', (timestamp) => {
    function zeroize(num) {
      return (String(num).length === 1 ? '0' : '') + num
    }

    const curTimestamp = parseInt(new Date().getTime() / 1000) // 当前时间戳

    const timestampDiff = curTimestamp - timestamp // 参数时间戳与当前时间戳相差秒数
    const curDate = new Date(curTimestamp * 1000) // 当前时间日期对象
    const tmDate = new Date(timestamp * 1000) // 参数时间戳转换成的日期对象

    const Y = tmDate.getFullYear()
    const m = tmDate.getMonth() + 1
    const d = tmDate.getDate()
    const H = tmDate.getHours()
    const i = tmDate.getMinutes()
    const s = tmDate.getSeconds()

    if (timestampDiff < 60) {
      // 一分钟以内
      return '刚刚'
    } else if (timestampDiff < 3600) {
      // 一小时前之内
      return Math.floor(timestampDiff / 60) + '分钟前'
    } else if (curDate.getFullYear() === Y && curDate.getMonth() + 1 === m && curDate.getDate() === d) {
      return '今天' + zeroize(H) + ':' + zeroize(i)
    } else {
      const newDate = new Date((curTimestamp - 86400) * 1000) // 参数中的时间戳加一天转换成的日期对象
      if (newDate.getFullYear() === Y && newDate.getMonth() + 1 === m && newDate.getDate() === d) {
        return '昨天' + zeroize(H) + ':' + zeroize(i)
      } else if (curDate.getFullYear() === Y) {
        return zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i)
      } else {
        return Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i)
      }
    }
  })
  inject('queryString', (obj) => {
    return Object.keys(obj)
      .filter((k) => obj[k] || +obj[k] === 0)
      .map((k) => {
        let value = obj[k]
        if (typeof value === 'object') {
          value = encodeURIComponent(JSON.stringify(value))
        } else {
          value = encodeURIComponent(value)
        }
        return `${encodeURIComponent(k)}=${value}`
      })
      .join('&')
  })
  /**
   * app 链接设置
   * @param spacial  是否是不带平台参数的路径  例如  /id/asm-rival  /id/software
   */
  inject('appLink', (host, appId, market, country, path = '-rank', spacial = false) => {
    market = parseInt(market)
    country = parseInt(country)
    const platform = parseInt(market) === 1 ? 'ios' : parseInt(market) === 11 ? 'googleplay' : 'android'
    const query = {
      market,
      country: country === 75 ? '' : country
    }
    const queryStr = app.$queryString(query)
    // console.log(`/app/${appId}/${platform}${path}?${queryStr}`, `/app/${appId}/ios${path}`)
    let targetHref = !spacial ? `/app/${appId}/${platform}${path}?${queryStr}` : `/app/${appId}/${path}?${queryStr}`
    if (market === 1 && country === 75) {
      targetHref = !spacial ? `/app/${appId}/ios${path}` : `/app/${appId}/${path}`
    } else if (market === 11 && country === 24) {
      targetHref = !spacial ? `/app/${appId}/googleplay${path}` : `/app/${appId}/${path}`
    } else if (market === 2 && country === 75) {
      targetHref = !spacial ? `/app/${appId}/android${path}` : `/app/${appId}/android${path}`
    }
    return appId ? host + targetHref : 'javascript:void(0)'
  })
  /**
   * xss过滤
   */
  inject('xssFilter', (str) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/ /g, '&nbsp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/\r{0,}\n/g, '<br/>')
  })
}
