<template>
  <div class="app">
    <span class="rightTop"><span>{{userName}}，欢迎您！</span>
      <router-link to="/login">注销</router-link>
    </span>
    <circle-menu ref="ccMenu" :menus="menus"></circle-menu>
  </div>
</template>

<script>
import { ref } from 'vue'
import tool from '../../../utils/tool'
import CircleMenu from './components/circleMenu.vue'
import { ElMessage } from 'element-plus'
import { getPersonalInfo, getUserMenu } from '@api/bases/login'

const allMenus = [
  {
    id: 67,
    name: '环境监控',
    system: 'equipVideo',
    icon: 'nav_video',
    size: '',
    path: '/equipVideo/envForecast'
  },
  {
    id: '11',
    name: '产品溯源',
    system: 'toSource',
    icon: 'nav_block',
    size: '',
    path: '/toSource/traceSource'
  },
  {
    id: '10',
    name: '屠宰系统',
    icon: 'nav_jiagong',
    size: '',
    path: '#'
  },
  {
    id: '9',
    name: '加工销售',
    icon: 'nav_jiagong',
    size: '',
    path: '#'
  },
  {
    id: '8',
    name: '物流管理',
    icon: 'nav_wuliu',
    size: '',
    path: '#'
  },
  {
    id: '7',
    name: '种鸽质量检测',
    icon: 'nav_ai',
    size: '',
    path: '#'
  },

  {
    id: '6',
    name: '电商平台',
    icon: 'nav_jiagong',
    size: '',
    path: '#'
  },
  {
    id: '5',
    name: '基础信息管理',
    icon: 'nav_info',
    system: 'baseInfoMana',
    size: '',
    path: '/baseInfoMana/personalInfo'
  },
  {
    id: '4',
    name: '认养管理',
    icon: 'nav_info',
    size: '',
    path: '#'
  },
  {
    id: '3',
    name: 'AI+精准管控',
    system: 'AIControl',
    icon: 'nav_ai',
    size: '',
    path: '/AIControl/actRcognition/clear'
  },
  {
    id: '2',
    name: '可视化界面',
    icon: 'nav_see',
    size: '',
    path: '/dataVisual'
  },
  {
    id: '1',
    name: '养殖系统',
    system: 'breeding',
    icon: 'nav_yangzhi',
    size: '',
    path: '/breeding/breedStatistics'
  }
]

export default {
  name: 'navigator',
  components: { CircleMenu },
  setup() {
    tool.data.set('IS_GET_ROUTER', false)
    tool.data.set('CURR_MENU_INDEX', 0)
    const menus = ref(tool.data.get('CIRCLE_MENU') || allMenus)
    // 获取基本信息
    getPersonalInfo().then(
      (res) => {
        tool.data.set('USER_INFO', res.data?.user)
      },
      (err) => {
        ElMessage.warning(err.message)
      }
    )
    // 获取菜单（不同用户不同菜单）
    getUserMenu().then((res) => {
      const authMenu = res.data?.value?.children || []
      // 存一下映射
      const idMapMenuItem = {}
      for (const item of authMenu) {
        idMapMenuItem[item.id] = item
      }
      // 后端返回的数据合并到总的菜单
      menus.value = allMenus
        .map((item) => {
          const { id } = item
          const authItem = idMapMenuItem[id]
          if (!authItem) {
            return item
          }
          delete authItem.icon
          return {
            ...item,
            ...authItem,
            auth: !!authItem.children.length
          }
        })
        .sort((a, b) => a.sort - b.sort)

      tool.data.set('CIRCLE_MENU', menus.value)
    })

    return {
      menus
    }
  }
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
