<template>
  <div>
    <table-search :searchTypes="searchTypes" :cardData="[]" @searchClick="searchClick" @outTable="outTable" class="table_search">
      <el-select style="width: 150px;flex: 0 0 auto;margin-bottom:9px;margin-right:10px" v-model="dateValue" class="m-2" placeholder="统计时间" @change="dateChange">
        <el-option v-for="item in dateOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-date-picker v-if="showDatePicker" style="background-color: #fff; width: 220px; margin-left: 10px" v-model="dateConcreteValue" type="daterange" start-placeholder="起始时间" end-placeholder="最终时间" :default-time="defaultTime" @change="datePickerChange" />
    </table-search>

    <scTable class="table" ref="table" row-key="id" :data="tableList" @selection-change="selectionChange" stripe highlightCurrentRow>
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column align="center" label="鸽笼号" prop="cageNumber" width="100" sortable></el-table-column>
      <el-table-column align="center" label="板子编号" prop="boardNumber" width="110" sortable></el-table-column>
      <el-table-column align="center" label="一个月未下蛋" prop="oneMonNoLayEgg" width="140" sortable></el-table-column>
      <el-table-column align="center" label="生蛋间隔" prop="layEggInterval" width="110" sortable></el-table-column>
      <el-table-column align="center" label="回蛋次数" prop="backEggAmount" width="110" sortable></el-table-column>
      <el-table-column align="center" label="光蛋" prop="lightEgg" width="80" sortable></el-table-column>
      <el-table-column align="center" label="冷蛋" prop="coolEgg" width="80" sortable></el-table-column>
      <el-table-column align="center" label="单蛋" prop="aloneEgg" width="80" sortable></el-table-column>
      <el-table-column align="center" label="踩蛋" prop="stampEgg" width="80" sortable></el-table-column>
      <el-table-column align="center" label="死仔" prop="deathChild" width="80" sortable></el-table-column>
      <el-table-column align="center" label="淘汰建议" prop="suggest" width="110"></el-table-column>
      <el-table-column align="center" label="备注" prop="remark" width="140" show-overflow-tooltip></el-table-column>
    </scTable>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  name: 'dovePerformance', // 种鸽性能测试
  setup() {
    let searchTypes = reactive([])

    //查询下拉框数组
    searchTypes = [
      {
        value: '鸽笼编号',
        label: '鸽笼编号',
      },
    ]

    // 选择统计时间
    let dateOptions = reactive([])
    dateOptions = [
      {
        value: '1',
        label: '近三个月',
      },
      {
        value: '2',
        label: '近半年',
      },
      {
        value: '3',
        label: '近一年',
      },
      {
        value: '4',
        label: '具体时间',
      },
    ]

    //统计时间的值
    let dateValue = ref('1')

    //是否显示具体日期选择
    let showDatePicker = ref(false)

    //具体时间
    let dateConcreteValue = ref('')

    //表格数据
    let tableList = reactive([])
    tableList = [
      {
        cageNumber: 'A1',
        boardNumber: 1,
        oneMonNoLayEgg: '1次',
        layEggInterval: '——',
        backEggAmount: '——',
        lightEgg: '——',
        coolEgg: '——',
        aloneEgg: '——',
        stampEgg: '——',
        deathChild: '——',
        suggest: '无',
        remark: '该种鸽一个月未下蛋，建议换掉',
      },
      {
        cageNumber: 'A2',
        boardNumber: 2,
        oneMonNoLayEgg: '——',
        layEggInterval: '——',
        backEggAmount: '——',
        lightEgg: '2个',
        coolEgg: '——',
        aloneEgg: '——',
        stampEgg: '——',
        deathChild: '——',
        suggest: '无',
        remark: '该种鸽最近有光蛋，建议换掉',
      },
      {
        cageNumber: 'A3',
        boardNumber: 3,
        oneMonNoLayEgg: '——',
        layEggInterval: '——',
        backEggAmount: '——',
        lightEgg: '——',
        coolEgg: '1个',
        aloneEgg: '——',
        stampEgg: '——',
        deathChild: '——',
        suggest: '无',
        remark: '该种鸽最近有冷蛋，建议换掉',
      },
      {
        cageNumber: 'A4',
        boardNumber: 4,
        oneMonNoLayEgg: '——',
        layEggInterval: '——',
        backEggAmount: '——',
        lightEgg: '——',
        coolEgg: '——',
        aloneEgg: '1个',
        stampEgg: '——',
        deathChild: '——',
        suggest: '无',
        remark: '该种鸽最近有单蛋，建议换掉',
      },
      {
        cageNumber: 'A5',
        boardNumber: 5,
        oneMonNoLayEgg: '——',
        layEggInterval: '——',
        backEggAmount: '——',
        lightEgg: '——',
        coolEgg: '——',
        aloneEgg: '——',
        stampEgg: '1次',
        deathChild: '——',
        suggest: '无',
        remark: '该种鸽最近有踩蛋，建议换掉',
      },
      {
        cageNumber: 'A6',
        boardNumber: 6,
        oneMonNoLayEgg: '——',
        layEggInterval: '——',
        backEggAmount: '——',
        lightEgg: '——',
        coolEgg: '——',
        aloneEgg: '——',
        stampEgg: '——',
        deathChild: '1个',
        suggest: '无',
        remark: '该种鸽最近有死仔，建议换掉',
      },
      {
        cageNumber: 'A7',
        boardNumber: 7,
        oneMonNoLayEgg: '——',
        layEggInterval: '——',
        backEggAmount: '——',
        lightEgg: '——',
        coolEgg: '——',
        aloneEgg: '——',
        stampEgg: '——',
        deathChild: '——',
        suggest: '无',
        remark: '该种鸽行为正常',
      },
      {
        cageNumber: 'A8',
        boardNumber: 8,
        oneMonNoLayEgg: '——',
        layEggInterval: '——',
        backEggAmount: '——',
        lightEgg: '——',
        coolEgg: '——',
        aloneEgg: '——',
        stampEgg: '——',
        deathChild: '——',
        suggest: '无',
        remark: '该种鸽行为正常',
      },
    ]

    const searchClick = function () {
      console.log('嘻嘻嘻，我被点击啦')
    }

    const outTable = function () {
      console.log('哈哈哈，我被点击了噢')
    }

    const dateChange = function (val) {
      console.log('统计时间改变', val)
      if (val == 4) {
        showDatePicker.value = true
      } else {
        showDatePicker.value = false
      }
    }

    return {
      searchTypes,
      dateOptions,
      dateValue,
      showDatePicker,
      dateConcreteValue,
      tableList,
      searchClick,
      outTable,
      dateChange,
    }
  },
})
</script>

<style scoped>
</style>