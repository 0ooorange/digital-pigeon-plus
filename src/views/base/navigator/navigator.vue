<template>
  <div class="app">
    <circle-menu :menus="menus"></circle-menu>
  </div>
</template>

<script>
import CircleMenu from '@/components/circleMenu/circleMenu.vue';
export default {
  name: "navigator",
  components: {
    CircleMenu
  },
  data () {
    return {
      menus: [
        {
          name: '物流管理',
          iconName: 'icon-a-ziyuan54',
          path: '#'
        },
        {
          name: 'AI平台',
          iconName: 'icon-a-ziyuan59',
          path: '#'
        },
        {
          name: '进销存管理',
          iconName: 'icon-a-ziyuan61',
          path: '#'
        },
        {
          name: '溯源系统',
          iconName: 'icon-a-ziyuan63',
          path: '#'
        },
        {
          name: '种鸽质量检测',
          iconName: 'icon-a-ziyuan68',
          path: '#'
        },
        {
          name: '加工销售',
          iconName: 'icon-a-ziyuan69',
          path: '#'
        },
        {
          name: '屠宰系统',
          iconName: 'icon-a-ziyuan54',
          path: '#'
        },
        {
          name: '养殖系统',
          iconName: 'icon-a-ziyuan59',
          path: '/breedingSystem/breedingStatistics'
        },
        {
          name: '可视化界面',
          iconName: 'icon-a-ziyuan61',
          path: '#'
        },
        {
          name: '视频监控中心',
          iconName: 'icon-a-ziyuan63',
          path: '#'
        },
        {
          name: '基础信息管理',
          iconName: 'icon-a-ziyuan68',
          path: '#'
        },
        {
          name: '电商平台',
          iconName: 'icon-a-ziyuan69',
          path: '#'
        },

      ],
    }
  },
}
</script>

<style  scoped>
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