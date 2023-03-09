<template>
    <el-dialog :title="!id ? '新增' : '修改'" :close-on-click-modal="false" v-model="visible">
        <el-form @keyup.enter="dataFormSubmit()" label-width="80px" size="mini">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="name" placeholder="分类名称"></el-input>
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
const name = ref("")

const init = (scienceCategoryId) => {
    id.value = scienceCategoryId || 0;
    visible.value = true;
    nextTick()
    if (id.value) {
        //获取科普分类信息
        getScienceCategoryInfo()
    }
}

//获取科普信息
const getScienceCategoryInfo = () => {
    http({
        url: http.adornUrl(
            `/staticinfo/scienceCategory/info/${id.value}`
        ),
        method: "get",
        params: http.adornParams(),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            name.value = data.data.name;
        }
    });
}

// 表单提交
const dataFormSubmit = () => {
    http({
        url: http.adornUrl(
            `/staticinfo/scienceCategory/${!id.value ? "save" : "update"}`
        ),
        method: id.value ? 'put' : 'post',
        data: http.adornData({
            id: id.value || undefined,
            name: name.value
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
  