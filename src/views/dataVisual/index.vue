<template>
  <div class="body">
    <header>
      <h1>数字鸽业精准管控云服务平台</h1>
      <div class="showTime"></div>
    </header>
    <!-- 页面主体部分 -->
    <section class="mainbox">
      <div class="column">
        <div class="panel bar">
          <h2>基地信息</h2>
          <div class="chart">
          </div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line">
          <h2>
            环境监控
          </h2>
          <div class="chart">图表</div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2>视频监控</h2>
          <div class="chart">图表</div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column">
        <!-- no模块制作 -->
        <!-- <div class="no">
          <div class="no-hd">
            <ul>
              <li>125811</li>
              <li>100000</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>前端需求人数</li>
              <li>市场供应人数</li>
            </ul>
          </div>
        </div> -->
        <!-- 转圈模块 -->
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
          <div class="chart"></div>
        </div>
      </div>
      <div class="column">
        <div class="panel bar2">
          <h2>产蛋数量统计</h2>
          <div class="chart">
            <scEcharts :option="option"></scEcharts>
          </div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line2">
          <h2>蛋异常统计</h2>
          <div class="chart">图表</div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie2">
          <h2>养殖品种介绍</h2>
          <div class="chart">
          </div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import './js/flexible.js'
import scEcharts from '@/components/scEcharts'
// import './js/index.js'
export default {
  name: 'dataVisual',
  components: {
    scEcharts,
  },
  setup() {
    const option = {
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
      option,
    }
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li {
  list-style: none;
}
/* 声明字体*/
@font-face {
  font-family: electronicFont;
  src: url(./fonts/DS-DIGIT.TTF);
}
.body {
  background: url(./images/bg.jpg) no-repeat top center;
  line-height: 1.15;
}
header {
  position: relative;
  height: 1.25rem;
  background: url(./images/head_bg.png) no-repeat;
  background-size: 100% 100%;
}
header h1 {
  font-size: 0.475rem;
  color: #fff;
  text-align: center;
  line-height: 1rem;
}
header .showTime {
  position: absolute;
  right: 0.375rem;
  top: 0;
  line-height: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.25rem;
}
.mainbox {
  display: flex;
  min-width: 1024px;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0.125rem 0.125rem 0;
}
.mainbox .column {
  flex: 3;
}
.mainbox .column:nth-child(2) {
  flex: 5;
  margin: 0 0.125rem 0.1875rem;
  overflow: hidden;
}
.mainbox .panel {
  position: relative;
  height: 3.875rem;
  padding: 0 0.1875rem 0.5rem;
  border: 1px solid rgba(25, 186, 139, 0.17);
  margin-bottom: 0.1875rem;
  background: url(./images/line\(1\).png) rgba(255, 255, 255, 0.03);
}
.mainbox .panel::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: '';
}
.mainbox .panel::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: '';
}
.mainbox .panel .panel-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.mainbox .panel .panel-footer::before {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: '';
}
.mainbox .panel .panel-footer::after {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: '';
}
.mainbox .panel h2 {
  height: 0.6rem;
  color: #fff;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.25rem;
  font-weight: 400;
}
.mainbox .panel h2 a {
  color: #fff;
  text-decoration: none;
  margin: 0 0.125rem;
}
.mainbox .panel .chart {
  height: 3rem;
}
.no {
  background: rgba(101, 132, 226, 0.1);
  padding: 0.1875rem;
}
.no .no-hd {
  position: relative;
  border: 1px solid rgba(25, 186, 139, 0.17);
}
.no .no-hd::before {
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  width: 30px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.no .no-hd::after {
  position: absolute;
  bottom: 0;
  right: 0;
  content: '';
  width: 30px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
}
.no .no-hd ul {
  display: flex;
}
.no .no-hd ul li {
  position: relative;
  flex: 1;
  line-height: 1rem;
  font-size: 0.875rem;
  color: #ffeb7b;
  text-align: center;
  font-family: 'electronicFont';
}
.no .no-hd ul li::after {
  content: '';
  position: absolute;
  top: 25%;
  right: 0;
  height: 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.2);
}
.no .no-bd ul {
  display: flex;
}
.no .no-bd ul li {
  flex: 1;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.225rem;
  height: 0.5rem;
  line-height: 0.5rem;
  padding-top: 0.125rem;
}
.map {
  position: relative;
  height: 10.125rem;
}
.map .map1 {
  width: 6.475rem;
  height: 6.475rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url(./images/map.png);
  background-size: 100% 100%;
  opacity: 0.3;
}
.map .map2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8.0375rem;
  height: 8.0375rem;
  background: url(./images/lbx.png);
  animation: rotate1 15s linear infinite;
  opacity: 0.6;
  background-size: 100% 100%;
}
.map .map3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 7.075rem;
  height: 7.075rem;
  background: url(./images/jt.png);
  animation: rotate2 10s linear infinite;
  opacity: 0.6;
  background-size: 100% 100%;
}
.map .chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10.125rem;
}
@keyframes rotate1 {
  form {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes rotate2 {
  form {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
/* 约束屏幕尺寸 */
@media screen and (max-width: 1024px) {
  html {
    font-size: 42px !important;
  }
}
@media screen and (min-width: 1920px) {
  html {
    font-size: 80px !important;
  }
}
</style>