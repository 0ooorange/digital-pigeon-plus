<template>
  <div class="app">
    <span class="rightTop"><span>刘双印，欢迎您！</span>
      <router-link to="/login">注销</router-link>
    </span>
    <circle-menu ref="ccMenu" :menus="menus"></circle-menu>
  </div>
</template>

<script>
import tool from '../../../utils/tool'
import CircleMenu from './components/circleMenu.vue'
import { ElMessage } from 'element-plus'
import { getPersonalInfo } from '@api/bases/login'

export default {
  name: 'navigator',
  components: { CircleMenu },
  setup() {
    const menus = [
      {
        index: 0,
        name: '养殖系统',
        system: 'breeding',
        icon: 'nav_yangzhi',
        size: '',
        path: '/breeding/breedStatistics',
      },

      {
        index: 1,
        name: '环境监控',
        system: 'equipVideo',
        icon: 'nav_video',
        size: '',
        path: '/equipVideo/envForecast',
      },
      {
        index: 2,
        name: '产品溯源',
        system: 'toSource',
        icon: 'nav_block',
        size: '',
        path: '/toSource/traceSource',
      },
      {
        index: 3,
        name: '屠宰系统',
        icon: 'nav_jiagong',
        size: '',
        path: '#',
      },
      {
        index: 4,
        name: '加工销售',
        icon: 'nav_jiagong',
        size: '',
        path: '#',
      },
      {
        index: 5,
        name: '物流管理',
        icon: 'nav_wuliu',
        size: '',
        path: '#',
      },
      {
        index: 6,
        name: '种鸽质量检测',
        icon: 'nav_ai',
        size: '',
        path: '#',
      },

      {
        index: 7,
        name: '电商平台',
        icon: 'nav_jiagong',
        size: '',
        path: '#',
      },
      {
        index: 8,
        name: '基础信息管理',
        icon: 'nav_info',
        system: 'baseInfoMana',
        size: '',
        path: '/baseInfoMana/personalInfo',
      },
      {
        index: 9,
        name: '认养管理',
        icon: 'nav_info',
        size: '',
        path: '#',
      },
      {
        index: 10,
        name: 'AI+精准管控',
        system: 'AIControl',
        icon: 'nav_ai',
        size: '',
        path: '/AIControl/actRcognition/clear',
      },
      {
        index: 11,
        name: '可视化界面',
        icon: 'nav_see',
        size: '',
        path: '/dataVisual',
      },
    ]
    tool.data.set('IS_GET_ROUTER', false)
    tool.data.set('CURR_MENU_INDEX', 0)
    // 获取基本信息
    getPersonalInfo().then(res => {
        tool.data.set('USER_INFO', res.data?.user)
      }, err => {
        ElMessage.warning(err.message)
      }
    )

    return {
      menus,
    }
  },
}
</script>

<style lang="less" scoped>
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
.rightTop {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 16px;
  color: white;
  span {
    margin-right: 15px;
  }
  a {
    color: #03aefc;
  }
}
</style>
