<template>
    <el-dialog :title="!id ? '新增' : '修改'" :close-on-click-modal="false" v-model="visible">
        <el-form @keyup.enter="dataFormSubmit()" label-width="80px"
            size="mini">
            <el-form-item label="轮播图" prop="url">
                <SingleUpload v-model="imgUrl" @input="setImg" :imgUrl="url"></SingleUpload>
            </el-form-item>
            <el-form-item label="次序" prop="orderNum">
                <el-input v-model="orderNum" placeholder="次序"></el-input>
            </el-form-item>
            <el-form-item label="是否使用" prop="status">
                <el-switch v-model="status" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
        </el-form>
        <span class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>
  
<script setup>
import { nextTick, ref ,defineExpose,defineEmits} from 'vue'
import http from '../../../utils/httpRequest'
import {ElMessage} from 'element-plus'
import SingleUpload from '../../../components/upload/singleUpload.vue';
const emit = defineEmits(['refreshDataList'])
const visible = ref(false)
const id = ref(0)
const url = ref("")
const orderNum = ref("")
const status = ref("")
const route = ref("")
const init = (swiperId) => {
    id.value = swiperId || 0;
    visible.value = true;
    nextTick()
    if (id.value) {
        http({
            url: http.adornUrl(
                `/staticinfo/swiper/info/${id.value}`
            ),
            method: "get",
            params: http.adornParams(),
        }).then(({ data }) => {
            if (data && data.code === 0) {
                url.value = data.swiper.url;
                orderNum.value = data.swiper.orderNum;
                status.value = data.swiper.status == 1 ? true : false;
                route.value = data.swiper.route;
            }
        });
    }
}
// 表单提交
const dataFormSubmit = () => {
    http({
        url: http.adornUrl(
            `/staticinfo/swiper/${!id.value ? "save" : "update"}`
        ),
        method: id.value ? 'put' : 'post',
        data: http.adornData({
            id: id.value || undefined,
            url: url.value,
            orderNum: orderNum.value,
            status: status.value ? 1 : 0,
            route: route.value,
        }),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            ElMessage({
                message: `操作成功`,
                type: "success",
                duration: 2000,
                onclose: visible.value = false & emit('refreshDataList')
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

const setImg = (val) =>{
    url.value = val;
}

defineExpose({
    init
})
</script>
  