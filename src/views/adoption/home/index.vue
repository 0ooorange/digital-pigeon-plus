<template>
    <ScEcharts :option="option" height="80%" width="80%"></ScEcharts>
</template>

<script setup>
import {ref} from 'vue'
import ScEcharts from '@/components/scEcharts'
const option = ref({
  tooltip: {trigger: 'item'},
  legend: {bottom: 10, left: 'center', data: ['认养售出', '商城售出']},
  series: [{name: '单位：只', type: 'pie', radius: '60%', label: {show: false}, data: [{name: '认养售出', value: '2080'}, {name: '商城售出', value: '2680'}]}]
})

</script>

<style>

</style>