<template>
  <div class="loginMain" :style="{backgroundImage: `url(${require('../../../assets/images/loginBgImg.png')})`}">
    <div class="loginContent">
      <h1 class="title">数字鸽业平台登录</h1>
      <div class="select">
        <el-button :class="pswMethodClass" type="text" @click="loginByPsw">密码登录</el-button>
        <el-button :class="messMethodClass" type="text" @click="loginByMess">短信登录</el-button>
      </div>
      <div class="form">
        <SecretLogin ref="SecretLoginRef" v-if="loginMethod === 0" />
        <PswLogin ref="PswLoginRef" v-if="loginMethod === 1" />
      </div>
    </div>
    <div class="otherMethods">
      <div class="text">
        <del>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</del>
        <span>其他方式登录</span>
        <del>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</del>
      </div>
      <div class="imgs">
        <img :src="weibo" alt="ERR">
        <img :src="shouji" alt="ERR">
        <img :src="weixin" alt="ERR">
        <img :src="zhifubao" alt="ERR">
      </div>
    </div>
  </div>
</template>

<script>
import weibo from '../../../assets/images/weibo.png'
import shouji from '../../../assets/images/shouji.png'
import weixin from '../../../assets/images/weixin.png'
import zhifubao from '../../../assets/images/zhifubao.png'
import bgImg from '../../../assets/images/loginBgImg.png'

import SecretLogin from './components/secretLogin.vue'
import PswLogin from './components/pswLogin.vue'

import tool from '../../../utils/tool'
import store from '../../../store'
import { ref, nextTick } from 'vue'

export default {
  components: { SecretLogin, PswLogin },
  setup() {
    tool.data.set('IS_GET_ROUTER', true)
    tool.data.set('CURR_MENU_INDEX', 0)
    tool.data.set('CURR_MENU', [])
    tool.cookie.remove('TOKEN')
    tool.data.remove('USER_INFO')
    tool.data.remove('CURR_INFO')
    tool.data.remove('MENU')
    store.commit('clearViewTags')
    store.commit('clearKeepLive')
    store.commit('clearIframeList')
    const rememberSecret = ref(false)

    const loginMethod = ref(0)
    const messMethodClass = ref('el-button el-button--text el-button--default selectBtn')
    const pswMethodClass = ref(
      'el-button el-button--text el-button--default selectBtn selectBtn-active'
    )
    // 密码登录
    const loginByPsw = () => {
      nextTick(() => {
        pswMethodClass.value =
          'el-button el-button--text el-button--default selectBtn selectBtn-active'
        messMethodClass.value = 'el-button el-button--text el-button--default selectBtn'
        loginMethod.value = 0
      })
    }
    // 短信登录
    const loginByMess = () => {
      nextTick(() => {
        messMethodClass.value =
          'el-button el-button--text el-button--default selectBtn selectBtn-active'
        pswMethodClass.value = 'el-button el-button--text el-button--default selectBtn'
        loginMethod.value = 1
      })
    }

    return {
      bgImg,
      weibo,
      shouji,
      weixin,
      zhifubao, // 图片
      rememberSecret, // 记住密码
      loginMethod, // 登录方式
      messMethodClass,
      pswMethodClass, // 登录css
      loginByPsw,
      loginByMess,
    }
  },
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

.loginMain {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: no-repeat center top;
  background-size: 100%;
  /* background-attachment: fixed; */
}

.loginContent {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 33%;
  height: 70%;
  transform: translate(0, -8%);
  background-color: rgba(255, 255, 255, 0);
  border: 0;
  .select {
    position: absolute;
    top: 85px;
    display: flex;
    justify-content: space-around;
    width: 200px;
    .selectBtn {
      width: 120px;
      border-radius: 0;
      font-size: 16px;
      color: #a8abb2;
    }
    .selectBtn:hover {
      color: #3599e6;
    }
    .selectBtn-active {
      border-bottom: 2px solid #3599e6;
      color: #3599e6;
    }
  }
  .title {
    height: 55px;
    font-size: 40px;
    line-height: 55px;
    background: linear-gradient(to right, #afebf1, #0bb9cc);
    background-clip: text;
    color: transparent;
  }
  .form {
    position: absolute;
    top: 145px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}

.otherMethods {
  margin-top: -110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .text {
    font-size: 16px;
    color: #03aefc;
  }
  .imgs img {
    cursor: pointer;
    margin: 10px 30px 30px 30px;
  }
}

/deep/ .el-card__body {
  padding: 0 !important;
}

/deep/ .el-input__inner {
  height: 40px;
  background-color: transparent;
  color: white;
}

/deep/ .el-checkbox {
  font-size: 14px;
  color: #07b1cf;
}
</style>