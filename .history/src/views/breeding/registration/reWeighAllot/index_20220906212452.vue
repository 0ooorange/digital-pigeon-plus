<template>
  <div class="container">
    <div class="tag">
      <el-button type="primary" plain @click="addReWeightdialog = true"
        >复称饲料</el-button
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
          prop="gmtCreate"
          label="时间"
          width="200"
          sortable
          align="center"
        />
        <el-table-column
          prop="weight"
          label="重量(斤)"
          width="400"
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
              @click="showReWeightdialog(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              text
              icon="el-icon-delete"
              @click="removeReWeight(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </scTable>
    </el-main>
    <el-dialog
      title="复称饲料"
      v-model="addReWeightdialog"
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
        <el-form-item label="重量(斤):" prop="weight">
          <el-input
            v-model="addInfo.weight"
            placeholder="请输入重量"
          ></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="addReWeightdialog = false">取 消</el-button>
        <el-button type="primary" plain @click="addReWeight()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑饲料"
      v-model="ReWeightdialog"
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
        <el-form-item label="时间:" prop="gmtCreate">
          <el-input
            v-model="editInfo.gmtCreate"
            placeholder="请输入时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="重量(斤):" prop="weight">
          <el-input
            v-model="editInfo.weight"
            placeholder="请输入重量"
          ></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="ReWeightdialog = false">取 消</el-button>
        <el-button type="primary" plain @click="updateReWeight()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from "vue";
export default defineComponent({
  name: "reWeighAllot", // 复称调拨
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const currShed = proxy.$TOOL.data.get('CURR_INFO').CURR_SHED.id
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
    let addReWeightdialog = ref(false);
    let ReWeightdialog = ref(false);
    // 设置默认时间段，组件内默认半年
    let end = new Date();
    let start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 183); // 半年
    let dateDefault = [start, end];
    let datePk = [start, end];
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
    const tableData = ref([
      {
        gmtCreate: "",
        weight: "",
      },
    ]);
    const addInfo = ref({
      shedId: currShed,
      weight: "",
    });
    const editInfo = ref({
      gmtCreate: "",
      weight: "",
    });
    const formRules = ref({
      weight: [{ message: "请输入重量", trigger: "blur", required: true }],
    });

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
    const showReWeightdialog = (item) => {
      ReWeightdialog.value = true;
      editInfo.value = Object.assign(item, { shedId: currShed });
    };
    const api = proxy.$API.reWeighAllot.getreweighfeed;
    let params = ref({
      startTime: formatDateStart(datePk[0]),
      endTime: formatDateEnd(datePk[1]),
      shedId: currShed,
    });
    const addReWeight = () => {
      proxy.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        await proxy.$API.reWeighAllot.addreweighfeed
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
        addReWeightdialog.value = false;
        proxy.$refs.table.getData();
      });
    };
    const updateReWeight = () => {
      proxy.$refs.editRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        await proxy.$API.reWeighAllot.modifyreweighfeed
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
        ReWeightdialog.value = false;
        proxy.$refs.table.getData();
      });
    };
    const removeReWeight = async (id) => {
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
      await proxy.$API.reWeighAllot.deletereweighfeed.post(id).then((res) => {
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
    const editDialogClosed = () => {};
    const dataChange = (res) => {
      if (parseInt(res.data.total) > 0)
        proxy.$refs.table.total = parseInt(res.data.total);
    };
    return {
      store,
      tableData,
      addInfo,
      addReWeightdialog,
      ReWeightdialog,
      editInfo,
      shortcuts,
      panelChange,
      outTable,
      printTable,
      dataChange,
      dateDefault,
      datePk,
      formRules,
      api,
      params,
      updateReWeight,
      addReWeight,
      removeReWeight,
      addDialogClosed,
      editDialogClosed,
      showReWeightdialog,
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