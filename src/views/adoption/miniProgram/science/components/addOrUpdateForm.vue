<template>
    <el-dialog :title="!id ? '新增' : '修改'" :close-on-click-modal="false" v-model="visible">
        <el-form @keyup.enter="dataFormSubmit()" label-width="80px" size="mini">
            <el-form-item label="分类" prop="categoryId">
                <el-select v-model="categoryId" placeholder="请选择">
                    <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input v-model="content" placeholder="内容"></el-input>
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
//科普分类选项
const categoryOptions = ref([])
const init = (scienceId) => {
    id.value = scienceId || 0;
    visible.value = true;
    nextTick()
    if (id.value) {
        //获取科普信息
        getScienceInfo()
    }
    //获取科普类别选项
    getCategoryOptinos()
}

//获取科普信息
const getScienceInfo = () => {
    http({
        url: http.adornUrl(
            `/staticinfo/science/info/${id.value}`
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

//获取科普分类选项
const getCategoryOptinos = () => {
    http({
        url: http.adornUrl(`/staticinfo/scienceCategory/list`),
        method: 'get',
        params: http.adornParams()
    }).then(({ data }) => {
        if (data && data.code === 0) {
            categoryOptions.value = data.data;
        }
    })
}
// 表单提交
const dataFormSubmit = () => {
    http({
        url: http.adornUrl(
            `/staticinfo/science/${!id.value ? "save" : "update"}`
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
  