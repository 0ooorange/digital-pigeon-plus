<template>
  <div class="container">
    <div class="tag">
      <el-button type="primary" plain @click="addPersondialog = true"
        >添加员工</el-button
      >
      <table-search
        :searchTypes="searchTypes"
        :showDatePk="false"
        :showSearch="false"
      />
    </div>
    <el-main class="main">
      <scTable :data="tableData" stripe highlightCurrentRow>
        <el-table-column prop="name" label="姓名" width="150" align="center" />
        <el-table-column prop="sex" label="性别" width="150" align="center" />
        <el-table-column prop="phone" label="电话" width="150" align="center" />
        <el-table-column
          prop="manage"
          label="管理鸽棚"
          width="150"
          align="center"
        />
        <el-table-column label="操作" width="220" align="center" fixed="right">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              text
              icon="el-icon-edit"
              @click="showPersonDialog(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              text
              icon="el-icon-delete"
              @click="removePerson(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </scTable>
    </el-main>
    <el-dialog
      title="添加员工"
      v-model="addPersondialog"
      width="30%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addInfo"
        ref="addRef"
        label-width="auto"
        style="width: 300px"
        :rules="formRules"
      >
        <el-form-item label="出生日期:" prop="date" style="width: 220px">
          <el-date-picker
            v-model="addInfo.date"
            type="date"
            format="YYYY-MM-DD"
            unlink-panels
            placeholder="选择日期"
          />
        </el-form-item>
                <el-form-item label="姓名:" prop="name">
          <el-input
            v-model="addInfo.name"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex" style="width: 200px">
          <el-select
            v-model="addInfo.sex"
            placeholder="请选择"
          >
            <el-option
              v-for="item in sex"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input
            v-model="addInfo.phone"
            placeholder="请输入电话"
          ></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="addPersondialog = false">取 消</el-button>
        <el-button type="primary" plain @click="addPerson()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑员工"
      v-model="editPersonDialog"
      width="30%"
      @close="editPersonClosed"
    >
      <el-form
        :model="editInfo"
        ref="editRef"
        label-width="auto"
        style="width: 300px"
        :rules="formRules"
      >
        <el-form-item label="出生日期:" prop="date" style="width: 220px">
          <el-date-picker
            v-model="editInfo.date"
            type="date"
            format="YYYY-MM-DD"
            unlink-panels
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <el-input
            v-model="addInfo.name"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex" style="width: 200px">
          <el-select
            v-model="editInfo.sex"
            placeholder="请选择"
          >
            <el-option
              v-for="item in sex"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input
            v-model="editInfo.phone"
            placeholder="请输入电话"
          ></el-input>
        </el-form-item>        
      </el-form>
      <span class="dialog-footer">
        <el-button @click="editPersonDialog = false">取 消</el-button>
        <el-button type="primary" plain @click="updatePerson()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, reactive } from "vue";
import scTable from "@/components/scTable/index.vue";
export default defineComponent({
  name: "employee", // 员工管理
  components: {
    scTable,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    let addPersondialog = ref(false);
    let editPersonDialog = ref(false);
    let sex = reactive(["男", "女"]);
    const tableData = reactive([
      {
        name:"姓名",
        sex:"男",
        phone:"123",
        manage:"A1",
      },
    ]);
    const editInfo = ref({
      name: "",
      phone: "",
    });
    const addInfo = reactive({
      date: "",
      password:"",
      phone: "",
      picture:"",
      name: "",
    });
    const formRules = ref({
      date: [{ message: "请输入出生日期", trigger: "blur", required: true }],
      password:[{ message: "请输入密码", trigger: "blur", required: true }],
      phone: [{ message: "请输入电话", trigger: "blur", required: true }],
      picture:[{ message: "请输入照片", trigger: "blur"}],
      sex:[{ message: "请输入性别", trigger: "blur", required: true }],
      name: [{ message: "请输入姓名", trigger: "blur", required: true }],
    });
    const searchClick = () => {
      console.log("点击查询");
    };
    const reset = () => {
      console.log("点击重置");
    };
    //把这一行的信息传入对话框
    const showPersonDialog = (item) => {
      editPersonDialog.value = true;
      editInfo.value = item;
    };
    const updatePerson = () => {
      console.log("更改");
      editPersonDialog.value = false;
    };
    const addPerson = () => {
      addPersondialog.value = false;
    };
    const removePerson = () => {
      console.log("删除");
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
      addPersondialog,
      editPersonDialog,
      editInfo,
      sex,
      searchTypes,
      searchClick,
      reset,
      formRules,
      api,
      updatePerson,
      addPerson,
      removePerson,
      addDialogClosed,
      editDialogClosed,
      showPersonDialog,
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