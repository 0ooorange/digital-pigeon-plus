<template>
  <div class="container">
    <div v-show=true>
        <el-form label-width="70px" :model="searchInfo" ref="searchRef">
          
              <el-form-item label="鸽棚:" prop="dovecoteNumber">
          <el-select v-model="searchInfo.dovecoteNumber" placeholder="请选择">
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
          <el-input v-model="searchInfo.cate"></el-input>
        </el-form-item>
        <el-form-item label="数量:" prop="number">
          <el-input v-model="searchInfo.number"></el-input>
        </el-form-item>
        <el-form-item label="去向:" prop="go">
          <el-input v-model="searchInfo.go"></el-input>
        </el-form-item>
        <el-form-item label="单据号:" prop="billNum">
          <el-input v-model="searchInfo.billNum"></el-input>
        </el-form-item>
        <el-form-item label="批次号:" prop="batchNum">
          <el-input v-model="searchInfo.batchNum"></el-input>
        </el-form-item>
            
          <el-row :gutter="20">
            <el-date-picker
              v-model="dateValue.value"
              default-value="dateDefault"
              type="daterange"
              format="YYYY-MM-DD"
              unlink-panels
              range-separator="-"
              start-placeholder="起始时间"
              end-placeholder="结束时间"
              shortcuts="shortcuts"
            />
          </el-row>
        </el-form>
      </div>
    <div class="tag">
      <el-tooltip effect="dark" content="搜索按钮" placement="top-start">
        <el-button icon="el-icon-search" @click="isShowSearch()" size="small" />
      </el-tooltip>
      <el-button type="primary" plain @click="addOutcagedialog = true"
        >添加出栏</el-button
      >
    </div>
    <el-main class="main">
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
        <el-table-column label="操作" width="220" align="center">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-edit"
              @click="showOutcagedialog(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeOutcage(scope.row.id)"
              >删除</el-button
            >
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
      @close="editDialogClosed"
    >
      <el-form
        :model="OutcageInfo"
        ref="editRef"
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
        <el-button type="primary" plain @click="changeOutcage(id)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from "vue";
import scTable from "@/components/scTable/index.vue";
export default defineComponent({
  name: "outCageRegistration", // 出栏登记
  components: {
    scTable,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    let isSearch=false;
    // 时间选择器
    const dateValue = ref([""]);
    const shortcuts = [
      {
        text: "近一周",
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          return [start, end];
        },
      },
      {
        text: "近一个月",
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          return [start, end];
        },
      },
      {
        text: "近3个月",
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          return [start, end];
        },
      },
    ];
    // 设置默认时间段，组件内默认半年
    let end = new Date();
    let start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 183); // 半年
    let dateDefault = [start, end];
    let addOutcagedialog = ref(false);
    let Outcagedialog = ref(false);
    let doptions = ref(["A1", "A2", "A3"]);
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
      {
        date: "2022-07-04",
        dovecoteNumber: "A1",
        cate: "乳鸽",
        number: "2200",
        go: "金绿屠宰场",
        billNum: "000265",
        batchNum: "01655",
      },
      {
        date: "2022-07-02",
        dovecoteNumber: "A1",
        cate: "乳鸽",
        number: "2200",
        go: "金绿屠宰场",
        billNum: "000265",
        batchNum: "01655",
      },
      {
        date: "2022-07-04",
        dovecoteNumber: "A1",
        cate: "乳鸽",
        number: "2200",
        go: "金绿屠宰场",
        billNum: "000265",
        batchNum: "01655",
      },
      {
        date: "2022-07-04",
        dovecoteNumber: "A1",
        cate: "乳鸽",
        number: "2200",
        go: "金绿屠宰场",
        billNum: "000265",
        batchNum: "01655",
      },
      {
        date: "2022-07-04",
        dovecoteNumber: "A1",
        cate: "乳鸽",
        number: "2200",
        go: "金绿屠宰场",
        billNum: "000265",
        batchNum: "01655",
      },
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
    const searchInfo =ref({
      date: "",
      dovecoteNumber: "",
      cate: "",
      number: "",
      go: "",
      billNum: "",
      batchNum: ""
    });
    const addInfo = ref({
      date: "",
      dovecoteNumber: "",
      cate: "",
      number: "",
      go: "",
      billNum: "",
      batchNum: ""
    });
    const OutcageInfo = ref({
      date: "",
      dovecoteNumber: "",
      cate: "",
      number: "",
      go: "",
      billNum: "",
      batchNum: ""
    });
    const isShowSearch=()=>{
      isSearch=!isSearch;
    }
    //把这一行的信息传入对话框
    const showOutcagedialog = (item) => {
      Outcagedialog.value = true;
      OutcageInfo.value = item;
    };
    const addOutcage = () => {
      /*  tableData.value.push(addInfo.value); */
      addOutcagedialog.value = false;
    };
    const addDialogClosed = () => {
      proxy.$refs.addRef.resetFields();
    };
    const editDialogClosed = () => {
      proxy.$refs.editRef.resetFields();
    };
    const api = () => {};
    return {
      isSearch,
      tableData,
      searchInfo,
      addInfo,
      addOutcagedialog,
      Outcagedialog,
      OutcageInfo,
      doptions,
      dateValue,
      shortcuts,
      dateDefault,
      isShowSearch,
      api,
      addOutcage,
      addDialogClosed,
      editDialogClosed,
      showOutcagedialog,
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