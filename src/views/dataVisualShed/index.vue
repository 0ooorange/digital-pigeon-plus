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
      <h1 class="top_center">金绿现代农业发展有限公司</h1>
      <div class="top_right">
        <ul>
          <li>
            <router-link to="/dataVisual">返回</router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="content">
      <div class="left">
        <div class="echarts1 box-background">
          <div class="title">视频监控</div>
          <div class="videoSelect">
            <el-select style="width: 100px;" v-model="videoValue" placeholder="监控1">
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
        <div class="echarts2 box-background">
          <div class="title">蛋异常统计</div>
          <ScEcharts :option="eggAbnormalOption" height="90%" width="100%"></ScEcharts>
        </div>
        <div class="echarts3 box-background">
          <div class="title">产蛋统计</div>
          <ScEcharts :option="productEggOption" height="90%" width="100%"></ScEcharts>
        </div>
      </div>
      <div class="center">
        <div class="map-echart">
          <img class="image" src="./img/shed.png" alt="error">
        </div>
        <div class="box-background centerEcharts">
          <div class="title">环境参数</div>
          <ScEcharts class="e1" :option="environmentOption " height="85%" width="90%"></ScEcharts>
        </div>
      </div>
      <div class="right">
        <div class="echarts4 box-background">
          <div class="title">养殖品种介绍</div>
          <div class="echarts4-img">
            <img class="image" src="./img/variety1.jpg" alt="error">
          </div>
        </div>
        <div class="echarts5 box-background">
          <div class="title">出栏统计</div>
          <ScEcharts class="" :option="outCageOption" height="90%" width="100%"></ScEcharts>
        </div>
        <div class="echarts6 box-background">
          <div class="title">饲料统计</div>
          <ScEcharts class="" :option="fodderOption " height="90%" width="100%"></ScEcharts>
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
          }
        })
      })
    }
    initMapEcharts()

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
    const environmentOption = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['温度', '湿度', '二氧化碳', '光照强度', 'PM2.5', '氮气'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '温度',
          type: 'line',
          stack: 'Total',
          data: ['100', '70', '40', '60', '50', '90', '80'],
        },
        {
          name: '湿度',
          type: 'line',
          stack: 'Total',
          data: ['20', '62', '31', '64', '90', '73', '100'],
        },
        {
          name: '二氧化碳',
          type: 'line',
          stack: 'Total',
          data: ['30', '232', '201', '154', '190', '330', '410'],
        },
        {
          name: '光照强度',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: 'PM2.5',
          type: 'line',
          stack: 'Total',
          data: [100, 93, 351, 74, 160, 300, 400],
        },
        {
          name: '氮气',
          type: 'line',
          stack: 'Total',
          data: [120, 250, 100, 98, 500, 420, 200],
        },
      ],
    }

    // echarts2
    const eggAbnormalOption = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        // orient: 'vertical',
        top: 'top',
      },
      series: [
        {
          name: '蛋异常统计',
          type: 'pie',
          radius: '70%',
          label: {
            show: false,
          },
          data: [
            { value: 1048, name: '单蛋' },
            { value: 735, name: '光蛋1' },
            { value: 484, name: '光蛋2' },
            { value: 580, name: '踩蛋1' },
            { value: 300, name: '踩蛋2' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
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
    const outCageOption = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        // orient: 'vertical',
        top: 'top',
      },
      series: [
        {
          name: '出栏统计',
          type: 'pie',
          radius: '70%',
          label: {
            show: false,
          },
          data: [
            { value: 100, name: '死仔数' },
            { value: 2000, name: '出栏数' },
            { value: 3000, name: '出仔数' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }

    // echarts6
    const fodderOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['饲料A', '饲料B'],
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['1', '5', '10', '15', '20', '25', '30'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '饲料A',
          type: 'bar',
          barGap: 0,
          emphasis: {
            focus: 'series',
          },
          data: [320, 332, 301, 334, 390, 260, 330],
        },
        {
          name: '饲料B',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          data: [220, 182, 191, 234, 290, 180, 270],
        },
      ],
    }

    return {
      fodderOption,
      mapEcharts,

      videoValue,
      videoOptions,

      environmentOption,
      eggAbnormalOption,
      productEggOption,
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
.echarts2,
.echarts3,
.echarts5,
.echarts6,
.centerEcharts {
  display: flex;
  align-items: flex-end;
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