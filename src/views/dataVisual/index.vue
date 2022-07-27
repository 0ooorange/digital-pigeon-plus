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
      <h1 class="top_center">广东省数字鸽业云服务平台</h1>
      <div class="top_right">
        <ul>
          <li>
            <router-link to="/navigator">返回</router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="content">
      <div class="left">
        <div class="echarts1 box-background">
          <div class="title">广东总经济产值、养殖人员、从业人员</div>
          <ul class="echart1_content">
            <li class="text1">
              <span>总经济产值(亿)：</span><span class="li1">2340</span>
            </li>
            <li class="text1">
              <span>养殖企业：</span><span class="li2">105</span>
            </li>
            <li class="text1">
              <span>从业人员：</span><span class="li3">3043</span>
            </li>
          </ul>
          <ScEcharts class="e1" :option="allStatistics" height="80%" width="70%"></ScEcharts>
        </div>
        <div class="echarts2 box-background">
          <div class="title">广东销售额走势（千万元）</div>
          <ScEcharts :option="saleRoomOption" height="100%" width="100%"></ScEcharts>
        </div>
        <div class="echarts3 box-background">
          <div class="title">广东价格走势（元/只）</div>
          <ScEcharts :option="priceOption" height="90%" width="100%"></ScEcharts>
        </div>
      </div>
      <div class="center">
        <div ref="mapEcharts" class="map-echart"></div>
        <div class="box-background centerEcharts">
          <div class="title">广东养殖基础信息</div>
          <div class="centerContent">
            <div class="cContent">
              <span class="c1">
                <div>乳鸽出栏数（千万）</div>
                <div class="t1">68420</div>
              </span>
              <span class="c2">
                <div>种鸽出栏数（千万）</div>
                <div class="t2">4082</div>
              </span>
            </div>
            <div class="cContent">
              <span class="c3">
                <div>活鸽出口数（吨）</div>
                <div class="t3">4082</div>
              </span>
              <span class="c4">
                <div>冰鲜鸽出口数（吨）</div>
                <div class="t4">4208</div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="echarts4 box-background">
          <div class="title">广东知名品牌</div>
          <div class="echarts4-img">
            <img class="image" src="./img/variety1.jpg" alt="error">
          </div>
        </div>
        <div class="echarts5 box-background">
          <div class="title">广东种鸽、乳鸽存(出)栏量（万）</div>
          <ScEcharts class="" :option="outCageOption" height="90%" width="100%"></ScEcharts>
        </div>
        <div class="echarts6 box-background">
          <div class="title">广东历年养殖规模（万）</div>
          <ScEcharts class="" :option="breededOption" height="90%" width="100%"></ScEcharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GuangDongData from './GuangDong.json'

import * as echarts from 'echarts'
import ScEcharts from '@/components/scEcharts'

import { ref, nextTick, reactive } from 'vue'

import tool from '@/utils/tool'
import router from '@/router'
import { getBaseAndShed } from '@api/bases/layout'

export default {
  name: 'dataVisual',
  components: {
    ScEcharts,
  },
  setup() {
    // 基地和棚
    let baseInfo = tool.data.get('BASE_INFO')
    getBaseAndShed(baseInfo.id).then((res) => {
      console.log('res', res)
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

    // 地图
    let timer = null
    const seriesData = reactive([
      { name: '广州市', value: 10057.34 },
      { name: '梅州市', value: 45477.48 },
      { name: '潮州市', value: 31686.1 },
      { name: '揭阳市', value: 6992.6 },
    ])
    let map = null
    const setTimer = () => {
      // 当前选中区域的下标
      let curIndex = -1
      timer && clearInterval(timer)
      timer = setInterval(() => {
        const len = seriesData.length
        // dispatchAction是主动去触发echarts事件，取消高亮当前的数据图形
        map.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: curIndex,
        })
        // 下一个选中区域的下标
        curIndex = (curIndex + 1) % len
        // 高亮下一个数据图形
        map.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: curIndex,
        })
        // 显示tooltip
        map.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: curIndex,
        })
      }, 2000)
    }
    const clearTimer = () => {
      timer && clearInterval(timer)
    }
    //  const beforeDestroy = () => {
    //  clearTimer()
    //  }
    const mapEcharts = ref(null)
    const initMapEcharts = () => {
      // 获取地图数据
      // 将下载后的json文件放置/public目录下
      // 使用数据注册地图
      echarts.registerMap('GuangDong', GuangDongData)
      nextTick(() => {
        // 初始化地图
        map = echarts.init(mapEcharts.value)
        // 设置基础配置项
        const option = {
          // 悬浮窗
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              return `${params.name}: ${params.value || 0}`
            },
          },
          // 图例
          visualMap: {
            min: 800,
            max: 50000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['#07a3d7', 'yellow', 'orangered'],
            },
          },
          // 要显示的散点数据
          series: [
            {
              type: 'map',
              map: 'GuangDong',
              // 这是要显示的数据
              data: seriesData,
              // 自定义命名映射，不设置的话，label默认是使用 geoJson中的name名
              nameMap: {
                广州市: '广州市',
                梅州市: '梅州市',
              },
            },
          ],
        }
        // 将配置应用到地图上
        map.setOption(option)
        // 设置定时器，自动循环触发tooltip悬浮窗事件
        setTimer()
        // 当鼠标在地图上时，停止自动tooltip事件
        map.on('mouseover', { series: 0 }, function () {
          clearTimer()
        })
        // 当鼠标移出地图后，再自动tooltip
        map.on('mouseout', { series: 0 }, function () {
          setTimer()
        })
        map.on('click', function (e) {
          if (e.name === '梅州市') {
            // 在此处跳转至基地可视化页面
            console.log('梅州市')
            router.push({
              path: '/dataVisualShed',
            })
          }
        })
      })
    }
    initMapEcharts()

    // echarts1
    const allStatistics = {
      title: {
        text: '销售额',
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
      legend: {
        orient: 'vertical',
        left: 'right',
      },
      series: [
        {
          name: '销售额',
          type: 'pie',
          radius: '70%',
          label: {
            show: false,
          },
          data: [
            { value: 580, name: '乳鸽' },
            { value: 300, name: '种鸽' },
            { value: 80, name: '鸽蛋' },
            { value: 40, name: '其他' },
          ],
        },
      ],
    }

    // echarts2
    const saleRoomOption = {
      xAxis: {
        type: 'category',
        data: ['2019', '2020', '2021', '2022'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [880, 900, 1280, 1360],
          type: 'line',
        },
      ],
    }

    // echarts3
    const priceOption = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['乳鸽', '老鸽', '鸽蛋'],
      },
      xAxis: {
        type: 'category',
        data: ['7月', '8月', '9月', '10月', '11月'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '乳鸽',
          type: 'line',
          data: [15, 14, 15, 13, 15],
        },
        {
          name: '老鸽',
          type: 'line',
          data: [12, 12, 13, 14, 14],
        },
        {
          name: '鸽蛋',
          type: 'line',
          data: [3, 3, 3, 3, 3],
        },
      ],
    }

    // echarts5
    const outCageOption = {
      legend: {
        data: ['乳鸽出栏', '种鸽出栏', '乳鸽存栏', '种鸽存栏'],
      },
      dataset: {
        source: [
          ['year', '乳鸽出栏', '种鸽出栏', '乳鸽存栏', '种鸽存栏'],
          ['2019', 47, 38, 1, 2],
          ['2020', 51, 42, 1, 2],
          ['2021', 47, 38, 1, 2],
          ['2022', 49, 43, 1, 2],
        ],
      },
      xAxis: {
        type: 'category',
        data: ['2019', '2020', '2021', '2022'],
      },
      yAxis: {
        type: 'value',
      },
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
    }

    // echarts6
    const breededOption = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['种鸽', '乳鸽'],
      },
      xAxis: {
        type: 'category',
        data: ['2019', '2020', '2021', '2022'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '种鸽',
          type: 'line',
          data: [2430, 2920, 3000, 2340],
        },
        {
          name: '乳鸽',
          type: 'line',
          data: [0, 0, 0, 0],
        },
      ],
    }

    return {
      breededOption,
      mapEcharts,

      allStatistics,
      saleRoomOption,
      priceOption,
      outCageOption,
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
      a {
        text-decoration: none;
        color: #fff;
      }
    }
  }
}

// 内容部分
.content {
  display: flex;
  margin-top: 10px;
  justify-content: center;
  height: 100%;
  .left {
    width: 34%;
    justify-content: flex-start;
    flex-direction: column;
  }
  .right {
    display: flex;
    width: 34%;
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
  padding: 0 30px 20px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  .echart1_content {
    position: absolute;
    left: 40px;
    bottom: 5px;
    height: 80%;
    .text1 {
      padding-left: 2px;
      display: flex;
      align-items: center;
      height: 30%;
      font-weight: 700;
    }
    .li1 {
      color: #ee4000;
      font-size: 18px;
    }
    .li2 {
      color: #ee9a49;
      font-size: 18px;
    }
    .li3 {
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
  display: flex;
  justify-content: center;
  align-items: center;
  .echarts4-img {
    margin-top: 10px;
    height: 80%;
    .image {
      height: 100%;
    }
  }
}
// 图表3、图表5
.echarts3,
.echarts5,
.echarts6,
.centerEcharts {
  display: flex;
  align-items: flex-end;
}

.map-echart {
  margin-top: 10px;
  height: 400px;
  width: 400px;
  align-items: center;
}
.centerEcharts {
  justify-content: center;
  padding: 0 0 10px 0;
  height: 28%;
  width: 100%;
  .centerContent {
    width: 90%;
    height: 90%;
    .cContent {
      height: 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-weight: 700;
      .c1 {
        padding-left: 15%;
        background: url('./img/dove1.png') no-repeat;
        background-size: 35%;
        background-position: 0 -10px;
      }
      .c2 {
        padding-left: 15%;
        background: url('./img/dove2.png') no-repeat;
        background-size: 20%;
        background-position: 10px 4px;
      }
      .c3 {
        padding-left: 15%;
        background: url('./img/dove1.png') no-repeat;
        background-size: 35%;
        background-position: 0 -10px;
      }
      .c4 {
        padding-left: 15%;
        background: url('./img/dove3.png') no-repeat;
        background-size: 25%;
        background-position: 5px -2px;
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
      .t4 {
        color: #43cd80;
        font-size: 18px;
      }
    }
  }
}
</style>