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
            <el-select style="width: 150px" v-model="currBase.name" class="m-2" placeholder="Select" @change="currBaseChange">
              <el-option v-for="item in bases" :key="item.id" :label="item.name" :value="item.name" />
            </el-select>
            <span class="selectText">鸽棚：</span>
            <el-select style="width: 150px" v-model="currShed.code" class="m-2" placeholder="Select" @change="currShedChange">
              <el-option v-for="item in dovecotes" :key="item.id" :label="item.code" :value="item.code" />
            </el-select>
            <span class="selectText">操作员：<span class="operatorCss">{{currOperator}}</span></span>
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
import tool from "../utils/tool";
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
  props: {},
  data() {
    return {
      smallLogo: smallLogo,
      settingDialog: false,
      currBase: {},
      currShed: {},
      currOperator: '',
      bases: [],
      dovecotes: [],
      menu: [],
      nextMenu: [],
      pmenu: {},
      active: '',
      thirdSpan: 8,
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
    },
  },
  created() {
    this.menu = [
			{
				menuIndex: 0,
				systemName: "breeding",
				menus: [
					{
						name: "breedStatistics",
						path: "/breeding/breedStatistics",
						meta: {
							title: "养殖统计",
							icon: "el-icon-histogram",
							type: "menu",
						},
						component: "breeding/breedStatistics/index",
					},
					{
						name: "breedingAuxiliary",
						path: "/breeding/auxiliary",
						meta: {
							title: "养殖辅助",
							icon: "el-icon-connection",
							type: "menu",
						},
						children: [
							{
								path: "/breeding/auxiliary/incubate",
								name: "incubateAuxiliary",
								meta: {
									title: "抽孵辅助",
									icon: "el-icon-office-building",
									type: "menu",
								},
								component: "breeding/auxiliary/incubate/index",
							},
							{
								path: "/breeding/auxiliary/examEgg",
								name: "examEggAuxiliary",
								meta: {
									title: "查蛋辅助",
									icon: "el-icon-office-building",
									type: "menu",
								},
								component: "breeding/auxiliary/examEgg/index",
							},
							{
								path: "/breeding/auxiliary/examCub",
								name: "examCubAuxiliary",
								meta: {
									title: "查仔辅助",
									icon: "el-icon-office-building",
									type: "menu",
								},
								component: "breeding/auxiliary/examCub/index",
							},
							{
								path: "/breeding/auxiliary/outCage",
								name: "outCageAuxiliary",
								meta: {
									title: "出栏辅助",
									icon: "el-icon-office-building",
									type: "menu",
								},
								component: "breeding/auxiliary/outCage/index",
							},
						],
					},
					{
						name: "breedingManage",
						path: "/breeding/manage",
						meta: {
							title: "养殖管理",
							icon: "el-icon-calendar",
							type: "menu",
						},
						children: [
							{
								path: "/breeding/manage/detail",
								name: "breedingDetail",
								meta: {
									title: "养殖明细",
									icon: "el-icon-office-building",
									type: "menu",
								},
								component: "breeding/manage/detail/index",
							},
							{
								path: "/breeding/manage/allState",
								name: "allStateManage",
								meta: {
									title: "鸽棚总览",
									icon: "el-icon-office-building",
									type: "menu",
								},
								component: "breeding/manage/allState/index",
							},
						],
					},
					{
						name: "dovePerformance",
						path: "/breeding/performance",
						meta: {
							title: "种鸽性能测试",
							icon: "el-icon-compass",
							type: "menu",
						},
						component: "breeding/performance/index",
					},
					{
						name: "operateLog",
						path: "/breeding/operateLog",
						meta: {
							title: "操作日志和统计",
							icon: "el-icon-document",
							type: "menu",
						},
						component: "breeding/operateLog/index",
					},
					{
						name: "materialStatistics",
						path: "/breeding/materialStatistics",
						meta: {
							title: "物料统计",
							icon: "el-icon-data-line",
							type: "menu",
						},
						children: [
							{
								path: "/breeding/materialStatistics/fodder",
								name: "fodderStatistics",
								meta: {
									title: "饲料统计",
									icon: "el-icon-office-building",
									type: "menu",
								},
								component:
									"breeding/materialStatistics/fodder/index",
							},
						],
					},
					{
						name: "registration",
						path: "/breeding/registration",
						meta: {
							title: "信息登记",
							icon: "el-icon-data-line",
							type: "menu",
						},
						children: [
							{
								path: "/breeding/registration/regOutCage",
								name: "outCageRegistration",
								meta: {
									title: "出栏登记",
									icon: "el-icon-office-building",
									type: "menu",
								},
								component:
									"breeding/registration/regOutCage/index",
							},
							{
								path: "/breeding/registration/regDove",
								name: "doveRegistration",
								meta: {
									title: "鸽子登记",
									icon: "el-icon-office-building",
									type: "menu",
								},
								component:
									"breeding/registration/regDove/index",
							},
							{
								path: "/breeding/registration/regFodder",
								name: "fodderRegistration",
								meta: {
									title: "饲料登记",
									icon: "el-icon-office-building",
									type: "menu",
								},
								component:
									"breeding/registration/regFodder/index",
							},
						],
					},
				],
			},
			{},
			{},
			{},
			{},
			{},
			{},
			{
				menuIndex: 7,
				systemName: "dataVisual",
				menus: [
					{
						name: "dataVisual",
						path: "/dataVisual",
						component: "dataVisual/index",
					},
				],
			},
			{
				menuIndex: 8,
				systemName: "equipVideo",
				menus: [
					{
						name: "videoManage",
						path: "/equipVideo/videoManage",
						meta: {
							title: "视频管理",
							icon: "el-icon-histogram",
							type: "menu",
						},
						component: "equipVideo/videoManage/index",
					},
				],
			},
		]
    this.baseInfo = this.$TOOL.data.get('BASE_INFO')
    this.bases = this.baseInfo.base
    this.dovecotes = this.baseInfo.shed
    var currInfo = this.$TOOL.data.get('CURR_INFO')
    if (currInfo) {
      this.currBase = currInfo.CURR_BASE
      this.currShed = currInfo.CURR_SHED
      this.currOperator = currInfo.CHARGE_NAME
    } else {
      this.currBase = this.bases[0]
      this.currShed = this.dovecotes[0]
      this.currOperator = this.baseInfo.chargeName
    }

    this.currInfo = {
      CURR_BASE: this.currBase,
      CURR_SHED: this.currShed,
      CHARGE_NAME: this.currOperator,
    }
    this.$TOOL.data.set('CURR_INFO', this.currInfo)

    this.onLayoutResize()
    window.addEventListener('resize', this.onLayoutResize)
    // var menu = this.$router.sc_getMenu()
    var menu = tool.data.get("CURR_MENU")
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
    // 切换基地
    async currBaseChange() {
      var { data: changeBaseRes } = await this.$API.layout.changeBase.post(this.currBase.id)
      var { data: changeShedRes } = await this.$API.layout.getChargeName.post(
        this.currShed.chargeId
      )
      this.dovecotes = changeBaseRes.shed
      this.currOperator = changeShedRes.chargeName
      this.currInfo = {
        CURR_BASE: this.currBase,
        CURR_SHED: this.currShed,
        CHARGE_NAME: this.currOperator,
      }
      this.$TOOL.data.set('CURR_INFO', this.currInfo)
      // changeBaseRes.
    },
    // 切换鸽棚
    async currShedChange(currShedName) {
      var { data: changeShedRes } = await this.$API.layout.getChargeName.post(
        this.currShed.chargeId
      )
      this.currOperator = changeShedRes.chargeName
      for (var i = 0; i < this.dovecotes.length; i++) {
        for (var key in this.dovecotes[i]) {
          if (key === currShedName)
           this.currShed = this.dovecotes[i]
        }
      }
      this.currInfo = {
        CURR_BASE: this.currBase,
        CURR_SHED: this.currShed,
        CHARGE_NAME: this.currOperator,
      }
      this.$TOOL.data.set('CURR_INFO', this.currInfo)
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
.operatorCss {
  font-size: 16px;
  font-weight: 700;
}
</style>
