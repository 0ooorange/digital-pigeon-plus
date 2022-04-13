<template>
  <div class="loginMain">
    <div class="loginContent">
      <h1 class="title">数字鸽业平台登录</h1>
      <div class="select">
        <el-button id="pswMethod" class="selectBtn selectBtn-active" type="text" @click="loginByPsw">密码登录</el-button>
        <el-button id="messMethod" class="selectBtn" type="text" @click="loginByMess">短信登录</el-button>
      </div>
      <div class="form" v-if="loginMethod === 0">
        <div class="inlineForm">
          <span class="text">手机号：</span>
          <span class="input">
            <el-input v-model="moblePhoneScrt" placeholder="请输入手机号码" />
          </span>
        </div>
        <span id="moblePhoneScrtId" class="phoneVerify" style="display: none;">请输入正确的手机号码格式</span>
        <div class="inlineForm">
          <span class="text">密码：</span>
          <span class="input">
            <el-input v-model="password" type="password" placeholder="请填写密码" show-password />
          </span>
        </div>
        <span class="secretVerify" style="display: none;">密码错误</span>
        <drag-verify style="margin-top: 30px;"></drag-verify>
      </div>
      <div class="form" v-if="loginMethod === 1">
        <div class="inlineForm">
          <span class="text">手机号：</span>
          <span class="input">
            <el-input v-model="moblePhoneMess" placeholder="请输入手机号码" />
          </span>
        </div>
        <span id="moblePhoneMessId" class="phoneVerify" style="display: none;">请输入正确的手机号码格式</span>
        <div class="inlineForm">
          <span class="text">验证码：</span>
          <span class="input verifyInput">
            <el-input v-model="verify" placeholder="请输入验证码" />
          </span>
          <button class="verifyBtn">获取验证码</button>
        </div>
        <span class="secretVerify" style="display: none;">验证码错误</span>
        <drag-verify style="margin-top: 30px;"></drag-verify>
      </div>
      <div class="turnToOther" v-if="loginMethod === 0">
        <el-checkbox class="rememberSecret" v-model="rememberSecret" label="记住密码" size="large" />
        <span class="forgetSecret">忘记密码</span>
      </div>
      <el-button class="btn" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import dragVerify from '@/components/loginCpn/dragVerify.vue'
export default {
  components: {
    dragVerify,
  },
  data() {
    return {
      username: '',
      password: '',
      loginMethod: 0,
      moblePhoneScrt: '',
      moblePhoneMess: '',
      verify: '',
      ismoblePhone: true,
      rememberSecret: false,
    }
  },
  watch: {
    moblePhoneScrt(newMoblePhone) {
      var moblePhoneScrtId = document.getElementById('moblePhoneScrtId')
      var moblePhoneReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (moblePhoneReg.test(newMoblePhone)) {
        moblePhoneScrtId.style.display = 'none'
      } else {
        moblePhoneScrtId.style.display = 'block'
      }
    },
    moblePhoneMess(newMoblePhone) {
      var moblePhoneMessId = document.getElementById('moblePhoneMessId')
      var moblePhoneReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (moblePhoneReg.test(newMoblePhone)) {
        moblePhoneMessId.style.display = 'none'
      } else {
        moblePhoneMessId.style.display = 'block'
      }
    },
  },
  // el-button el-button--text el-button--default selectBtn selectBtn-active
  methods: {
    loginByPsw() {
      document.getElementById('pswMethod').className =
        'el-button el-button--text el-button--default selectBtn selectBtn-active'
      document.getElementById('messMethod').className =
        'el-button el-button--text el-button--default selectBtn'
      this.loginMethod = 0
    },
    loginByMess() {
      document.getElementById('messMethod').className =
        'el-button el-button--text el-button--default selectBtn selectBtn-active'
      document.getElementById('pswMethod').className =
        'el-button el-button--text el-button--default selectBtn'
      this.loginMethod = 1
    },
    login() {
      this.$router.replace({
      	path: '/navigator'
      })
    },
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
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: url(../../../../public/img/loginBgImg.png) no-repeat center top;
  background-size: 100%;
  /* background-attachment: fixed; */
}

.loginContent {
  position: relative;
  display: flex;
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
    align-items: flex-end;
    flex-direction: column;
    .inlineForm {
      display: flex;
      .text {
        font-size: 16px;
        line-height: 58px;
        color: #0adfef;
      }
      .input {
        margin: 10px 0 10px 10px;
        display: inline-block;
        width: 280px;
      }
      .verifyInput {
        width: 180px;
      }
      .verifyBtn {
        margin: 10px 0 10px 1px;
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
      position: relative;
      left: 80px;
      margin: -6px 0;
      display: inline-block;
      align-self: flex-start;
      height: 12px;
      font-size: 12px;
      line-height: 12px;
      color: #f5514c;
    }
  }
  .btn {
    position: absolute;
    top: 350px;
    height: 40px;
    width: 300px;
    font-size: 16px;
    background-color: #03aefc;
    border: 0;
    color: #d8f9fc;
  }
}

.turnToOther {
  .rememberSecret {
    position: absolute;
    top: 255px;
    left: 80px;
  }
  .forgetSecret {
    position: absolute;
    top: 255px;
    right: 80px;
    cursor: pointer;
    line-height: 40px;
    font-size: 14px;
    color: #07b1cf;
  }
}

/deep/ .el-card__body {
  padding: 0 !important;
}

/deep/ .el-input__inner {
  height: 40px;
  background-color: transparent;
  box-shadow: 0 0 0 1px #34abdd inset;
  color: white;
}

/deep/ .el-checkbox {
  font-size: 14px;
  color: #07b1cf;
}
</style>