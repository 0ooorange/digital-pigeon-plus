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
        <el-table-column prop="id" header-align="center" align="center" label="轮播图id">
        </el-table-column>
        <el-table-column prop="url" header-align="center" align="center" label="轮播图">
            <template #default="scope">
                <img :src="scope.row.url" style="width: 50px; height: 40px" />
            </template>
        </el-table-column>
        <el-table-column prop="orderNum" header-align="center" align="center" label="次序">
        </el-table-column>
        <el-table-column prop="status" header-align="center" align="center" label="是否使用">
            <template #default="scope">
                <el-tag class="ml-2" :type="scope.row.status == 1 ? 'success' : 'info'">{{ scope.row.status ? '使用中' :'不使用'}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="goodsId" header-align="center" align="center" label="绑定商品">
            <template #default="scope">
                <el-tag class="ml-2" :type="scope.row.goodsId != null ? 'success' : 'warning'">{{ scope.row.goodsId ? '已绑定' :'未绑定'}}</el-tag>
            </template>
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
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <AddOrUpdate ref="updateForm" @refreshDataList="getDataList"></AddOrUpdate>
</template>
  
<script setup>
import { nextTick, onBeforeMount, ref } from 'vue'
import AddOrUpdate from "./components/addOrUpdateForm.vue";
import http from '../../utils/httpRequest';
import { ElMessage } from 'element-plus';

//addOrUpdateForm子组件
const updateForm = ref()
const dataList = ref([])
const pageIndex = ref(1)
const pageSize = ref(10)
const totalPage = ref(0)
const dataListSelections = ref([])
onBeforeMount(() => {
    getDataList()
})
// 获取数据列表
const getDataList = () => {
    http({
        url: http.adornUrl("/staticinfo/swiper/list"),
        method: "get",
        params: http.adornParams({
            page: pageIndex.value,
            limit: pageSize.value,
        }),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            dataList.value = data.page.list;
            totalPage.value = data.page.totalCount;
            console.log(dataList.value)
        } else {
            dataList.value = [];
            totalPage.value = 0;
        }
    });
}
// 每页数
const sizeChangeHandle = (val) => {
    pageSize.value = val;
    pageIndex.value = 1;
    getDataList();
}
// 当前页
const currentChangeHandle = (val) => {
    pageIndex.value = val;
    getDataList();
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
        url: http.adornUrl("/staticinfo/swiper/delete"),
        method: "post",
        data: http.adornData(ids, false),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            getDataList()
            ElMessage({
                message:'操作成功',
                type:'success',
                duration:2000,
                onClose:getDataList
            })
        } else {
            ElMessage({
                message:'操作失败',
                type:'error',
                duration:2000
            })
        }
    });
}
</script>
  