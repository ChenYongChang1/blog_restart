<template>
  <div class="header">
    <div class="header-inner d-content-center d-flex d-flex-space d-align-center">
      <div class="logo">
        <a href="/" class="d-block font-18" title="天天的博客">天天的博客</a>
      </div>
      <div class="right-menu d-flex d-align-center d-flex-end">
        <div class="search-input" :class="{ 'show-search': isfocus }">
          <el-input v-model="word" placeholder="查询文章" @focus="isfocus = true" @blur="isfocus = false" @keyup.enter.native="searchArticle"></el-input>
        </div>
        <a title="标签" href="/tags" class="menu-item d-block font-16 d-hover-bg d-radius-4">标签</a>
        <a title="归档" href="/history" class="menu-item d-block font-16 d-hover-bg d-radius-4">归档</a>
        <a title="echarts" href="/echarts" class="menu-item d-block font-16 d-hover-bg d-radius-4">图表</a>
        <a title="github" href="https://github.com/ChenYongChang1" target="_blank" rel="nofollow" class="menu-item d-block font-16 d-hover-bg d-radius-4">github</a>
        <a title="关于我" href="/about" class="menu-item d-block font-16 d-hover-bg d-radius-4">关于</a>
        <a title="上传博客" href="/upload" class="menu-item d-block font-16 d-hover-bg d-radius-4">上传</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderMain',
  data() {
    return {
      word: '',
      isfocus: false
    }
  },
  methods: {
    searchArticle() {
      this.$router.push({ path: `/search-1-${encodeURIComponent(this.word)}` })
      this.word = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: $bodyBg;
  width: 100%;
  height: 68px;
  .header-inner {
    height: 100%;
    .logo {
      position: relative;
      height: 48px;
      padding: 5px;
      @include fontFamilySemibold();
      .d-block {
        height: 38px;
        line-height: 38px;
        color: $baseFontColor;
        word-break: keep-all;
      }
      &:before,
      &:after {
        content: '';
        position: absolute;
        left: 18%;
        width: 64%;
        height: 3px;
        background: $baseFontColor;
      }
    }
    .right-menu {
      width: 550px;
      .menu-item {
        padding: 0 10px;
        height: 48px;
        line-height: 48px;
        margin-left: 15px;
      }
    }
  }
  .search-input {
    width: 100px;
    height: 20px;
    border-radius: 50%;
    padding: 0;
    line-height: 20px;
    transition: all 0.3s;
    text-align: center;
    ::v-deep .el-input,
    ::v-deep .el-input__inner {
      width: 100%;
      height: 100%;
      line-height: inherit;
      background: rgba($color: #000000, $alpha: 0);
      padding: 0;
      transition: all 0.3s;
    }
  }
  .show-search {
    width: 150px;
    border-radius: 4px;
    text-align: left;
    background: white;
    ::v-deep .el-input__inner {
      padding: 0 10px;
    }
  }
}
</style>
