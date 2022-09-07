<template>
  <div class="container">
    <div class="tag">
      <el-button type="primary" plain @click="addOutcagedialog = true"
        >添加出栏</el-button
      >
      <table-search
        :dateDefault="dateDefault"
        :datePkDefalt="datePk"
        @outTable="outTable"
        @printTable="printTable"
        @panelChange="panelChange"
        :showSearch="false"
      />
    </div>
    <el-main class="main">
      <scTable
        ref="table"
        :data="tableData"
        stripe
        highlightCurrentRow
        :apiObj="api"
        :params="params"
        requestMethods="post"
        @dataChange="dataChange"
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
          <el-date-picker
            v-model="addInfo.deliverTime"
            :default-value="addInfo.deliverTime"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            unlink-panels
            placeholder="请输入时间"
          />
        </el-form-item>
        <el-form-item label="种类:" prop="category">
          <el-select
                v-model="addInfo.category"
                placeholder="请选择种类"
              >
                <el-option
                  v-for="item in category"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量:" prop="num">
          <el-input v-model="addInfo.num" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="去向:" prop="destination">
          <el-select
                v-model="addInfo.destination"
                placeholder="请选择去向"
              >
                <el-option
                  v-for="item in destination"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
          </el-select>
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
        <el-form-item label="种类:" prop="category">
          <el-select
                v-model="editInfo.category"
                placeholder="请选择种类"
              >
                <el-option
                  v-for="item in category"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量:" prop="num">
          <el-input v-model="editInfo.num" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="去向:" prop="destination">
          <el-select
                v-model="editInfo.destination"
                placeholder="请选择去向"
              >
                <el-option
                  v-for="item in destination"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
          </el-select>
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
import { defineComponent, ref, getCurrentInstance, reactive, watch } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "outCageRegistration", // 出栏登记
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const currShed = store.state.baseInfo.SHED_ID;
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
    const formatDateStart = (dat) => {
      //获取年月日，时间
      var year = dat.getFullYear();
      var mon =
        dat.getMonth() + 1 < 10
          ? "0" + (dat.getMonth() + 1)
          : dat.getMonth() + 1;
      var data = dat.getDate() < 10 ? "0" + dat.getDate() : dat.getDate();
      var hour = "00";
      var min = "00";
      var seon = "00";
      var newDate =
        year + "-" + mon + "-" + data + " " + hour + ":" + min + ":" + seon;
      return newDate;
    };
    const formatDateEnd = (dat) => {
      //获取年月日，时间
      var year = dat.getFullYear();
      var mon =
        dat.getMonth() + 1 < 10
          ? "0" + (dat.getMonth() + 1)
          : dat.getMonth() + 1;
      var data = dat.getDate() < 10 ? "0" + dat.getDate() : dat.getDate();
      var hour = "23";
      var min = "59";
      var seon = "59";
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
    let datePk = ref([start, end]);
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
      shedId: currShed,
      category: "",
      num: "",
      destination: "",
      codes: "",
    });
    const editInfo = ref({
      deliverTime: formatDate(end),
      category: "",
      num: "",
      destination: "",
      codes: "",
    });
    let category = reactive(["种鸽","乳鸽"]);
    let destination = reactive(["金绿屠宰场"]);
    const outTable = () => {
      // console.log("点击导出");
    };
    const printTable = () => {
      // console.log("点击打印");
    };
    const panelChange = (date) => {
      datePk.value = date;
      params.value = {
        startTime: formatDateStart(datePk.value[0]),
        endTime: formatDateEnd(datePk.value[1]),
        shedId: currShed,
      };
    };
    //把这一行的信息传入对话框
    const showOutcagedialog = (item) => {
      Outcagedialog.value = true;
      editInfo.value = Object.assign(item, { shedId: currShed });
    };
    const api = proxy.$API.regOutCage.delivermanagement;
    let params = ref({
      startTime: formatDateStart(datePk.value[0]),
      endTime: formatDateEnd(datePk.value[1]),
      shedId: currShed,
    });
    const addOutcage = () => {
      addInfo.value.deliverTime = formatDate(addInfo.value.deliverTime);
      proxy.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        await proxy.$API.regOutCage.adddeliver
          .post(addInfo.value)
          .then((res) => {
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
        proxy.$refs.table.getData();
      });
    };
    const updateOutcage = () => {
      proxy.$refs.editRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        await proxy.$API.regOutCage.modifydeliver
          .post(editInfo.value)
          .then((res) => {
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
        proxy.$refs.table.getData();
      });
    };
    const removeOutcage = async (id) => {
      const confirmResult = await proxy
        .$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          customClass: "del-model",
        })
        .catch((err) => err);
      if (confirmResult !== "confirm") {
        return proxy.$message.info("已取消删除操作");
      }
      await proxy.$API.regOutCage.deletedeliver.post(id).then((res) => {
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
      proxy.$refs.table.getData();
    };
    const addDialogClosed = () => {
      proxy.$refs.addRef.resetFields();
    };
    const dataChange = (res) => {
      if (parseInt(res.data.total) > 0)
        proxy.$refs.table.total = parseInt(res.data.total);
    };
    const editDialogClosed = () => {};
    watch(
      proxy.tool.data.get('CURR_INFO'),
      (value) =>{
        console.log(value)
      }
    )
    return {
      store,
      tableData,
      addInfo,
      addOutcagedialog,
      Outcagedialog,
      editInfo,
      shortcuts,
      panelChange,
      outTable,
      printTable,
      dateDefault,
      datePk,
      formRules,
      api,
      params,
      category,
      destination,
      dataChange,
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

<style lang="scss">
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
.del-model {
  .el-message-box__btns {
    .el-button:nth-child(2) {
      margin-right: 10px;
      background-color: #2d8cf0;
      border-color: #2d8cf0;
    }
  }
}
</style>