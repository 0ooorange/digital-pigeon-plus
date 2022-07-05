<template>
  <div class="container">
    <div class="tag">
      <el-button type="primary" plain @click="addOutcagedialog = true"
        >添加鸽子</el-button
      >
    </div>
    <el-main class="main">
      <scTable :data="tableData" stripe >
        <el-table-column
          prop="date"
          label="时间"
          width="150"
          sortable
          align="center"
        />
        <el-table-column
          prop="dovecoteNumber"
          label="鸽棚"
          width="150"
          align="center"
        />
        <el-table-column
          prop="weight"
          label="重量"
          width="150"
          sortable
          align="center"
        />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-edit"
              @click="showDove(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeDove(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </scTable>
      <el-dialog
      title="添加鸽子"
      v-model="addDovedialog"
      width="30%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addInfo"
        ref="addRef"
        :rules="DoveRules"
        label-width="120px"
      >
        <el-form-item label="时间:" prop="date">
          <el-input v-model="addInfo.date"></el-input>
        </el-form-item>
        <el-form-item label="鸽棚:" prop="dovecoteNumber">
          <el-select v-model="addInfo.dovecoteNumber" placeholder="请选择">
            <el-option
              v-for="(item, index) in doptions"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="种类:" prop="cate">
          <el-input v-model="addInfo.cate"></el-input>
        </el-form-item>
        <el-form-item label="重量:" prop="weight">
          <el-input v-model="addInfo.weight"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="addDovedialog = false">取 消</el-button>
        <el-button type="primary" plain @click="addDove()">确 定</el-button>
      </span>
    </el-dialog>
    </el-main>
    </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from "vue";
import scTable from "@/components/scTable/index.vue";
export default defineComponent({
  name: 'doveRegistration', // 鸽子登记
  components: {
    scTable,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    let addDovedialog=ref(false);
    let doptions = ref(['A1','A2','A3']);
    const tableData=ref([
      {
        date:"2022-07-05",
        d
      }
    ])
    const addDialogClosed = () => {
      proxy.$refs.addRef.resetFields();
    };
    return{
      addDovedialog,
      doptions,
      tableData,
      addDialogClosed
    }
  }
})
</script>

<style scoped>
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
</style>