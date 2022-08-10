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
      <h1 class="top_center">{{curr_base}}</h1>
      <div class="top_right">
        <ul>
          <li>
            <span @click="toLast">返回</span>
          </li>
          <li>
            <span @click="toShed">前往鸽棚</span>
          </li>
          <li class="shedSelect">
            <el-select v-model="currShedName" placeholder="选择鸽棚" @change="currShedChange($event)" style="width: 150px">
              <el-option v-for="item in shed" :key="item.id" :label="item.code" :value="item.code" />
            </el-select>
          </li>
        </ul>
      </div>
    </div>

    <div class="content">
      <div class="left">
        <div class="echarts1 box-background">
          <div class="title">基地基础信息</div>
          <div class="cContent">
            <span class="c1">
              <div>乳鸽出栏数（万）</div>
              <div class="t1">1420821</div>
            </span>
            <span class="c2">
              <div>鸽棚数量</div>
              <div class="t2">13</div>
            </span>
            <span class="c3">
              <div>种鸽出栏数（万）</div>
              <div class="t3">70593</div>
            </span>
          </div>
          <ScEcharts class="e1" :option="allStatistics" height="80%" width="40%"></ScEcharts>
        </div>
        <div class="echarts2 box-background">
          <div class="title">基地种鸽、乳鸽养殖规模（万）</div>
          <ScEcharts :option="breededOption" height="90%" width="100%"></ScEcharts>
        </div>
        <div class="echarts3 box-background">
          <div class="title">位置信息</div>
          <div class="map">
            <SCMap adress="" />
          </div>
        </div>
      </div>
      <div class="center">
        <div class="map-echart">
          <img class="image" src="./img/base.jpg" alt="error">
        </div>
        <div class="box-background centerEcharts">
          <div class="title">基地人员分布</div>
          <ScEcharts class="e1" :option="memberOption " height="95%" width="80%"></ScEcharts>
        </div>
      </div>
      <div class="right">
        <div class="echarts4 box-background">
          <div class="title">基地数据统计</div>
          <div class="center4">
            <div class="left4">
              <span class="c1">
                <div>总销售额（千万）</div>
                <div class="t1">1034</div>
              </span>
              <span class="c2">
                <div>养殖企业</div>
                <div class="t2">123</div>
              </span>
              <span class="c3">
                <div>带动农户（户）</div>
                <div class="t3">302</div>
              </span>
            </div>
            <div class="right4">
              <span class="c4">
                <div>科技投入（千万）</div>
                <div class="t1">3</div>
              </span>
              <span class="c5">
                <div>科研平台数</div>
                <div class="t2">734</div>
              </span>
              <span class="c6">
                <div>无害化处理（吨）</div>
                <div class="t3">103</div>
              </span>
            </div>
          </div>
        </div>
        <div class="echarts5 box-background">
          <div class="title">基地经济产值走势（千万元）</div>
          <ScEcharts :option="economicOption" height="100%" width="100%"></ScEcharts>
        </div>

        <div class="echarts6 box-background">
          <div class="title">视频监控</div>
          <div class="videoSelect">
            <el-select style="width: 100px;" placeholder="监控1">
              <el-option v-for="item in videoOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="videoDiv">
            <video class="video" data-setup="{}" controls>
              <source :src="videoUrl" type="application/x-mpegURL" />
            </video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScEcharts from '@/components/scEcharts'
import SCMap from '@/components/scMap'
import { ElMessage } from 'element-plus'

import { ref, h } from 'vue'

import tool from '@/utils/tool'
import router from '@/router'
import store from '@/store'
import { getBaseAndShed } from '@api/bases/layout'

export default {
  name: 'dataVisualBase',
  components: {
    ScEcharts,
    SCMap
  },
  setup() {
    // 接收路由传参的值
    const curr_base = store.state.dataVisual.CURR_BASE.code

    // 基地和棚
    let baseInfo = tool.data.get('BASE_INFO')
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
    const nextShed = ref([])
    const currShedChange = (e) => {
      shed.value.forEach((val) => {
        if (val.code === e) {
          nextShed.value = val
        }
      })
    }
    // 前往上一页
    const toLast = () => {
      router.go(-1)
    }
    // 前往鸽棚
    const openError = () => {
      ElMessage({
        message: h('p', null, [
          h('span', null, '请选择'),
          h('i', { style: 'color: teal' }, '鸽棚'),
        ]),
      })
    }
    const toShed = () => {
      store.commit('setCurrShed', nextShed.value)
      tool.session.set('CURR_SHED', nextShed.value)
      if (currShedName.value) {
        router.push('/dataVisualShed')
      } else {
        openError()
      }
    }

    // echarts1
    const allStatistics = {
      title: {
        text: '基地乳鸽去向',
        left: 'center',
        textStyle: {
          color: 'white',
          fontWeight: 400,
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: '基地乳鸽去向',
          type: 'pie',
          radius: '80%',
          labelLine: {
            show: false,
          },
          label: {
            position: 'inner',
            fontSize: 14,
            fontWeight: 600,
          },
          data: [
            { value: 340, name: '深加工' },
            { value: 590, name: '屠宰' },
            { value: 70, name: '活禽' },
          ],
        },
      ],
    }

    // 视频
    const videoValue = ref('')
    const videoOptions = [
      {
        value: 'A01仓',
        label: 'A01仓',
      },
      {
        value: 'A02仓',
        label: 'A02仓',
      },
    ]

    // centerEcharts
    const memberOption = {
      xAxis: {
        type: 'category',
        data: ['养殖', '屠宰', '加工', '销售', '科研', '管理'],
      },
      yAxis: {
        type: 'value',
        max: 150,
      },
      series: [
        {
          data: [120, 50, 40, 20, 10, 15],
          type: 'bar',
        },
      ],
    }

    // echarts2
    const breededOption = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['种鸽', '乳鸽'],
      },
      xAxis: {
        type: 'category',
        data: ['2019年', '2020年', '2021年', '2022年'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '种鸽',
          type: 'line',
          data: [0, 0, 0, 0],
        },
        {
          name: '乳鸽',
          type: 'line',
          data: [121, 134, 156, 150],
        },
      ],
    }

    // echarts3
    const productEggOption = {
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        boundaryGap: false,
        type: 'category',
        data: (function () {
          // var now = new Date()
          var nowres = 30
          var res = []
          res.unshift(nowres)
          // var len = 30
          while (nowres >= 0) {
            // res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
            nowres -= 5
            if (nowres <= 0) break
            res.unshift(nowres)
          }
          res.unshift(1)
          return res
        })(),
      },
      yAxis: [
        {
          type: 'value',
          name: '产蛋数',
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: '产蛋数',
          type: 'line',
          symbol: 'none',
          lineStyle: {
            width: 1,
            color: '#409EFF',
          },
          areaStyle: {
            opacity: 0.1,
            color: '#79bbff',
          },
          data: (function () {
            var res = []
            var len = 30
            while (len--) {
              res.push(Math.round(Math.random() * 250))
            }
            return res
          })(),
        },
      ],
    }

    // echarts5
    const economicOption = {
      xAxis: {
        type: 'category',
        data: ['2019年', '2020年', '2021年', '2022年'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [4290, 4830, 5900, 6400],
          type: 'line',
        },
      ],
    }

    return {
      curr_base,
      shed,
      currShedName,
      currShedChange,
      toLast,
      toShed,

      allStatistics,
      videoValue,
      videoOptions,

      memberOption,
      breededOption,
      productEggOption,
      economicOption,
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
      cursor: pointer;
      a {
        text-decoration: none;
        color: #fff;
      }
    }
    li.active {
      background: url(./img/base.jpg) no-repeat center;
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
.echarts6 {
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
// 图表背景
.box-background {
  margin-bottom: 7px;
  height: 28%;
  width: 85%;
  background: url('./img/amiddboxttop.png') no-repeat;
  background-size: 100% 100%;
}
// 图表1
.echarts1 {
  margin: 4px 0;
  padding: 0 15px;
  .cContent {
    padding-top: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    font-weight: 700;
    .c1 {
      padding-left: 15%;
      background: url('./img/dove1.png') no-repeat;
      background-size: 35%;
      background-position: 0 -7px;
    }
    .c2 {
      padding-left: 15%;
      background: url('./img/shedNums.png') no-repeat;
      background-size: 25%;
      background-position: 12px 6px;
    }
    .c3 {
      padding-left: 15%;
      background: url('./img/dove2.png') no-repeat;
      background-size: 20%;
      background-position: 8px 5px;
    }
    .t1 {
      color: #ee4000;
      font-size: 18px;
    }
    .t2 {
      color: #ee9a49;
      font-size: 18px;
    }
    .t3 {
      color: #eee685;
      font-size: 18px;
    }
  }
  .e1 {
    position: absolute;
    right: 30px;
    bottom: 5px;
  }
}
// 图表4
.echarts4 {
  font-weight: 700;
  .center4 {
    display: flex;
    height: 100%;
    .left4,
    .right4 {
      padding: 3% 0 0 6%;
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      font-weight: 700;
    }
    .c1 {
      padding-left: 25%;
      background: url('./img/xiaoshou.png') no-repeat;
      background-size: 25%;
      background-position: 0 0;
    }
    .c2 {
      padding-left: 25%;
      background: url('./img/qiye.png') no-repeat;
      background-size: 31%;
      background-position: 4px 5px;
    }
    .c3 {
      padding-left: 25%;
      background: url('./img/nonghu.png') no-repeat;
      background-size: 20%;
      background-position: 6px 7px;
    }
    .c4 {
      padding-left: 25%;
      background: url('./img/keji.png') no-repeat;
      background-size: 22%;
      background-position: 0 2px;
    }
    .c5 {
      padding-left: 25%;
      background: url('./img/pingtai.png') no-repeat;
      background-size: 25%;
      background-position: 3px 8px;
    }
    .c6 {
      padding-left: 25%;
      background: url('./img/laji.png') no-repeat;
      background-size: 20%;
      background-position: 1px 4px;
    }
    .t1 {
      color: #ee4000;
      font-size: 18px;
    }
    .t2 {
      color: #ee9a49;
      font-size: 18px;
    }
    .t3 {
      color: #eee685;
      font-size: 18px;
    }
  }
}
.echarts2,
.echarts5,
.echarts6,
.centerEcharts {
  display: flex;
  align-items: flex-end;
}

.echarts6 {
  display: flex;
  flex-direction: column;
  .videoSelect {
    align-self: flex-end;
    margin: 20px 10px 5px 0;
  }
  .videoDiv {
    align-self: center;
    .video {
      height: 88%;
    }
  }
}

.echarts3 {
  display: flex;
  justify-content: center;
  align-items: center;
  .map {
    width: 90%;
    height: 90%;
	  padding: 10px 0 20px;
  }
}

.map-echart {
  margin-top: 10px;
  height: 56%;
  width: 100%;
  align-items: center;
  background-size: 100%;
  background-position: 0 -130px;
  .image {
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