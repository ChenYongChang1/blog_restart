<template>
  <div class="article d-content-center">
    <div class="edit-article">
      <el-button type="primary" @click="changeIsEdit">{{ isEdit ? '保存' : '编辑' }}</el-button>
    </div>
    <article class="article-content">
      <mavon-editor v-model="article.handbook" :subfield="isEdit" preview-background="white" :default-open="!isEdit ? 'preview' : ''" :toolbars-flag="isEdit" :toolbars="markdownOption" @save="saveMd" />
    </article>
    <div id="vcomments"></div>
  </div>
</template>

<script>
import Valine from 'valine'
export default {
  async asyncData({ params, query, store }) {
    const { id } = params
    const res = await store.dispatch('acticle/getArticleList', { query: { id } })
    const article = res.data.list[0]
    console.log(article)
    return {
      article
    }
  },
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    markdownOption() {
      if (this.isEdit) {
        return {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          navigation: true, // 导航目录
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          subfield: true, // 单双栏模式
          preview: true // 预览
        }
      }
      return {}
    }
  },
  mounted() {
    const valq = new Valine({
      el: '#vcomments',
      avatar: 'retro',
      visitor: false,
      recordIP: true,
      placeholder: '说点什么吧...',
      appId: '1iG5XVR2RnyuqxkuaThMxgla-gzGzoHsz',
      appKey: 'Fp7PSlgcgOFIFCl1XLqcpTrl'
    })
  },
  methods: {
    changeIsEdit() {
      // 更改现在文章的状态
      this.isEdit = !this.isEdit
      if (!this.isEdit) {
        this.saveMd()
      }
    },
    //   保存当前的md文件
    saveMd() {
      /* 这个文章应该有
       article: {
            8. id
            1. 标题
            7 描述
            2. 时间
            3. 发布人
            4. 标签
            5. 点开人数
            6. 点赞人
       },
       */
      console.log(`文章的内容:${this.handbook}`)
    }
  },
  head() {
    const { title, desc, tags } = this.article
    return {
      title: `【${title}】-${tags + ''}-陈永昌的博客`,
      meta: [
        { hid: 'description', name: 'description', content: `陈永昌的博客提供${tags + ''}学习-${desc}` },
        { name: 'keywords', content: '' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  min-height: calc(100vh - 170px);
  .edit-article {
    position: fixed;
    right: 100px;
    top: 50%;
    transform: translateY(-50%);
  }
  .article-content {
    margin-top: 30px;
    /deep/ .v-note-wrapper {
      height: 100%;
    }
  }
  #vcomments {
    margin-top: 50px;
    /deep/ .vwrap {
      background: $moduleBg;
    }
  }
}
</style>
