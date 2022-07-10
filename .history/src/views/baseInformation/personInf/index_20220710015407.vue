<template>
  <div class="container">
    <div class="tag">
      <el-button type="primary" plain @click="addPersondialog = true"
        >新增个人信息</el-button
      >
      <table-search
        :searchTypes="searchTypes"
        @searchClick="searchClick"
        @reset="reset"
      />
    </div>
    <el-main class="main">
      <scTable :data="tableData" stripe highlightCurrentRow>
        <el-table-column
          prop="profile"
          label="头像"
          width="220"
          align="center"
        />
        <el-table-column prop="name" label="姓名" width="220" align="center" />
        <el-table-column prop="phone" label="电话" width="220" align="center" />
        <el-table-column prop="sex" label="性别" width="220" align="center" />
        <el-table-column
          prop="profession"
          label="职能"
          width="220"
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
      title="添加个人信息"
      v-model="addPersondialog"
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
        <el-form-item label="头像:" prop="profile">
          <el-date-picker
            v-model="addInfo.date"
            type="date"
            format="YYYY-MM-DD"
            unlink-panels
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            v-model="addInfo.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input
            v-model="addInfo.phone"
            placeholder="请输入电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="照片:" prop="picture">
          <el-input
            v-model="addInfo.picture"
            placeholder="请输入照片"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
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
      </el-form>
      <span class="dialog-footer">
        <el-button @click="addPersondialog = false">取 消</el-button>
        <el-button type="primary" plain @click="addPerson()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑个人信息"
      v-model="editPersonDialog"
      width="25%"
      @close="editPersonClosed"
    >
      <el-form
        :model="editInfo"
        ref="editRef"
        label-width="auto"
        style="width: 250px"
        :rules="formRules"
      >
        <el-form-item label="头像:" prop="profile">
          <el-date-picker
            v-model="editInfo.date"
            type="date"
            format="YYYY-MM-DD"
            unlink-panels
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            v-model="editInfo.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input
            v-model="editInfo.phone"
            placeholder="请输入电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="照片:" prop="picture">
          <el-input
            v-model="editInfo.picture"
            placeholder="请输入照片"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
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
  name: "personInf", // 个人信息管理
  components: {
    scTable,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const searchTypes = reactive([
      {
        value: "姓名",
        label: "姓名",
      },
    ]);
    let addPersondialog = ref(false);
    let editPersonDialog = ref(false);
    let sex = reactive(["男", "女"]);
    const tableData = reactive([
      {
        profile:"",
        name:"",
        phone:"",
        sex:"",
        profession:""
      },
    ]);
    const editInfo = ref({
      date: "",
      name: "",
      phone: "",
    });
    const addInfo = reactive({
      date: "",
      name: "",
      phone: "",
    });
    const formRules = ref({
      date: [{ message: "请输入头像", trigger: "blur", required: true }],
      name: [{ message: "请输入姓名", trigger: "blur", required: true }],
      phone: [{ message: "请输入鸽笼号", trigger: "blur", required: true }],
    });
    // 设置默认头像段，组件内默认半年
    let end = new Date();
    let start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 183); // 半年
    let dateDefault = [start, end];

    const searchClick = () => {
      console.log("点击查询");
    };
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
    const showPersonDialog = (item) => {
      editPersonDialog.value = true;
      editInfo.value = item;
    };
    const updatePerson = () => {
      console.log("更改");
      editPersonDialog.value = false;
    };
    const addPerson = () => {
      /*  tableData.value.push(addInfo.value); */
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
      doptions,
      shortcuts,
      searchTypes,
      searchClick,
      reset,
      outTable,
      printTable,
      dateDefault,
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