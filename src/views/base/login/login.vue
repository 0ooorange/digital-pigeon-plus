<template>
  <div class="loginMain">
    <div class="loginContent">
      <h1 class="title">数字鸽业平台登录</h1>
      <div class="select">
        <el-button class="selectBtn selectBtn-active" type="text">密码登录</el-button>
        <el-button class="selectBtn" type="text">短信登录</el-button>
      </div>
      <div class="form">
        <div class="inlineForm">
          <span class="text">用户名：</span>
          <span class="input">
            <el-input v-model="username" placeholder="Please input" />
          </span>
        </div>
        <div class="inlineForm">
          <span class="text">密码：</span>
          <span class="input">
            <el-input v-model="password" type="password" placeholder="Please input password" show-password />
          </span>
        </div>
      </div>
      <el-button class="btn">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      // this.$router.replace({
      // 	path: '/navigator'
      // })
    },
  },
}
</script>

<style lang="less" scoped>
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
  transform: translate(0, -10%);
  background-color: rgba(255, 255, 255, 0);
  border: 0;
  .select {
    position: absolute;
    top: 70px;
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
    top: 150px;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    .inlineForm {
      display: flex;
      .text {
        font-size: 16px;
        line-height: 52px;
        color: #0adfef
      }
      .input {
        margin: 10px;
        display: inline-block;
        width: 280px;
      }
    }
  }
  .btn {
    position: absolute;
    top: 300px;
    width: 250px;
    background-color: #3599e6;
    border: 0;
    color: #d8f9fc;
  }
}

/deep/ .el-card__body {
  padding: 0 !important;
}

/deep/ .el-input__inner {
  background-color: transparent;
  box-shadow: 0 0 0 1px #34abdd inset;
  color: white;
}
</style>