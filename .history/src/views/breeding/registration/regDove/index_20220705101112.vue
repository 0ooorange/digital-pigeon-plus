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
          width="120"
          sortable
          align="center"
        />
        <el-table-column
          prop="dovecoteNumber"
          label="鸽棚"
          width="120"
          align="center"
        />
        <el-table-column
          prop="number"
          label="数量"
          width="120"
          sortable
          align="center"
        />
        <el-table-column prop="go" label="去向" width="120" align="center" />
        
        
          
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-edit"
              @click="showOutcagedialog(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeOutcage(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </scTable>
    </el-main>
    </div>
</template>

<script>
export default {
  name: 'doveRegistration', // 鸽子登记
}
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