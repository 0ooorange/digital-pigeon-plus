<template>
  <template v-if="layout=='menu'">
    <header>
      <el-row class="adminui-header">
        <el-col :span="firstSpan">
          <div :class="menuIsCollapse?'panel-item adminui-header-left beCenter':'panel-item adminui-header-left'" @click="toNavigator">
            <div class="logo-bar">
              <img class="logo" :src='smallLogo'>
              <span class="isShowText" v-if="!menuIsCollapse">{{ $CONFIG.APP_NAME }}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="secondSpan" style="display:flex; ">
          <div class="selectDivs" v-if="selectShow">
            <span class="selectText">基地：</span>
            <el-select style="width: 150px" v-model="currBaseName" class="m-2" placeholder="Select" @change="currBaseChange">
              <el-option v-for="item in bases" :key="item.id" :label="item.name" :value="item.name" />
            </el-select>
            <span class="selectText">鸽棚：</span>
            <el-select style="width: 150px" v-model="currShedCode" class="m-2" placeholder="Select" @change="currShedChange">
              <el-option v-for="item in sheds" :key="item.id" :label="item.code" :value="item.code" />
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
              <NavMenu :navMenus="currMenu"></NavMenu>
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
              <component :is="Component" :key="$route.fullPath" v-if="menuFlag" />
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
import tool from '@/utils/tool'
import router from '@/router'
import store from '@/store'
import { ref, computed, watch, nextTick } from 'vue'
import { getBreedBaseAndShed, getBreedBaseAndShed_0 } from '@api/bases/login'

export default {
  name: 'index',
  components: {
    SideM,
    Topbar,
    NavMenu,
    userbar,
    iframeView,
  },
  setup() {
    const route = router.currentRoute.value
    // 计算属性
    const ismobile = computed(() => store.state.global.ismobile)
    const layout = computed(() => store.state.global.layout)
    // const layoutTags = computed(() => store.state.global.layoutTags)
    const menuIsCollapse = computed(() => store.state.global.menuIsCollapse)
    const firstSpan = computed(() => (store.state.global.menuIsCollapse ? 1 : 4))
    const secondSpan = computed(() => (store.state.global.menuIsCollapse ? 15 : 12))
    // watch
    watch(
      () => route,
      () => {
        showThis()
      }
    )
    watch(
      () => layout,
      (val) => {
        document.body.setAttribute('data-layout', val)
      }
    )

    // 基地和棚
    const selectShow = ref(true)
    const index = tool.data.get('CURR_MENU_INDEX')
    if(index === 1 || index === 8 || index === 10) selectShow.value = false
    const bases = ref([])
    const sheds = ref([])
    const currBase = ref({})
    const currShed = ref({})
    const currBaseName = ref('')
    const currShedCode = ref('')
    const currOperator = ref('')
    const currInfo = ref(tool.data.get('CURR_INFO'))

    const currBaseId = ref('')
    getBreedBaseAndShed_0().then(res => {
      console.log(res, 12366)
      if(currInfo?.value?.CURR_BASE.id) {
        currBaseId.value = currInfo.value.CURR_BASE.id
      } else {
        currBaseId.value = res.data.BaseList[0].id
      }
    })
    getBreedBaseAndShed(currBaseId.value).then(res => {
      // 判断是否采用默认情况
      currBase.value = currInfo?.value?.CURR_BASE ? currInfo.value.CURR_BASE : res.data.BaseList[0]
      currShed.value = currInfo?.value?.CURR_SHED ? currInfo.value.CURR_SHED : res.data.ShedList[0]
      currOperator.value = currInfo?.value?.CHARGE_NAME ? currInfo.value.CHARGE_NAME : res.data.ShedList[0].userName
      
      // 存储当前信息
      currInfo.value = {
        CURR_BASE: currBase.value,
        CURR_SHED: currShed.value,
        CHARGE_NAME: currOperator.value,
      }
      
      // 存储数据
      tool.data.set('CURR_INFO', currInfo.value)
      store.commit('setShedId', currShed.value.id)
      store.commit('setCurrInfo', currInfo.value)
      console.log('CURR_INFO setted~~~')

      // 设置展示数据
      bases.value = res.data.BaseList
      sheds.value = res.data.ShedList
      currBaseName.value = currInfo.value.CURR_BASE.name
      currShedCode.value = currInfo.value.CURR_SHED.code
    })

    const nextMenu = ref([])
    const pmenu = ref({})
    const active = ref('')
    const thirdSpan = ref(8)

    //路由监听高亮
    const showThis = () => {
      pmenu.value = route.meta.breadcrumb ? route.meta.breadcrumb[0] : {}
      nextMenu.value = filterUrl(pmenu.value.children)
      nextTick(() => {
        active.value = route.meta.active || route.fullPath
      })
    }
    // //点击显示
    // const showMenu = (route) => {
    //   pmenu.value = route
    //   nextMenu.value = filterUrl.value(route.children)
    //   if ((!route.children || route.children.length == 0) && route.component) {
    //     router.push({ path: route.path })
    //   }
    // }
    //转换外部链接的路由
    const filterUrl = (map) => {
      const newMap = ref([])
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
            item.children = filterUrl(item.children)
          }
          newMap.value.push(item)
        })
      return newMap.value
    }
    //退出最大化
    const exitMaximize = () => {
      document.getElementById('app').classList.remove('main-maximize')
    }
    // 返回导航页
    const toNavigator = () => {
      router.replace({
        path: '/navigator',
      })
    }

    // 切换基地
    let menuFlag = ref(true)
    const currBaseChange = e => {
      // 筛选基地
      bases.value.some((val) => {
        if (val.name === e) {
          currBase.value = val
          return true
        }
      })
      // 获取shedList
      const currBaseId = currBase.value.id
      getBreedBaseAndShed(currBaseId).then(res => {
        // 获取shedList、shed、currOperator
        sheds.value = res.data?.ShedList
        if(res.data?.ShedList.length !== 0) {
          currShed.value = res.data?.ShedList[0]
        } else {
          currShed.value = {}
        }
        currOperator.value = currShed.value?.userName || '无'
        // 设置currInfo
        currInfo.value = {
          CURR_BASE: currBase.value,
          CURR_SHED: currShed.value,
          CHARGE_NAME: currOperator.value,
        }
        // 存储数据
        tool.data.set('CURR_INFO', currInfo.value)
        store.commit('setShedId', currShed.value.id)
        store.commit('setCurrInfo', currInfo.value)
        // 设置展示数据
        currBaseName.value = currInfo.value.CURR_BASE.name
        currShedCode.value = currInfo.value.CURR_SHED.code || '暂无鸽棚'
        // 刷新
        menuFlag.value = false
        nextTick(function () {
          menuFlag.value = true
        })
      })      
    }
    // 切换鸽棚
    const currShedChange = async (e) => {
      // 筛选鸽棚
      sheds.value.some((val) => {
        if (val.code === e) {
          currShed.value = val
          return true
        }
      })
      // 设置currInfo最新信息
      currInfo.value = {
        CURR_BASE: currBase.value,
        CURR_SHED: currShed.value,
        CHARGE_NAME: currOperator.value,
      }
      // 存储数据
      tool.data.set('CURR_INFO', currInfo.value)
      store.commit('setShedId', currShed.value.id)
      store.commit('setCurrInfo', currInfo.value)
      // 刷新
      menuFlag.value = false
      nextTick(function () {
        menuFlag.value = true
      })
    }

    const onLayoutResize = () => {
      store.commit('SET_ismobile', document.body.clientWidth < 992)
    }
    window.addEventListener('resize', onLayoutResize())
    const currMenu = ref(tool.data.get('CURR_MENU'))
    currMenu.value = filterUrl(currMenu.value)
    showThis()

    return {
      firstSpan,
      secondSpan,
      thirdSpan,
      bases,
      sheds,
      currBaseName,
      currShedCode,
      currOperator,
      smallLogo,
      selectShow,
      currMenu,
      currBaseChange,
      currShedChange,
      menuFlag,
      exitMaximize,
      toNavigator,
      ismobile,
      layout,
      menuIsCollapse,
      active,
    }
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
