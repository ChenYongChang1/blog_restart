<template>
  <div class="page d-flex">
    <a :href="getPageUrl(currentPage <= 1 ? '' : currentPage - 1)" class="page-common d-flex d-flex-center d-text-center" :class="{ disabled: currentPage === 1 }">
      <!-- <d-icon name="Dianshangyige" :pointer="true"></d-icon> -->
      <!-- ⬅️ -->
      pre
    </a>
    <a v-for="(item, index) in pageList" :key="`page-common-${index}`" :href="`${getPageUrl(item)}`" class="page-common d-flex d-flex-center d-text-center" :class="{ 'page-active': currentPage === item, disabled: !item }">{{ item || '...' }}</a>
    <a :href="getPageUrl(currentPage >= pageCount ? '' : currentPage + 1)" class="page-common d-flex d-flex-center d-text-center" :class="{ disabled: currentPage >= pageCount }">
      <!-- <dd-icon name="Dianxiayige" :pointer="true"></dd-icon> -->
      next
    </a>
  </div>
</template>

<script>
export default {
  name: 'DdPagination',
  props: {
    url: {
      // 切换分页的url 分页的参数用{page}代替 例如 /app/a-{page}
      type: String,
      default: ''
    },
    total: {
      type: Number,
      default: 350
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.pageSize)
    },
    pageList() {
      const centerLen = 5
      const pageList = {
        start: [],
        center: [],
        end: []
      }
      if (this.pageCount <= 7) {
        pageList.start = this.getPageList(this.pageCount)
      } else {
        let start = Math.max(this.currentPage - 3, 1)
        let end = start + centerLen
        if (start > 1) {
          pageList.start = [1, '']
        }
        if (end >= this.pageCount) {
          start = this.pageCount - centerLen
          end = this.pageCount
          pageList.end = []
        } else {
          pageList.end = ['', this.pageCount]
        }
        pageList.center = this.getPageList(end, start - 1)
      }
      return pageList.start.concat(pageList.center).concat(pageList.end)
    }
  },
  methods: {
    getPageUrl(num) {
      if (!num) {
        return 'javascript:;'
      }
      console.log(this.url, 'ddddd')
      return this.url.replace(/{page}/g, num)
    },
    getPageList(end, start = 0) {
      const page = []
      for (let i = start; i < end; i++) {
        page.push(i + 1)
      }
      return page
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  .page-common {
    // display: inline-block;
    width: 30px;
    height: 28px;
    line-height: 28px;
    background: $moduleBg;
    color: $baseFontColor;
    border-radius: 4px;
    margin: 0 5px;
    &:not(.disabled):not(.page-active):hover {
      color: $themeColor;
    }
  }
  .disabled {
    color: $descFontColor;
  }
  .page-active {
    background: $themeColor;
    color: white;
  }
}
</style>
