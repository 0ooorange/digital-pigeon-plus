<template>
    <div class="biaoge" style="width:99%; height:32vh" id="main"></div>
</template>
<script>
import * as echarts from 'echarts';
export default {
      methods:{
          initEcharts() {
           const option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {

    data: ['温度', '湿度', '二氧化碳', '光照强度', 'PM2.5','氮气']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['00:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'],
  },
  yAxis: {
    type: 'value',
     data: ['0', '300', '600', '900', '1200', '1500'],
   
  },
  series: [
    {
      name: '温度',
      type: 'line',
      stack: 'Total',
      data: [10, 20, 40, 60, 10, 90, 50]
    },
    {
      name: '湿度',
      type: 'line',
      stack: 'Total',
      data: [20, 12, 11, 64, 90, 53, 100]
    },
    {
      name: '二氧化碳',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '光照强度',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'PM2.5',
      type: 'line',
      stack: 'Total',
      data: [100, 93, 351, 74, 160, 300, 400]
    },
     {
      name: '氮气',
      type: 'line',
      stack: 'Total',
      data: [120, 250, 100, 98,500, 420, 200]
    }
  ]
};
    const myChart = echarts.init(document.getElementById("main"));// 图标初始化
      myChart.setOption(option);// 渲染页面
        }
     },
      mounted() {
        this.initEcharts();
    },
}
</script>
<style scoped>

</style>