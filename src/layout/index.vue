<template>
  <!-- 经典布局 -->
  <template v-if="layout=='menu'">
    <header>
      <el-row class="adminui-header">
        <el-col :span="firstSpan">
          <div :class="menuIsCollapse?'panel-item adminui-header-left beCenter':'panel-item adminui-header-left'" @click="toNavigator">
            <div class="logo-bar">
              <img class="logo" :src="smallLogo">
              <span class="isShowText" v-if="!menuIsCollapse">{{ $CONFIG.APP_NAME }}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="secondSpan" style="display:flex; ">
          <div class="selectDivs">
            <span class="selectText">基地：</span>
            <el-select style="width: 150px" v-model="currBase" class="m-2" placeholder="Select">
              <el-option v-for="item in bases" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <span class="selectText">鸽棚：</span>
            <el-select style="width: 150px" v-model="currDovecote" class="m-2" placeholder="Select">
              <el-option v-for="item in dovecotes" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="thirdSpan" class="userbarCss">
          <userbar></userbar>
        </el-col>
      </el-row>
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
      <!-- sideM 移动端菜单 -->
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
import smallLogo from '../assets/images/logo-2.png'


export default {
  name: 'index',
  components: {
    SideM,
    Topbar,
    NavMenu,
    userbar,
    iframeView,
  },
  props: {
    bases: {
      type: Array,
      require: true,
      default() {
        return [
          {
            value: '梅州市金绿现代农业发展有限公司鸡公桥村基地',
            label: '梅州市金绿现代农业发展有限公司鸡公桥村基地',
          },
          {
            value: '大坪镇兰塘村农户潘忠琴',
            label: '大坪镇兰塘村农户潘忠琴',
          },
          {
            value: '梅州市金绿集团羊岭村基地',
            label: '梅州市金绿集团羊岭村基地',
          },
          {
            value: '金绿集团基地',
            label: '金绿集团基地',
          },
          {
            value: '小村庄加工厂',
            label: '小村庄加工厂',
          },
        ]
      },
    },
    dovecotes: {
      type: Array,
      require: true,
      default() {
        return [
          {
            value: 'A1仓',
            label: 'A1仓',
          },
          {
            value: 'A2仓',
            label: 'A2仓',
          },
          {
            value: 'B1仓',
            label: 'B1仓',
          },
          {
            value: 'B2仓',
            label: 'B2仓',
          },
          {
            value: 'C1仓',
            label: 'C1仓',
          },
        ]
      },
    },
  },
  data() {
    return {
      smallLogo: smallLogo,
      settingDialog: false,
      currBase: '小村庄加工厂',
      currDovecote: 'A2仓',
      menu: [
        {
          name: 'bsBreedingStatistics',
          path: '/breedingSystem/breedingStatistics',
          meta: {
            title: '养殖统计',
            icon: 'el-icon-histogram',
            type: 'menu',
          },
          component: 'breedingSystem/breedingStatistics',
        },
        {
          name: 'bsAuxiliary',
          path: '/breedingSystem/auxiliary',
          meta: {
            title: '养殖辅助',
            icon: 'el-icon-connection',
            type: 'menu',
          },
          children: [
            {
              path: '/breedingSystem/auxiliary/extractAndIncubate',
              name: 'ExtractAndIncubateAuxiliary',
              meta: {
                title: '抽孵辅助',
                icon: 'el-icon-office-building',
                type: 'menu',
              },
              component: 'breedingSystem/auxiliary/extractAndIncubate',
            },
            {
              path: '/breedingSystem/auxiliary/axlyExamEgg',
              name: 'examineEggAuxiliary',
              meta: {
                title: '查蛋辅助',
                icon: 'el-icon-office-building',
                type: 'menu',
              },
              component: 'breedingSystem/auxiliary/axlyExamEgg',
            },
            {
              path: '/breedingSystem/auxiliary/axlyExamCub',
              name: 'examineCubAuxiliary',
              meta: {
                title: '查仔辅助',
                icon: 'el-icon-office-building',
                type: 'menu',
              },
              component: 'breedingSystem/auxiliary/axlyExamCub',
            },
            {
              path: '/breedingSystem/auxiliary/axlyOutCage',
              name: 'outCageAuxiliary',
              meta: {
                title: '出栏辅助',
                icon: 'el-icon-office-building',
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
            icon: 'el-icon-calendar',
            type: 'menu',
          },
          children: [
            {
              path: '/breedingSystem/bsManage/layEggs',
              name: 'layEggsManage',
              meta: {
                title: '产蛋',
                icon: 'el-icon-office-building',
                type: 'menu',
              },
              component: 'breedingSystem/bsManage/layEggs',
            },
            {
              path: '/breedingSystem/bsManage/manageExamEgg',
              name: 'examineEggManage',
              meta: {
                title: '查蛋',
                icon: 'el-icon-office-building',
                type: 'menu',
              },
              component: 'breedingSystem/bsManage/manageExamEgg',
            },
            {
              path: '/breedingSystem/bsManage/manageExamCub',
              name: 'examineCubManage',
              meta: {
                title: '查仔',
                icon: 'el-icon-office-building',
                type: 'menu',
              },
              component: 'breedingSystem/bsManage/manageExamCub',
            },
            {
              path: '/breedingSystem/bsManage/abnormalCase',
              name: 'abnormalCaseManage',
              meta: {
                title: '异常情况',
                icon: 'el-icon-office-building',
                type: 'menu',
              },
              component: 'breedingSystem/bsManage/abnormalCase',
            },
            {
              path: '/breedingSystem/bsManage/reEggs',
              name: 'reEggsManage',
              meta: {
                title: '回蛋',
                icon: 'el-icon-office-building',
                type: 'menu',
              },
              component: 'breedingSystem/bsManage/reEggs',
            },
            {
              path: '/breedingSystem/bsManage/allState',
              name: 'allStateManage',
              meta: {
                title: '鸽笼状态总览',
                icon: 'el-icon-office-building',
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
            icon: 'el-icon-compass',
            type: 'menu',
          },
          component: 'breedingSystem/dovePerformance',
        },
        {
          name: 'materialStatistics',
          path: '/breedingSystem/materialStatistics',
          meta: {
            title: '物料统计',
            icon: 'el-icon-data-line',
            type: 'menu',
          },
          children: [
            {
              path: '/breedingSystem/materialStatistics/fodder',
              name: 'fodderStatistics',
              meta: {
                title: '饲料',
                icon: 'el-icon-office-building',
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
      thirdSpan: 8
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
    firstSpan() {
      return this.$store.state.global.menuIsCollapse ? 1 : 4
    },
    secondSpan() {
      return this.$store.state.global.menuIsCollapse ? 15 : 12
    }
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
    // 返回导航页
    toNavigator() {
      this.$router.replace({
        path: '/navigator',
      })
    },
  },
}
</script>

<style scoped>
.adminui-header .panel-item {
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
}
.adminui-header .panel-item:hover {
  background: rgba(255, 255, 255, 0.1);
}
.selectDivs {
  display: flex;
  align-items: center;
}
.selectText {
  margin-left: 10px;
}
.userbarCss {
  display: flex;
  justify-content: flex-end;
}
.beCenter {
  justify-content: center;
}
</style>