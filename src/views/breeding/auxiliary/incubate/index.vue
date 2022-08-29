<template>
  <div class="search">
    <div class="btnleft">
      <el-button type="primary" class="sousuo">孵蛋</el-button>
      <el-button type="primary" class="sousuo">抽蛋</el-button>
      <el-button type="primary" class="sousuo">全部</el-button>
    </div>
    <div class="btnright">
      <el-button type="danger">亮灯</el-button>
      <el-button type="warning">导出</el-button>
      <el-button type="success">打印</el-button>
    </div>
  </div>

  <el-main class="nopadding">
    <scTable ref="table" :data="tablelist" stripe highlightCurrentRow class="tablestyle" :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column label="鸽笼号" prop="codes" sortable width="120" align="center"></el-table-column>
      <el-table-column label="板子编号" prop="panelCode" width="120" align="center"></el-table-column>
      <el-table-column label="上上次" prop="lastTwoOperate" width="120" align="center"></el-table-column>
      <el-table-column label="时间间隔" prop="lastTwoDiffer" sortable width="150" align="center"></el-table-column>
      <el-table-column label="上次" prop="lastOperate" width="120" align="center"></el-table-column>
      <el-table-column label="时间间隔" prop="lastDiffer" sortable width="150" align="center"></el-table-column>
      <el-table-column label="本次推荐" prop="recommendation" width="150" align="center">
        <template v-slot="scope">
          <el-select v-model="scope.row.value" class="m-2" placeholder="抽蛋" style="width: 90px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remarks" align="center"></el-table-column>
    </scTable>
  </el-main>
</template>

<script>
import { ref } from 'vue'
import { getTakeOrHatchAssistance } from "@api/breeding/auxiliary/incubate";
import store from "@/store";
export default {
  name: 'ExtractAndIncubateAuxiliary',
  setup() {
    const options = [{ value: 'Option1', label: '抽蛋' }, { value: 'Option2', label: '孵化' }]
    const tablelist = ref([])
		const pageNum = ref(1)
		const pageSize = ref(10)
		const shedId = store.state.baseInfo.SHED_ID
		getTakeOrHatchAssistance(shedId, pageNum.value, pageSize.value).then(res => {tablelist.value = res.data.data})
    return {
      tablelist,
      options,
    }
  }
}
</script>

<style lang="less" scoped>
.search {
	margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  .btnleft {
    display: flex;
    flex-direction: row;
    margin-left: 30px;
    .sousuo {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }
  }
  .btnright {
    margin-left: 780px;
    display: flex;
    flex-direction: row;
  }
}
.el-button {
  height: 27px;
}
</style>
