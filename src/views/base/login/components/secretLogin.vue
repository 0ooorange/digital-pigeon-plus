<template>
  <div class="inlineForm">
    <span class="input">
      <el-input v-model="NameOrPhone" placeholder="请输入手机号码/用户名" />
    </span>
  </div>
  <span class="phoneVerify" style="display: none;">请输入正确的手机号码格式</span>
  <div class="inlineForm">
    <span class="input">
      <el-input v-model="password" type="password" placeholder="请填写密码" show-password />
    </span>
  </div>
  <span class="secretVerify" style="display: none;">密码错误</span>
  <div class="turnToOther">
    <el-checkbox class="rememberSecret" v-model="rememberSecret" label="记住密码" size="large" />
    <span class="forgetSecret">忘记密码</span>
  </div>
  <DragVerify style="margin-top: 0px;"></DragVerify>
  <el-button class="btn" @click="log_in">登录</el-button>
</template>

<script setup>
import DragVerify from './dragVerify.vue'
import { ref, getCurrentInstance } from 'vue'
import { login } from '@api/bases/login'
const { proxy } = getCurrentInstance()
const rememberSecret = ref(false)
const NameOrPhone = ref('刘双印')
const password = ref('123456')

// 登录
const islogin = ref(true)
// var validate = await proxy.$refs.loginForm.validate().catch(()=>{})
// 	if(!validate){ return false }
islogin.value = true
let data = {
  NameOrPhone: NameOrPhone.value,
  password: password.value,
}

//获取token
const log_in = function () {
  login(data)
    .then((res) => {
      console.log('denglu')
      if (res.code === 200) {
        proxy.$TOOL.cookie.set('TOKEN', res.data.token)
      } else {
        islogin.value = false
        proxy.$message.warning(res.message)
        return false
      }
    })
    .then(() => {
      proxy.$router.replace({
        path: '/navigator',
      })
      proxy.$message.success('Login Success 登录成功')
      islogin.value = false
    })
}
</script>

<style lang="less" scoped>
.inlineForm {
  display: flex;
  .input {
    margin: 10px 0;
    display: inline-block;
    width: 300px;
  }
}
/deep/.el-input__wrapper {
  background-color: transparent;
}
.phoneVerify,
.secretVerify {
  margin: -6px 0;
  display: inline-block;
  align-self: flex-start;
  height: 12px;
  font-size: 12px;
  line-height: 12px;
  color: #f5514c;
}
.turnToOther {
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .forgetSecret {
    cursor: pointer;
    line-height: 40px;
    font-size: 14px;
    color: #07b1cf;
  }
}
.btn {
  margin-top: 10px;
  height: 40px;
  width: 300px;
  font-size: 16px;
  background-color: #03aefc;
  border: 0;
  color: #d8f9fc;
}
</style>