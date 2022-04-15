<template>
  <div>
    <table-search :searchTypes="searchTypes" @searchClick="searchClick" @outTable="outTable"></table-search>
    <div class="numberCards">
      <el-card v-for="(item, index) in cardData" :key="index">
        <span class="cardText">{{item.cardText+"："}}</span>
        <span class="cardNumber">{{item.cardNumber}}</span>
      </el-card>
    </div>
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
import tableSearch from '@/components/tableSearch/index.vue'
import scTable from '@/components/scTable/index.vue'
export default {
  name: 'examineCubManage',
  components: {
    tableSearch,
    scTable
  },
  data() {
    return {
      cardData: [{
        cardText: '正常仔',
        cardNumber: '1622只'
      }, {
        cardText: '冷蛋',
        cardNumber: '364枚'
      }, {
        cardText: '冷蛋1',
        cardNumber: '264枚'
      }, {
        cardText: '冷蛋2',
        cardNumber: '100枚'
      }, {
        cardText: '孵化箱',
        cardNumber: '260只'
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
          value: '出仔日期',
          label: '出仔日期',
        },
        {
          value: '异常情况',
          label: '异常情况',
        },
        {
          value: '负责人',
          label: '负责人',
        }
      ],
      tableData: [
        {
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          normalCase: '冷蛋',
          principal: '小橙子',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          normalCase: '冷蛋',
          principal: '小橙子',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          normalCase: '冷蛋',
          principal: '小橙子',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          normalCase: '冷蛋',
          principal: '小橙子',
          remark: 'XXXXX',
        },{
          pigeonnumber: 'A10',
          boardnumber: '3',
          time: '2022年4月14日',
          normalCase: '冷蛋',
          principal: '小橙子',
          remark: 'XXXXX',
        },{
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
      console.log("嘻嘻嘻，我被点击啦")
    },
    // 表格导出
    outTable() {
      console.log("哈哈哈，我被点击了噢");
    }
  },
}
</script>

<style lang="less" scoped>
@import "@/style/compStyle/tableSlot.less";
.numberCards {
  margin-bottom: 10px; 
  display: flex;
  flex-direction: row;
}
/deep/ .el-card {
  margin-left: 30px;
}
</style>