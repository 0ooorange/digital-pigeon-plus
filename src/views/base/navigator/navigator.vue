<template>
  <div>
    <circle-menu :menus="menus"></circle-menu>
  </div>
</template>

<script>
  import circleMenu from '@/components/circleMenu/circleMenu.vue';
  export default {
    name: "navigator",
    components: {
      circleMenu
    },
    data() {
      return {
        menus: [
        {
          title: '物流管理',
          iconName: 'icon-a-ziyuan54',
          path: '/dashboard'
        },
        {
          title: 'AI平台',
          iconName: 'icon-a-ziyuan59',
          path: '/dashboard'
        },
        {
          title: '进销存管理',
          iconName: 'icon-a-ziyuan61',
          path: '/dashboard'
        },
        {
          title: '溯源系统',
          iconName: 'icon-a-ziyuan63',
          path: '/dashboard'
        },
        {
          title: '种鸽质量检测',
          iconName: 'icon-a-ziyuan68',
          path: '/dashboard'
        },
        {
          title: '加工销售',
          iconName: 'icon-a-ziyuan69',
          path: '/dashboard'
        },
        {
          title: '屠宰系统',
          iconName: 'icon-a-ziyuan54',
          path: '/dashboard'
        },
        {
          title: '养殖系统',
          iconName: 'icon-a-ziyuan59',
          path: '/dashboard'
        },
        {
          title: '可视化界面',
          iconName: 'icon-a-ziyuan61',
          path: '/dashboard'
        },
        {
          title: '视频监控中心',
          iconName: 'icon-a-ziyuan63',
          path: '/dashboard'
        },
        {
          title: '基础信息管理',
          iconName: 'icon-a-ziyuan68',
          path: '/dashboard'
        },
        {
          title: '电商平台',
          iconName: 'icon-a-ziyuan69',
          path: '/dashboard'
        },
      ]
      }
    },
  }
</script>

<style lang="sass" scoped>

</style>