<template>
  <div class="tags-box d-content-center">
    <div v-if="!name" class="ul-tags d-text-center">
      <span class="count-tags d-black-color font-14">当前一共{{ tagsList.length || 0 }}个标签</span>
      <div class="tags-list d-flex">
        <div>
          <a v-for="(item, index) in tagsList" :key="`tag-${index}`" :href="`/tags/tag-${item.name}`" :style="{ fontSize: parseInt(12 + item.count / 3) + 'px' }" :title="`${item.name}(${item.count})`" class="li-tag">{{ item.name }}</a>
        </div>
      </div>
    </div>
    <!-- <nuxt-child v-else :name="name"></nuxt-child> -->
  </div>
</template>

<script>
export default {
  async asyncData({ params, store }) {
    const { name } = params
    if (name) {
      return { name }
    }
    const res = (await store.dispatch('acticle/getTagsList', {})) || {}
    return {
      name,
      tagsList: res.data.list || []
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.tags-box {
  margin: 20px auto;
}
.ul-tags {
  min-height: calc(100vh - 270px);
  padding: 10px 0 30px 0;
  .count-tags {
    margin-bottom: 20px;
  }
  .tags-list {
    width: 100%;
    flex-wrap: wrap;
    .li-tag {
      margin: 10px;
      padding-bottom: 5px;
      border-bottom: dashed 1px $twoFontColor;
      color: $twoFontColor;
      &:hover {
        border-bottom: solid 1px $baseFontColor;
        color: $baseFontColor;
      }
    }
  }
}
</style>
