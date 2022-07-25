<template>
  <div>
    饲料调拨
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, reactive } from "vue";
export default defineComponent({
  name: "fodderAllot", // 饲料调拨
  components: {
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
    let addFodderdialog = ref(false);
    let fodderdialog = ref(false);
    let doptions = reactive(["A1", "A2", "A3"]);
    let fodderbrand = reactive(["鸽料138", "中粮"]);
    const formRules = ref({
      gmtCreate: [{ message: "请输入时间", trigger: "blur", required: true }],
      brand: [{ message: "请输入饲料种类", trigger: "blur", required: true }],
      size: [{ message: "请输入规格", trigger: "blur", required: true }],
      num: [{ message: "请输入数量", trigger: "blur", required: true }],
      weight: [{ message: "请输入重量", trigger: "blur", required: true }],
      origin: [{ message: "请输入来源", trigger: "blur", required: true }],
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
    let datePk = [start, end];
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
    const api = proxy.$API.fodderAllot.getallocatefeed;
    const params = {
      startTime: formatDate(datePk[0]),
      endTime: formatDate(datePk[1]),
      shedId: currShed.id,
    };
    const tableData = ref([
      {
        gmtCreate: "",
        brand: "",
        size: "",
        num: "",
        weight: "",
        origin:"",
        id:""
      },
    ]);
    const addInfo = reactive({
      gmtCreate: formatDate(end),
      brand: ["", ""],
      size: ["", ""],
      num: ["", ""],
      weight: ["", ""],
      origin: "",
      shedId:currShed.id
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
      origin: "",
    });
    const sizeChange = (index) => {
      if (addInfo.brand[index] === "鸽料138") {
        addInfo.size[index] = "80kg/包";
      } else if (addInfo.brand[index] === "中粮") {
        addInfo.size[index] = "40kg/包";
      }
    };
    const numChange = (index) => {
      if (addInfo.num[index]) {
        addInfo.weight[index] =
          parseInt(addInfo.num[index]) * parseInt(addInfo.size[index]);
      }
    };
    const editsizeChange = () => {
      if (editInfo.value.brand === "鸽料138") {
        editInfo.value.size = "80kg/包";
      } else if (editInfo.value.brand === "中粮") {
        editInfo.value.size = "40kg/包";
      }
    };
    const editNumChange = () => {
      if (editInfo.value.num) {
        editInfo.value.weight =
          parseInt(editInfo.value.num) * parseInt(editInfo.value.size);
      }
    };
    const addFodder = () => {
      proxy.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        await proxy.$API.fodderAllot.addallocatefeed.post(addInfo).then((res) => {
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
        await proxy.$API.fodderAllot.modifyallocatefeed
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
        .$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .catch((err) => err);
      if (confirmResult !== "confirm") {
        return proxy.$message.info("已取消删除操作");
      }
      await proxy.$API.fodderAllot.deleteallocatefeed.post(id).then((res) => {
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
    const editDialogClosed = () => {
    };
    const dataChange = (res) => {
      if(parseInt(res.data.total)>0)
      proxy.$refs.table.total = parseInt(res.data.total);
    };
    return {
      tableData,
      addInfo,
      addFodderdialog,
      fodderdialog,
      editInfo,
      doptions,
      shortcuts,
      fodderbrand,
      outTable,
      printTable,
      dataChange,
      dateDefault,
      datePk,
      formRules,
      api,
      params,
      formatDate,
      updateFodder,
      addFodder,
      addInput,
      removeInput,
      sizeChange,
      numChange,
      editsizeChange,
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
</style>