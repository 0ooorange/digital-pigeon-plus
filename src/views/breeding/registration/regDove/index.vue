<template>
  <div class="container">
    <div class="tag">
      <el-button type="primary" plain @click="addDovedialog = true"
        >添加鸽子</el-button
      >
      <table-search
        :searchTypes="searchTypes"
        :dateDefault="dateDefault"
        @searchClick="searchClick"
        @reset="reset"
        @outTable="outTable"
        @printTable="printTable"
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
export default defineComponent({
  name: "doveRegistration", // 鸽子登记
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const currShed = proxy.$TOOL.data.get("CURR_INFO").CURR_SHED;
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
      },
    ]);
    const editInfo = ref({
      gmtCreate: "",
      codes: "",
    });
    const addInfo = reactive({
      shedId: currShed.id,
      pigeonCageCodes: "",
      version:0
    });
    const formRules = ref({
      gmtCreate: [{ message: "请输入时间", trigger: "blur", required: true }],
      codes: [{ message: "请输入鸽笼号", trigger: "blur", required: true }],
    });
    const printTable = () => {
      console.log("点击打印");
    };
    const reset = () => {
      console.log("点击重置");
    };
    const outTable = () => {
      console.log("点击导出");
    };
    //把这一行的信息传入对话框
    const showDovedialog = (item) => {
      dovedialog.value = true;
      editInfo.value = Object.assign(item, { shedId: currShed.id });
    };
    const api = proxy.$API.regDove.getpigeon;
    let getparams = ref({
      startTime: formatDate(datePk[0]),
      endTime: formatDate(datePk[1]),
      shedId: currShed.id,
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
          startTime: formatDate(datePk[0]),
          endTime: formatDate(datePk[1]),
          shedId: currShed.id,
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
        startTime: formatDate(datePk[0]),
        endTime: formatDate(datePk[1]),
        shedId: currShed.id,
        codes: params.inputValue,
      };
    };
    return {
      tableData,
      addInfo,
      addDovedialog,
      dovedialog,
      editInfo,
      shortcuts,
      searchTypes,
      searchClick,
      reset,
      outTable,
      printTable,
      dateDefault,
      datePk,
      formRules,
      api,
      getparams,
      dataChange,
      formatDate,
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
  margin-left: 20px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>