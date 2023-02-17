<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('AllDelSearchHistory',[])">全部删除 </span>
        &nbsp;
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow=true" />
    </van-cell>
    <van-cell
       v-for="(item, index) in searchHistory"  :key="index"
       :title="item"
       @click="onSearchItemClick(item,index)"
       >
      <van-icon v-if="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>
<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        // 处于删除状态，删除
        this.$emit('delSearchHistory', index)
      } else {
        // 处于非删除，进入搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
