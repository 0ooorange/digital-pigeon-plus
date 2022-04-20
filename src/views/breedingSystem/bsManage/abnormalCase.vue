<template>
  <div>
    <table-search :searchTypes="searchTypes" :cardData="cardData" @searchClick="searchClick" @outTable="outTable" />
    <sc-table ref="table" :data="tableData" :pageSize="5" stripe highlightCurrentRow>
      <el-table-column align="center" label="鸽笼编号" prop="pigeonnumber" width="130"></el-table-column>
      <el-table-column align="center" label="鸽板编号" prop="boardnumber" width="130"></el-table-column>
      <el-table-column align="center" label="日期" prop="time" width="130"></el-table-column>
      <el-table-column align="center" label="仔数" prop="cubNumber" width="130"></el-table-column>
      <el-table-column align="center" label="死仔数" prop="dieCubNumber" width="130"></el-table-column>
      <el-table-column align="center" label="负责人" prop="principal" width="130"></el-table-column>
      <el-table-column align="center" label="操作" prop="operate" width="130"></el-table-column>
      <el-table-column align="center" label="备注" prop="remark"></el-table-column>
    </sc-table>
  </div>
</template>

<script>
export default {
  name: 'abnormalCaseManage',
  data() {
    return {
      cardData: [{
        cardText: '仔数',
        cardNumber: '666只'
      }, {
        cardText: '死仔数',
        cardNumber: '666只'
      }],
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
          value: '日期',
          label: '日期',
        },
        {
          value: '仔数',
          label: '仔数',
        },
        {
          value: '死仔数',
          label: '死仔数',
        },
        {
          value: '负责人',
          label: '负责人',
        },
        {
          value: '操作',
          label: '操作',
        }
      ],
      tableData: [
        {
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          cubNumber: 20,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '已取走',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          cubNumber: 20,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '已取走',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          cubNumber: 20,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '已取走',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          cubNumber: 20,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '已取走',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          cubNumber: 20,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '已取走',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          cubNumber: 20,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '已取走',
          remark: 'XXXXX',
        },
      ],
    }
  },
  methods: {
    // 表格查询
    searchClick() {
      console.log("嘻嘻嘻，我被点击啦")
    },
    // 表格导出
    outTable() {
      console.log("哈哈哈，我被点击了噢");
    }
  },
}
</script>

<style scoped>
</style>