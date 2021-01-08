import Vue from 'vue'
const BaseComponentsNameList = []
const BusinessComponentsNameList = []
const baseFiles = require.context('~/components/base', true, /\.vue/)
baseFiles.keys().forEach((key) => {
  try {
    const item = baseFiles(key).default
    if (BaseComponentsNameList.includes(item.name)) {
      Vue.component(item.name, item)
    }
  } catch (e) {}
})

const BusinessFiles = require.context('~/components/business', true, /\.vue/)
BusinessFiles.keys().forEach((key) => {
  const item = BusinessFiles(key).default
  if (BusinessComponentsNameList.includes(item.name)) {
    Vue.component(item.name, item)
  }
})
