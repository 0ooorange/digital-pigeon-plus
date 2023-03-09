<template>
    <el-dialog :title="!id ? '新增' : '修改'" :close-on-click-modal="false" v-model="visible">
        <el-form @keyup.enter="dataFormSubmit()" label-width="80px" size="mini">
            <el-form-item label="用户" prop="userId">
                <el-select v-model="dataForm.userId" placeholder="请选择">
                    <el-option v-for="item in userOptions" :key="item.id" :label="item.username" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收货人姓名" prop="name">
                <el-input v-model="dataForm.name" placeholder="收货人姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
                <el-input v-model="dataForm.phone" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item label="地区" prop="region">
                <el-cascader v-model="region" placeholder="试试搜索：广州" :options="addressOptions" filterable :props="{
                    value: 'regionId',
                    label: 'regionName',
                    children: 'children',
                }"></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="detail">
                <el-input v-model="dataForm.detail" placeholder="详细地址"></el-input>
            </el-form-item>
            <el-form-item label="是否默认" prop="isDefault">
                <el-switch v-model="dataForm.isDefault" disabled :active-value="1" :inactive-value="0"></el-switch>
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
const emit = defineEmits(['refreshDataList'])
const visible = ref(false)

const id = ref(0)
const nickName = ref("")
const email = ref("")
const avatar = ref("")
const status = ref(true)

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
            `/user/user/info/${id.value}`
        ),
        method: "get",
        params: http.adornParams(),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            nickName.value = data.user.nickName
            email.value = data.user.email
            avatar.value = data.user.avatar
            status.value = data.user.status == 1 ? true : false
        }
    });
}

// 表单提交
const dataFormSubmit = () => {
    http({
        url: http.adornUrl(
            `/user/user/${!id.value ? "save" : "update"}`
        ),
        method: id.value ? 'put' : 'post',
        data: http.adornData({
            id: id.value || undefined,
            nickName: nickName.value,
            avatar: avatar.value,
            email: email.value,
            status: status.value
        }),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            visible.value = false;
            emit('refreshDataList')
            //
        } else {
            //
        }
    });
}

defineExpose({
    init
})
</script>
  