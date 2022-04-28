<template>
  <div>
    <table-search cardWidth="15%" :searchTypes="searchTypes" :cardData="cardData" @searchClick="searchClick" @outTable="outTable">
      <el-date-picker v-if="showDatePicker" style="background-color: #fff; width: 220px; margin-left: 10px" v-model="dateConcreteValue" type="daterange" start-placeholder="起始时间" end-placeholder="最终时间" :default-time="defaultTime" @change="datePickerChange" />
    </table-search>
    <sc-table ref="table" :data="tableData" stripe highlightCurrentRow>
      <el-table-column align="center" sortable label="鸽笼编号" prop="pigeonnumber" width="180"></el-table-column>
      <el-table-column align="center" sortable label="鸽板编号" prop="boardnumber" width="180"></el-table-column>
      <el-table-column align="center" sortable label="出仔日期" prop="time" width="180"></el-table-column>
      <el-table-column align="center" label="异常情况" prop="normalCase" width="180"></el-table-column>
      <el-table-column align="center" label="负责人" prop="principal" width="180"></el-table-column>
      <el-table-column align="center" label="备注" prop="remark"></el-table-column>
    </sc-table>
  </div>
</template>

<script>
export default {
  name: 'examineCubManage',
  data() {
    return {
      dateConcreteValue: "",
      defaultTime: "",
      showDatePicker: true,
      cardData: [
        {
          cardText: '正常仔',
          cardNumber: '1622只',
        },
        {
          cardText: '冷蛋',
          cardNumber: '364枚',
        },
        {
          cardText: '冷蛋1',
          cardNumber: '264枚',
        },
        {
          cardText: '冷蛋2',
          cardNumber: '100枚',
        },
        {
          cardText: '孵化箱',
          cardNumber: '260只',
        },
      ],
      searchTypes: [
        {
          value: '鸽笼编号',
          label: '鸽笼编号',
        },
        {
          value: '鸽板编号',
          label: '鸽板编号',
        },
        {
          value: '异常情况',
          label: '异常情况',
          children: [
            {
              value: '冷蛋',
              label: '冷蛋',
            },
            {
              value: '冷蛋2',
              label: '冷蛋2',
            },
          ],
        },
        {
          value: '负责人',
          label: '负责人',
        },
      ],
      tableData: [
        {
          pigeonnumber: 'A01',
          boardnumber: '1',
          time: '2022年4月14日16:06:34',
          normalCase: '冷蛋2',
          principal: '小橙子1',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A03',
          boardnumber: '3',
          time: '2022年4月16日13:45:36',
          normalCase: '冷蛋1',
          principal: '小橙子',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A10',
          boardnumber: '10',
          time: '2022年4月22日01:05:06',
          normalCase: '冷蛋',
          principal: '小橙子4',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A06',
          boardnumber: '6',
          time: '2022年4月17日09:06:04',
          normalCase: '冷蛋2',
          principal: '小橙子',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A05',
          boardnumber: '9',
          time: '2022年4月17日05:24:56',
          normalCase: '冷蛋1',
          principal: '小橙子',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A08',
          boardnumber: '7',
          time: '2022年4月20日22:15:46',
          normalCase: '冷蛋1',
          principal: '小橙子',
          remark: 'XXXXX',
        },
      ],
    }
  },
  methods: {
    // 表格查询
    searchClick() {
      console.log('嘻嘻嘻，我被点击啦')
    },
    // 表格导出
    outTable() {
      console.log('哈哈哈，我被点击了噢')
    },
    datePickerChange() {}
  },
}
</script>

<style scoped>
</style>