<template>
  <div class="container">
    <div class="tag">
      <el-button type="primary" plain @click="addWeightAdialog = true"
        >添加出栏</el-button
      >
      <table-search
        :dateDefault="dateDefault"
        @reset="reset"
        @outTable="outTable"
        @printTable="printTable"
        :showSearch="false"
      />
    </div>
    <el-main class="main">
      <scTable :data="tableData" stripe highlightCurrentRow>
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
          sortable
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
          sortable
          align="center"
        />
        <el-table-column
          prop="batchNum"
          label="批次号"
          width="120"
          sortable
          align="center"
        />
        <el-table-column label="操作" width="220" align="center" fixed="right">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              text
              icon="el-icon-edit"
              @click="showWeightAdialog(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              text
              icon="el-icon-delete"
              @click="removeWeightA(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </scTable>
    </el-main>
    <el-dialog
      title="添加出栏"
      v-model="addWeightAdialog"
      width="25%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addInfo"
        ref="addRef"
        label-width="auto"
        style="width:250px"
      >
        <el-form-item label="时间:" prop="date">
          <el-input v-model="addInfo.date" placeholder="请输入时间"></el-input>
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
          <el-input v-model="addInfo.cate" placeholder="请输入种类"></el-input>
        </el-form-item>
        <el-form-item label="数量:" prop="number">
          <el-input
            v-model="addInfo.number"
            placeholder="请输入数量"
          ></el-input>
        </el-form-item>
        <el-form-item label="去向:" prop="go">
          <el-input v-model="addInfo.go" placeholder="请输入去向"></el-input>
        </el-form-item>
        <el-form-item label="单据号:" prop="billNum">
          <el-input
            v-model="addInfo.billNum"
            placeholder="请输入单据号"
          ></el-input>
        </el-form-item>
        <el-form-item label="批次号:" prop="batchNum">
          <el-input
            v-model="addInfo.batchNum"
            placeholder="请输入批次号"
          ></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="addWeightAdialog = false">取 消</el-button>
        <el-button type="primary" plain @click="addWeightA()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑出栏"
      v-model="WeightAdialog"
      width="25%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editInfo"
        ref="editRef"
        label-width="auto"
        style="width:250px"
      >
        <el-form-item label="时间:" prop="date">
          <el-input
            v-model="editInfo.date"
            placeholder="请输入时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="鸽棚:" prop="dovecoteNumber">
          <el-select v-model="editInfo.dovecoteNumber" placeholder="请选择">
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
          <el-input
            v-model="editInfo.cate"
            placeholder="请输入种类"
          ></el-input>
        </el-form-item>
        <el-form-item label="数量:" prop="number">
          <el-input
            v-model="editInfo.number"
            placeholder="请输入数量"
          ></el-input>
        </el-form-item>
        <el-form-item label="去向:" prop="go">
          <el-input
            v-model="editInfo.go"
            placeholder="请输入去向"
          ></el-input>
        </el-form-item>
        <el-form-item label="单据号:" prop="billNum">
          <el-input
            v-model="editInfo.billNum"
            placeholder="请输入单据号"
          ></el-input>
        </el-form-item>
        <el-form-item label="批次号:" prop="batchNum">
          <el-input
            v-model="editInfo.batchNum"
            placeholder="请输入批次号"
          ></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="WeightAdialog = false">取 消</el-button>
        <el-button type="primary" plain @click="updateWeightA()"
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
  name: "reWeighAllot", // 复称调拨
  components: {
    scTable,
  },
  setup() {
    const { proxy } = getCurrentInstance();
      // 时间选择器
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
    let addWeightAdialog = ref(false);
    let WeightAdialog = ref(false);
    let doptions = ref(["A1", "A2", "A3"]);
    const tableData = ref([
      {
        date: "2022-07-04",
        dovecoteNumber: "A1",
        cate: "乳鸽",
        number: "2200只",
        go: "金绿屠宰场",
        billNum: "000265",
        batchNum: "01655",
      },
      {
        date: "2022-07-04",
        dovecoteNumber: "A1",
        cate: "乳鸽",
        number: "2200只",
        go: "金绿屠宰场",
        billNum: "000265",
        batchNum: "01655",
      },
      {
        date: "2022-07-02",
        dovecoteNumber: "A1",
        cate: "乳鸽",
        number: "2200只",
        go: "金绿屠宰场",
        billNum: "000265",
        batchNum: "01655",
      },
      {
        date: "2022-07-04",
        dovecoteNumber: "A1",
        cate: "乳鸽",
        number: "2200只",
        go: "金绿屠宰场",
        billNum: "000265",
        batchNum: "01655",
      },
      {
        date: "2022-07-04",
        dovecoteNumber: "A1",
        cate: "乳鸽",
        number: "2200只",
        go: "金绿屠宰场",
        billNum: "000265",
        batchNum: "01655",
      },
      {
        date: "2022-07-04",
        dovecoteNumber: "A1",
        cate: "乳鸽",
        number: "2200只",
        go: "金绿屠宰场",
        billNum: "000265",
        batchNum: "01655",
      },
      {
        date: "2022-07-04",
        dovecoteNumber: "A1",
        cate: "乳鸽",
        number: "2100只",
        go: "金绿屠宰场",
        billNum: "000265",
        batchNum: "01655",
      },
    ]);
    const addInfo = ref({
      date: "",
      dovecoteNumber: "",
      cate: "",
      number: "",
      go: "",
      billNum: "",
      batchNum: "",
    });
    const editInfo = ref({
      date: "",
      dovecoteNumber: "",
      cate: "",
      number: "",
      go: "",
      billNum: "",
      batchNum: "",
    });
    // 设置默认时间段，组件内默认半年
  let end = new Date()
  let start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 183) // 半年
  let dateDefault = [start, end]
  const outTable = () => {
    console.log('点击导出')
  }
  
  const printTable = () => {
    console.log('点击打印')
  }
    //把这一行的信息传入对话框
    const showWeightAdialog = (item) => {
      WeightAdialog.value = true;
      editInfo.value = item;
    };
    const updateWeightA = () => {
      console.log("更改");
      WeightAdialog.value = false;
    };
    const removeWeightA = () => {
      console.log("删除");
    };
    const addWeightA = () => {
      /*  tableData.value.push(addInfo.value); */
      addWeightAdialog.value = false;
    };
    const addDialogClosed = () => {
      proxy.$refs.addRef.resetFields();
    };
    const editDialogClosed = () => {
      proxy.$refs.editRef.resetFields();
    };

    const api = () => {};
    return {
      tableData,
      addInfo,
      addWeightAdialog,
      WeightAdialog,
      editInfo,
      doptions,
      shortcuts,
      outTable,
      printTable,
      dateDefault,
      api,
      updateWeightA,
      addWeightA,
      removeWeightA,
      addDialogClosed,
      editDialogClosed,
      showWeightAdialog,
    };
  },
});
</script>

<style scoped>
.container {
  margin: 0 20px;
}
.top {
  display: flex;
}
.tag {
  display: flex;
  padding: 0 15px;
  
}
.form {
  width: 80%;
}
.submit {
  align-self: flex-end;
  margin-bottom: 10px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>