<template>
  <div class="container">
    <div class="tag">
      <el-button type="primary" plain @click="addAuthoritydialog = true"
        >添加角色</el-button
      >
      <table-search
        :searchTypes="searchTypes"
        :showDatePk="false"
        :showSearch="false"
      />
    </div>
    <el-main class="main">
      <scTable :data="tableData" stripe highlightCurrentRow>
        <el-table-column prop="role" label="角色标签" width="150" align="center" />
        <el-table-column prop="authority" label="拥有角色" width="150" align="center" />
        <el-table-column label="操作" width="220" align="center" fixed="right">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              text
              icon="el-icon-edit"
              @click="showAuthorityDialog(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              text
              icon="el-icon-delete"
              @click="removeAuthority(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </scTable>
    </el-main>
    <el-dialog
      title="添加角色"
      v-model="addAuthoritydialog"
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
          <el-form-item label="角色标签:" prop="role">
          <el-input
            v-model="addInfo.role"
            placeholder="请输入角色标签"
          ></el-input>
        </el-form-item>
        <el-form-item label="说明:" prop="explain">
          <el-input
            v-model="addInfo.explain"
            placeholder="请输入说明"
          ></el-input>
        </el-form-item>
        <el-form-item label="权重:" prop="weight">
          <el-input
            v-model="addInfo.weight"
            placeholder="请输入权重"
          ></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="addAuthoritydialog = false">取 消</el-button>
        <el-button type="primary" plain @click="addAuthority()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, reactive } from "vue";
import scTable from "@/components/scTable/index.vue";
export default defineComponent({
  name: "authority", // 权限管理
  components: {
    scTable,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    let addAuthoritydialog = ref(false);
    let editAuthorityDialog = ref(false);
    let authority = reactive(["男", "女"]);
    const tableData = reactive([
      {
        role:"角色标签",
        authority:"查看权限",
      },
    ]);
    const addInfo = reactive({
      role: "",
      explain: "",
    });
    const formRules = ref({
      date: [{ message: "请输入出生日期", trigger: "blur", required: true }],
      explain: [{ message: "请输入电话", trigger: "blur", required: true }],
      authority:[{ message: "请输入拥有角色", trigger: "blur", required: true }],
      manage: [{ message: "请输入鸽棚", trigger: "blur", required: true }],
      role: [{ message: "请输入角色标签", trigger: "blur", required: true }],
    });
    //把这一行的信息传入对话框
    const showAuthorityDialog = (item) => {
      editAuthorityDialog.value = true;
      editInfo.value = item;
    };
    const updateAuthority = () => {
      console.log("更改");
      editAuthorityDialog.value = false;
    };
    const addAuthority = () => {
      addAuthoritydialog.value = false;
    };
    const removeAuthority = () => {
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
      addAuthoritydialog,
      editAuthorityDialog,
      editInfo,
      authority,
      formRules,
      api,
      updateAuthority,
      addAuthority,
      removeAuthority,
      addDialogClosed,
      editDialogClosed,
      showAuthorityDialog,
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