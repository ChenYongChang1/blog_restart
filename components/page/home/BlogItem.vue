<template>
  <article class="blog-item font-16">
    <h2 class="artcle-title d-flex">
      <a :href="`/article-${blogRow.id}`" :title="blogRow.title" class="title-name d-block">{{ blogRow.title }}</a>
    </h2>
    <div class="article-info">
      <span class="hide-sm">发表于</span>
      <time>2020-12-30</time> | <span class="hide-sm">分类于</span>
      <a :href="`/tags/${blogRow.tags}`" :title="blogRow" class="hover-highlight">{{ blogRow.tags }}</a>
    </div>
    <div class="article-desc">
      {{ blogRow.desc }}
    </div>
  </article>
</template>

<script>
export default {
  name: 'BlogItem',
  props: {
    blogRow: {
      type: Object,
      default: () => ({})
    }
  }
}
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
