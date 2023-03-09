<template>
    <el-main class="main">
        <!-- 基地和鸽棚选择器 -->
        <div class="selector">
            <div class="autoAssignSwitch">
                <el-switch v-model="autoAssignValue" active-text="自动分配" @change="updateAutoAssignValue()">
                </el-switch>
            </div>
            <div class="baseSelector">
                <el-select v-model="baseId" placeholder="请选择基地" @change="getShedList()">
                    <el-option v-for="base in baseList" :key="base.id" :label="base.name" :value="base.id">
                    </el-option>
                </el-select>
            </div>
            <div class="shedSelector">
                <el-select v-model="shedId" placeholder="请选择鸽棚" @change="getCageList()">
                    <el-option v-for="shed in shedList" :key="shed.id" :label="shed.code" :value="shed.id">
                    </el-option>
                </el-select>
            </div>
        </div>
        <!-- 鸽笼列表 -->
        <scTable :data="cageList" stripe :hidePagination="true" class="table">
            <el-table-column prop="id" header-align="center" align="center" label="鸽笼id">
            </el-table-column>
            <el-table-column prop="number" header-align="center" align="center" label="位置编码">
            </el-table-column>
            <el-table-column prop="position" header-align="center" align="center" label="层数">
            </el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template #default="scope">
                    <el-popover placement="left-start" title="认养信息" :width="300" trigger="click" v-if="scope.row.isAdopted">
                        <AdoptionInfo :id="scope.row.id"></AdoptionInfo>
                        <template #reference>
                            <el-button type="success">查看</el-button>
                        </template>
                    </el-popover>
                    <el-button class="btn" v-else @click="assignCage(scope.row)">分配</el-button>
                </template>
            </el-table-column>
        </scTable>
        <!-- 分页 -->
        <el-pagination :current-page="pageIndex" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount" @size-change="sizeChangeHandle" @current-change="currentChangeHandle" class="pagination" />
        <!-- 分配鸽笼表单对话框 -->
        <AssignCageForm @refreshDataList="refreshDataList" ref="assignCageForm"
            :handingAdoptionOrderList="handingAdoptionOrderList"></AssignCageForm>
        <!-- 认养订单按钮及标识 -->
        <div class="orderButton">
            <img src="../../img/orderButton.png" alr="订单按钮" @click="adoptionOrderListShow = !adoptionOrderListShow" />
        </div>
        <div v-if="handingAdoptionOrderList.length > 0" class="point">
            {{ handingAdoptionOrderList.length }}
        </div>
        <!-- 认养订单列表显示 -->
        <transition name="adoptionOrderList" v-show="adoptionOrderListShow" class="adoptionOrderList">
            <HandingAdoptionOrderTable :handingAdoptionOrderList="handingAdoptionOrderList"></HandingAdoptionOrderTable>
        </transition>
    </el-main>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import http from '../../utils/httpRequest'
import AssignCageForm from './components/assignCageForm.vue';
import AdoptionInfo from './components/adoptionInfo.vue'
import HandingAdoptionOrderTable from './components/handingAdoptionOrderTable.vue'
import { ElMessage } from 'element-plus';
//基地数据
const baseList = ref([])
//鸽棚数据
const shedList = ref([])
//鸽笼数据
const cageList = ref([])
//当前基地id
const baseId = ref([0])
//当前鸽棚id
const shedId = ref([0])
//自动分配鸽笼参数
const autoAssignValue = ref(false)
//待处理认养订单
const handingAdoptionOrderList = ref([])
//分配鸽笼表单显示
const assignCageFormVisible = ref(false)
//当前页索引
const pageIndex = ref(1)
//单页记录数
const pageSize = ref(10)
//总页数
const totalPage = ref(0)
//总记录数
const totalCount = ref(0)
//assignCageForm子组件
const assignCageForm = ref(null)
//待处理认养订单显示
const adoptionOrderListShow = ref(false)



onMounted(() => {
    //获取基地、鸽棚、鸽笼数据
    getPigeonBaseList()
    //获取自动分配参数值
    getAutoAssignValue()
    //获取带出认养订单
    getHandingAdoptionOrder()
});
//刷新数据
const refreshDataList = () => {
    getHandingAdoptionOrder()
    getCageList()
}

//获取所有鸽子基地
const getPigeonBaseList = () => {
    http({
        url: http.adornUrl('/adoption/pigeonBase/getPigeonBaseList')
    }).then(({ data }) => {
        if (data && data.code === 0) {
            baseList.value = data.data;
        }
        if (baseList.value.length > 0) {
            baseId.value = baseList.value[0].id;
            getShedList();
        }
    })
}
//根据鸽子基地id获取所有鸽棚
const getShedList = () => {
    http({
        url: http.adornUrl('/adoption/shed/getShedListByPigeonBaseId/' + baseId.value)
    }).then(({ data }) => {
        if (data && data.code === 0) {
            shedList.value = data.data;
        }
        if (shedList.value.length > 0) {
            shedId.value = shedList.value[0].id;
            getCageList();
        } else {
            shedId.value = undefined;
            cageList.value = [];
        }
    })
}
//获取鸽笼数据
const getCageList = () => {
    console.log(pageIndex.value)
    http({
        url: http.adornUrl('/adoption/cage/getCageList'),
        method: 'get',
        params: http.adornParams({
            'page': pageIndex.value,
            'limit': pageSize.value,
            'shedId': shedId.value
        })
    }).then(({ data }) => {
        if (data && data.code === 0) {
            cageList.value = data.page.list
            totalPage.value = data.page.totalPage
            totalCount.value = data.page.totalCount
        } else {
            cageList.value = []
            totalCount.value = 0
        }
    })
}
//获取自动分配参数
const getAutoAssignValue = () => {
    http({
        url: http.adornUrl('/shop/params/get/AUTO_ASSIGN')
    }).then(({ data }) => {
        if (data && data.code === 0) {
            autoAssignValue.value = data.data === 1 ? true : false;
        }
    })
}

//获取待处理的认养订单
const getHandingAdoptionOrder = () => {
    http({
        url: http.adornUrl('/order/adoptionorder/getHandingAdoptionOrder')
    }).then(({ data }) => {
        if (data && data.code === 0) {
            handingAdoptionOrderList.value = data.data || [];
        }
    })
}

// 每页数改变
const sizeChangeHandle = (val) => {
    pageSize.value = val
    pageIndex.value = 1
    getCageList()
}
// 当前页改变
const currentChangeHandle = (val) => {
    pageIndex.value = val
    getCageList()
}

// 分配鸽笼：打开分配鸽笼表单（传入参数cageId）
const assignCage = async cage => {
    assignCageFormVisible.value = true
    await nextTick()
    assignCageForm.value.init(cage, handingAdoptionOrderList)
}

//更新自动分配参数
const updateAutoAssignValue = () => {
    http({
        url: http.adornUrl('/shop/params/update/AUTO_ASSIGN'),
        method: 'put',
        data: 1
    }).then(({ data }) => {
        if (data && data.code === 0) {
            ElMessage({
                message: `操作成功`,
                type: "success",
                duration: 2000,
            });
        } else {
            ElMessage({
                message: `操作出错`,
                type: "error",
                duration: 2000
            });
        }
    })
}
</script>

<style lang="scss" scoped>
.main {
    position: relative;
}

.selector {
    display: flex;
    margin: 0 0 3% 0;

    .autoAssignSwitch {
        margin: 0 2% 0 5%;
    }

    .baseSelector {
        margin: 0 2% 0 5%;
    }

    .shedSelector {
        margin: 0 5% 0 5%;
    }
}

.table {
    margin: 0 0 5% 5%;
    width: 70%;
}

.pagination {
    margin: 0 0 0 5%;
}

.orderButton {
    position: absolute;
    left: 78%;
    top: 1%;

    img {
        width: 40px;
    }
}

.point {
    height: 15px;
    background-color: red;
    border-radius: 60px;
    min-width: 15px;
    position: absolute;
    left: 81%;
    top: 1%;
    color: white;
    text-align: center;
    line-height: 15px;
}

.adoptionOrderList {
    width: 200px;
    position: absolute;
    left: 78%;
    top: 7%;
}

.btn {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
}
</style>