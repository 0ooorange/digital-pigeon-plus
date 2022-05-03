<template>
  <div class="inlineForm">
    <span class="input">
      <el-input v-model="username" placeholder="请输入手机号码/用户名" />
    </span>
  </div>
  <span class="phoneVerify" style="display: none;">请输入正确的手机号码格式</span>
  <div class="inlineForm">
    <span class="input">
      <el-input v-model="password" type="password" placeholder="请填写密码" show-password />
    </span>
  </div>
  <span class="secretVerify" style="display: none;">密码错误</span>
  <DragVerify style="margin-top: 30px;"></DragVerify>
</template>

<script setup>
import DragVerify from './dragVerify.vue'
import { ref } from 'vue'
const username = ref('admin')
const password = ref('admin')
</script>

<style lang="scss" scoped>
.inlineForm {
  display: flex;
  .input {
    margin: 10px 0;
    display: inline-block;
    width: 300px;
  }
  .verifyInput {
    width: 200px;
  }
  .verifyBtn {
    margin: 10px 0;
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
</style>