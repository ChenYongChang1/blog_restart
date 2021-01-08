<template>
  <div class="day-blog">
    <header-main></header-main>
    <nuxt />
    <footer-main></footer-main>
  </div>
</template>
<script>
import HeaderMain from '@/components/layout/header/HeaderMain'
import FooterMain from '@/components/layout/footer/FooterMain'
export default {
  components: { HeaderMain, FooterMain },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.day-blog {
  min-height: 100vh;
  background-image: linear-gradient($bodyBg 1px, transparent 0), linear-gradient(90deg, $bodyBg 1px, transparent 0);
  background-size: 30px 30px, 30px 30px;
}
</style>
