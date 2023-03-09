<template>
    <el-main>
        <scTable :data="dataList" stripe :hidePagination="true">
            <el-table-column prop="userId" header-align="center" align="center" label="用户id">
            </el-table-column>
            <el-table-column prop="nickName" header-align="center" align="center" label="用户名">
            </el-table-column>
            <el-table-column prop="email" header-align="center" align="center" label="邮箱">
            </el-table-column>
            <el-table-column prop="avatar" header-align="center" align="center" label="头像">
                <template #default="scope">
                    <img :src="scope.row.avatar" style="width: 50px; height: 40px" />
                </template>
            </el-table-column>
            <el-table-column prop="status" header-align="center" align="center" label="是否锁定">
                <template #default="scope">
                    <el-tag v-if="scope.row.status === 0" size="small" type="danger">禁用</el-tag>
                    <el-tag v-else size="small">正常</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" header-align="center" align="center" label="注册时间">
            </el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template #default="scope">
                    <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.userId)">修改</el-button>
                    <el-button type="text" size="small" @click="deleteHandle(scope.row.userId)">删除</el-button>
                </template>
            </el-table-column>
        </scTable>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
            :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"  class="pagination"
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
        url: http.adornUrl("/user/user/list"),
        method: "get",
        params: http.adornParams({
            page: pageIndex.value,
            limit: pageSize.value,
        }),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            dataList.value = data.page.list;
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
        url: http.adornUrl("/user/user/delete"),
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
    .pagination{
        margin: 2% 40% 0 30%;
    }

</style>