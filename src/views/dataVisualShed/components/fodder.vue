// 饲料统计
<template>
  <ScEcharts :option="option" height="100%" width="100%"></ScEcharts>
</template>

<script setup>
import { ref } from "vue"
import ScEcharts from '@/components/scEcharts'
import store from '@/store'
import { getFeedStatistics } from "@api/dataVisual/shed";
const option = ref({
  tooltip: {
    trigger: 'axis',
    formatter: function (c) {
      let str = `<div style="text-align:center">${c[0].axisValue}</div>`
      let temp = {bgcricle: '', seriesName: '', valueData: ''}
      c.forEach((item) => {
        temp.valueData = `<span style="font-weight: 700">${item.value}</span>斤`;
        temp.bgcricle = item.marker
        temp.seriesName = item.seriesName
        str += '<span style="display:flex;justify-content: space-between;">' +  '<span style="margin-right:10px;">' + temp.bgcricle + temp.seriesName +
          '</span>' + '<span>' + temp.valueData + '</span>' + '</span>'
      })
      return str;
    }
  },
  legend: {data: []},
  toolbox: {show: true, orient: 'horizontal', left: 'right', top: 'top', feature: {dataView: { show: true, readOnly: false }, saveAsImage: { show: true }}},
  xAxis: [{type: 'category', axisTick: { show: false }, data: []}],
  yAxis: [{type: 'value'}],
  series: []
})

getFeedStatistics(store.state.baseInfo.SHED_ID).then((res) => {
  const datas = res.data.data
  if(datas.length === 0) return
  option.value.xAxis.data = []
  option.value.series.data = []
  for(let i = 1; i <= 4; i++) {option.value.xAxis[0].data.push(`第${i}周`)}
  for(let key in datas) {
    datas[key].forEach(item => {
      if(item.length !== 0) option.value.series.push({name: item.brand, type: 'bar', barGap: 0, emphasis: {focus: 'series'}, data: []})
    })
  }
  for(let key in datas) {
    if(datas[key].length === 0) for(let i = 0; i < option.value.series.length; i++) {option.value.series[i].data.push(0)}
    datas[key].forEach((item, index) => {option.value.series[index].data.push(item.weight)})
  }
  
})
</script>