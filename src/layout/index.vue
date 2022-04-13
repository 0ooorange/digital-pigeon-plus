<template>
  <!-- 经典布局 -->
  <template v-if="layout=='menu'">
    <header class="adminui-header">
      <div class="adminui-header-left">
        <div class="logo-bar">
          <img class="logo" src="img/logo.png">
          <span>{{ $CONFIG.APP_NAME }}</span>
        </div>
      </div>
      <div class="adminui-header-right">
        <userbar></userbar>
      </div>
    </header>
    <section class="aminui-wrapper">
      <div v-if="!ismobile" :class="menuIsCollapse?'aminui-side isCollapse':'aminui-side'">
        <div class="adminui-side-scroll">
          <el-scrollbar>
            <el-menu :default-active="active" router :collapse="menuIsCollapse" :unique-opened="$CONFIG.MENU_UNIQUE_OPENED">
              <NavMenu :navMenus="menu"></NavMenu>
            </el-menu>
          </el-scrollbar>
        </div>
        <div class="adminui-side-bottom" @click="$store.commit('TOGGLE_menuIsCollapse')">
          <el-icon>
            <el-icon-expand v-if="menuIsCollapse" />
            <el-icon-fold v-else />
          </el-icon>
        </div>
      </div>
      <Side-m v-if="ismobile"></Side-m>
      <div class="aminui-body el-container">
        <Topbar v-if="!ismobile"></Topbar>
        <div class="adminui-main" id="adminui-main">
          <router-view v-slot="{ Component }">
            <keep-alive :include="this.$store.state.keepAlive.keepLiveRoute">
              <component :is="Component" :key="$route.fullPath" v-if="$store.state.keepAlive.routeShow" />
            </keep-alive>
          </router-view>
          <iframe-view></iframe-view>
        </div>
      </div>
    </section>
  </template>

  <div class="main-maximize-exit" @click="exitMaximize">
    <el-icon>
      <el-icon-close />
    </el-icon>
  </div>
</template>

<script>
import SideM from './components/sideM.vue'
import Topbar from './components/topbar.vue'
import NavMenu from './components/NavMenu.vue'
import userbar from './components/userbar.vue'
import iframeView from './components/iframeView.vue'

export default {
  name: 'index',
  components: {
    SideM,
    Topbar,
    NavMenu,
    userbar,
    iframeView,
  },
  data() {
    return {
      settingDialog: false,
      menu: [
        {
          name: 'bsBreedingStatistics',
          path: '/breedingSystem/breedingStatistics',
          meta: {
            title: '养殖统计',
            icon: 'el-icon-info-filled',
            type: 'menu',
          },
          component: 'breedingSystem/breedingStatistics',
        },
        {
          name: 'bsAuxiliary',
          path: '/breedingSystem/auxiliary',
          meta: {
            title: '养殖辅助',
            icon: 'el-icon-info-filled',
            type: 'menu',
          },
          children: [
            {
              path: '/breedingSystem/auxiliary/extractAndIncubate',
              name: 'ExtractAndIncubateAuxiliary',
              meta: {
                title: '抽孵辅助',
                type: 'menu',
              },
              component: 'breedingSystem/auxiliary/extractAndIncubate',
            },
            {
              path: '/breedingSystem/auxiliary/axlyExamEgg',
              name: 'examineEggAuxiliary',
              meta: {
                title: '查蛋辅助',
                type: 'menu',
              },
              component: 'breedingSystem/auxiliary/axlyExamEgg',
            },
            {
              path: '/breedingSystem/auxiliary/axlyExamCub',
              name: 'examineCubAuxiliary',
              meta: {
                title: '查仔辅助',
                type: 'menu',
              },
              component: 'breedingSystem/auxiliary/axlyExamCub',
            },
            {
              path: '/breedingSystem/auxiliary/axlyOutCage',
              name: 'outCageAuxiliary',
              meta: {
                title: '出栏辅助',
                type: 'menu',
              },
              component: 'breedingSystem/auxiliary/axlyOutCage',
            },
          ],
        },
        {
          name: 'bsManage',
          path: '/breedingSystem/bsManage',
          meta: {
            title: '养殖管理',
            icon: 'el-icon-info-filled',
            type: 'menu',
          },
          children: [
            {
              path: '/breedingSystem/bsManage/layEggs',
              name: 'layEggsManage',
              meta: {
                title: '产蛋',
                type: 'menu',
              },
              component: 'breedingSystem/bsManage/layEggs',
            },
            {
              path: '/breedingSystem/bsManage/manageExamEgg',
              name: 'examineEggManage',
              meta: {
                title: '查蛋',
                type: 'menu',
              },
              component: 'breedingSystem/bsManage/manageExamEgg',
            },
            {
              path: '/breedingSystem/bsManage/manageExamCub',
              name: 'examineCubManage',
              meta: {
                title: '查仔',
                type: 'menu',
              },
              component: 'breedingSystem/bsManage/manageExamCub',
            },
            {
              path: '/breedingSystem/bsManage/abnormalCase',
              name: 'abnormalCaseManage',
              meta: {
                title: '异常情况',
                type: 'menu',
              },
              component: 'breedingSystem/bsManage/abnormalCase',
            },
            {
              path: '/breedingSystem/bsManage/reEggs',
              name: 'reEggsManage',
              meta: {
                title: '回蛋',
                type: 'menu',
              },
              component: 'breedingSystem/bsManage/reEggs',
            },
            {
              path: '/breedingSystem/bsManage/allState',
              name: 'allStateManage',
              meta: {
                title: '鸽笼状态总览',
                type: 'menu',
              },
              component: 'breedingSystem/bsManage/allState',
            },
          ],
        },
        {
          name: 'dovePerformance',
          path: '/breedingSystem/dovePerformance',
          meta: {
            title: '种鸽性能测试',
            icon: 'el-icon-info-filled',
            type: 'menu',
          },
          component: 'breedingSystem/dovePerformance',
        },
        {
          name: 'materialStatistics',
          path: '/breedingSystem/materialStatistics',
          meta: {
            title: '物料统计',
            icon: 'el-icon-info-filled',
            type: 'menu',
          },
          children: [
            {
              path: '/breedingSystem/materialStatistics/fodder',
              name: 'fodderStatistics',
              meta: {
                title: '饲料',
                type: 'menu',
              },
              component: 'breedingSystem/materialStatistics/fodder',
            },
          ],
        },
      ],
      nextMenu: [],
      pmenu: {},
      active: '',
    }
  },
  computed: {
    ismobile() {
      return this.$store.state.global.ismobile
    },
    layout() {
      return this.$store.state.global.layout
    },
    layoutTags() {
      return this.$store.state.global.layoutTags
    },
    menuIsCollapse() {
      return this.$store.state.global.menuIsCollapse
    },
  },
  created() {
    this.onLayoutResize()
    window.addEventListener('resize', this.onLayoutResize)
    // var menu = this.$router.sc_getMenu()
		var menu = this.menu
    this.menu = this.filterUrl(menu)
    this.showThis()
  },
  watch: {
    $route() {
      this.showThis()
    },
    layout: {
      handler(val) {
        document.body.setAttribute('data-layout', val)
      },
      immediate: true,
    },
  },
  methods: {
    openSetting() {
      this.settingDialog = true
    },
    onLayoutResize() {
      this.$store.commit('SET_ismobile', document.body.clientWidth < 992)
    },
    //路由监听高亮
    showThis() {
      this.pmenu = this.$route.meta.breadcrumb ? this.$route.meta.breadcrumb[0] : {}
      this.nextMenu = this.filterUrl(this.pmenu.children)
      this.$nextTick(() => {
        this.active = this.$route.meta.active || this.$route.fullPath
      })
    },
    //点击显示
    showMenu(route) {
      this.pmenu = route
      this.nextMenu = this.filterUrl(route.children)
      if ((!route.children || route.children.length == 0) && route.component) {
        this.$router.push({ path: route.path })
      }
    },
    //转换外部链接的路由
    filterUrl(map) {
      var newMap = []
      map &&
        map.forEach((item) => {
          item.meta = item.meta ? item.meta : {}
          //处理隐藏
          if (item.meta.hidden) {
            return false
          }
          //处理http
          if (item.meta.type == 'iframe') {
            item.path = `/i/${item.name}`
          }
          //递归循环
          if (item.children && item.children.length > 0) {
            item.children = this.filterUrl(item.children)
          }
          newMap.push(item)
        })
      return newMap
    },
    //退出最大化
    exitMaximize() {
      document.getElementById('app').classList.remove('main-maximize')
    },
  },
}
</script>
