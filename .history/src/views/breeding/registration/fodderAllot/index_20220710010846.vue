<template>
  <div class="container">
    <div class="tag">
      <el-button type="primary" plain @click="addFodderdialog = true"
        >搬运饲料</el-button
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
        <el-table-column
          prop="cate"
          label="饲料种类"
          width="120"
          align="center"
        />
        <el-table-column
          prop="specs"
          label="规格"
          width="120"
          sortable
          align="center"
        />
        <el-table-column
          prop="number"
          label="数量"
          width="120"
          sortable
          align="center"
        />
        <el-table-column
          prop="weight"
          label="重量"
          width="120"
          sortable
          align="center"
        />
        <el-table-column prop="from" label="来源" width="120" align="center" />
        <el-table-column label="操作" width="220" align="center" fixed="right">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              text
              icon="el-icon-edit"
              @click="showFodderdialog(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              text
              icon="el-icon-delete"
              @click="removeFodder(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </scTable>
    </el-main>
    <el-dialog
      title="搬运饲料"
      v-model="addFodderdialog"
      width="30%"
      @close="addDialogClosed"
      style="display: flex"
    >
      <el-form
        :model="addInfo"
        ref="addRef"
        label-width="auto"
        style="width: 380px"
        :rules="formRules"
      >
        <el-form-item label="时间:" prop="date">
          <el-input v-model="addInfo.date" placeholder="请输入时间"></el-input>
        </el-form-item>
        <el-form-item label="饲料种类:" prop="cate">
          <el-row :gutter="10">
            <el-col
              :span="8"
              v-for="(item, index) in addInfo.cate"
              :key="index"
            >
              <el-select v-model="addInfo.cate[index]" placeholder="请选择" :change="specsChange(index)">
                <el-option
                  v-for="item in fodderCate"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-button @click="addInput()">+</el-button>
            </el-col>
            <el-col :span="4">
              <el-button @click="removeInput()">-</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="规格:" prop="specs">
          <el-row :gutter="10">
            <el-col
              :span="8"
              v-for="(item, index) in addInfo.specs"
              :key="index"
            >
              <el-input
                v-model="addInfo.specs[index]"
                placeholder="请输入规格"
              ></el-input> </el-col
          ></el-row>
        </el-form-item>
        <el-form-item label="数量:" prop="number">
          <el-row :gutter="10">
            <el-col
              :span="8"
              v-for="(item, index) in addInfo.number"
              :key="index"
            >
              <el-input
                v-model="addInfo.number[index]"
                placeholder="请输入数量"
                :change="numChange(index)"
              ></el-input> </el-col
          ></el-row>
        </el-form-item>
        <el-form-item label="重量:" prop="weight">
          <el-row :gutter="10">
            <el-col
              :span="8"
              v-for="(item, index) in addInfo.weight"
              :key="index"
            >
              <el-input
                v-model="addInfo.weight[index]"
                placeholder="请输入重量"
              ></el-input> </el-col
          ></el-row>
        </el-form-item>
        <el-form-item label="来源:" prop="from">
          <el-input v-model="addInfo.from" placeholder="请输入来源"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="addFodderdialog = false">取 消</el-button>
        <el-button type="primary" plain @click="addFodder()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑饲料"
      v-model="fodderdialog"
      width="25%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editInfo"
        ref="editRef"
        label-width="auto"
        style="width: 250px"
        :rules="formRules"
      >
        <el-form-item label="时间:" prop="date">
          <el-input v-model="editInfo.date" placeholder="请输入时间"></el-input>
        </el-form-item>
        <el-form-item label="饲料种类:" prop="cate">
          <el-select v-model="editInfo.cate" placeholder="请选择" :change="ed">
            <el-option
              v-for="item in fodderCate"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格:" prop="specs">
          <el-input
            v-model="editInfo.specs"
            placeholder="请输入规格"
          ></el-input>
        </el-form-item>
        <el-form-item label="数量:" prop="number">
          <el-input
            v-model="editInfo.number"
            placeholder="请输入数量"
          ></el-input>
        </el-form-item>
        <el-form-item label="重量:" prop="weight">
          <el-input
            v-model="editInfo.weight"
            placeholder="请输入重量"
          ></el-input>
        </el-form-item>
        <el-form-item label="来源:" prop="from">
          <el-input v-model="editInfo.from" placeholder="请输入来源"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="fodderdialog = false">取 消</el-button>
        <el-button type="primary" plain @click="updateFodder()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, reactive } from "vue";
import scTable from "@/components/scTable/index.vue";
export default defineComponent({
  name: "fodderAllot", // 饲料调拨
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
    let addFodderdialog = ref(false);
    let fodderdialog = ref(false);
    let doptions = reactive(["A1", "A2", "A3"]);
    let fodderCate = reactive(["喜粮", "中粮"]);
    const tableData = reactive([
      {
        date: "2022-07-04",
        dovecoteNumber: "A1",
        cate: "喜粮",
        specs: "40kg/包",
        number: "4包",
        weight: "160kg",
        from: "全绿货仓",
      },
    ]);
    const addInfo = reactive({
      date: "",
      cate: ["", ""],
      specs: ["", ""],
      number: ["", ""],
      weight: ["", ""],
      from: "",
    });
    const addInput = () => {
      addInfo.cate.push("");
      addInfo.specs.push("");
      addInfo.number.push("");
      addInfo.weight.push("");
    };
    const removeInput = () => {
      if (addInfo.cate.length <= 1) return;
      addInfo.cate.pop();
      addInfo.specs.pop();
      addInfo.number.pop();
      addInfo.weight.pop();
    };
    const editInfo = ref({
      date: "",
      cate: "",
      specs: "",
      number: "",
      weight: "",
      from: "",
    });
    const specsChange = (index) => {
      if (addInfo.cate[index] === "鸽料138") {
        addInfo.specs[index] = "80kg/包";
      } else if (addInfo.cate[index] === "中粮") {
        addInfo.specs[index] = "40kg/包";
      }
    };
    const numChange = (index) => {
      if (addInfo.number[index]) {
        addInfo.weight[index] =
          parseInt(addInfo.number[index]) * parseInt(addInfo.specs[index]);
      }
    };
    const editSpecsChange = () => {
      if (editInfo.value.cate === "鸽料138") {
        editInfo.value.specs = "80kg/包";
      } else if (editInfo.value.cate === "中粮") {
        editInfo.value.specs = "40kg/包";
      }
    };
    const editNumChange = () => {
      if (editInfo.value.number) {
        editInfo.value.weight =
          parseInt(editInfo.value.number) * parseInt(editInfo.value.specs);
      }
    };
    const formRules = ref({
      date: [{ message: "请输入时间", trigger: "blur", required: true }],
      cate: [{ message: "请输入饲料种类", trigger: "blur", required: true }],
      specs: [{ message: "请输入规格", trigger: "blur", required: true }],
      number: [{ message: "请输入数量", trigger: "blur", required: true }],
      weight: [{ message: "请输入重量", trigger: "blur", required: true }],
      from: [{ message: "请输入来源", trigger: "blur", required: true }],
    });
    // 设置默认时间段，组件内默认半年
    let end = new Date();
    let start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 183); // 半年
    let dateDefault = [start, end];
    const outTable = () => {
      console.log("点击导出");
    };

    const printTable = () => {
      console.log("点击打印");
    };
    //把这一行的信息传入对话框
    const showFodderdialog = (item) => {
      fodderdialog.value = true;
      editInfo.value = item;
    };
    const updateFodder = () => {
      console.log("更改");
      fodderdialog.value = false;
    };
    const removeFodder = () => {
      console.log("删除");
    };
    const addFodder = () => {
      /*  tableData.value.push(addInfo.value); */
      addFodderdialog.value = false;
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
      addFodderdialog,
      fodderdialog,
      editInfo,
      doptions,
      shortcuts,
      fodderCate,
      outTable,
      printTable,
      dateDefault,
      formRules,
      api,
      updateFodder,
      addFodder,
      addInput,
      removeInput,
      specsChange,
      numChange,
      editSpecsChange,
      editNumChange,
      removeFodder,
      addDialogClosed,
      editDialogClosed,
      showFodderdialog,
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
.submit {
  align-self: flex-end;
  margin-bottom: 10px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>