<template>
  <div class="body">
    <div class="top">
      <div class="top_left">
        <ul>
          <li><a href="javascript:;">养殖</a></li>
          <li><a href="javascript:;">屠宰</a></li>
          <li><a href="javascript:;">加工</a></li>
        </ul>
      </div>
      <h1 class="top_center">{{curr_shed}}</h1>
      <div class="top_right">
        <ul>
          <li>
            <span @click="toLast">返回</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="content">
      <div class="left">
        <div class="echarts1 box-background">
          <div class="title">鸽棚信息</div>
          <ShedInfo v-if="isComponents" />
        </div>
        <div class="echarts2 box-background">
          <div class="title">环境参数</div>
          <EnviroInfo v-if="isComponents" />
        </div>
        <div class="echarts3 box-background">
          <div class="title">产蛋统计</div>
          <ProductEgg v-if="isComponents" />
        </div>
        <div class="echarts4 box-background">
          <div class="title">视频监控</div>
          <Video v-if="isComponents" />
        </div>
      </div>
      <div class="center">
        <div class="center-top">
          <el-date-picker v-model="dateVals" type="daterange" format="YYYY-MM-DD" unlink-panels range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间" :shortcuts="shortcuts" @blur="dateChange" />
        </div>
        <div class="map-echart">
          <img class="image" src="./img/shed.png" alt="error">
        </div>
        <div class="box-background centerEcharts">
          <div class="title">环境参数统计</div>
          <AllEnviro v-if="isComponents" :start_time="startTime" :end_time="endTime" />
        </div>
      </div>
      <div class="right">
        <div class="echarts5 box-background">
          <div class="title">蛋异常统计</div>
          <EggAbnormal v-if="isComponents" />
        </div>
        <div class="echarts5 box-background">
          <div class="title">仔数统计</div>
          <Cub v-if="isComponents" :start_time="startTime" :end_time="endTime" />
        </div>
        <div class="echarts6 box-background">
          <div class="title">饲料统计</div>
          <Fodder v-if="isComponents" />
        </div>
        <div class="echarts8 box-background">
          <div class="title">养殖品种介绍</div>
          <Types v-if="isComponents" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScEcharts from '@/components/scEcharts'
import ShedInfo from './components/shedInfo.vue' // 鸽棚信息
import EnviroInfo from './components/enviroInfo.vue' // 环境参数
import ProductEgg from './components/productEgg.vue' // 产蛋统计
import Video from './components/video.vue' // 视频监控
import AllEnviro from './components/allEnviro.vue' // 环境参数统计
import EggAbnormal from './components/eggAbnormal.vue' // 蛋异常统计
import Cub from './components/cub.vue' // 仔数统计
import Fodder from './components/fodder.vue' // 饲料统计
import Types from './components/types.vue' // 养殖品种介绍

import { ref, nextTick } from 'vue'

import tool from '@/utils/tool'
import router from '@/router'
import store from '@/store'
import { getBaseAndShed } from '@api/bases/layout'

export default {
  name: 'dataVisual',
  components: {
    ScEcharts,
    ShedInfo,
    Video,
    EnviroInfo,
    ProductEgg,
    AllEnviro,
    EggAbnormal,
    Cub,
    Fodder,
    Types,
  },
  setup() {
    const curr_shed = store.state.dataVisual.CURR_SHED.code
    // 基地和棚
    let baseInfo = tool.data.get('USER_INFO')
    const shed = ref([])
    getBaseAndShed(baseInfo.id).then((res) => {
      shed.value = res.data.shedList
      let currInfo = ref(tool.data.get('CURR_INFO'))
      let currBase = ref({})
      let currShed = ref({})
      let currOperator = ref('')
      if (currInfo.value) {
        currBase.value = currInfo.value.CURR_BASE
        currShed.value = currInfo.value.CURR_SHED
        currOperator.value = currInfo.value.CHARGE_NAME
      } else {
        currBase.value = res.data.baseList[0]
        currShed.value = res.data.shedList[0]
        currOperator.value = res.data.userList[0].name
      }
      currInfo.value = {
        CURR_BASE: currBase.value,
        CURR_SHED: currShed.value,
        CHARGE_NAME: currOperator.value,
      }
      tool.data.set('CURR_INFO', currInfo.value)
    })
    // 鸽棚选择
    const currShedName = ref('')
    const currShedChange = () => {}
    // 前往上一页
    const toLast = () => {
      router.go(-1)
    }

    const shortcuts = ref([
      {
        text: '近一周',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        },
      },
      {
        text: '近一个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        },
      },
      {
        text: '近3个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        },
      },
    ])
    //设置默认日期
    let dateVals = ref('')
    let startTime = new Date()
    let endTime = new Date()
    startTime.setTime(startTime.getTime() - 3600 * 1000 * 24 * 7)
    startTime = ref(startTime)
    endTime = ref(endTime)
    dateVals.value = [startTime.value, endTime.value]
    // console.log(startTime, endTime);
    // 改变时间
    const isComponents = ref(true)
    const dateChange = () => {
      isComponents.value = false
      nextTick(function () {
        isComponents.value = true
      })
    }

    return {
      curr_shed,
      shed,
      currShedName,
      currShedChange,
      toLast,
      
      dateVals,
      shortcuts,
      startTime,
      endTime,
      isComponents,
      dateChange
    }
  },
}
</script>

<style lang="less" scoped>
/****** PLACE YOUR CUSTOM STYLES HERE ******/
.body {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  background: #051655;
  // font-family: 微软雅黑, MicrosoftYahei, sans-serif;
  color: #fff;
}
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol,
pre,
table,
blockquote,
input,
button,
select,
em,
textarea {
  margin: 0;
  font-weight: normal;
  margin: 0;
  padding: 0;
  list-style: none;
  font-style: normal;
}
html,
.body {
  // font-family: 微软雅黑, MicrosoftYahei, sans-serif;
  color: #fff;
  background: #00065b url(./img/bg.jpg);
  background-size: 100% 100%;
  background-position: 0 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
}

// 顶部
.top {
  display: flex;
  height: 8%;
  width: 100%;
  align-items: center;
  .top_left {
    width: 33%;
    ul {
      padding-top: 6%;
      padding-left: 10%;
      width: 100%;
    }
    li {
      background: url(./img/bnt.png) center;
      font-size: 14px;
      line-height: 33px;
      background-repeat: no-repeat;
      width: 18%;
      height: 35px;
      float: left;
      text-align: center;
      margin-left: 1%;
      a {
        text-decoration: none;
        color: #fff;
      }
    }
    li.active {
      background: url(./img/bntactive.png) no-repeat center;
    }
  }
  .top_center {
    flex: 1;
    text-align: center;
    font-weight: bold;
    letter-spacing: 8px;
    font-size: 26px;
  }
  .top_right {
    width: 33%;
    padding-top: 2%;
    padding-right: 2.5%;
    li {
      background: url(./img/bnt.png) center;
      font-size: 14px;
      line-height: 33px;
      background-repeat: no-repeat;
      width: 22%;
      height: 35px;
      float: right;
      text-align: center;
      margin-right: 1%;
      cursor: pointer;
      a {
        text-decoration: none;
        color: #fff;
      }
    }
    .shedSelect {
      width: 150px;
    }
  }
}

// 内容部分
.content {
  display: flex;
  margin: 10px 50px 0 50px;
  justify-content: center;
  height: 100%;
  .left {
    width: 30%;
    justify-content: flex-start;
    flex-direction: column;
  }
  .center {
    flex: 1;
    .center-top {
      text-align: center;
    }
  }
  .right {
    display: flex;
    width: 30%;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-end;
  }
}

// 图表标题
.echarts1,
.echarts2,
.echarts3,
.echarts4,
.echarts5,
.echarts6,
.echarts7,
.echarts8 {
  position: relative;
}
.title {
  width: 100%;
  position: absolute;
  left: 0;
  text-align: center;
  align-self: flex-start;
  font-weight: 700;
  font-size: 14px;
}

// 图表位置
.echarts1,
.echarts2,
.echarts5,
.echarts6,
.echarts7,
.echarts8,
.centerEcharts {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
// 图表4
.echarts4 {
  display: flex;
  justify-content: center;
}

// 图表背景
.box-background {
  margin-bottom: 7px;
  height: 21%;
  width: 95%;
  background: url('./img/amiddboxttop.png') no-repeat;
  background-size: 100% 100%;
}

.map-echart {
  margin-top: 10px;
  height: 56%;
  width: 100%;
  align-items: center;
  background: url('./img/light.jpg') no-repeat;
  background-size: 100%;
  background-position: 0 -130px;
  .image {
    margin-top: 40px;
    width: 100%;
  }
}
.centerEcharts {
  justify-content: center;
  padding: 0 0 10px 0;
  height: 28%;
  width: 100%;
}
</style>