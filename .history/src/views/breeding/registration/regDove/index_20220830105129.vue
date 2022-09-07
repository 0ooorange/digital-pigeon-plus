<template>
  <div class="container">
    <div class="tag">
      <el-button type="primary" plain @click="addDovedialog = true"
        >添加鸽子</el-button
      >
      <table-search
        :searchTypes="searchTypes"
        :dateDefault="dateDefault"
        :datePkDefalt="datePk"
        @searchClick="searchClick"
        @reset="reset"
        @outTable="outTable"
        @printTable="printTable"
        @panelChange="panelChange"
      />
    </div>
    <el-main class="main">
      <scTable
        ref="table"
        :data="tableData"
        stripe
        highlightCurrentRow
        :apiObj="api"
        :params="getparams"
        requestMethods="post"
        @dataChange="dataChange"
      >
        <el-table-column
          prop="gmtCreate"
          label="时间"
          width="220"
          sortable
          align="center"
        />
        <el-table-column
          prop="codes"
          label="鸽笼号"
          width="220"
          sortable
          align="center"
        />
        <el-table-column
          prop="age"
          label="鸽龄(天)"
          width="220"
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
              @click="showDovedialog(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              text
              icon="el-icon-delete"
              @click="removeDove()"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </scTable>
    </el-main>
    <el-dialog
      title="添加鸽子"
      v-model="addDovedialog"
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
        <el-form-item label="鸽笼号:" prop="pigeonCageCodes">
          <el-input
            v-model="addInfo.pigeonCageCodes"
            placeholder="请输入鸽笼号"
          ></el-input>
        </el-form-item>
        <el-form-item label="鸽龄(天):" prop="age">
          <el-input v-model="addInfo.age" placeholder="请输入鸽龄"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="addDovedialog = false">取 消</el-button>
        <el-button type="primary" plain @click="addDove()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑鸽子"
      v-model="dovedialog"
      width="25%"
      @close="editDoveClosed"
    >
      <el-form
        :model="editInfo"
        ref="editRef"
        label-width="auto"
        style="width: 250px"
        :rules="formRules"
      >
        <el-form-item label="时间:" prop="gmtCreate">
          <el-input
            v-model="editInfo.gmtCreate"
            placeholder="请输入时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="鸽笼号:" prop="codes">
          <el-input
            v-model="editInfo.codes"
            placeholder="请输入鸽笼号"
          ></el-input>
        </el-form-item>
        <el-form-item label="鸽龄(天):" prop="age">
          <el-input v-model="editInfo.age" placeholder="请输入鸽龄"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="dovedialog = false">取 消</el-button>
        <el-button type="primary" plain @click="updateDove()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, reactive } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "doveRegistration", // 鸽子登记
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const currShed = store.state.baseInfo.SHED_ID;
    const searchTypes = reactive([
      {
        value: "鸽笼号",
        label: "鸽笼号",
      },
    ]);
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
    let addDovedialog = ref(false);
    let dovedialog = ref(false);
    //格式化时间
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
    // 设置默认时间段，组件内默认半年
    let end = new Date();
    let start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 183); // 半年
    let dateDefault = [start, end];
    let datePk = [start, end];
    const tableData = ref([
      {
        gmtCreate: "",
        codes: "",
        age: "",
      },
    ]);
    const editInfo = ref({
      gmtCreate: "",
      codes: "",
      age: "",
    });
    const addInfo = reactive({
      shedId: currShed,
      pigeonCageCodes: "",
      version: 0,
      age: "",
    });
    const formRules = ref({
      gmtCreate: [{ message: "请输入时间", trigger: "blur", required: true }],
      codes: [{ message: "请输入鸽笼号", trigger: "blur", required: true }],
      age: [{ message: "请输入鸽龄", trigger: "blur", required: true }],
    });
    const printTable = () => {
      // console.log("点击打印");
    };
    const panelChange = (date) => {
      datePk.value = date;
      getparams.value = {
        startTime: formatDateStart(datePk.value[0]),
        endTime: formatDateEnd(datePk.value[1]),
        shedId: currShed,
      };
    };
    const reset = () => {
      // console.log("点击重置");
    };
    const outTable = () => {
      // console.log("点击导出");
    };
    //把这一行的信息传入对话框
    const showDovedialog = (item) => {
      dovedialog.value = true;
      editInfo.value = Object.assign(item, { shedId: currShed });
    };
    const api = proxy.$API.regDove.getpigeon;
    let getparams = ref({
      startTime: formatDateStart(datePk[0]),
      endTime: formatDateEnd(datePk[1]),
      shedId: currShed,
      codes: "",
    });
    const addDove = () => {
      proxy.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        await proxy.$API.regDove.addpigeon.post(addInfo).then((res) => {
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
        addDovedialog.value = false;
        getparams.value = {
          startTime: formatDateStart(datePk[0]),
          endTime: formatDateEnd(datePk[1]),
          shedId: currShed,
          codes: "",
        };
      });
    };
    const updateDove = () => {
      /* proxy.$refs.editRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        await proxy.$API.regDove.modifypigeon
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
        dovedialog.value = false;
        proxy.$refs.table.getData();
      });*/
    };
    const removeDove = async () => {
      /* const confirmResult = await proxy
        .$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          customClass:'del-model',
        })
        .catch((err) => err);
      if (confirmResult !== "confirm") {
        return proxy.$message.info("已取消删除操作");
      }
      await proxy.$API.regDove.deletepigeon.post(id).then((res) => {
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
      proxy.$refs.table.getData(); */
    };
    const addDialogClosed = () => {
      proxy.$refs.addRef.resetFields();
    };
    const editDialogClosed = () => {};
    const dataChange = (res) => {
      if (parseInt(res.data.total) > 0)
        proxy.$refs.table.total = parseInt(res.data.total);
    };
    const searchClick = (params) => {
      getparams.value = {
        startTime: formatDateStart(datePk[0]),
        endTime: formatDateEnd(datePk[1]),
        shedId: currShed,
        codes: params.inputValue,
      };
    };
    return {
      store,
      tableData,
      addInfo,
      addDovedialog,
      dovedialog,
      editInfo,
      shortcuts,
      searchTypes,
      searchClick,
      reset,
      panelChange,
      outTable,
      printTable,
      dateDefault,
      datePk,
      formRules,
      api,
      getparams,
      dataChange,
      updateDove,
      addDove,
      removeDove,
      addDialogClosed,
      editDialogClosed,
      showDovedialog,
    };
  },
});
</script>

<style lang="scss">
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
/* .del-model{
    .el-message-box__btns {
    .el-button:nth-child(2) {
      margin-right:10px;
      background-color:#2d8cf0;
      border-color:#2d8cf0;
    }
  }
} */
</style>