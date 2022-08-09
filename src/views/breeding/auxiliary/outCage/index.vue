<template>
  <div class="container">
    <table-search :cardData="cardData" :showSearch="false" :showDatePk="false" @outTable="outTable" />
    <scTable ref="table" :column="column" :data="tablelist" stripe highlightCurrentRow :default-sort="{ prop: 'date', order: 'descending' }" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { getMarketingAssistance } from "@api/breeding/auxiliary/outCage";
import store from "@/store"
export default {
  name: 'outCageAuxiliary',
  setup() {
		// 卡片
    const cardData = ref([{cardText: '出栏个数', cardNumber: '35个'}])

    const outTable = () => {
      // console.log('导出')
    }

		// 表格
    const tablelist = ref([])
    const column = ref([
			{label: '鸽笼号', prop: 'codes', sortable: true, width: 120, align: 'center'},
      {label: '板子编号', prop: 'panelCode', width: 120, align: 'center'},
      {label: '出仔时间', prop: 'checkCubTime', sortable: true, width: 230, align: 'center'},
      {label: '喂养天数', prop: 'days', sortable: true, width: 180, align: 'center'},
      {label: '出栏个数', prop: 'cubNumber', width: 180, align: 'center'},
      {label: '备注', prop: 'remarks', width: 240, align: 'center'},
    ])
		const pageNum = ref(1)
		const pageSize = ref(10)
		const shedId = store.state.baseInfo.SHED_ID
		getMarketingAssistance(shedId, pageNum.value, pageSize.value).then(res => {tablelist.value = res.data.data})
    
		return {
      tablelist,
      cardData,
      column,
      outTable,
    }
  }
}
</script>