<template>
  <div class="app">
    <circle-menu ref="ccMenu" :menus="menus"></circle-menu>
  </div>
</template>

<script>
import tool from '../../../utils/tool'
import CircleMenu from './components/circleMenu.vue'
export default {
  name: 'navigator',
  components: {
    CircleMenu,
  },
  data() {
    return {
      menus: [
        {
          index: 0,
          name: '养殖系统',
          icon: 'nav_yangzhi',
          size: '',
          path: '/breeding/breedStatistics',
        },
        {
          index: 1,
          name: '屠宰系统',
          icon: 'nav_jiagong',
          size: '',
          path: '#',
        },
        {
          index: 2,
          name: '加工销售',
          icon: 'nav_jiagong',
          size: '',
          path: '#',
        },
        {
          index: 3,
          name: '物流管理',
          icon: 'nav_wuliu',
          size: '',
          path: '#',
        },
        {
          index: 4,
          name: '种鸽质量检测',
          icon: 'nav_ai',
          size: '',
          path: '#',
        },
        {
          index: 5,
          name: '溯源系统',
          icon: 'nav_block',
          size: '',
          path: '#',
        },

        {
          index: 6,
          name: '电商平台',
          icon: 'nav_jiagong',
          size: '',
          path: '#',
        },
        {
          index: 7,
          name: '可视化界面',
          icon: 'nav_see',
          size: '',
          path: '/dataVisual',
        },
        {
          index: 8,
          name: '设备/视频',
          icon: 'nav_video',
          size: '',
          path: '/equipVideo/videoManage',
        },
        {
          index: 9,
          name: 'AI平台',
          icon: 'nav_ai',
          size: '',
          path: '#',
        },
        {
          index: 10,
          name: '进销存管理',
          icon: 'nav_info',
          size: '',
          path: '#',
        },
        {
          index: 11,
          name: '基础信息管理',
          icon: 'nav_info',
          size: '',
          path: '#',
        },
      ],
    }
  },
  async created() {
    tool.data.set('IS_GET_ROUTER', false)
    tool.data.set('CURR_MENU_INDEX', 0)
    // 获取基本信息
    var homeInfRes = await this.$API.login.getHomeInf.get()
    console.log(homeInfRes, '000')
    if (homeInfRes.code == 200) {
      this.$TOOL.data.set('USER_INFO', homeInfRes.data.user)
    } else {
      this.$message.warning(homeInfRes.message)
      return false
    }
  },
}
</script>

<style scoped>
.app {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url(https://img.qkeep.cn/imgs/pigeon-Pro-nav.png) no-repeat center;
  background-size: cover;
  opacity: 0.8;
}
</style>
