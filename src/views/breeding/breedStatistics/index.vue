<template>
  <div class="top">
    <el-date-picker v-model="dateVals" type="daterange" format="YYYY-MM-DD" unlink-panels range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间" :shortcuts="shortcuts" @blur="dateChange" />
  </div>
  <div class="container">
    <div v-for="(item, index) in cardList" :key="index">
      <el-card class="mini_card">
        <span class="fontcolor">{{item.title}}</span>
        <span :style="'color: '+ colors[index]" class="cardnumber">{{item.number}}</span>
      </el-card>
    </div>
  </div>

  <div class="centerMain">
    <div class="centerLeft">
      <h3>当日预警信息</h3>
      <TableCustom></TableCustom>
    </div>

    <div class="centerRight">
      <h3>加料统计</h3>
      <EchartStatistics ref="addFodRef" :shed_id="shedId" :start_time="startTime" :end_time="endTime"></EchartStatistics>
    </div>
  </div>

  <div class="bottomMain">
    <div class="bottomLeft">
      <div class="video">
        <h3>监控视频区</h3>
        <el-select style="width:100px" v-model="value" placeholder="监控1">
          <el-option v-for="item in monitor_idlist" :key="item.id" :label="item.devicename" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="video2">
        <div class="contList">
          <div class="boxVideo">
            <video class="video-js video-btn" data-setup="{}" controls :src="monitor_idlist[0]">
            </video>
          </div>
        </div>
      </div>
    </div>

    <div class="bottomCenter">
      <h3>环境监测数据展示</h3>
      <EchartsEnvironment></EchartsEnvironment>
    </div>

    <div class="bottomRight">
      <h3>环境预警信息</h3>
      <Environment></Environment>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, defineComponent } from 'vue'
import { dateFormat } from '@/hooks/dateFormat.js'

import TableCustom from './components/table-custom.vue'
import EchartStatistics from './components/echartStatistics.vue'
import EchartsEnvironment from './components/echartsEnvironment.vue'
import Environment from './components/environment.vue'

import {
  getNumberOfParents,
  getNumberOfChildren,
  getNumOfTakeEgg,
  getNumOfLayEggs,
  getNumOfCubs,
  getNumOfOut,
  getNumOfDeath,
  getMonitorByShedID,
} from '@api/breeding/breedStatistics'

export default defineComponent({
  name: 'bsBreedingStatistics',
  components: {
    TableCustom,
    EchartStatistics,
    EchartsEnvironment,
    Environment,
  },
  setup() {
    document.documentElement.style.fontSize =
      (document.documentElement.clientWidth / 768) * 100 + 'px'
    const { proxy } = getCurrentInstance()
    const baseid = ref('')
    baseid.value = proxy.$TOOL.data.get('BASE_INFO')
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

    // 卡片
    let colors = ['#EE4000', '#EE9A49', '#7D26CD', '#43CD80', '#76EE00', '#6495ED', '#EE4000']
    let cardList = ref([
      { title: '成鸽数: ', number: '0' },
      { title: '幼鸽数: ', number: '0' },
      { title: '抽蛋数: ', number: '0' },
      { title: '产蛋数: ', number: '0' },
      { title: '出仔数: ', number: '0' },
      { title: '出栏数: ', number: '0' },
      { title: '死仔数: ', number: '0' },
    ])

    //设置默认日期
    let dateVals = ref('')
    let startTime = new Date()
    let endTime = new Date()
    startTime.setTime(startTime.getTime() - 3600 * 1000 * 24 * 7)
    startTime = ref(startTime)
    endTime = ref(endTime)
    dateVals.value = [startTime.value, endTime.value]

    const shedId = proxy.$store.state.baseInfo.CURR_INFO.CURR_SHED.id
    const getCardData = (shedId, startTime, endTime) => {
      getNumberOfParents(shedId).then((res) => {
        cardList.value[0].number = res.data.data
      })
      getNumberOfChildren(shedId).then((res) => {
        cardList.value[1].number = res.data.data
      })
      getNumOfTakeEgg(shedId, startTime, endTime).then((res) => {
        cardList.value[2].number = res.data.data
      })
      getNumOfLayEggs(shedId, startTime, endTime).then((res) => {
        cardList.value[3].number = res.data.data
      })
      getNumOfCubs(shedId, startTime, endTime).then((res) => {
        cardList.value[4].number = res.data.data
      })
      getNumOfOut(shedId, startTime, endTime).then((res) => {
        cardList.value[5].number = res.data.data
      })
      getNumOfDeath(shedId, startTime, endTime).then((res) => {
        cardList.value[6].number = res.data.data
      })
    }
    getCardData(shedId, dateFormat(startTime.value), dateFormat(endTime.value))

    const dateChange = () => {
      getCardData(shedId, dateFormat(dateVals.value[0]), dateFormat(dateVals.value[1]))
      proxy.$refs.addFodRef.getData(
        shedId,
        dateFormat(dateVals.value[0]),
        dateFormat(dateVals.value[1])
      )
    }

    // 获取监控视频id
    const monitor_idlist = ref([])
    getMonitorByShedID(shedId).then((res) => {
      monitor_idlist.value = res.data.urlList
    })

    return {
      baseid,
      monitor_idlist,
      dateVals,
      shortcuts,
      startTime,
      endTime,
      colors,
      cardList,
      dateChange,
      shedId,
    }
  },
})
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
  list-style: none;
  box-sizing: border-box;
}
a,
img,
button,
input,
textarea {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  outline-color: #0081ff;
  background: none;
}
button {
  outline: none;
}
input::-webkit-input-placeholder {
  color: #aaa;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    '微软雅黑', Arial, sans-serif;
  position: relative;
}

/* 顶部时间条 */
.top {
  margin: -16px 0 0 48px;
  width: 500px;
  font-size: 0.12rem;
  line-height: 0.3rem;
  font-weight: bold;
}

/* 中间部分 */
.centerMain {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  height: 290px;
  width: 100%;
  h3 {
    margin: 0 0 10px 30px;
  }
  .centerLeft {
    height: 290px;
    width: 60%;
  }
  .centerRight {
    flex: 1;
    align-self: flex-start;
    height: 85%;
  }
}

/* 底部部分 */
.bottomMain {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  h3 {
    margin: 0 0 10px 30px;
  }
  /* 监控样式 */
  .bottomLeft {
    width: 25%;
    .video {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .video2 {
      width: 100%;
      height: 28vh;
      .contList {
        position: relative;
        width: 100%;
        height: 11vw;
        margin: 1vw auto 0;
        .boxVideo {
          width: 100%;
          height: 100%;
          .video-js {
            width: 100%;
            height: 100%;
          }
          .video-js:hover .video-btn {
            background: none;
          }
          .video-btn:hover {
            background: none;
          }
          .video-btn {
            border: none;
            background: none;
          }
        }
      }
    }
  }

  /* 环境监测 */
  .bottomCenter {
    flex: 1;
  }

  /* 环境预警 */
  .bottomRight {
    width: 28%;
  }
}

.container {
  margin-left: 10px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 35px;
  .mini_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 100%;
    font-size: 15px;
    margin-right: 40px;
    .fontcolor {
      /* color: #38424a; */
      font-weight: 400;
      font-size: 14px;
    }
    .cardnumber {
      font-weight: 700;
      font-size: 16px;
    }
  }
}
</style>
