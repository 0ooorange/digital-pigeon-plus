<template>
    <el-main>
        <el-form :inline="true" :model="dataForm" @keyup.enter="getDataList()">
            <el-form-item>
                <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
                <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
            </el-form-item>
        </el-form>
        <scTable :data="dataList" stripe :hidePagination="true">
            <el-table-column type="selection" header-align="center" align="center" width="50">
            </el-table-column>
            <el-table-column prop="imgUrl" header-align="center" align="center" label="图片">
                <template #default="scope">
                    <img :src="scope.row.imgUrl" style="width: 50px; height: 40px" />
                </template>
            </el-table-column>
            <el-table-column prop="goodsName" header-align="center" align="center" label="商品名称">
            </el-table-column>
            <el-table-column prop="categoryName" header-align="center" align="center" label="商品分类">
            </el-table-column>
            <el-table-column prop="price" header-align="center" align="center" label="价格">
            </el-table-column>
            <el-table-column prop="number" header-align="center" align="center" label="库存">
            </el-table-column>
            <el-table-column prop="sold" header-align="center" align="center" label="已售">
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
        url: http.adornUrl("/shop/goods/list"),
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
        url: http.adornUrl("/shop/goods/delete"),
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

<style></style>