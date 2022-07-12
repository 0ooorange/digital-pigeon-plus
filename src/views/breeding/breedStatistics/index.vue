<template>
  <div class="title">
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
  <div class="leftMain">
    <div class="leftMain_middle_leftIn">
      <h3>当日预警信息</h3>
      <TableCustom></TableCustom>
    </div>

    <div class="leftmain-right">
      <h3>加料统计</h3>
      <EchartStatistics></EchartStatistics>
    </div>
  </div>

  <div class="bottomMain">
    <div class="leftMain_middle_rightIn">
      <div class="jiankong">
        <h3>监控视频区</h3>
        <el-select style="width:100px" v-model="value" placeholder="监控1">
          <el-option v-for="item in monitor_idlist" :key="item.id" :label="item.devicename" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="biaoge biaoge_bi" style="width: 100%; height: 28vh">
        <div class="contList">
          <div class="boxVideo">
            <video class="video-js vjs-big-play-button" data-setup="{}" controls :src="monitor_idlist[0]">
            </video>
          </div>
        </div>
      </div>
    </div>

    <div class="leftMain_middle_leftIn">
      <h3>环境监测数据展示</h3>
      <EchartsEnvironment></EchartsEnvironment>
    </div>

    <div class="rightMain">
      <div class="rightMain_bottomIn">
        <h3>环境预警信息</h3>
        <Environment></Environment>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { dateFormat } from '@/hooks/dateFormat.js'
// import { useState } from '@/hooks/useState.js'
import TableCustom from './components/table-custom.vue'
import EchartStatistics from './components/echartStatistics.vue'
import EchartsEnvironment from './components/echartsEnvironment.vue'
import Environment from './components/environment.vue'
export default {
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
      {
        title: '成鸽数: ',
        number: '0',
      },
      {
        title: '幼鸽数: ',
        number: '0',
      },
      {
        title: '抽蛋数: ',
        number: '0',
      },
      {
        title: '产蛋数: ',
        number: '0',
      },
      {
        title: '出仔数: ',
        number: '0',
      },
      {
        title: '出栏数: ',
        number: '0',
      },
      {
        title: '死仔数: ',
        number: '0',
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

    // const shedId = useState("baseInfo", ["SHED_ID"])
    const shedId = proxy.$store.state.baseInfo.CURR_INFO.CURR_SHED.id
    // console.log("shedId: ", shedId)
    const getCardData = async (shedId, startTime, endTime) => {
      const { data: res } = await proxy.$API.breedStatistics.getNumberOfParents.get(shedId)
      cardList.value[0].number = res.data
      const { data: res1 } = await proxy.$API.breedStatistics.getNumberOfChildren.get(shedId)
      cardList.value[1].number = res1.data
      const { data: res2 } = await proxy.$API.breedStatistics.getNumOfTakeEgg.get(
        shedId,
        dateFormat(startTime),
        dateFormat(endTime)
      )
      cardList.value[2].number = res2.data
      const { data: res3 } = await proxy.$API.breedStatistics.getNumOfLayEggs.get(
        shedId,
        dateFormat(startTime),
        dateFormat(endTime)
      )
      cardList.value[3].number = res3.data
      const { data: res4 } = await proxy.$API.breedStatistics.getNumOfCubs.get(
        shedId,
        dateFormat(startTime),
        dateFormat(endTime)
      )
      cardList.value[4].number = res4.data
      const { data: res5 } = await proxy.$API.breedStatistics.getNumOfOut.get(
        shedId,
        dateFormat(startTime),
        dateFormat(endTime)
      )
      cardList.value[5].number = res5.data
      const { data: res6 } = await proxy.$API.breedStatistics.getNumOfDeath.get(
        shedId,
        dateFormat(startTime),
        dateFormat(endTime)
      )
      cardList.value[6].number = res6.data
    }
    getCardData(shedId, startTime.value, endTime.value)
    const dateChange = () => {
      getCardData(shedId, dateVals.value[0], dateVals.value[1])
    }

    // 获取监控视频id
    const monitor_idlist = ref([])
    const getMonitorByShedID = async () => {
      const CURR_INFO = proxy.$store.state.baseInfo.CURR_INFO
      let shedId = CURR_INFO.CURR_SHED.id
      const res = await proxy.$API.breedStatistics.getMonitorByShedID.post(shedId)
      monitor_idlist.value = res.data.urlList
    }
    getMonitorByShedID()

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
    }
  },
}
</script>
<style  scoped>
body,
p,
div,
h1,
h2,
h3,
h4,
h5,
h6,
button,
input,
ol,
li,
ul,
dl,
dt,
dd,
img,
table,
tr,
td,
th,
select {
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
  margin: 0 auto;
  font-size: 16px;
  color: #121212;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    '微软雅黑', Arial, sans-serif;
  position: relative;
}

/* CSS Document */

.biaoge .contList {
  position: relative;
  width: 100%;
  height: 11vw;
  margin: 1vw auto 0;
}
.biaoge .boxVideo {
  width: 100%;
  height: 100%;
}
.biaoge .boxVideo video {
  width: 100%;
  height: 100%;
}
/* lafite video样式 */
.jiankong {
  display: flex;
  flex-direction: row;
}
.jiankong h3 {
  margin-right: 70px;
}
.video-js {
  width: 100%;
  height: 100%;
}
.video-js:hover .vjs-big-play-button {
  background: none;
}
.video-js .vjs-big-play-button:hover {
  background: none;
}
.video-js .vjs-big-play-button {
  border: none;
  background: none;
}
.bg {
  margin: 0 auto;
  width: 99%;
  height: 880px;
  background-color: #ffffff;
  background-size: cover;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
  position: relative;
}
.title {
  width: 500px;
  font-size: 0.12rem;
  line-height: 0.3rem;
  color: rgba(14, 253, 255, 1);
  margin-left: 48px;
  font-weight: bold;
  margin-top: -16px;
}
.tip {
  /* padding: auto; */
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 10%;
}
.leftMain {
  margin-left: 40px;
  margin-top: 22px;
  display: flex;
  flex-direction: row;
  height: 335px;
  width: 1140px;
}

.rightMain {
  width: 350px;
  height: 100%;
  margin-left: 35px;
}
.leftmain-right {
  margin-left: 90px;
  width: 375px;
  height: 323px;

  position: relative;
}
.bottomMain {
  height: 310px;
  margin-top: 15px;
  margin-left: 40px;
  display: flex;
  flex-direction: row;
}
.leftMain_top {
  width: 100%;
}
.leftMain_top ul {
  display: flex;
  display: -webkit-flex;
}
.leftMain_top ul li {
  float: left;
  width: 14%;
  padding-right: 0.1rem;
}
.leftMain_top ul li:last-child {
  padding: 0;
}
.leftMain_top ul li .liIn {
  border: 0.008rem solid rgba(0, 8, 8, 0.5);
  width: 100%;
  min-height: 60px;
  text-align: center;
}
.leftMain_top ul li .liIn h3 {
  font-size: 0.08rem;

  margin-bottom: 0.05rem;
}

.leftMain_top ul li .liIn .shu {
  font-size: 0.12rem;
  color: rgb(2, 2, 2);
  font-family: dig;
  margin-bottom: 0.02rem;
}
.leftMain_top ul li .liIn .shu i {
  font-size: 0.04rem;
  margin-left: 0.06rem;
  font-style: normal;
}
.leftMain_middle {
  width: 100%;
  height: 345px;
  padding-bottom: 0.1rem;
  display: flex;
  display: -webkit-flex;
}
.bottomMain .leftMain_bottom {
  margin-top: 24px;
  margin-left: -32px;
}
.bottomMain .leftMain_middle_leftIn {
  width: 530px;
  height: 300px;
  min-height: 60px;
  position: relative;
}
.leftMain_middle_leftIn h3 {
  font-size: 0.08rem;
  margin-top: -3px;
  margin-bottom: 0.05rem;
}
.leftmain-right h3 {
  font-size: 0.08rem;
  margin-top: -3px;
  margin-bottom: 0.05rem;
}
/* .bottomMain .leftMain_middle_leftIn .biaoge{
	min-height:200px;} */

.bottomMain .leftMain_middle_rightIn {
  margin-top: -2px;
  width: 300px;
  height: 260px;
  margin-right: 30px;
}
.bottomMain .leftMain_middle_rightIn h3 {
  font-size: 0.08rem;

  margin-bottom: 0.05rem;
}
/* .bottomMain  .leftMain_middle_rightIn .biaoge{
	min-height:200px;} */
/*左边中间部分排行榜*/
.bottomMain .leftMain_middle_rightIn .biaoge_pai {
  width: 100%;
  overflow: hidden;
}

/*右边部分*/
.bingtu {
  height: 377px;
  width: 100%;
  position: relative;
  right: 3px;
  top: -35px;
}

.rightMain .rightMain_bottom {
  width: 100%;
  height: 295px;
  margin-top: -7px;
  margin-left: 58px;
  border: 0.008rem solid rgba(0, 8, 8, 0.5);
}
.rightMain .rightMain_bottomIn {
  width: 100%;
  height: 100%;
  min-height: 90px;
  position: relative;
  margin-top: 3px;
}

.rightMain .rightMain_bottomIn h3 {
  font-size: 0.08rem;
  margin-bottom: 0.05rem;
}
.container {
  margin-left: 10px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 35px;
}
.mini_card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  height: 100%;
  font-size: 15px;
  margin-right: 40px;
}
.fontcolor {
  /* color: #38424a; */
  font-weight: 400;
  font-size: 14px;
}
.cardnumber {
  font-weight: 700;
  font-size: 16px;
}
</style>
