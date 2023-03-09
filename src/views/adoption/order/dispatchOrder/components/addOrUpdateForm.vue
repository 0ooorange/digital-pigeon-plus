<template>
    <el-dialog :title="!id ? '新增' : '修改'" :close-on-click-modal="false" v-model="visible">
        <el-form @keyup.enter="dataFormSubmit()" label-width="80px" size="mini">
            <el-form-item label="用户id" prop="userId">
                <el-input v-model="userId" placeholder="用户id"></el-input>
            </el-form-item>
            <el-form-item label="订单总额(￥)" prop="totalPrice">
                <el-input v-model="totalPrice" placeholder="订单总额"></el-input>
            </el-form-item>
            <el-form-item label="订单状态" prop="status">
                <el-input v-model="status" placeholder="订单状态"></el-input>
            </el-form-item>
            <el-form-item label="收货人姓名" prop="name">
                <el-input v-model="name" placeholder="收货人姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
                <el-input v-model="phone" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item label="省份/直辖市" prop="province">
                <el-input v-model="province" placeholder="省份/直辖市"></el-input>
            </el-form-item>
            <el-form-item label="城市" prop="city">
                <el-input v-model="city" placeholder="城市"></el-input>
            </el-form-item>
            <el-form-item label="地区" prop="region">
                <el-input v-model="region" placeholder="地区"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="detail">
                <el-input v-model="detail" placeholder="详细地址"></el-input>
            </el-form-item>
            <el-form-item label="修改时间" prop="mtime">
                <el-input v-model="mtime" placeholder="修改时间"></el-input>
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
import {ElMessage} from 'element-plus'
const emit = defineEmits(['refreshDataList'])
const visible = ref(false)

const id = ref(0)
const userId = ref("")
const totalPrice = ref("")
const status = ref(true)
const name = ref("")
const phone = ref("")
const province = ref("")
const city = ref("")
const region = ref("")
const detail = ref("")
const mtime = ref("")

const init = (userId) => {
    id.value = userId || 0;
    visible.value = true;
    nextTick()
    if (id.value) {
        //获取用户信息
        getUserInfo()
    }
}

//获取科普信息
const getUserInfo = () => {
    http({
        url: http.adornUrl(
            `/order/dispatchorder/info/${id.value}`
        ),
        method: "get",
        params: http.adornParams(),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            userId.value = data.dispatchOrder.userId
            totalPrice.value = data.dispatchOrder.totalPrice
            status.value = data.dispatchOrder.status == 1 ? true : false
            name.value = data.dispatchOrder.name
            phone.value = data.dispatchOrder.phone
            province.value = data.dispatchOrder.province
            city.value = data.dispatchOrder.city
            region.value = data.dispatchOrder.region
            detail.value = data.dispatchOrder.detail
            mtime.value = data.dispatchOrder.mtime
        }
    });
}

// 表单提交
const dataFormSubmit = () => {
    http({
        url: http.adornUrl(
            `/order/dispatchorder/${!id.value ? "save" : "update"}`
        ),
        method: id.value ? 'put' : 'post',
        data: http.adornData({
            id: id.value || undefined,
            userId: userId.value,
            totalPrice: totalPrice.value,
            status: status.value,
            name: name.value,
            phone: phone.value,
            province: province.value,
            city: city.value,
            region: region.value,
            detail: detail.value,
            mtime: mtime.value,
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
  