<template>
  <el-descriptions title="监控信息" :column="1" :size="600" border>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">名称</div>
      </template>
      兴宁鸽舍1列监控(G24611101)
      <!-- {{ monitorInfo.name || `摄像头${curIndex + 1}` }} -->
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">型号</div>
      </template>
      <el-tag size="small">G24611101</el-tag>
      <!-- <el-tag size="small">{{ monitorInfo.serial || '-' }}</el-tag> -->
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">状态</div>
      </template>
      在线
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <div class="cell-item">位置</div>
      </template>
      金绿基地A1棚
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">监控方式</div>
      </template>
      固定点
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">区域负责人</div>
      </template>
      <el-tag size="small">陈文浩</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">联系方式</div>
      </template>
      13539393933
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
</script>

<style lang="less" scoped>
.title {
  font-weight: 700;
}
.map {
  width: 100%;
  height: 300px;
}
</style>
