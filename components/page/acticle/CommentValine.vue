<template>
  <div id="vcomments"></div>
</template>

<script>
// import Valine from 'valine'
export default {
  name: 'CommentValine',
  mounted() {
    const Valine = require('valine')
    const valq = new Valine({
      el: '#vcomments',
      avatar: 'retro',
      visitor: false,
      recordIP: true,
      placeholder: '说点什么吧...',
      appId: '1iG5XVR2RnyuqxkuaThMxgla-gzGzoHsz',
      appKey: 'Fp7PSlgcgOFIFCl1XLqcpTrl'
    })
  }
}
</script>

<style></style>
