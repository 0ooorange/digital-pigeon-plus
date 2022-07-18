<template>
  <ScEcharts :option="environmentOption "></ScEcharts>
</template>
<script setup>
import ScEcharts from '@/components/scEcharts'
import { ref } from 'vue'
// import { ref, defineProps } from 'vue'
// import { getSensorByIDTypeTime } from '@api/breeding/breedStatistics'
// import { dateFormat } from '@/hooks/dateFormat.js'

// const props = defineProps({
//   shed_id: {
//     type: String,
//     require: true,
//   },
//   start_time: {
//     type: String,
//     require: true,
//   },
//   end_time: {
//     type: String,
//     require: true,
//   },
// })
const environmentOption = ref({
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['温度', '湿度', '二氧化碳', '光照强度', 'PM2.5', '氮气'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['00:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '温度',
      type: 'line',
      stack: 'Total',
      data: ['100', '70', '40', '60', '50', '90', '80'],
    },
    {
      name: '湿度',
      type: 'line',
      stack: 'Total',
      data: ['20', '62', '31', '64', '90', '73', '100'],
    },
    {
      name: '二氧化碳',
      type: 'line',
      stack: 'Total',
      data: ['30', '232', '201', '154', '190', '330', '410'],
    },
    {
      name: '光照强度',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: 'PM2.5',
      type: 'line',
      stack: 'Total',
      data: [100, 93, 351, 74, 160, 300, 400],
    },
    {
      name: '氮气',
      type: 'line',
      stack: 'Total',
      data: [120, 250, 100, 98, 500, 420, 200],
    },
  ],
})

// console.log(props.shed_id, '空气温度', dateFormat(props.start_time), dateFormat(props.end_time))
// getSensorByIDTypeTime(props.shed_id, '空气温度', dateFormat(props.start_time), dateFormat(props.end_time)).then(
//   (res) => {
//     console.log('空气温度', res)
//   }
// )
// getSensorByIDTypeTime(props.shed_id, '空气湿度', dateFormat(props.start_time), dateFormat(props.end_time)).then(
//   (res) => {
//     console.log('空气湿度', res)
//   }
// )
// getSensorByIDTypeTime(props.shed_id, '光照强度', dateFormat(props.start_time), dateFormat(props.end_time)).then(
//   (res) => {
//     console.log('光照强度', res)
//   }
// )
// getSensorByIDTypeTime(props.shed_id, '二氧化碳', dateFormat(props.start_time), dateFormat(props.end_time)).then(
//   (res) => {
//     console.log('二氧化碳', res)
//   }
// )
// getSensorByIDTypeTime(props.shed_id, '氨气浓度', dateFormat(props.start_time), dateFormat(props.end_time)).then(
//   (res) => {
//     console.log('氨气浓度', res)
//   }
// )
// getSensorByIDTypeTime(props.shed_id, '硫化氢', dateFormat(props.start_time), dateFormat(props.end_time)).then(
//   (res) => {
//     console.log('硫化氢', res)
//   }
// )
// getSensorByIDTypeTime(props.shed_id, '噪音', dateFormat(props.start_time), dateFormat(props.end_time)).then(
//   (res) => {
//     console.log('噪音', res)
//   }
// )
</script>
<style scoped>
</style>