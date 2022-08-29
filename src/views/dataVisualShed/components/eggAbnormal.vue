// 蛋异常统计
<template>
  <ScEcharts :option="option" height="85%" width="100%"></ScEcharts>
</template>

<script setup>
import ScEcharts from '@/components/scEcharts'
import { ref } from "vue"
import store from '@/store'
import { getEggAbnormal } from "@api/dataVisual/shed";
const option = ref({
  tooltip: {trigger: 'item'},
  legend: {top: 'top'},
  series: [{name: '蛋异常统计', type: 'pie', radius: '70%', label: {show: false},data: [], 
          emphasis: {itemStyle: {shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)'}}}]
})
getEggAbnormal(store.state.baseInfo.SHED_ID).then(res => {
  option.value.series[0].data = []
  for(let key in res.data.data[0]) {
    switch (key) {
      case 'code': continue;
      case 'countEggState1': option.value.series[0].data.push({value: res.data.data[0][key], name: '单蛋'}); continue;
      case 'countEggState2': option.value.series[0].data.push({value: res.data.data[0][key], name: '光蛋1'}); continue;
      case 'countEggState3': option.value.series[0].data.push({value: res.data.data[0][key], name: '光蛋2'}); continue;
      case 'countEggState4': option.value.series[0].data.push({value: res.data.data[0][key], name: '踩蛋1'}); continue;
      case 'countEggState5': option.value.series[0].data.push({value: res.data.data[0][key], name: '踩蛋2'}); continue;
    }
  }
})
</script>