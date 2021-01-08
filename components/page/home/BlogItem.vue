<template>
  <article class="blog-item font-16">
    <h2 class="artcle-title d-flex">
      <a href="/artcle/这是标题" title="这是标题" class="title-name d-block">这是标题</a>
    </h2>
    <div class="article-info">
      <span class="hide-sm">发表于</span>
      <time>2020-12-30</time> | <span class="hide-sm">分类于</span>
      <a href="/tags/前端" title="前端" class="hover-highlight">前端</a>
    </div>
    <div class="article-desc">
      在上一篇文章中:搭建SpringMVC与SpringBoot项目了解了Spring的基本使用，本文将继续学习SpringCloud相关知识，主要包括环境搭建和服务注册等内容，进而迈入Java微服务的大门~
    </div>
  </article>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.blog-item {
  width: 100%;
  margin-bottom: 50px;
  color: $baseFontColor;
  .artcle-title {
    margin: 15px 0;
    .title-name {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 100%;
        height: 3px;
        transform: scaleX(0);
        background: $baseFontColor;
        transition: all ease 0.2s;
      }
      &:hover::after {
        transform: scaleX(1);
      }
    }
  }
  .article-info {
    font-size: 12px;
    color: $secondFontColor;
    word-spacing: 3px;
    > a {
      color: $twoFontColor;
      border-bottom: dashed 1px lineColor(0.8);
      &:hover {
        color: $baseFontColor;
        border-bottom: solid 1px $lineColor;
      }
    }
  }
  .article-desc {
    margin: 16px 0;
    line-height: 20px;
  }
}
</style>
