<template>
  <div class="container">
    <div class="tag">
      <el-button type="primary" plain @click="addFodderdialog = true"
        >添加饲料</el-button
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
          prop="brand"
          label="饲料种类"
          width="120"
          align="center"
        />
        <el-table-column
          prop="size"
          label="规格"
          width="120"
          sortable
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
          prop="weight"
          label="重量(斤)"
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
      title="添加饲料"
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
        :rules="addformRules"
      >
        <el-form-item label="饲料种类:" prop="brand">
          <el-row :gutter="10" style="width: 380px">
            <el-col
              :span="8"
              v-for="(item, index) in addInfo.brand"
              :key="index"
            >
              <el-select
                v-model="addInfo.brand[index]"
                placeholder="请选择"
                :change="sizeChange(index)"
              >
                <el-option
                  v-for="item in fodderbrand"
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
        <el-form-item label="规格:" prop="size">
          <el-row :gutter="10" style="width: 380px">
            <el-col
              :span="8"
              v-for="(item, index) in addInfo.size"
              :key="index"
            >
              <el-input
                v-model="addInfo.size[index]"
                placeholder="请输入规格"
              ></el-input> </el-col
          ></el-row>
        </el-form-item>
        <el-form-item label="数量:" prop="num">
          <el-row :gutter="10" style="width: 380px">
            <el-col :span="8" v-for="(item, index) in addInfo.num" :key="index">
              <el-input
                v-model="addInfo.num[index]"
                placeholder="请输入数量"
                :change="numChange(index)"
              ></el-input> </el-col
          ></el-row>
        </el-form-item>
        <el-form-item label="重量(斤):" prop="weight">
          <el-row :gutter="10" style="width: 380px">
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
        :rules="editformRules"
      >
        <el-form-item label="时间:" prop="gmtCreate">
          <el-input
            v-model="editInfo.gmtCreate"
            placeholder="请输入时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="饲料种类:" prop="brand">
          <el-select
            v-model="editInfo.brand"
            placeholder="请选择"
            :change="editsizeChange()"
          >
            <el-option
              v-for="item in fodderbrand"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格:" prop="size">
          <el-input v-model="editInfo.size" placeholder="请输入规格"></el-input>
        </el-form-item>
        <el-form-item label="数量:" prop="num">
          <el-input
            v-model="editInfo.num"
            placeholder="请输入数量"
            :change="editNumChange()"
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
import { useStore } from "vuex";
export default defineComponent({
  name: "fodderRegistration", // 饲料登记
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
    let addFodderdialog = ref(false);
    let fodderdialog = ref(false);
    let fodderbrand = reactive(["鸽料138", "中粮","混料","王中王","双汇"]);
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
      var min = 00;
      var seon = 00;
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
      var hour = 23;
      var min = 59;
      var seon = 59;
      var newDate =
        year + "-" + mon + "-" + data + " " + hour + ":" + min + ":" + seon;
      return newDate;
    };
    const tableData = ref([
      {
        gmtCreate: "",
        brand: "",
        size: "",
        num: "",
        weight: "",
        id: "",
      },
    ]);
    const addInfo = reactive({
      brand: ["", ""],
      size: ["", ""],
      num: ["", ""],
      weight: ["", ""],
      shedId: currShed,
    });
    const addInput = () => {
      addInfo.brand.push("");
      addInfo.size.push("");
      addInfo.num.push("");
      addInfo.weight.push("");
    };
    const removeInput = () => {
      if (addInfo.brand.length <= 1) return;
      addInfo.brand.pop();
      addInfo.size.pop();
      addInfo.num.pop();
      addInfo.weight.pop();
    };
    const editInfo = ref({
      gmtCreate: "",
      brand: "",
      size: "",
      num: "",
      weight: "",
    });
    const sizeChange = (index) => {
      if (addInfo.brand[index] === "鸽料138") {
        addInfo.size[index] = "80斤/包";
      } else if (addInfo.brand[index] === "中粮") {
        addInfo.size[index] = "40斤/包";
      } else if (addInfo.brand[index] === "混料") {
        addInfo.size[index] = "110斤/包";
      } else if (addInfo.brand[index] === "王中王") {
        addInfo.size[index] = "110斤/包";
      } else if (addInfo.brand[index] === "双汇") {
        addInfo.size[index] = "60斤/包";
      }
    };
    const numChange = (index) => {
      if (addInfo.num[index]) {
        addInfo.weight[index] =
          parseInt(addInfo.num[index]) * parseInt(addInfo.size[index]) + "";
      }
    };
    const editsizeChange = () => {
      if (editInfo.value.brand === "鸽料138") {
        editInfo.value.size = "80斤/包";
      } else if (editInfo.value.brand === "中粮") {
        editInfo.value.size = "40斤/包";
      } else if (editInfo.value.brand === "混料") {
        editInfo.value.size = "110斤/包";
      } else if (editInfo.value.brand === "王中王") {
        editInfo.value.size = "110斤/包";
      } else if (editInfo.value.brand === "中粮") {
        editInfo.value.size = "60斤/包";
      }
    };
    const editNumChange = () => {
      if (editInfo.value.num) {
        editInfo.value.weight =
          parseInt(editInfo.value.num) * parseInt(editInfo.value.size) + "";
      }
    };
    const checkForm = (rule, value, callback) => {
      for (let index in value) {
        if (!value[index]) callback(new Error("请输入"));
      }
      callback();
    };
    const addformRules = ref({
      brand: [{ validator: checkForm, trigger: "blur", required: true }],
      size: [{ validator: checkForm, trigger: "blur", required: true }],
      num: [{ validator: checkForm, trigger: "blur", required: true }],
      weight: [{ validator: checkForm, trigger: "blur", required: true }],
    });
    const editformRules = ref({
      gmtCreate: [{ message: "请输入时间", trigger: "blur", required: true }],
      brand: [{ message: "请输入饲料种类", trigger: "blur", required: true }],
      size: [{ message: "请输入规格", trigger: "blur", required: true }],
      num: [{ message: "请输入数量", trigger: "blur", required: true }],
      weight: [{ message: "请输入重量", trigger: "blur", required: true }],
    });
    const api = proxy.$API.regFodder.getfeed;
    let params = ref({
      startTime: formatDateStart(datePk[0]),
      endTime: formatDateEnd(datePk[1]),
      shedId: currShed,
    });
    const addFodder = () => {
      proxy.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        await proxy.$API.regFodder.addfeed.post(addInfo).then((res) => {
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
        addFodderdialog.value = false;
        proxy.$refs.table.getData();
      });
    };
    const updateFodder = () => {
      proxy.$refs.editRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        await proxy.$API.regFodder.modifyfeed
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
        fodderdialog.value = false;
        proxy.$refs.table.getData();
      });
    };
    const removeFodder = async (id) => {
      const confirmResult = await proxy
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
      await proxy.$API.regFodder.deletefeed.post(id).then((res) => {
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
    const outTable = () => {
      console.log("点击导出");
    };

    const printTable = () => {
      console.log("点击打印");
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
    const showFodderdialog = (item) => {
      fodderdialog.value = true;
      editInfo.value = Object.assign(item,{shedId:currShed});
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
      addFodderdialog,
      fodderdialog,
      editInfo,
      shortcuts,
      fodderbrand,
      panelChange,
      outTable,
      printTable,
      dataChange,
      checkForm,
      dateDefault,
      datePk,
      addformRules,
      editformRules,
      api,
      params,
      updateFodder,
      addFodder,
      addInput,
      sizeChange,
      numChange,
      editsizeChange,
      editNumChange,
      removeInput,
      removeFodder,
      addDialogClosed,
      editDialogClosed,
      showFodderdialog,
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
.del-model{
    .el-message-box__btns {
    .el-button:nth-child(2) {
      margin-right:10px;
      background-color:#2d8cf0;
      border-color:#2d8cf0;
    }
  }
}
</style>