<template>
  <table-search :cardData="cardData" :showSearch="false" :showDatePk="false" @searchClick="searchClick" @outTable="outTable" />
  <scTable ref="table" :column="column" :data="tablelist" stripe highlightCurrentRow class="tablestyle" :default-sort="{ prop: 'date', order: 'descending' }" />
</template>

<script>
import { ref } from 'vue'
import { checkCubAssistant, checkCubNumbers } from '@api/breeding/auxiliary/examCub'
import store from '@/store'
export default {
  name: 'examineEggAuxiliary',
  setup() {
    // 卡片
    const cardData = ref([])

    const outTable = () => {
      // console.log('导出')
    }

    // 表格
    const tablelist = ref([])
    const column = ref([
      { label: '鸽笼号', prop: 'codes', sortable: true, width: 140, align: 'center' },
      { label: '板子编号', prop: 'panelCode', width: 140, align: 'center' },
      { label: '生蛋时间', prop: 'layEggTime', sortable: true, width: 230, align: 'center' },
      { label: '孵化天数', prop: 'incubationDays', width: 180, align: 'center' },
      { label: '备注', prop: 'remarks', width: 250, align: 'center' },
    ])
    const pageNum = ref(1)
    const pageSize = ref(10)
    const shedId = store.state.baseInfo.SHED_ID
    checkCubAssistant(shedId, pageNum.value, pageSize.value).then((res) => {
      tablelist.value = res.data.data
    })

    checkCubNumbers(shedId).then((res) => {
      cardData.value = []
      cardData.value.push({cardText: '查仔个数', cardNumber: res.data.data.checkCubNumber + '个'})
    })

    return {
      tablelist,
      cardData,
      column,
      outTable,
    }
  },
}
</script>