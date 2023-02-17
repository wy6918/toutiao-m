<template>
  <div>
    <van-picker
  title="标题"
  show-toolbar
  :columns="columns"
  @confirm="onConfirm"
  @cancel="$emit('close')"
  @change="onchange"
  :default-index="value"
/>
  </div>
</template>
<script>
import { UpdateUserInfo } from '@/api/user'

export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localGender = this.localGender
        await UpdateUserInfo({ gender: this.localGender })
        // 更新视图
        this.$emit('input', localGender)
        // 关闭弹出层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    },
    onchange (picker, value, index) {
      console.log(index)
      this.localGender = index
    }
  }
}
</script>
<style lang='less' scoped>

</style>
