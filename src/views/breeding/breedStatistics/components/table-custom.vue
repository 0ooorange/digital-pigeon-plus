<template>
<div>
  <el-table  :header-cell-style="{color:'#000000'}"
    :data="tableData"
    height="250"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all>
    <el-table-column prop="pigeonnumber"  label="鸽笼编号" width="148"  align="center"> </el-table-column>
    <el-table-column prop="boardnumber"  label="鸽板编号" width="148"  align="center"> </el-table-column>
    <el-table-column prop="noeggspumped" label="未抽蛋"   width="147" align="center">  </el-table-column>
    <el-table-column prop="noeggschecked"  label="未查蛋" width="147" align="center"> </el-table-column>
    <el-table-column prop="nochildchecked" label="未查仔" width="147"  align="center">  </el-table-column>
  </el-table>
   <!-- <div class="pagination">
         <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next, jumper"
      :total="50">
    </el-pagination>
   </div> -->
 
</div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
          id: 1,
          pigeonnumber: 'A02',
          boardnumber: '5',
          noeggspumped: '✔️ ',
          noeggschecked:'✔️ ',
          nochildchecked:''
        }, 
        {
          id: 1,
          pigeonnumber: 'A02',
          boardnumber: '5',
          noeggspumped: '',
          noeggschecked:'✔️ ',
          nochildchecked:'✔️ '
        },
        {
          id: 1,
          pigeonnumber: 'A02',
          boardnumber: '5',
          noeggspumped: '',
          noeggschecked:'✔️ ',
          nochildchecked:'✔️ '
        },
        {
          id: 1,
          pigeonnumber: 'A02',
          boardnumber: '5',
          noeggspumped: '✔️ ',
          noeggschecked:'',
          nochildchecked:'✔️ '
        },
        {
          id: 1,
          pigeonnumber: 'A02',
          boardnumber: '5',
          noeggspumped: '',
          noeggschecked:'',
          nochildchecked:'✔️ '
        },
         {
          id: 1,
          pigeonnumber: 'A02',
          boardnumber: '5',
          noeggspumped: '',
          noeggschecked:'',
          nochildchecked:'✔️ '
        },
         {
          id: 1,
          pigeonnumber: 'A02',
          boardnumber: '5',
          noeggspumped: '',
          noeggschecked:'',
          nochildchecked:'✔️ '
        }],
       
      }
    },
    methods: {
    },
  }
</script>
<style scoped>
.pagination{
  margin-left: 60px;
}


</style>