<template>
  <div class="container">
    <div class="tag">
      <el-button type="primary" plain @click="addOutcagedialog = true"
        >添加出栏</el-button
      >
    </div>
    <el-main class="main">
      <scTable :data="tableData" stripe 	>
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
        <el-table-column label='操作'  width=240>
            <template  #default="scope" >
                <el-button size="mini" type="primary" plain icon="el-icon-edit" @click="showOutcagedialog(scope.row)">编辑</el-button>
                 <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeOutcage(scope.row.id)">删除</el-button>
            </template>
         </el-table-column>
      </scTable>
    </el-main>
    <el-dialog
      title="添加出栏"
      v-model="addOutcagedialog"
      width="30%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addInfo"
        ref="addRef"
        :rules="OutcageRules"
        label-width="120px"
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
      </el-form>
      <span class="dialog-footer">
        <el-button @click="addOutcagedialog = false">取 消</el-button>
        <el-button type="primary" plain @click="addOutcage()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑出栏"
      v-model="Outcagedialog"
      width="30%"
      @close="addDialogClosed"
    >
      <el-form
        :model="OutcageInfo"
        ref="addRef"
        :rules="OutcageRules"
        label-width="120px"
      >
        <el-form-item label="时间:" prop="date">
          <el-input v-model="OutcageInfo.date"></el-input>
        </el-form-item>
        <el-form-item label="鸽棚:" prop="dovecoteNumber">
          <el-select v-model="OutcageInfo.dovecoteNumber" placeholder="请选择">
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
          <el-input v-model="OutcageInfo.cate"></el-input>
        </el-form-item>
        <el-form-item label="数量:" prop="number">
          <el-input v-model="OutcageInfo.number"></el-input>
        </el-form-item>
        <el-form-item label="去向:" prop="go">
          <el-input v-model="OutcageInfo.go"></el-input>
        </el-form-item>
        <el-form-item label="单据号:" prop="billNum">
          <el-input v-model="OutcageInfo.billNum"></el-input>
        </el-form-item>
        <el-form-item label="批次号:" prop="batchNum">
          <el-input v-model="OutcageInfo.batchNum"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="Outcagedialog = false">取 消</el-button>
        <el-button type="primary" plain @click="changeOutcage(id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref,getCurrentInstance} from "vue";
import scTable from "../../../../components/scTable/index.vue";
export default defineComponent({
  name: "outCageRegistration", // 出栏登记
  components: {
    scTable,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    let addOutcagedialog = ref(false);
    let Outcagedialog =ref(false);
    const tableData = ref([
      {
        date: "2022-07-04",
        dovecoteNumber: "A1",
        cate: "乳鸽",
        number: "2200",
        go: "金绿屠宰场",
        billNum: "000265",
        batchNum: "01655",
      },
    ]);
    const addInfo = ref([
      {
        date,
        dovecoteNumber: "A1",
        cate: "..",
        number: "..",
        go: "..",
        billNum: "..",
        batchNum: "..",
        operation: "..",
      },
    ]);
    const OutcageInfo = ref([
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
    ]);
    
    //把这一行的信息传入对话框
    const showOutcagedialog=(item)=>{
          Outcagedialog.value=true;
          OutcageInfo.value=item;
       }
    const addDialogClosed = () => {
      proxy.$refs.addRef.resetFields();
    };
    return {
      tableData,
      addInfo,
      addOutcagedialog,
      Outcagedialog,
      OutcageInfo,
      addDialogClosed,
      showOutcagedialog
    };
  },
});
</script>

<style scoped>
.container {
  margin: 0 20px;
}
.tag {
  display: flex;
  padding: 0 15px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>