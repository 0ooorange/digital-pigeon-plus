<template>
  <ScEcharts :option="environmentOption"></ScEcharts>
</template>
<script setup>
import ScEcharts from '@/components/scEcharts'
import { ref, defineProps } from 'vue'
import { getSensorByIDTypeTime } from '@api/breeding/breedStatistics'
import { dateFormat } from '@/hooks/dateFormat.js'

const props = defineProps({shed_id: {type: String, require: true}, start_time: {type: Object, require: true}, end_time: {type: Object, require: true}})

const environmentOption = ref({
  tooltip: {
    trigger: 'axis',
    formatter: function (c) {
      let str = `<div style="text-align:center">${c[0].axisValue}</div>`
      let temp = {
        bgcricle: '', // 颜色
        seriesName: '', // 标签
        valueData: '', // 数值
      }
      c.forEach((item) => {
        switch (item.seriesName) {
          case '温度': temp.valueData = `<span style="font-weight: 700">${item.value}</span>℃`; break;
          case '湿度': temp.valueData = `<span style="font-weight: 700">${item.value}</span>%`; break;
          case '二氧化碳': temp.valueData = `<span style="font-weight: 700">${item.value}</span>ppm`; break;
          case '光照强度': temp.valueData = `<span style="font-weight: 700">${item.value}</span>Lux`; break;
          case '硫化氢': temp.valueData = `<span style="font-weight: 700">${item.value}</span>ppm`; break;
          case '氨气': temp.valueData = `<span style="font-weight: 700">${item.value}</span>ppm`; break;
          case '噪音': temp.valueData = `<span style="font-weight: 700">${item.value}</span>dB`; break;
          default: temp.valueData = item.value; break;
        }
        temp.bgcricle = item.marker
        temp.seriesName = item.seriesName
        str += '<span style="display:flex;justify-content: space-between;">' +  '<span style="margin-right:10px;">' + temp.bgcricle + temp.seriesName +
          '</span>' + '<span>' + temp.valueData + '</span>' + '</span>'
      })
      return str
    },
  },
  legend: { data: ['温度', '湿度', '二氧化碳', '光照强度', '硫化氢', '氨气', '噪音']},
  grid: {left: '3%', right: '4%', bottom: '3%', containLabel: true},
  toolbox: {feature: {saveAsImage: {}}},
  xAxis: {type: 'category', boundaryGap: false, data: []},
  yAxis: {type: 'value'},
  series: [
    {name: '温度', type: 'line', stack: 'all', data: []},
    {name: '湿度', type: 'line', stack: 'all', data: []},
    {name: '二氧化碳', type: 'line', stack: 'all', data: []},
    {name: '光照强度', type: 'line', stack: 'all', data: []},
    {name: '硫化氢', type: 'line', stack: 'all', data: []},
    {name: '氨气', type: 'line', stack: 'all', data: []},
    {name: '噪音', type: 'line', stack: 'all', data: []}
  ]
})

// 设置传感器数据x轴
let timeArr = ref([])
let start = +new Date(props.start_time)
let end = +new Date(props.end_time)
let times = parseInt(end - start)
let timeNums = times / 6
for (let i = 0; i < 6; i++) { timeArr.value.push(dateFormat(new Date(parseInt(start + timeNums * i)))) }
timeArr.value.push(dateFormat(end))
environmentOption.value.xAxis.data = timeArr

// 获取传感器数据
getSensorByIDTypeTime(props.shed_id, '空气温度', dateFormat(props.start_time), dateFormat(props.end_time)).then((res) => {
  let num = parseInt(res.data.data.length / 6)
  let valueArr = []
  for (let i = 0; i < num * 6; i += num) { valueArr.push(res.data.data[i].datavalue) }
  valueArr.push(res.data.data[res.data.data.length - 1].datavalue)
  environmentOption.value.series[0].data = valueArr
})
getSensorByIDTypeTime(props.shed_id, '空气湿度', dateFormat(props.start_time), dateFormat(props.end_time)).then((res) => {
  let num = parseInt(res.data.data.length / 6)
  let valueArr = []
  for (let i = 0; i < num * 6; i += num) { valueArr.push(res.data.data[i].datavalue) }
  valueArr.push(res.data.data[res.data.data.length - 1].datavalue)
  environmentOption.value.series[1].data = valueArr
})
getSensorByIDTypeTime(props.shed_id, '光照强度', dateFormat(props.start_time), dateFormat(props.end_time)).then((res) => {
  let num = parseInt(res.data.data.length / 6)
  let valueArr = []
  for (let i = 0; i < num * 6; i += num) { valueArr.push(res.data.data[i].datavalue) }
  valueArr.push(res.data.data[res.data.data.length - 1].datavalue)
  environmentOption.value.series[3].data = valueArr
})
getSensorByIDTypeTime(props.shed_id, '二氧化碳', dateFormat(props.start_time), dateFormat(props.end_time)).then((res) => {
  let num = parseInt(res.data.data.length / 6)
  let valueArr = []
  for (let i = 0; i < num * 6; i += num) { valueArr.push(res.data.data[i].datavalue) }
  valueArr.push(res.data.data[res.data.data.length - 1].datavalue)
  environmentOption.value.series[2].data = valueArr
})
getSensorByIDTypeTime(props.shed_id, '氨气浓度', dateFormat(props.start_time), dateFormat(props.end_time)).then((res) => {
  let num = parseInt(res.data.data.length / 6)
  let valueArr = []
  for (let i = 0; i < num * 6; i += num) { valueArr.push(res.data.data[i].datavalue) }
  valueArr.push(res.data.data[res.data.data.length - 1].datavalue)
  environmentOption.value.series[5].data = valueArr
})
getSensorByIDTypeTime(props.shed_id, '硫化氢', dateFormat(props.start_time), dateFormat(props.end_time)).then((res) => {
  let num = parseInt(res.data.data.length / 6)
  let valueArr = []
  for (let i = 0; i < num * 6; i += num) { valueArr.push(res.data.data[i].datavalue) }
  valueArr.push(res.data.data[res.data.data.length - 1].datavalue)
  environmentOption.value.series[4].data = valueArr
})
getSensorByIDTypeTime(props.shed_id, '噪音', dateFormat(props.start_time), dateFormat(props.end_time)).then((res) => {
  let num = parseInt(res.data.data.length / 6)
  let valueArr = []
  for (let i = 0; i < num * 6; i += num) { valueArr.push(res.data.data[i].datavalue) }
  valueArr.push(res.data.data[res.data.data.length - 1].datavalue)
  environmentOption.value.series[6].data = valueArr
})
</script>