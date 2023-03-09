<template>
    <el-dialog :title="!id ? '新增' : '修改'" :close-on-click-modal="false" v-model="visible">
        <el-form @keyup.enter="dataFormSubmit()" label-width="80px" size="mini">
            <el-form-item label="基地" prop="title">
                <el-input v-model="title" placeholder="基地"></el-input>
            </el-form-item>
            <el-form-item label="鸽棚" prop="title">
                <el-input v-model="title" placeholder="鸽棚"></el-input>
            </el-form-item>
            <el-form-item label="编号" prop="title">
                <el-input v-model="title" placeholder="编号"></el-input>
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
const categoryId = ref("")
const orderNum = ref("")
const title = ref("")
const content = ref("")
// const position = ref(0)
const init = (scienceId) => {
    id.value = scienceId || 0;
    visible.value = true;
    nextTick()
    if (id.value) {
        //获取科普信息
        getUserEggInfo()
    }
}

//获取科普信息
const getUserEggInfo = () => {
    http({
        url: http.adornUrl(
            `/user/userSquab/info/${id.value}`
        ),
        method: "get",
        params: http.adornParams(),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            categoryId.value = data.data.categoryId;
            orderNum.value = data.data.orderNum;
            title.value = data.data.title
            content.value = data.data.content;
        }
    });
}

// 表单提交
const dataFormSubmit = () => {
    http({
        url: http.adornUrl(
            `/user/userSquab/${!id.value ? "save" : "update"}`
        ),
        method: id.value ? 'put' : 'post',
        data: http.adornData({
            id: id.value || undefined,
            categoryId: categoryId.value,
            orderNum: orderNum.value,
            title: title.value,
            content: content.value,
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
                message: `操作出错`,
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
  