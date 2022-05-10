<template>
  <div class="app">
    <circle-menu :menus="menus"></circle-menu>
  </div>
</template>

<script>
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
          index: 3,
          name: '养殖系统',
          icon: 'nav_yangzhi',
          size: '',
          path: '/breeding/breedStatistics',
        },
        {
          index: 4,
          name: '屠宰系统',
          icon: 'nav_jiagong',
          size: '',
          path: '#',
        },
        {
          index: 5,
          name: '加工销售',
          icon: 'nav_jiagong',
          size: '',
          path: '#',
        },
        {
          index: 1,
          name: '物流管理',
          icon: 'nav_wuliu',
          size: '',
          path: '#',
        },
        {
          index: 2,
          name: '种鸽质量检测',
          icon: 'nav_ai',
          size: '',
          path: '#',
        },
        {
          index: 0,
          name: '溯源系统',
          icon: 'nav_block',
          size: '',
          path: '#',
        },
        
        {
          index: 11,
          name: '电商平台',
          icon: 'nav_jiagong',
          size: '',
          path: '#',
        },
        {
          index: 6,
          name: '可视化界面',
          icon: 'nav_see',
          size: '',
          path: '#',
        },
        {
          index: 7,
          name: '设备/视频',
          icon: 'nav_video',
          size: '',
          path: '#',
        },
        {
          index: 8,
          name: 'AI平台',
          icon: 'nav_ai',
          size: '',
          path: '#',
        },
        {
          index: 9,
          name: '进销存管理',
          icon: 'nav_info',
          size: '',
          path: '#',
        },
        {
          index: 10,
          name: '基础信息管理',
          icon: 'nav_info',
          size: '',
          path: '#',
        },
      ],
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
