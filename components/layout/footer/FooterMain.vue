<template>
  <div class="footer-main">
    <div class="d-content-center">
      <p>世人的悲欢并不相通，我只是觉得他们吵闹。</p>
    </div>
    <div class="record d-text-center font-12">
      <a href="https://beian.mps.gov.cn/#/query/webSearch?code=32058302005157" rel="noreferrer" target="_blank">苏公网安备32058302005157号</a>
      <a href="https://beian.miit.gov.cn/#/Integrated/index" rel="nofollow" target="_blank">{{ copyright }}</a>
      丨Copyright © 2021 chenyongchang.All Rights Reserved
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterMain',
  data() {
    return {
      copyright: '皖ICP备2021000672号'
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-main {
  background: $bodyBg;
  width: 100%;
  height: 100px;
  position: relative;
  p {
    padding: 14px 0;
  }
  .record {
    background: $lineColor;
    width: 100%;
    height: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    line-height: 20px;
  }
}
</style>
