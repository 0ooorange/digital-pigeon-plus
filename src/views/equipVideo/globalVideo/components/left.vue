<template>

  <!-- 系统选择 -->
  <div class="checkboxs">
    <el-checkbox-group size="small" v-model="checkboxGroup">
      <el-checkbox-button v-for="area in areaSelectList" :key="area" :label="area">
        {{ area }}
      </el-checkbox-button>
    </el-checkbox-group>
  </div>
  <!-- 地区列表 -->
  <sc-table class="table" :data="areaList" stripe highlightCurrentRow hidePagination>
    <el-table-column align="center" label="路段" prop="route" width="65" />
    <el-table-column align="center" label="状态" prop="status" width="65" />
    <el-table-column align="center" label="操作" width="65">
      <template v-slot:default="{ row }">
        <el-switch v-model="row.action" />
      </template>
    </el-table-column>
  </sc-table>
</template>

<script setup>
import { ref } from '@vue/reactivity'
/* 视频表格 */
const areaList = [
  { route: '园区门', status: '--', action: false },
  { route: '仓库', status: '播放中', action: true },
  { route: '鸽棚', status: '监控中', action: true },
]
const checkboxGroup = ref([])
const areaSelectList = ['养殖', '屠宰', '加工']
</script>

<style lang="less" scoped>
.checkboxs {
  margin: 10px 0;
  text-align: center;
}
.table {
  width: 100%;
}
</style>