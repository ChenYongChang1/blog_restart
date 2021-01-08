<template>
  <div class="upload-acticle d-content-center">
    <div class="btns">
      <div class="d-flex">
        <div class="upload-btn d-flex blog-input" :class="{ 'blog-input-show': isShowInput }">
          <el-button type="primary" @click="isShowInput = !isShowInput">外链博客</el-button>
          <el-input v-model="webUrl" placeholder="请输入博客的网址" @keyup.native.enter="urlToUploadFile"></el-input>
        </div>
        <el-popover placement="bottom" popper-class="drop-tooltip" title="" width="200" trigger="click">
          <div class="drop-input font-12 d-base-font-color">
            {{ uploadTextMap[isDropUpload] }}<span v-if="isDropUpload === 0" class="d-theme-color">点击上传</span>
            <input type="file" @change="uploadMd" @dragover="fileDragover" @dragleave="dragleave" @drop="fileDrop" />
          </div>
          <el-button slot="reference" class="upload-btn" type="primary">上传博客</el-button>
        </el-popover>
      </div>
    </div>
    <div class="d-flex">
      <div class="article-title">
        <el-input v-model="article.title" placeholder="请输入文章的标题"></el-input>
      </div>
      <div class="article-title">
        <el-input v-model="article.desc" :autosize="{ minRows: 1, maxRows: 4 }" placeholder="请输入文章的描述"></el-input>
      </div>
      <div class="article-title">
        <el-select v-model="article.tags" filterable allow-create multiple default-first-option placeholder="请选择文章的标签">
          <el-option v-for="item in tagsList" :key="item.name" :label="item.name" :value="item.name"> </el-option>
        </el-select>
      </div>
    </div>
    <div class="editor">
      <mavon-editor ref="md-editor" v-model="article.handbook" :toolbars="markdownOption" @imgAdd="imgAdd" @save="saveMd" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const _this = this
    return {
      markdownOption: {
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
      },
      isShowInput: false,
      isDropUpload: 0,
      uploadTextMap: {
        0: '拖动或',
        1: '框内放下以上传'
      },
      webUrl: '',
      tagsList: [
        {
          name: '前端'
        }
      ],
      article: {
        id: '',
        title: '',
        desc: '',
        tags: [],
        handbook: '',
        time: '',
        user: '',
        count: 0,
        like: 0
      }
    }
  },
  mounted() {
    this.getOssSign()
  },
  methods: {
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
      const article = {
        ...this.article,
        id: this.$randomString(16),
        user: this.$store.state.userInfo.id
      }
      const res = await this.$store.dispatch('acticle/addArticle', article)
      if (res.code === 200) {
        this.$message.success('添加成功')
        this.$router.push(`/article-${res.data.id}`)
      }
    },
    /**
     * 获取阿里云oss签名
     */
    async getOssSign() {
      const res = await this.$store.dispatch('getOssSign')
      console.log(res)
    },
    async imgAdd(pos, $file) {
      //   添加图片
      console.log(pos, $file)
      await this.$store.dispatch('uploadImg', $file)
      this.$refs['md-editor'].$img2Url(pos, url)
    },
    /**
     * 获取他人博客的 html
     */
    async urlToUploadFile() {
      const res = await this.$store.dispatch('acticle/getOtherBlogMd', { webUrl: this.webUrl })
      this.article.handbook = res.data.content
    },
    // 读取文件
    readMdFile(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.article.handbook = e.target.result
      }
      reader.readAsText(file)
    },
    // 上传md
    uploadMd(el) {
      const file = el.target.files[0]
      this.readMdFile(file)
    },
    fileDragover(e) {
      this.isDropUpload = 1
      e.preventDefault()
    },
    dragleave(e) {
      this.isDropUpload = 0
      e.preventDefault()
    },
    // 拖动放下文件 准备上传
    fileDrop(el) {
      this.isDropUpload = 0
      el.preventDefault()
      const file = el.dataTransfer.files[0]
      this.readMdFile(file)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-acticle {
  min-height: 90vh;
  margin-bottom: 50px;
  .btns {
    padding: 15px 0;

    .upload-btn {
      margin-right: 15px;
      margin-left: 0;
    }
    .blog-input {
      > .el-button {
        border-radius: 4px;
      }
      /deep/ .el-input__inner {
        width: 0;
        padding: 0 0;
        border-radius: 0 4px 4px 0;
        transition: all 0.2s ease;
      }
      // &:hover /deep/ .el-input__inner {
      //   width: 300px;
      //   padding: 0 15px;
      // }
    }
    .blog-input-show {
      > .el-button {
        border-radius: 4px 0 0 4px;
      }
      /deep/ .el-input__inner {
        width: 300px;
        padding: 0 15px;
      }
    }
  }
  .article-title {
    margin: 0 10px 20px 0;
    width: 300px;
    .el-select {
      width: 100%;
    }
  }
  .editor {
    min-height: 600px;
    /deep/ .v-note-wrapper {
      min-height: 600px;
      height: 100%;
    }
  }
}
</style>
