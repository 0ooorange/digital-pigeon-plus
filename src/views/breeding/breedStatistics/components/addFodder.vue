<template>
  <ScEcharts :option="option" height="100%" width="100%"></ScEcharts>
</template>
<script setup>
import ScEcharts from '@/components/scEcharts'
import { ref, defineProps } from 'vue'
import { getFeedShedByIDTime } from '@api/breeding/breedStatistics'
import { dateFormat } from '@/hooks/dateFormat.js'
const props = defineProps({shed_id: {type: String, require: true}, start_time: {type: Object, require: true}, end_time: {type: Object, require: true}})
const option = ref({
  tooltip: {trigger: 'item'},
  legend: {bottom: 10, left: 'center', data: ['鸽料138', '中粮']},
  series: [{name: '单位：斤', type: 'pie', radius: '60%', label: {show: false}, data: [{name: '鸽料138', value: '2080'}, {name: '中粮', value: '2680'}]}]
})

getFeedShedByIDTime(props.shed_id, dateFormat(props.start_time), dateFormat(props.end_time)).then((res) => {
    if(res.data.data.length === 0) return
    option.value.legend.data = []
    option.value.series[0].data = []
    res.data?.data?.forEach((item) => {
      option.value.series[0].data.push({
        name: item.brand,
        value: item.weight,
      })
      option.value.legend.data.push(item.brand)
    })
  }
)
</script>
