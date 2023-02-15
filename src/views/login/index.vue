<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
    title="登录"
    class="page-nav-bar"
     >
     <van-icon
     slot="left"
     name="cross"
     @click="$router.back()"
     />
     </van-nav-bar>
    <!-- 登录表单 -->
    <van-form  ref="loginForm"  @submit="onSubmit">
      <van-field
      v-model="user.mobile"
      name="mobile"
      placeholder="请输入手机号"
      type="number"
      maxlength="11"
      :rules="[{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }]"
      >
        <i slot="left-icon" class="toutiao icon-shouji"></i>
      </van-field>
      <van-field
      v-model="user.code"
       name="code"
       type="number"
       placeholder="请输入验证码"
       maxlength="6"
       :rules="[
        {
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }
       ]"
       >
        <i slot="left-icon" class="toutiao icon-yanzhengma"></i>
        <template #button>
          <van-count-down
          v-if="isCountDownShow"
          :time="1000*10"
          format="ss s"
          @finish="isCountDownShow=false"
          />
          <van-button
          v-else
          class="send-sms-btn"
          round size="small"
          type="default"
          @click="OnSend"
            >
            发送验证码
            </van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px" class="login-btn-wrap">
        <van-button
        class="login-btn"
        block type="info"
        native-type="submit"
          >
          登录
          </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { Login, Send } from '@/api/user'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      // 验证成功发生请求
      try {
        const { data } = await Login(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后再试')
        }
      }
    },
    async OnSend () {
      // 验证手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      //  验证通过，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        await Send(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 25px;
  }
  .send-sms-btn {
    width: 130px;
    height: 30px;
    background-color: #ededed;
    border-radius: 23px;
    font-size: 16px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 10px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
