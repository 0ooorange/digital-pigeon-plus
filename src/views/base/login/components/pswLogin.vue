<template>
  <div class="inlineForm">
    <span class="input">
      <el-input v-model="moblePhoneMess" placeholder="请输入手机号码" />
    </span>
  </div>
  <span ref="moblePhoneMsg" class="phoneVerify" style="display: none;">请输入正确的手机号码格式</span>
  <div class="inlineForm">
    <span class="input verifyInput">
      <el-input v-model="verify" placeholder="请输入验证码" />
    </span>
    <button class="verifyBtn">获取验证码</button>
  </div>
  <span class="secretVerify" style="display: none;">验证码错误</span>
  <DragVerify />
  <el-button class="btn" @click="login">登录</el-button>
</template>

<script setup>
import DragVerify from './dragVerify.vue'
import { ref, watch, getCurrentInstance } from 'vue'
const moblePhoneMess = ref('')
const verify = ref('')

const { proxy } = getCurrentInstance()
watch(
  () => moblePhoneMess.value,
  (newMoblePhone) => {
    var moblePhoneReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    if (moblePhoneReg.test(newMoblePhone)) {
      proxy.$refs.moblePhoneMsg.style.display = 'none'
    } else {
      proxy.$refs.moblePhoneMsg.style.display = 'block'
    }
  }
)
</script>

<style lang="scss" scoped>
.inlineForm {
  display: flex;
  align-items: center;
  .input {
    margin: 10px 0;
    display: inline-block;
    width: 300px;
  }
  .verifyInput {
    width: 200px;
  }
  .verifyBtn {
    height: 40px;
    width: 100px;
    cursor: pointer;
    border: 0;
    border-radius: 4px;
    color: white;
    background-color: #03aefc;
  }
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