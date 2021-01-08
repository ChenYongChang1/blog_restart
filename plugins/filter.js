/**
 * Vue filter 过滤器
 */
import Vue from 'vue'

export default ({ app, $dayjs }) => {
  function padLeftZero(str) {
    return ('00' + str).substr(str.length)
  }
  /**
   * 格式化日期
   * @param date 日期
   * @param fmt 转换格式类似 yyyy-MM-dd hh:mm:ss
   * @returns {*}
   */
  function formatDate(date, fmt) {
    if (!date) return '-'
    const newDate = new Date(parseInt(date))
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    const o = {
      'M+': newDate.getMonth() + 1,
      'd+': newDate.getDate(),
      'h+': newDate.getHours(),
      'm+': newDate.getMinutes(),
      's+': newDate.getSeconds()
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
  }

  /**
   * 获取周几
   * @param txData
   * @returns {string}
   */
  function getWeek(txData) {
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
  }

  /**
   * 距今多少天
   * @param time
   */
  function diffDay(time) {
    if (time) {
      const startTime = parseInt(time)
      const nowTime = new Date().getTime() // 获取到当前时间，再转成时间戳
      let sec = (startTime - nowTime) / 1000 // 用开始时间戳减去当前时间戳 在处于 1000
      let results = ''
      if (sec < 0) {
        // 判断是否为负数
        sec = sec * -1 // 如果为负数那就转成正数
      }
      results = {
        year: sec / 24 / 3600 / 365,
        day: (sec / 24 / 3600) % 365,
        hours: (sec / 3600) % 24,
        minutes: (sec / 60) % 60,
        seconds: sec % 60
      } // 计算出天、时、分、秒
      const seconds = Math.floor(results.seconds)
      const minutes = Math.floor(results.minutes)
      const hours = Math.floor(results.hours)
      const day = Math.floor(results.day)
      const year = Math.floor(results.year)
      return year > 0 ? `${year}年${day}天${hours}小时` : `${day}天${hours}小时`
    }
  }

  const filters = {
    formatDate,
    getWeek,
    diffDay
  }

  Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
  })
}
