// 产蛋统计
<template>
  <ScEcharts :option="option" height="100%" width="100%"></ScEcharts>
</template>

<script setup>
import ScEcharts from '@/components/scEcharts'
import { ref } from 'vue'
import { getLayEggNumStatistics } from '@api/dataVisual/shed'
import store from '@/store'
import { dateFormat } from '@/hooks/dateFormat.js'
const option = ref({
  tooltip: {
    trigger: 'axis',
    formatter: function (c) {
      let str = `<div style="text-align:center">${c[0].axisValue}</div>`
      let temp = {bgcricle: '', seriesName: '', valueData: ''}
      c.forEach((item) => {
        temp.valueData = `<span style="font-weight: 700">${item.value}</span>个`;
        temp.bgcricle = item.marker
        temp.seriesName = item.seriesName
        str += '<span style="display:flex;justify-content: space-between;">' +  '<span style="margin-right:10px;">' + temp.bgcricle + temp.seriesName +
          '</span>' + '<span>' + temp.valueData + '</span>' + '</span>'
      })
      return str;
    }
  },
  xAxis: {boundaryGap: false, type: 'category', data: []},
  yAxis: [{type: 'value', name: '产蛋数', splitLine: {show: false}}],
  series: [{name: '产蛋数', type: 'line', symbol: 'none', lineStyle: {width: 1, color: '#409EFF'},
          areaStyle: {opacity: 0.1, color: '#79bbff'}, data: []}],
})

getLayEggNumStatistics(store.state.baseInfo.SHED_ID).then(res => {
  for(let i = 0; i < 7; i++) {
    if(res.data.data[`day${i}`][0]) {option.value.series[0].data.push(res.data.data[`day${i}`][0].countLayEgg)}
    else {option.value.series[0].data.push(0)}
  }
})

// 设置x轴
let end = +new Date()
let start = +new Date()
let end_time = new Date()
start = parseInt(start - 3600 * 1000 * 24 * 7)
let timeArr = ref([])
let times = parseInt(end - start)
let timeNums = times / 6
for (let i = 0; i < 6; i++) { timeArr.value.push(dateFormat(new Date(parseInt(start + timeNums * i)))) }
timeArr.value.push(dateFormat(end_time))
option.value.xAxis.data = timeArr
</script>