<template>
  <div class="article d-content-center">
    <div v-if="isAdmin" class="edit-article">
      <el-button class="btn-edit d-block" type="primary" @click="deleteMd">删除</el-button>
      <el-button v-if="isEdit" class="btn-edit d-block" type="primary" @click="cancel">取消</el-button>
      <el-button class="btn-edit d-block" type="primary" @click="changeIsEdit">{{ isEdit ? '保存' : '编辑' }}</el-button>
    </div>
    <article class="article-content">
      <div v-if="isAdmin && isEdit" class="d-flex">
        <div class="article-title">
          <el-input v-model="article.title" placeholder="请输入文章的标题"></el-input>
        </div>
        <div class="article-title">
          <el-input v-model="article.desc" :autosize="{ minRows: 1, maxRows: 4 }" placeholder="请输入文章的描述"></el-input>
        </div>
        <div class="article-title">
          <el-select v-model="article.tags" filterable allow-create default-first-option placeholder="请选择文章的标签">
            <el-option v-for="item in tagsList" :key="item.name.toLowerCase()" :label="item.name" :value="item.name.toLowerCase()"> </el-option>
          </el-select>
        </div>
      </div>
      <h1 class="d-text-center">{{ article.title }}</h1>
      <div v-if="!isEdit" class="article-h" v-html="htmlArticle"></div>
      <div v-if="!isEdit" class="same-article">
        <h2 class="same-title">{{ article.title }}的相似文章</h2>
        <div class="article-list d-flex d-flex-warp">
          <a v-for="item in sameList" :key="`same-${item.id}`" :title="item.title" :href="`/article-${item.id}`">{{ item.title }}分析</a>
        </div>
      </div>
      <mavon-editor v-else v-model="article.handbook" :subfield="isEdit" preview-background="white" :default-open="!isEdit ? 'preview' : ''" :toolbars-flag="isEdit" :toolbars="markdownOption" @save="saveMd" />
    </article>
    <div>
      <client-only>
        <comment-valine></comment-valine>
      </client-only>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import CommentValine from '@/components/page/acticle/CommentValine'
export default {
  components: { CommentValine },
  async asyncData({ params, query, store }) {
    const { id } = params
    const res = await store.dispatch('acticle/getArticleList', { query: { id } })
    const article = res.data.list[0]
    const same = await store.dispatch('acticle/getArticleList', { query: { tags: article.tags || '' }, pointer: ['id', 'title'] })
    const htmlArticle = marked(article.handbook).replace(/<a(.*?)>(.*?)<\/a>/g, (...args) => {
      const flag = args[1].includes('sheep11.com')
      if (!flag) {
        return args[0].replace('<a', '<a rel="nofollow"')
      }
      return args[0]
    })
    const remember = JSON.stringify(article)
    return {
      isEdit: false,
      id,
      sameList: same.data.list.filter((item) => item.id !== article.id),
      article,
      remember,
      htmlArticle
    }
  },
  data() {
    return {
      tagsList: []
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
    },
    isAdmin() {
      return this.$store.state.user.userInfo && this.$store.state.user.userInfo.isadmin === 'c'
    }
  },
  beforeMount() {
    this.getTagsList()
  },
  mounted() {},
  methods: {
    cancel() {
      this.article = JSON.parse(this.remember)
      this.isEdit = false
    },
    async deleteMd() {
      // 删除文章
      // console.log(this.id, 'this.id this.id ')
      const res = await this.$store.dispatch('acticle/daleteArticle', { id: this.id })
      if (res.data > 0) {
        this.$router.push('/')
      }

      // console.log(res)
    },
    /**
     * 获取标签
     */
    async getTagsList() {
      const res = await this.$store.dispatch('acticle/getTagsList', {})
      this.tagsList = res.data.list
    },
    changeIsEdit() {
      // 更改现在文章的状态
      this.isEdit = !this.isEdit
      if (!this.isEdit) {
        this.saveMd()
      }
    },
    //   保存当前的md文件
    async saveMd() {
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
      const res = await this.$store.dispatch('acticle/updataArticle', { id: this.id, json: this.article })
      this.remember = JSON.stringify(res.data.jsonMessage)
    }
  },
  head() {
    const { title, desc, tags } = this.article
    return {
      title: `【${title}】-${tags + ''}-陈永昌的博客`,
      meta: [
        { hid: 'description', name: 'description', content: `陈永昌的博客提供${tags + ''}学习-${desc}` },
        { name: 'keywords', content: `${tags + ''}` }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  min-height: calc(100vh - 170px);
  .same-article {
    margin-top: 10px;
    padding-top: 10px;
    border-top: solid 1px $lineColor;
    .same-title {
      margin-bottom: 15px;
    }
    .article-list {
      margin-bottom: -10px;
      > a {
        padding: 0 10px;
        background: #f7f8fa;
        border-radius: 4px;
        height: 20px;
        line-height: 20px;
        display: block;
        flex-shrink: 0;
        margin: 0 10px 10px 0;
      }
    }
  }
  .article-h {
    // position: absolute;
    // opacity: 0;
  }
  .edit-article {
    position: fixed;
    right: 100px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    .btn-edit {
      margin: 0 0 15px 0;
      display: block;
    }
  }
  .article-content {
    position: relative;
    z-index: 1;
    margin-top: 30px;
    border-radius: 4px;
    box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.16);
    background: white;
    padding: 10px 20px;
    /deep/ .v-note-wrapper {
      height: 100%;
    }
    .a-title {
      margin: 0 0 10px 0;
    }
    .article-title {
      margin: 0 10px 20px 0;
      width: 300px;
      .el-select {
        width: 100%;
      }
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
