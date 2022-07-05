<template>
  <div class="container">
    <div >
      <el-button type="primary" plain @click="addOutcagedialog = true"
        >添加出栏</el-button
      >
    </div>
    <el-main>
      <scTable :data="tableData" stripe>
        <el-table-column
          prop="date"
          label="时间"
          width="120"
          sortable
          align="center"
        />
        <el-table-column
          prop="dovecoteNumber"
          label="鸽棚"
          width="120"
          align="center"
        />
        <el-table-column prop="cate" label="种类" width="120" align="center" />
        <el-table-column
          prop="number"
          label="数量"
          width="120"
          sortable
          align="center"
        />
        <el-table-column prop="go" label="去向" width="120" align="center" />
        <el-table-column
          prop="billNum"
          label="单据号"
          width="120"
          align="center"
        />
        <el-table-column
          prop="batchNum"
          label="批次号"
          width="120"
          align="center"
        />
        <el-table-column
          prop="operation"
          label="操作"
          width="120"
          align="center"
        />
      </scTable>
    </el-main>
    <el-dialog
        title="添加出栏"
        
        width="50%"
        @close="addDialogClosed"
      >
        <el-form
          :model="addInfo"
          ref="addRef"
          :rules="OutcageRules"
          label-width="100px"
        >
          <el-form-item label="时间:" prop="date">
            <el-input v-model="addInfo.date"></el-input>
          </el-form-item>
          <el-form-item label="鸽棚:" prop="dovecoteNumber">
            <el-select v-model="addInfo.dovecoteNumber" placeholder="请选择">
              <el-option
                v-for="(item, index) in doptions"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="种类:" prop="cate">
            <el-input v-model="addInfo.cate"></el-input>
          </el-form-item>
          <el-form-item label="数量:" prop="number">
            <el-input v-model="addInfo.number"></el-input>
          </el-form-item>
          <el-form-item label="去向:" prop="go">
            <el-input v-model="addInfo.go"></el-input>
          </el-form-item>
          <el-form-item label="单据号:" prop="billNum">
            <el-input v-model="addInfo.billNum"></el-input>
          </el-form-item>
          <el-form-item label="批次号:" prop="batchNum">
            <el-input v-model="addInfo.batchNum"></el-input>
          </el-form-item>
          <el-form-item label="操作:" prop="operation">
            <el-input v-model="addInfo.batchNum"></el-input>
          </el-form-item>
        </el-form>
        <span  class="dialog-footer">
          <el-button @click="addOutcagedialog = false">取 消</el-button>
          <el-button type="primary" @click="addOutcage()">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import scTable from "../../../../components/scTable/index.vue";
export default defineComponent({
  name: "outCageRegistration", // 出栏登记
  components: {
		scTable,
	},
  setup() {
    let addOutcagedialog=false;
    const tableData = [
      {
        date: "2022-07-04",
        dovecoteNumber: "A1",
        cate: "..",
        number: "..",
        go: "..",
        billNum: "..",
        batchNum: "..",
        operation: "..",
      },
    ];
    const addInfo =[
      {
        date: "2022-07-04",
        dovecoteNumber: "A1",
        cate: "..",
        number: "..",
        go: "..",
        billNum: "..",
        batchNum: "..",
        operation: "..",
      },
    ]
    return {
      tableData,
      addInfo,
      addOutcagedialog
    };
  },
});
</script>

<style scoped>
.container {
	margin: 0 20px;
}
</style>