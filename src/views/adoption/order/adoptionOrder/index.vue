<template>
    <el-main>
        <scTable :data="dataList" stripe :hidePagination="true">
            <el-table-column prop="username" header-align="center" align="center" label="用户">
            </el-table-column>
            <el-table-column prop="status" header-align="center" align="center" label="订单状态"
                :filters="[{ text: '未付款', value: '未付款' }, { text: '待处理', value: '待处理' }, { text: '已完成', value: '已完成' }]"
                :filter-method="filterHandler">
            </el-table-column>
            <el-table-column prop="handledWithNumber" header-align="center" align="center" label="已处理数量/认养鸽笼数量">
            </el-table-column>
            <el-table-column prop="adoptionTime" header-align="center" align="center" label="认养时长">
            </el-table-column>
            <el-table-column prop="totalPrice" header-align="center" align="center" label="总价">
            </el-table-column>
            <el-table-column prop="message" header-align="center" align="center" label="留言">
            </el-table-column>
            <el-table-column prop="createTime" header-align="center" align="center" label="创建时间" sortable>
            </el-table-column>
        </scTable>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
            :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 弹窗, 新增 / 修改 -->
        <AddOrUpdateForm ref="updateForm" @refreshDataList="getDataList"></AddOrUpdateForm>
    </el-main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import http from '../../utils/httpRequest';

const dataList = ref([])
const pageIndex = ref(1)
const pageSize = ref(10)
const totalPage = ref(0)
onBeforeMount(() => {
    getDataList()
})
// 获取数据列表
const getDataList = () => {
    http({
        url: http.adornUrl('/order/adoptionorder/list'),
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
</script>

<style></style>