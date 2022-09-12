// 仔数统计
<template>
  <ScEcharts :option="option" height="85%" width="100%"></ScEcharts>
</template>

<script setup>
import ScEcharts from '@/components/scEcharts'
import { ref, defineProps } from 'vue'
import store from '@/store'
import { dateFormat } from '@/hooks/dateFormat.js'
import { getCubStatistics } from "@api/dataVisual/shed";

const props = defineProps({start_time: {type: Object, require: true}, end_time: {type: Object, require: true}})
const option = ref({
  tooltip: {trigger: 'item'}, 
  legend: {top: 'top'},
  series: [{name: '仔数统计', type: 'pie', radius: '70%', label: {show: false}, data: [],
          emphasis: {itemStyle: {shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)'}}}],
})
getCubStatistics(store.state.baseInfo.SHED_ID, dateFormat(props.start_time), dateFormat(props.end_time)).then(res => {
  option.value.series[0].data = []
  for(let key in res.data.data[0]) {
    switch (key) {
      case 'code': continue;
      case 'countDeadCub': option.value.series[0].data.push({value: res.data.data[0][key], name: '死仔数'}); continue;
      case 'countOutCub': option.value.series[0].data.push({value: res.data.data[0][key], name: '出仔数'}); continue;
      case 'num': option.value.series[0].data.push({value: res.data.data[0][key], name: '出栏数'}); continue;
    }
  }
})
</script>