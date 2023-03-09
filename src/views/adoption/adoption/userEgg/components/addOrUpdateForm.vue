<template>
    <el-dialog :title="!id ? '新增' : '修改'" :close-on-click-modal="false" v-model="visible">
        <el-form @keyup.enter="dataFormSubmit()" label-width="80px" size="mini">
            <el-form-item label="基地" prop="title">
                <el-select v-model="baseId" placeholder="请选择基地" @change="getShedList()">
                    <el-option v-for="base in baseList" :key="base.id" :label="base.name" :value="base.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="鸽棚" prop="title">
                <el-select v-model="shedId" placeholder="请选择鸽棚" @change="getCageList()">
                    <el-option v-for="shed in shedList" :key="shed.id" :label="shed.code" :value="shed.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="编号" prop="title">
                <el-input v-model="number" placeholder="编号"></el-input>
            </el-form-item>
            <el-form-item label="位置" prop="content">
                <el-radio-group v-model="position">
                    <el-radio label="0">上</el-radio>
                    <el-radio label="1">中</el-radio>
                    <el-radio label="2">下</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="下单时间">
                <el-date-picker v-model="layEggTime" type="datetime" placeholder="下蛋时间"
                    :default-time="defaultTime" />
            </el-form-item>
        </el-form>
        <span class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>
  
<script setup>
import { nextTick, ref, defineExpose, defineEmits } from 'vue'
import http from '../../../utils/httpRequest'
import { ElMessage } from 'element-plus';
const emit = defineEmits(['refreshDataList'])
const visible = ref(false)
const id = ref(0)
//基地列表
const baseList = ref([])
//鸽棚列表
const shedList = ref([])
const baseId = ref(0)
const shedId = ref(0)
//编号
const number = ref()
//位置
const position = ref("0")
//下蛋时间
const layEggTime = ref("")
const init = (scienceId) => {
    id.value = scienceId || 0;
    visible.value = true;
    nextTick()
    getPigeonBaseList()
    if (id.value) {
        getUserEggInfo()
    }
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
        } else {
            shedId.value = undefined;
        }
    })
}

//获取用户鸽蛋信息
const getUserEggInfo = () => {
    http({
        url: http.adornUrl(
            `/user/userEgg/info/${id.value}`
        ),
        method: "get",
        params: http.adornParams(),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            console.log(data)
        }
    });
}

// 表单提交
const dataFormSubmit = () => {
    http({
        url: http.adornUrl(
            `/adoption/cage/${!id.value ? "addUserEgg" : "update"}`
        ),
        method: id.value ? 'put' : 'post',
        data: http.adornData({
            id: id.value || undefined,
            shedId: shedId.value,
            number: number.value,
            position: position.value,
            layEggTime: layEggTime.value
        }),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            visible.value = false;
            ElMessage({
                message: `操作成功`,
                type: "success",
                duration: 2000,
                onclose: emit('refreshDataList')
            });
        } else {
            ElMessage({
                message: data.message,
                type: "error",
                duration: 2000
            });
        }
    });
}

defineExpose({
    init
})
</script>
  