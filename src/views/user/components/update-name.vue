<template>
  <div>
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onUpdate()"
    />
    <div  class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>
<script>
import { UpdateUserInfo } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onUpdate () {
      console.log(11)
      try {
        const localName = this.localName
        if (!this.localName.length) {
          this.$toast('昵称不能为空')
          return
        } else {
          await UpdateUserInfo({ name: this.localName })
          // 更新视图
          this.$emit('input', localName)
          // 关闭弹出层
          this.$emit('close')
          // 提示成功
          this.$toast.success('更新成功')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.field-wrap{
  padding: 20px 10px;
}
</style>
