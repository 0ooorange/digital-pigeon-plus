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
          title: '物流管理',
          iconName: 'icon-a-ziyuan54',
          path: '/breedingSystem/breedingStatistics'
        },
        {
          title: 'AI平台',
          iconName: 'icon-a-ziyuan59',
          path: '/breedingSystem/breedingStatistics'
        },
        {
          title: '进销存管理',
          iconName: 'icon-a-ziyuan61',
          path: '/breedingSystem/breedingStatistics'
        },
        {
          title: '溯源系统',
          iconName: 'icon-a-ziyuan63',
          path: '/breedingSystem/breedingStatistics'
        },
        {
          title: '种鸽质量检测',
          iconName: 'icon-a-ziyuan68',
          path: '/breedingSystem/breedingStatistics'
        },
        {
          title: '加工销售',
          iconName: 'icon-a-ziyuan69',
          path: '/breedingSystem/breedingStatistics'
        },
        {
          title: '屠宰系统',
          iconName: 'icon-a-ziyuan54',
          path: '/breedingSystem/breedingStatistics'
        },
        {
          title: '养殖系统',
          iconName: 'icon-a-ziyuan59',
          path: '/breedingSystem/breedingStatistics'
        },
        {
          title: '可视化界面',
          iconName: 'icon-a-ziyuan61',
          path: '/breedingSystem/breedingStatistics'
        },
        {
          title: '视频监控中心',
          iconName: 'icon-a-ziyuan63',
          path: '/breedingSystem/breedingStatistics'
        },
        {
          title: '基础信息管理',
          iconName: 'icon-a-ziyuan68',
          path: '/breedingSystem/breedingStatistics'
        },
        {
          title: '电商平台',
          iconName: 'icon-a-ziyuan69',
          path: '/breedingSystem/breedingStatistics'
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