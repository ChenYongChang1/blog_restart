<template>
  <div class="error-page">
    <!-- <h1 v-if="error.statusCode === 404">Page not found</h1> -->
    <div class="error-404 dd-text-center">
      <!-- <img :src="require('@/assets/img/empty/404.png')" alt="" /> -->
      <div class="remain">抱歉，您访问的页面不存在</div>
      <a class="dd-link" href="/">返回首页</a>
    </div>
  </div>
</template>

<script>
export default {
  props: { error: { type: Object, default: () => {} } },
  layout: 'error' // you can set a custom layout for the error page
}
</script>

<style lang="scss" scoped>
.error-page {
  width: 100%;
  .error-404 {
    width: 260px;
    margin: 160px auto;
    > img {
      width: 260px;
      height: 260px;
    }
    .remain {
      width: 100%;
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #abaeba;
      line-height: 20px;
      margin: 12px 0;
    }
  }
}
</style>
