<template>
  <div>
    <div class="container">
      <div class="search">

        <div class="btnleft">
          <el-button type="primary" class="soushuo">孵蛋</el-button>
          <el-button type="primary" class="soushuo">抽蛋</el-button>
          <el-button type="primary" class="soushuo">全部</el-button>
        </div>
        <div class="btnright">
          <el-button type="danger">亮灯</el-button>
          <el-button type="warning">导出</el-button>
          <el-button type="success">打印</el-button>
        </div>

      </div>

      <el-main class="nopadding">
        <scTable ref="table" :data="apiObj" stripe highlightCurrentRow class="tablestyle" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column label="鸽笼号" prop="pigeonnumber" sortable width="120" align="center"></el-table-column>
          <el-table-column label="板子编号" prop="boardnumber" sortable width="120" align="center"></el-table-column>
          <el-table-column label="第一次操作" prop="firstime" width="120" align="center"></el-table-column>
          <el-table-column label="时间间隔" prop="timeinterval_st" sortable width="120" align="center"></el-table-column>
          <el-table-column label="第二次操作" prop="secondtime" width="120" align="center"></el-table-column>
          <el-table-column label="时间间隔" prop="timeinterval_nd" sortable width="120" align="center"></el-table-column>
          <el-table-column label="本次推荐" prop="recommendation" width="120" align="center"></el-table-column>
          <el-table-column label="操作员" prop="operator" width="120" align="center"></el-table-column>
          <el-table-column label="备注" prop="remark" align="center"></el-table-column>
        </scTable>

      </el-main>

    </div>
  </div>
</template>

<script>
export default {
  name: 'incubateAuxiliary', // 抽孵辅助
  data() {
    return {
      pageSize: 8,
      total: 100,
      pageNum: 1,
      inputvalue: '',
      selectoptions1: [
        {
          value: '选项1',
          label: '鸽笼号',
        },
        {
          value: '选项2',
          label: '板子编号',
        },
        {
          value: '选项3',
          label: '第一次操作',
        },
        {
          value: '选项4',
          label: '第二次操作',
        },
        {
          value: '选项5',
          label: '本次推荐',
        },
        {
          value: '选项6',
          label: '操作员',
        },
      ],
      value: '',
      apiObj: [
        {
          pigeonnumber: 'A01',
          boardnumber: '3',
          firstime: '孵化',
          timeinterval_st: '2天',
          secondtime: '抽蛋',
          timeinterval_nd: '10天',
          recommendation: '抽蛋',
          operator: '李暖暖',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A08',
          boardnumber: '3',
          firstime: '孵化',
          timeinterval_st: '21天',
          secondtime: '抽蛋',
          timeinterval_nd: '10天',
          recommendation: '抽蛋',
          operator: '李暖暖',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A03',
          boardnumber: '3',
          firstime: '孵化',
          timeinterval_st: '20天',
          secondtime: '抽蛋',
          timeinterval_nd: '10天',
          recommendation: '抽蛋',
          operator: '李暖暖',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A11',
          boardnumber: '3',
          firstime: '孵化',
          timeinterval_st: '18天',
          secondtime: '抽蛋',
          timeinterval_nd: '10天',
          recommendation: '抽蛋',
          operator: '李暖暖',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A10',
          boardnumber: '3',
          firstime: '孵化',
          timeinterval_st: '20天',
          secondtime: '抽蛋',
          timeinterval_nd: '10天',
          recommendation: '抽蛋',
          operator: '李暖暖',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A07',
          boardnumber: '3',
          firstime: '孵化',
          timeinterval_st: '10天',
          secondtime: '抽蛋',
          timeinterval_nd: '10天',
          recommendation: '抽蛋',
          operator: '李暖暖',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A10',
          boardnumber: '3',
          firstime: '孵化',
          timeinterval_st: '21天',
          secondtime: '抽蛋',
          timeinterval_nd: '10天',
          recommendation: '抽蛋',
          operator: '李暖暖',
          remark: 'XXXXX',
        },
        {
          pigeonnumber: 'A10',
          boardnumber: '3',
          firstime: '孵化',
          timeinterval_st: '2天',
          secondtime: '抽蛋',
          timeinterval_nd: '18天',
          recommendation: '抽蛋',
          operator: '李暖暖',
          remark: 'XXXXX',
        },
      ],
    }
  },
}
</script>

<style scoped>
.container {
  margin: 20px 20px;
}
.search {
  padding-top: 25px;
  margin-top: 15px;
  margin-left: 20px;
  width: 94%;
  height: 60px;
  display: flex;
  flex-direction: row;
}
.btnleft {
  display: flex;
  flex-direction: row;
  margin-left: 30px;
}
.btnright {
  margin-left: 780px;
  display: flex;
  flex-direction: row;
}
.btn {
  width: 80px;
  height: 36px;
  font-size: 20px;
}
.tablestyle {
  font-size: 16px;
}
.page {
  margin-top: 36px;
  margin-left: 195px;
}
.soushuo {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.el-button {
  height: 27px;
}
</style>