<template>
  <div class="container">
    <div class="tag">
      <el-button type="primary" plain @click="addOutcagedialog = true"
        >添加出栏</el-button
      >
      <table-search
        :dateDefault="dateDefault"
        :datePkDefalt="datePk"
        @reset="reset"
        @outTable="outTable"
        @printTable="printTable"
        :showSearch="false"
      />
    </div>
    <el-main class="main">
      <scTable
        :data="tableData"
        stripe
        highlightCurrentRow
        :apiObj="api"
        :params="params"
        requestMethods="post"
      >
        <el-table-column
          prop="deliverTime"
          label="时间"
          width="150"
          sortable
          align="center"
        />
        <el-table-column
          prop="category"
          label="种类"
          width="120"
          align="center"
        />
        <el-table-column
          prop="num"
          label="数量"
          width="120"
          sortable
          align="center"
        />
        <el-table-column
          prop="destination"
          label="去向"
          width="120"
          align="center"
        />
        <el-table-column
          prop="codes"
          label="单据号"
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
              @click="showOutcagedialog(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              text
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
      width="25%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addInfo"
        ref="addRef"
        label-width="auto"
        style="width: 250px"
        :rules="formRules"
      >
        <el-form-item label="时间:" prop="deliverTime">
          <el-input
            v-model="addInfo.deliverTime"
            placeholder="请输入时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="鸽棚:" prop="shedId">
          <el-select v-model="addInfo.shedId" placeholder="请选择">
            <el-option
              v-for="item in doptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="种类:" prop="category">
          <el-input
            v-model="addInfo.category"
            placeholder="请输入种类"
          ></el-input>
        </el-form-item>
        <el-form-item label="数量:" prop="num">
          <el-input v-model="addInfo.num" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="去向:" prop="destination">
          <el-input
            v-model="addInfo.destination"
            placeholder="请输入去向"
          ></el-input>
        </el-form-item>
        <el-form-item label="单据号:" prop="codes">
          <el-input
            v-model="addInfo.codes"
            placeholder="请输入单据号"
          ></el-input>
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
        <el-form-item label="时间:" prop="deliverTime">
          <el-input
            v-model="editInfo.deliverTime"
            placeholder="请输入时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="鸽棚:" prop="shedId">
          <el-select v-model="editInfo.shedId" placeholder="请选择">
            <el-option
              v-for="(item, index) in doptions"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="种类:" prop="category">
          <el-input
            v-model="editInfo.category"
            placeholder="请输入种类"
          ></el-input>
        </el-form-item>
        <el-form-item label="数量:" prop="num">
          <el-input v-model="editInfo.num" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="去向:" prop="destination">
          <el-input
            v-model="editInfo.destination"
            placeholder="请输入去向"
          ></el-input>
        </el-form-item>
        <el-form-item label="单据号:" prop="codes">
          <el-input
            v-model="editInfo.codes"
            placeholder="请输入单据号"
          ></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="Outcagedialog = false">取 消</el-button>
        <el-button type="primary" plain @click="updateOutcage()"
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
    const currShed = proxy.$TOOL.data.get("CURR_INFO").CURR_SHED;
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
    //格式化时间
    const formatDate = (dat) => {
      //获取年月日，时间
      var year = dat.getFullYear();
      var mon =
        dat.getMonth() + 1 < 10
          ? "0" + (dat.getMonth() + 1)
          : dat.getMonth() + 1;
      var data = dat.getDate() < 10 ? "0" + dat.getDate() : dat.getDate();
      var hour = dat.getHours() < 10 ? "0" + dat.getHours() : dat.getHours();
      var min =
        dat.getMinutes() < 10 ? "0" + dat.getMinutes() : dat.getMinutes();
      var seon =
        dat.getSeconds() < 10 ? "0" + dat.getSeconds() : dat.getSeconds();

      var newDate =
        year + "-" + mon + "-" + data + " " + hour + ":" + min + ":" + seon;
      return newDate;
    };
    let addOutcagedialog = ref(false);
    let Outcagedialog = ref(false);
    // 设置默认时间段，组件内默认半年
    let end = new Date();
    let start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 183); // 半年
    let dateDefault = [start, end];
    let datePk = [start, end];
    let doptions = ref([
      {
        value: "1518124016571797507",
        label: "A1",
      },
    ]);
    const formRules = ref({
      deliverTime: [{ message: "请输入时间", trigger: "blur", required: true }],
      shedId: [{ message: "请输入鸽棚", trigger: "blur", required: true }],
      category: [{ message: "请输入种类", trigger: "blur", required: true }],
      num: [{ message: "请输入数量", trigger: "blur", required: true }],
      destination: [{ message: "请输入去向", trigger: "blur", required: true }],
      codes: [{ message: "请输入单据号", trigger: "blur", required: true }],
    });
    const tableData = ref([
      {
        deliverTime: "",
        category: "",
        num: "",
        destination: "",
        codes: "",
        id: "",
      },
    ]);
    const addInfo = ref({
      deliverTime: formatDate(end),
      shedId: "",
      category: "",
      num: "",
      destination: "",
      codes: "",
    });
    const editInfo = ref({
      deliverTime: formatDate(end),
      shedId: "",
      category: "",
      num: "",
      destination: "",
      codes: "",
    });
    const outTable = () => {
      console.log("点击导出");
    };

    const printTable = () => {
      console.log("点击打印");
    };
    //把这一行的信息传入对话框
    const showOutcagedialog = (item) => {
      Outcagedialog.value = true;
      editInfo.value = item;
    };
    const api = proxy.$API.regOutCage.delivermanagement;
    let params = {
      startTime: formatDate(datePk[0]),
      endTime: formatDate(datePk[1]),
      shedId: currShed.id,
    };
    const addOutcage = () => {
      proxy.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        proxy.$API.regOutCage.adddeliver.post(addInfo.value).then((res) => {
          if (res.success) {
            proxy.$message({
              message: "添加成功",
              type: "success",
            });
          } else {
            proxy.$message({
              message: "添加失败",
              type: "error",
            });
          }
        });
        proxy.$refs.addRef.resetFields();
        addOutcagedialog.value = false;
      });
    };
    const updateOutcage = () => {
      proxy.$refs.editRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        proxy.$API.regOutCage.modifydeliver.post(editInfo.value).then((res) => {
          if (res.success) {
            proxy.$message({
              message: "修改成功",
              type: "success",
            });
          } else {
            proxy.$message({
              message: "修改失败",
              type: "error",
            });
          }
        });
        Outcagedialog.value = false;
      });
    };
    const removeOutcage = (id) => {
      proxy.$API.regOutCage.deletedeliver
        .post(id)
        .then((res) => {
          if (res.success) {
            proxy.$message({
              message: "删除成功",
              type: "success",
            });
          } else {
            proxy.$message({
              message: "删除失败",
              type: "error",
            });
          }
        });
    };
    const addDialogClosed = () => {
      proxy.$refs.addRef.resetFields();
    };
    const editDialogClosed = () => {
      proxy.$refs.editRef.resetFields();
    };
    return {
      tableData,
      addInfo,
      addOutcagedialog,
      Outcagedialog,
      editInfo,
      doptions,
      shortcuts,
      outTable,
      printTable,
      dateDefault,
      datePk,
      formRules,
      api,
      params,
      formatDate,
      updateOutcage,
      addOutcage,
      removeOutcage,
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