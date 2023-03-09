<template>
    <el-table :data="props.handingAdoptionOrderList" size="small" stripe v-show="adoptionOrderListShow" class="adoptionOrderList">
        <el-table-column prop="username" label="认养人" width="80px">
        </el-table-column>
        <el-table-column prop="handledWithNumber" label="数量" width="40px">
        </el-table-column>
        <el-table-column prop="adoptionTime" label="时长" width="80px">
        </el-table-column>
    </el-table>
</template>

<script setup>
import {defineProps} from 'vue';
//认养订单列表
const props = defineProps({ handingAdoptionOrderList: { type: Array } })
</script>

<style></style>