<template>
  <table-search :cardData="cardData" :showSearch="false" :showDatePk="false" @outTable="outTable" />
  <scTable ref="table" :column="column" :data="tablelist" stripe highlightCurrentRow :default-sort="{ prop: 'date', order: 'descending' }" />
</template>

<script>
import { ref } from 'vue'
import { checkEggAssistant, checkEggNumbers } from "@api/breeding/auxiliary/examEgg";
import store from "@/store"
export default {
  name: 'examineEggAuxiliary',
  setup() {
		// 卡片
    const cardData = ref([])

    const outTable = () => {console.log('导出')}

		// 表格
    const tablelist = ref([])
    const column = ref([
			{label: '鸽笼号', prop: 'codes', sortable: true, width: 120, align: 'center'},
      {label: '板子编号', prop: 'panelCode', width: 150, align: 'center'},
      {label: '生蛋时间', prop: 'layEggTime', sortable: true, width: 230, align: 'center'},
      {label: '操作', prop: 'takeOrHatch', width: 170, align: 'center'},
      {label: '生蛋天数', prop: 'layEggDays', sortable: true, width: 170, align: 'center'},
      {label: '备注', prop: 'remarks', width: 270, align: 'center'},
    ])
		const pageNum = ref(1)
		const pageSize = ref(10)
		const shedId = store.state.baseInfo.SHED_ID
		checkEggAssistant(shedId, pageNum.value, pageSize.value).then(res => {tablelist.value = res.data.data})
		
		checkEggNumbers(shedId).then(res => {
			cardData.value = []
			cardData.value.push({cardText: '孵化个数', cardNumber: res.data.data.incubationNumbers + '个'})
			cardData.value.push({cardText: '查蛋个数', cardNumber: res.data.data.checkEggNumber + '个'})
			cardData.value.push({cardText: '抽蛋个数', cardNumber: res.data.data.extractionNumbers + '个'})
		})
    
		return {
      tablelist,
      cardData,
      column,
      outTable,
    }
  }
}
</script>