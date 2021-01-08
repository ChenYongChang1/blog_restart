import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

export function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export function dateSeats(str) {
  if (str >= 0 && str < 10) {
    str = '0' + str
  }
  return str
}
export function randomStr(len) {
  return randomBytes(Math.ceil(len / 2))
    .toString('hex')
    .slice(0, len)
}
export function encrypt(data, key, iv) {
  let sign = ''
  key = Buffer.from(key, 'utf8')
  iv = Buffer.from(iv, 'utf8')
  const cipher = createCipheriv('aes-128-cbc', key, iv)
  sign += cipher.update(data, 'utf8', 'hex')
  sign += cipher.final('hex')
  return sign
}
export function decrypt(crypted, key, iv) {
  let src = ''
  key = Buffer.from(key, 'utf8')
  iv = Buffer.from(iv, 'utf8')
  const cipher = createDecipheriv('aes-128-cbc', key, iv)
  src += cipher.update(crypted, 'hex', 'utf8')
  src += cipher.final('utf8')
  return src
}
export function formatDate(date, fmt) {
  const newDate = new Date(parseInt(date))
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (newDate.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
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
}

/**
 * 数组按照某一属性转化为map对象
 * @param list 数组
 * @param props 属性名
 * @constructor
 */
export function Array2Map(list, props) {
  const obj = {}
  list.forEach(item => {
    if (!obj[item[props]]) {
      obj[item[props]] = item
    }
  })
  return obj
}

/**
 * 转换charts 数据
 * @param list
 * @param title
 * @param stats
 * @returns {{columns: *, rows: *}}
 */
export function transformLineData(list, title = 'name', stats = 'stats') {
  const times = []
  const columns = ['date']
  const rows = []
  // 初步处理的数据
  const lines = list.map(item => {
    const lineMap = {} // 构造数据map
    item[stats].map(cItem => {
      times.push(cItem[0]) // 把所有时间戳聚合到times中
      lineMap[cItem[0]] = cItem[1]
    })
    return { lineMap, name: item[title] }
  })
  // 对所有时间戳进行去重
  const tempTime = [...new Set(times)]
  lines.forEach(lItem => {
    columns.push(lItem.name) // 向columns 添加数据
    tempTime.forEach(item => {
      // 遍历时间戳进行取值
      const obj = { date: parseInt(item + '000') }
      obj[lItem.name] = lItem.lineMap[item] || '-'
      rows.push(obj)
    })
  })
  return { columns, rows }
}

/**
 * 转换charts 数据  --补全时间戳版本
 * @param list
 * @param title
 * @param stats
 * @returns {{columns: *, rows: *}}
 */
export function transformHistogram(list, title = 'name', stats = 'stats') {
  const times = [] // 存放所有时间戳
  const columns = ['date']
  const rows = []
  const lines = []
  list.map(item => {
    const lineMap = {} // 构造数据map
    if (item[title]) {
      columns.push(item[title]) // 向columns 添加数据
      item[stats].map(cItem => {
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
  timeAllData.forEach(item => {
    const obj = { date: parseInt(item + '000') }
    lines.forEach(lItem => {
      obj[lItem.name] = lItem.lineMap[item] || '-'
    })
    rows.push(obj)
  })
  return { columns, rows }
}

export function minArrayItem(data, name) {
  return Math.min.apply(
    Math,
    data.map(o => {
      return o[name]
    })
  )
}

export function sortMapMethods(opt) {
  const { field, indexParent, dataMap } = opt
  if (!dataMap) {
    return
  }
  const formatData = Object.keys(dataMap).filter(item => {
    return dataMap[item].num > 0
  })
  const arr = []
  formatData.map((item, index) => {
    arr.push({
      ...dataMap[item],
      name: dataMap[item].name,
      index: indexParent,
      type: field,
      value: dataMap[item].value,
      num: dataMap[item].num || ''
    })
  })
  // console.log(opt, 'opt')
  if (opt.field !== 'live') {
    arr.sort((a, b) => b.num - a.num)
  }

  arr.map((item, index) => {
    item.index += '-' + (index + 1)
    return item
  })
  return arr.length ? arr : ''
}
