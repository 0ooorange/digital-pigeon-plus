<template>
  <div class="container">
    <div class="tag">
      <el-button type="primary" plain @click="addOutcagedialog = true"
        >添加鸽子</el-button
      >
    </div>
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