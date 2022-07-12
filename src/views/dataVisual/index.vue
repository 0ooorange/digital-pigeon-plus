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
      <h1 class="top_center">数字鸽业云服务平台</h1>
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
        <!-- <div class="pl25 amiddboxttop baseInfoCss">
          <div>养殖基础信息</div>
        </div> -->
        <div class="productEggEcharts">
          <ScEcharts class="productEggEcharts" :option="productEggOption"></ScEcharts>
        </div>
        <div></div>
        <div></div>
      </div>
      <div ref="mapEcharts" class="map-echart"></div>
      <div class="right">
        <div class="">
          <div></div>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

  </div>
</template>

<script>
import ScEcharts from '@/components/scEcharts'
import SlideTable from './components/slideTable'
import { ref, getCurrentInstance, reactive } from 'vue'
import GuangDongData from './GuangDong.json'

import * as echarts from 'echarts'

export default {
  name: 'dataVisual',
  components: {
    ScEcharts,
    SlideTable,
  },
  setup() {
    // 右上角
    const { proxy } = getCurrentInstance()
    const currOperator = ref('')
    const bases = ref([])
    const dovecotes = ref([])
    const currBase = ref({})
    const currShed = ref({})
    const currInfo = ref({})
    const baseInfo = proxy.$TOOL.data.get('BASE_INFO')
    bases.value = baseInfo.base
    dovecotes.value = baseInfo.shed
    currInfo.value = proxy.$TOOL.data.get('CURR_INFO')
    if (currInfo.value) {
      currBase.value = currInfo.value.CURR_BASE
      currShed.value = currInfo.value.CURR_SHED
      currOperator.value = currInfo.value.CHARGE_NAME
    } else {
      currBase.value = bases.value[0]
      currShed.value = dovecotes.value[0]
      currOperator.value = baseInfo.chargeName
    }
    // 切换基地
    const currBaseChange = async function () {
      const { data: changeBaseRes } = await this.$API.layout.changeBase.post(currBase.value.id)
      const { data: changeShedRes } = await this.$API.layout.getChargeName.post(
        currShed.value.chargeId
      )
      dovecotes.value = changeBaseRes.shed
      currOperator.value = changeShedRes.chargeName
      currInfo.value = ref({
        CURR_BASE: currBase.value,
        CURR_SHED: currShed.value,
        CHARGE_NAME: currOperator.value,
      })
      this.$TOOL.data.set('CURR_INFO', currInfo.value)
      // changeBaseRes.
    }
    // 切换鸽棚
    const currShedChange = async function (currShedName) {
      var { data: changeShedRes } = await this.$API.layout.getChargeName.post(
        currShed.value.chargeId
      )
      currOperator.value = changeShedRes.chargeName
      for (var i = 0; i < dovecotes.value.length; i++) {
        for (var key in dovecotes.value[i]) {
          if (key === currShedName) currShed.value = dovecotes.value[i]
        }
      }
      currInfo.value = {
        CURR_BASE: currBase.value,
        CURR_SHED: currShed.value,
        CHARGE_NAME: currOperator.value,
      }
      this.$TOOL.data.set('CURR_INFO', currInfo.value)
    }
    // 时间选择器
    const dateValue = ref([''])
    dateValue.value = reactive({
      text: '近一个月',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        return [start, end]
      },
    })
    const shortcuts = [
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
    ]
    const videoUrl = ref('')

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
    const initMapEcharts = () => {
      // 获取地图数据
      // 将下载后的json文件放置/public目录下
      // 使用数据注册地图
      echarts.registerMap('GuangDong', GuangDongData)
      proxy.$nextTick(() => {
        // 初始化地图
        map = echarts.init(proxy.$refs['mapEcharts'])
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
      })
    }
    initMapEcharts()

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

    return {
      currOperator,
      currBase,
      currShed,
      bases,
      dovecotes,
      dateValue,
      shortcuts,
      videoUrl,
      currBaseChange,
      currShedChange,
      productEggOption,
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
.top {
  display: flex;
  height: 8%;
  width: 100%;
  align-items: center;
  .top_left {
    width: 33%;
    ul {
      padding-top: 38px;
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
.content {
  display: flex;
  justify-content: center;
}
.map-echart {
  margin-top: 10px;
  height: 400px;
  width: 400px;
  // background-color: rgba(128, 137, 165, 0.8);
  align-items: center;
}
.left {
  width: 28%;
  .amiddboxttop {
    // background: url('./img/amiddboxttop.png') no-repeat;
    // background-size: 50% 24%;
  }
  .baseInfoCss {
    width: 28%;
    height: 24%;
  }
  .productEggEcharts {
    z-index: 100;
    height: 26%;
  }
}
.right {
  width: 28%;
}
.pl25 {
  padding-left: 25px;
}
</style>