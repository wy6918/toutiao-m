<template>
<div class="search-suggestion">
    <van-cell
    v-for="(item,index) in suggestions"
    :key="index"
     icon="search"
     @click="$emit('search',item)"
     >
    <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>
<script>
import { getSearchSuggest } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggest',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想建议数据
    }
  },
  watch: {
    searchText: {
      // .debounce(func, [wait=0], [options=])
      // func (Function): 要防抖动的函数。
      // [wait=0] (number): 需要延迟的毫秒数。
      handler: debounce(function (value) {
        const searchSuggest = this.loadSearchSuggest
        searchSuggest(value)
      }, 300),
      immediate: true // 让回调在侦听开始之后被立即调用
    }
  },
  methods: {
    async loadSearchSuggest (q) {
      try {
        const { data } = await getSearchSuggest(q)
        // console.log(data)
        this.suggestions = data.data.options
      } catch (error) {
        console.log(error)
      }
    },
    // 联想建议 高亮
    highlight (item) {
      const str = `<span style="color: #3296fa">
        ${this.searchText}</span>`
      // 需要动态的创建正则表达式
      // RegExp('匹配模式字符串（会根据这个字符串创建正则对象）','匹配模式（要写到字符串中）')
      const reg = new RegExp(this.searchText, 'gi')
      // replace 不会影响原数组
      return item.replace(reg, str) || ''
    }
  }
}
</script>
<style lang='less' scoped>

</style>
