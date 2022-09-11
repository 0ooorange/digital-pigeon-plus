<template>
  <div class="top">
    <el-date-picker v-model="dateVals" type="daterange" format="YYYY-MM-DD" unlink-panels range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间" :shortcuts="shortcuts" @blur="dateChange" />
  </div>
  <div class="container">
    <Cards v-if="isComponents" :shed_id="shedId" :start_time="startTime" :end_time="endTime"></Cards>
  </div>

  <div class="centerMain">
    <div class="centerLeft">
      <h3>当日预警信息</h3>
      <WarnInfo v-if="isComponents" :shed_id="shedId" :start_time="startTime" :end_time="endTime"></WarnInfo>
    </div>

    <div class="centerRight">
      <h3>加料统计</h3>
      <AddFodder v-if="isComponents" :shed_id="shedId" :start_time="startTime" :end_time="endTime"></AddFodder>
    </div>
  </div>

  <div class="bottomMain">
    <div class="bottomLeft">
      <Video v-if="isComponents" :shed_id="shedId"></Video>
    </div>

    <div class="bottomCenter">
      <h3>环境监测数据展示</h3>
      <Transducer v-if="isComponents" :shed_id="shedId" :start_time="startTime" :end_time="endTime"></Transducer>
    </div>

    <div class="bottomRight">
      <h3>环境预警信息</h3>
      <Environment v-if="isComponents" :shed_id="shedId" :start_time="startTime" :end_time="endTime"></Environment>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, nextTick } from 'vue'
import store from '@/store'

import WarnInfo from './components/warnInfo.vue'
import AddFodder from './components/addFodder.vue'
import Transducer from './components/transducer.vue'
import Environment from './components/environment.vue'
import Cards from './components/cards.vue'
import Video from './components/video.vue'

export default defineComponent({
  name: 'bsBreedingStatistics',
  components: {
    WarnInfo,
    AddFodder,
    Transducer,
    Environment,
    Cards,
    Video,
  },
  setup() {
    document.documentElement.style.fontSize =
      (document.documentElement.clientWidth / 768) * 100 + 'px'
    const baseid = ref('')
    baseid.value = store.state.baseInfo.USER_INFO
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

    // const shedId = store.state.baseInfo.SHED_ID
    const shedId = '1518124016571797507'

    // 改变时间
    const isComponents = ref(true)
    const dateChange = () => {
      isComponents.value = false
      nextTick(function () {
        isComponents.value = true
      })
    }

    return {
      baseid,
      dateVals,
      shortcuts,
      startTime,
      endTime,
      isComponents,
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
  }
  .centerRight {
    flex: 1;
    max-width: 40%;
    align-self: center;
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
}
</style>
