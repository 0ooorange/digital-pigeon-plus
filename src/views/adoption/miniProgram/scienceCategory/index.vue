<template>
    <el-form :inline="true" :model="dataForm" @keyup.enter="getDataList()">
        <el-form-item>
            <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
            <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="dataList" size="small" stripe v-loading="dataListLoading" @selection-change="selectionChangeHandle"
        style="width: 100%">
        <el-table-column type="selection" header-align="center" align="center" width="50">
        </el-table-column>
        <el-table-column prop="id" header-align="center" align="center" label="id">
        </el-table-column>
        <el-table-column prop="name" header-align="center" align="center" label="分类名称">
        </el-table-column>
        <el-table-column prop="createTime" header-align="center" align="center" label="创建时间">
        </el-table-column>
        <el-table-column prop="updateTime" header-align="center" align="center" label="修改时间">
        </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
            <template #default="scope">
                <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
                <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <AddOrUpdate ref="updateForm" @refreshDataList="getDataList"></AddOrUpdate>
</template>
  
<script setup>
import { nextTick, onBeforeMount, ref } from 'vue'
import AddOrUpdate from "./components/addOrUpdateForm.vue";
import http from '../../utils/httpRequest';

//addOrUpdateForm子组件
const updateForm = ref()
const dataList = ref([])
const pageIndex = ref(1)
const pageSize = ref(10)
const dataListSelections = ref([])
onBeforeMount(() => {
    getDataList()
})
// 获取数据列表
const getDataList = () => {
    http({
        url: http.adornUrl("/staticinfo/scienceCategory/list"),
        method: "get",
        params: http.adornParams({
            page: pageIndex.value,
            limit: pageSize.value,
        }),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            dataList.value = data.data;
        } else {
            dataList.value = [];
        }
    });
}
// 多选
const selectionChangeHandle = (val) => {
    dataListSelections.value = val;
}
// 新增 / 修改
const addOrUpdateHandle = (id) => {
    nextTick()
    console.log(updateForm)
    updateForm.value.init(id)
}
// 删除
const deleteHandle = (id) => {
    var ids = id ? [id] : dataListSelections.value.map((item) => {
        return item.id;
    });
    http({
        url: http.adornUrl("/staticinfo/scienceCategory/delete"),
        method: "post",
        data: http.adornData(ids, false),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            getDataList()
        } else {
            //
        }
    });
}
</script>
  