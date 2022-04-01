<template>
  <div class="app">
    <circle-menu :menus="menus"></circle-menu>
  </div>
</template>

<script>
import CircleMenu from '@/components/circleMenu/CircleMenu.vue';
export default {
  name: "navigator",
  components: {
    CircleMenu
  },
  data () {
    return {
      menus: [
        {
          name: "养殖系统",
          path: "/123",
          iconClass: 'devo'
        },
        {
          name: "屠宰系统",
          path: "/123",
        },
        {
          name: "加工销售",
          path: "/123",
        },
        {
          name: "种鸽质量检测",
          path: "/123",
        },
        {
          name: "溯源系统",
          path: "/123",
        },
        {
          name: "进销存管理",
          path: "/123",
        },
        {
          name: "AI平台",
          path: "/123",
        },
        {
          name: "物流管理",
          path: "/123",
        },
        {
          name: "电商平台",
          path: "/123",
        },
        {
          name: "基础信息管理",
          path: "/123",
        },
        {
          name: "视频监控中心",
          path: "/123",
        },
        {
          name: "可视化界面",
          path: "/123",
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