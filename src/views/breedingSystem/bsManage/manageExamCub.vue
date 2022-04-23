<template>
  <div>
    <table-search cardWidth="15%" :searchTypes="searchTypes" :cardData="cardData" @searchClick="searchClick" @outTable="outTable" />
    <sc-table ref="table" :data="tableData" :pageSize="5" stripe highlightCurrentRow>
      <el-table-column align="center" label="鸽笼编号" prop="pigeonnumber" width="180"></el-table-column>
      <el-table-column align="center" label="鸽板编号" prop="boardnumber" width="180"></el-table-column>
      <el-table-column align="center" label="出仔日期" prop="time" width="180"></el-table-column>
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
      cardData: [
        {
          cardText: '正常仔',
          cardNumber: '1622只'
        },
        {
          cardText: '冷蛋',
          cardNumber: '364枚'
        },
        {
          cardText: '冷蛋1',
          cardNumber: '264枚'
        },
        {
          cardText: '冷蛋2',
          cardNumber: '100枚'
        },
        {
          cardText: '孵化箱',
          cardNumber: '260只'
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
          value: '出仔日期',
          label: '出仔日期',
        },
        {
          value: '异常情况',
          label: '异常情况',
          children: [{
            value: '冷蛋',
            label: '冷蛋',
          }, {
            value: '冷蛋2',
            label: '冷蛋2',
          }]
        },
        {
          value: '负责人',
          label: '负责人',
        },
      ],
      tableData: [
        {
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          normalCase: '冷蛋',
          principal: '小橙子',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          normalCase: '冷蛋',
          principal: '小橙子',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          normalCase: '冷蛋',
          principal: '小橙子',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          normalCase: '冷蛋',
          principal: '小橙子',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          normalCase: '冷蛋',
          principal: '小橙子',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          normalCase: '冷蛋',
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
  },
}
</script>

<style scoped>
</style>