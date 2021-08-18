<template>
  <div class="blog-about d-content-center d-content-height">
    <div>
      <h3>关于我 天天</h3>
      <div class="about_ct font-16">
        <p>初识如管中窥豹，可见一斑；</p>
        <p>继而抽丝拨茧，却是剪不断理还乱；</p>
        <p>长路漫漫，一往无前，终将拨开云雾见青天。</p>
      </div>
    </div>
    <div class="margin-top-25">
      <h3>关于博客</h3>
      <div class="about_ct">
        <p>阮老师说：“博客首先是一种知识管理工具，其次才是传播工具。”</p>
        <p>因此这个博客主要记录我正在学习的东西，难免会有问题，欢迎各位大佬指正。</p>
      </div>
    </div>
    <div class="margin-top-25">
      <h3>其他</h3>
      <div class="about_ct">
        <p>版权声明：自由转载-非商用-保持署名。</p>
        <p>--</p>
      </div>
    </div>
    <div class="margin-top-25">
      <h3>联系方式</h3>
      <div class="about_ct">
        <p>GitHub: <a class="d-theme-color" href="https://github.com/ChenYongChang1" target="_blank">@天天</a></p>
        <p>邮箱: <a class="d-theme-color" href="mailto:1759633997@qq.com" target="_blank">1759633997@qq.com</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `关于天天-陈永昌的博客`,
      meta: [
        { hid: 'description', name: 'description', content: `陈永昌的博客提供技术分享、前端学习、vue、算法等学习` },
        { name: 'keywords', content: '' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-about {
  padding-top: 30px;
  h3 {
    margin: 18px 0 20px 0;
  }
  .about_ct {
    margin: 10px 0;
    > p {
      margin: 0 0 16px 0;
    }
  }
  .margin-top-25 {
    margin-top: 25px;
  }
}
</style>
