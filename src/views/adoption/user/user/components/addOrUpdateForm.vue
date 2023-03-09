<template>
    <el-dialog :title="!id ? '新增' : '修改'" :close-on-click-modal="false" v-model="visible">
        <el-form @keyup.enter="dataFormSubmit()" label-width="80px" size="mini">
            <el-form-item label="用户名" prop="nickName">
                <el-input v-model="nickName" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <SingleUpload v-model="avatar" @input="setImg"></SingleUpload>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-switch v-model="status" style="--el-switch-on-color: red;" />
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
import SingleUpload from '../../../components/upload/singleUpload.vue';
import { ElMessage } from 'element-plus';
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
            status.value = data.user.status == 0 ? true : false
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
            userId: id.value || undefined,
            nickName: nickName.value,
            avatar: avatar.value,
            email: email.value,
            status: status.value ? 0 : 1
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

const setImg = (url) => {
    avatar.value = url
}

defineExpose({
    init
})
</script>
  