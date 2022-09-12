<template>
  <div>
    <el-table :header-cell-style="{color:'#000000'}" :data="tableData" height="250" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all>
      <el-table-column prop="pigeonnumber" label="鸽笼编号" width="148" align="center"></el-table-column>
      <el-table-column prop="boardnumber" label="鸽板编号" width="148" align="center"></el-table-column>
      <el-table-column prop="noeggspumped" label="未抽蛋" width="147" align="center"></el-table-column>
      <el-table-column prop="noeggschecked" label="未查蛋" width="147" align="center"></el-table-column>
      <el-table-column prop="nochildchecked" label="未查仔" width="147" align="center"></el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue'
import { getUnCheckPigeonCage, getUnCheckEgg, getUnTakeEgg } from '@api/breeding/breedStatistics'
import { dateFormat } from '@/hooks/dateFormat.js'

const props = defineProps({shed_id: {type: String, require: true}, start_time: {type: Object, require: true}, end_time: {type: Object, require: true}})

const tableData = ref([])
// 未查仔鸽笼
getUnCheckPigeonCage(props.shed_id, dateFormat(props.start_time), dateFormat(props.end_time)).then(res => {
  res.data.data.forEach(item => {
    tableData.value.push({id: item.id, pigeonnumber: item.codes, boardnumber: item.panelCode, noeggspumped: '', noeggschecked: '', nochildchecked: '✔️'})
  })
})
// 未查蛋鸽笼
getUnCheckEgg(props.shed_id, dateFormat(props.start_time), dateFormat(props.end_time)).then(res => {
  res.data.data.forEach(item => {
    tableData.value.push({id: item.id, pigeonnumber: item.codes, boardnumber: item.panelCode, noeggspumped: '', noeggschecked: '✔️', nochildchecked: ''})
  })
})
// 未抽蛋鸽笼
getUnTakeEgg(props.shed_id, dateFormat(props.start_time), dateFormat(props.end_time)).then(res => {
  res.data.data.forEach(item => {
    tableData.value.push({id: item.id, pigeonnumber: item.codes, boardnumber: item.panelCode, noeggspumped: '✔️', noeggschecked: '', nochildchecked: ''})
  })
})
</script>