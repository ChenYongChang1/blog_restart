<template>
  <div class="tags-box d-content-center">
    <ul v-if="!name" class="ul-tags d-flex">
      <li v-for="(item, index) in tagsList" :key="`tag-${index}`" class="li-tag d-radius-4">
        <a :href="`/tags/tag-${item.name}`">{{ item.name }}({{ item.count }})</a>
      </li>
    </ul>
    <nuxt-child v-else :name="name"></nuxt-child>
  </div>
</template>

<script>
export default {
  async asyncData({ params, store }) {
    const { name } = params
    if (name) {
      return { name }
    }
    const res = await store.dispatch('acticle/getTagsList', {})
    return {
      tagsList: res.data.list
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
  background: white;
}
.li-tag {
  padding: 0 10px;
  height: 20px;
  background: $moduleBg;
  text-align: center;
  line-height: 20px;
  margin-right: 10px;
}
</style>
