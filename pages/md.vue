<template>
  <div class="upload-body">
    <input v-model="mdUrl" type="text" @keyup.enter="urlToUploadFile" />
    <input type="file" @change="uploadMd" @dragover="fileDragover" @dragleave="dragleave" @drop="fileDrop" />
    <mavon-editor v-model="handbook" :toolbars="markdownOption" />
    {{ remain }}
    <!-- <span id="/md" class="leancloud_visitors" data-flag-title="点点网">
      <em class="post-meta-item-text">阅读量 </em>
      <i class="leancloud-visitors-count">0</i>
    </span> -->
    <div id="vcomments"></div>
  </div>
</template>

<script>
// import Valine from 'valine'
export default {
  data() {
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
      remain: '',
      mdUrl: '',
      handbook: ''
    }
  },
  mounted() {
    // const valq = new Valine({
    //   el: '#vcomments',
    //   avatar: 'retro',
    //   visitor: false,
    //   recordIP: true,
    //   placeholder: '说点什么吧...',
    //   appId: '1iG5XVR2RnyuqxkuaThMxgla-gzGzoHsz',
    //   appKey: 'Fp7PSlgcgOFIFCl1XLqcpTrl'
    // })
  },
  methods: {
    async urlToUploadFile() {
      console.log(this.mdUrl)
      const res = await this.$axios.post('http://127.0.0.1:8000/add/article', {
        db: 'sdadadasd',
        table: 'test',
        jsonMessage: {
          // resource: 'cnblogs',
          url: this.mdUrl
        }
      })
      console.log(res)
      this.handbook = res.data.content
    },
    readMdFile(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.handbook = e.target.result
      }
      reader.readAsText(file)
    },
    uploadMd(el) {
      const file = el.target.files[0]
      this.readMdFile(file)
    },
    fileDragover(e) {
      this.remain = '框内放下以上传'
      console.log('dragover')
      e.preventDefault()
    },
    dragleave(e) {
      this.remain = ''
      e.preventDefault()
      console.log('dragleave')
    },
    fileDrop(el) {
      this.remain = ''
      console.log('fileDrop')
      el.preventDefault()
      const file = el.dataTransfer.files[0]
      this.readMdFile(file)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-body {
}
input {
  width: 100px;
  height: 100px;
  border: solid 1px $lineColor;
}
#vcomments {
  /deep/ .vwrap {
    background: $moduleBg;
  }
}
</style>
