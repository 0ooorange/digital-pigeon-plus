<template>
  <div>
    <table-search :searchTypes="searchTypes" :cardData="cardData" @searchClick="searchClick" @outTable="outTable">
      <el-date-picker v-if="showDatePicker" style="background-color: #fff; width: 220px; margin: 0 10px 10px 0" v-model="dateConcreteValue" type="daterange" start-placeholder="起始时间" end-placeholder="最终时间" :default-time="defaultTime" @change="datePickerChange" />
    </table-search>
    <sc-table ref="table" :data="tableData" stripe highlightCurrentRow>
      <el-table-column align="center" sortable label="鸽笼编号" prop="pigeonnumber" width="130"></el-table-column>
      <el-table-column align="center" sortable label="鸽板编号" prop="boardnumber" width="130"></el-table-column>
      <el-table-column align="center" sortable label="日期" prop="time" width="200"></el-table-column>
      <el-table-column align="center" sortable label="仔数" prop="cubNumber" width="130"></el-table-column>
      <el-table-column align="center" sortable label="死仔数" prop="dieCubNumber" width="130"></el-table-column>
      <el-table-column align="center" label="负责人" prop="principal" width="130"></el-table-column>
      <el-table-column align="center" label="操作" prop="operate" width="130">
        <template v-slot="scope">
          <el-tag :type="scope.row.operate === '已取走' ? '' : 'danger'">{{scope.row.operate}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" prop="remark"></el-table-column>
    </sc-table>
  </div>
</template>

<script>
export default {
  name: 'abnormalCaseManage',
  data() {
    return {
      dateConcreteValue: "",
      defaultTime: "",
      showDatePicker: true,
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
          label: '鸽笼编号'
        },
        {
          value: '鸽板编号',
          label: '鸽板编号'
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
          boardnumber: '2',
          time: '2022年4月14日16:33:23',
          cubNumber: 10,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '已取走',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月13日14:02:12',
          cubNumber: 23,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '已取走',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '1',
          time: '2022年4月19日23:23:12',
          cubNumber: 20,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '未取走',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '5',
          time: '2022年4月18日12:16:45',
          cubNumber: 20,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '未取走',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '6',
          time: '2022年4月22日09:32:12',
          cubNumber: 20,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '已取走',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '4',
          time: '2022年4月10日06:15:49',
          cubNumber: 20,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '未取走',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '7',
          time: '2022年4月14日08:01:23',
          cubNumber: 20,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '已取走',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '11',
          time: '2022年4月15日23:01:05',
          cubNumber: 20,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '已取走',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '9',
          time: '2022年4月16日10:21:46',
          cubNumber: 20,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '未取走',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '10',
          time: '2022年4月18日08:22:45',
          cubNumber: 20,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '已取走',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '8',
          time: '2022年4月24日21:12:12',
          cubNumber: 25,
          dieCubNumber: 0,
          principal: '小橙子',
          operate: '未取走',
          remark: 'XXXXX',
        }
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
    },
    datePickerChange() {}
  },
}
</script>

<style scoped>
</style>