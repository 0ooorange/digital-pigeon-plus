<template>
    <el-main class="main">
        <scTable :data="dataList" stripe :hidePagination="true" class="table">
            <el-table-column type="selection" header-align="center" align="center" width="50">
            </el-table-column>
            <el-table-column prop="username" header-align="center" align="center" label="用户">
            </el-table-column>
            <el-table-column prop="name" header-align="center" align="center" label="收货人姓名">
            </el-table-column>
            <el-table-column prop="phone" header-align="center" align="center" label="联系电话">
            </el-table-column>
            <el-table-column prop="address" header-align="center" align="center" label="地址">
            </el-table-column>
            <el-table-column prop="isDefault" header-align="center" align="center" label="是否默认">
                <template #default="scope">
                    <el-switch v-model="scope.row.isDefault" disabled :active-value="1" :inactive-value="0">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template #default="scope">
                    <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.userId)">修改</el-button>
                    <el-button type="text" size="small" @click="deleteHandle(scope.row.userId)">删除</el-button>
                </template>
            </el-table-column>
        </scTable>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
            :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" class="pagination"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 弹窗, 新增 / 修改 -->
        <AddOrUpdateForm ref="updateForm" @refreshDataList="getDataList"></AddOrUpdateForm>
    </el-main>
</template>

<script setup>
import { nextTick, onBeforeMount, ref } from 'vue'
import AddOrUpdateForm from "./components/addOrUpdateForm.vue";
import http from '../../utils/httpRequest';

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
        url: http.adornUrl("/user/address/list"),
        method: "get",
        params: http.adornParams({
            page: pageIndex.value,
            limit: pageSize.value,
        }),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            dataList.value = data.page.list;
            dataList.value.forEach(item => {
                item.status = item.status == 1 ? true : false
            })
            totalPage.value = data.page.totalCount;
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
// 新增 / 修改
const addOrUpdateHandle = (id) => {
    nextTick()
    updateForm.value.init(id)
}
// 删除
const deleteHandle = (id) => {
    var ids = id ? [id] : dataListSelections.value.map((item) => {
        return item.id;
    });
    http({
        url: http.adornUrl("/user/address/delete"),
        method: "delete",
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

<style lang="scss" scoped>

</style>