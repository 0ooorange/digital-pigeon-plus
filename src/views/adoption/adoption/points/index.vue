<template>
    <el-main>
        <scTable :data="dataList" stripe :hidePagination="true">
            <el-table-column prop="id" header-align="center" align="center" label="ID">
            </el-table-column>
            <el-table-column prop="activity" header-align="center" align="center" label="活动">
            </el-table-column>
            <el-table-column prop="type" header-align="center" align="center" label="类型">
            </el-table-column>
            <el-table-column prop="points" header-align="center" align="center" label="积分">
            </el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template #default="scope">
                    <el-button type="text" size="small" @click="openUpdateForm(scope.row.id)">修改</el-button>
                </template>
            </el-table-column>
        </scTable>
        <UpdateForm ref="updateForm" @refreshDataList="getDataList"></UpdateForm>
    </el-main>
</template>

<script setup>
import { onBeforeMount ,ref} from 'vue';
import http from '../../utils/httpRequest'
import UpdateForm from './components/updateForm.vue';
const dataList =  ref([])
//updateForm子组件
const updateForm = ref()

onBeforeMount(() => {
    getDataList()
})

//获取数据
const getDataList = () => {
    http({
        url: http.adornUrl('/user/pointsActivities/list'),
        method: 'get'
    }).then(({ data }) => {
        if (data && data.code === 0) {
            dataList.value = data.data
            dataList.value.forEach(item => {
                item.type = item.type == 1 ? "增加" : "减少"
            })
        } else {
            dataList.value = []
        }
    })
}

//打开修改弹窗口
const openUpdateForm = (id) =>{
    updateForm.value.init(id)
}

</script>

<style></style>