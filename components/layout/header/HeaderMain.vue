<template>
  <div class="header">
    <div class="header-inner d-content-center d-flex d-flex-space d-align-center">
      <div class="logo">
        <a href="/" class="d-block font-18" title="天天的博客">天天的博客</a>
      </div>
      <div class="right-menu d-flex d-flex-end">
        <a title="标签" href="/tags" class="menu-item d-block font-16 d-hover-bg d-radius-4">标签</a>
        <a title="归档" href="/history" class="menu-item d-block font-16 d-hover-bg d-radius-4">归档</a>
        <a title="项目" href="/demo" class="menu-item d-block font-16 d-hover-bg d-radius-4">项目</a>
        <a title="关于我" href="/about" class="menu-item d-block font-16 d-hover-bg d-radius-4">关于</a>
        <a title="上传博客" href="/upload" class="menu-item d-block font-16 d-hover-bg d-radius-4">上传</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderMain'
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
      width: 400px;
      .menu-item {
        padding: 0 10px;
        height: 48px;
        line-height: 48px;
        margin-left: 15px;
      }
    }
  }
}
</style>
