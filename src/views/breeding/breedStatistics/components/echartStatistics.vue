<template>
  <ScEcharts :option="option" height="100%" width="100%"></ScEcharts>
</template>
<script setup>
import ScEcharts from '@/components/scEcharts'
import { ref, defineProps, defineExpose } from 'vue'
import { getFeedShedByIDTime } from '@api/breeding/breedStatistics'
import { dateFormat } from '@/hooks/dateFormat.js'

const props = defineProps({
  shed_id: {
    type: String,
    require: true,
  },
  start_time: {
    type: String,
    require: true,
  },
  end_time: {
    type: String,
    require: true,
  },
})
const option = ref({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: 10,
    left: 'center',
    data: [],
  },
  series: [
    {
      name: '单位：斤',
      type: 'pie',
      radius: '60%',
      label: {
        show: false,
      },
      data: [
        { value: 735, name: 'C牌饲料' },
        { value: 510, name: 'D牌饲料' },
      ],
    },
  ],
})

const getData = (shed_id, start_time, end_time) => {
  console.log(15632468465)
  getFeedShedByIDTime(shed_id, start_time, end_time).then((res) => {
    option.value.legend.data = []
    option.value.series[0].data = []
    res.data.data.forEach((item) => {
      option.value.series[0].data.push({
        name: item.brand,
        value: item.weight,
      })
      option.value.legend.data.push(item.brand)
    })
  })
}
getData(props.shed_id, dateFormat(props.start_time), dateFormat(props.end_time))

// const test = function() {
//   console.log('test test test')
// }

defineExpose({
  getData,
})
</script>