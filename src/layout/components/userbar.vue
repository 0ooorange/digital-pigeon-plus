<template>
  <div class="user-bar">
    <span>
      <showtime class="timeCss"></showtime>
    </span>
    <div class="screen panel-item hidden-sm-and-down" @click="refreshPage">
      <el-icon>
        <el-icon-refresh />
      </el-icon>
    </div>
    <div class="screen panel-item hidden-sm-and-down" @click="screen">
      <el-icon>
        <el-icon-full-screen />
      </el-icon>
    </div>
    <el-dropdown class="user panel-item" trigger="click" @command="handleUser">
      <div class="user-avatar">
        <el-avatar :size="30"><img :src="userAvatar"></el-avatar>
        <label>{{ userName }}</label>
        <el-icon class="el-icon--right">
          <el-icon-arrow-down />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item divided command="outLogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import showtime from '@/components/showtime/index.vue'
import tool from '@utils/tool'
export default {
  components: {
    showtime,
  },
  data() {
    return {
      userName: '',
      userNameF: '',
      userAvatar: '',
    }
  },
  created() {
    const userInfo = tool.data.get('USER_INFO')
    this.userName = userInfo.name
    this.userNameF = this.userName.substring(0, 1)
    this.userAvatar = userInfo.avatar
    // console.log('sssss', userInfo)
  },
  methods: {
    //个人信息
    handleUser(command) {
      if (command == 'uc') {
        this.$router.push({ path: '/usercenter' })
      }
      if (command == 'cmd') {
        this.$router.push({ path: '/cmd' })
      }
      if (command == 'clearCache') {
        this.$confirm(
          '清除缓存会将系统初始化，包括登录状态、主题、语言设置等，是否继续？',
          '提示',
          {
            type: 'info',
          }
        )
          .then(() => {
            const loading = this.$loading()
            this.$TOOL.data.clear()
            this.$router.replace({ path: '/login' })
            setTimeout(() => {
              loading.close()
              location.reload()
            }, 1000)
          })
          .catch(() => {
            //取消
          })
      }
      if (command == 'outLogin') {
        this.$confirm('确认是否退出当前用户？', '提示', {
          type: 'warning',
          confirmButtonText: '退出',
          confirmButtonClass: 'el-button--danger',
        })
          .then(() => {
            this.$router.replace({ path: '/login' })
          })
          .catch(() => {
            //取消退出
          })
      }
    },
    //全屏
    screen() {
      var element = document.documentElement
      this.$TOOL.screen(element)
    },
    // 刷新页面
    refreshPage() {
      location.reload()
    },
  },
}
</script>

<style scoped>
.user-bar {
  display: flex;
  align-items: center;
  height: 100%;
}
.user-bar .panel-item {
  padding: 0 10px;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
}
.user-bar .panel-item i {
  font-size: 16px;
}
.user-bar .panel-item:hover {
  background: rgba(0, 0, 0, 0.1);
}
.user-bar .user-avatar {
  height: 49px;
  display: flex;
  align-items: center;
}
.user-bar .user-avatar label {
  display: inline-block;
  margin-left: 5px;
  font-size: 12px;
  cursor: pointer;
}
.timeCss {
  display: block;
  margin: 0;
  width: 200px;
  height: 58px;
  line-height: 58px;
  font-size: 12px;
}
@media (max-width: 992px) {
  .timeCss {
    display: none;
  }
}
</style>
