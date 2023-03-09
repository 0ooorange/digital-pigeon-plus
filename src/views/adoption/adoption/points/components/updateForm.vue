<template>
    <el-dialog title="修改" :close-on-click-modal="false" v-model="visible">
        <el-form @keyup.enter="dataFormSubmit()" label-width="80px"
            size="mini">
            <el-form-item label="活动" prop="activity">
                <el-input v-model="activity" readonly=true></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-input v-model="type" readonly=true placeholder="类型"></el-input>
            </el-form-item>
            <el-form-item label="积分" prop="points">
                <el-input v-model="points" placeholder="积分"></el-input>
            </el-form-item>
        </el-form>
        <span class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>

<script setup>
import { defineExpose, nextTick, ref,defineEmits} from 'vue';
import http from '../../../utils/httpRequest';
const emit = defineEmits(['refreshDataList'])

const visible = ref(false)

const id = ref(0)
const activity = ref('')
const type = ref(1)
const points = ref(0)

const init = (activityId) => {
    id.value = activityId
    visible.value = true
    nextTick();
    if (id.value) {
        http({
            url: http.adornUrl(`/user/pointsActivities/info/${id.value}`),
            method: 'get',
            params: http.adornParams()
        }).then(({ data }) => {
            if (data && data.code === 0) {
                activity.value = data.data.activity
                type.value = data.data.type
                points.value = data.data.points
            }
        })
    }
}
// 表单提交
const dataFormSubmit = () => {
    http({
        url: http.adornUrl(`/user/pointsActivities/update`),
        method: 'put',
        data: http.adornData({
            'id': id.value,
            'activity': activity.value,
            'type': type.value,
            'points': points.value
        })
    }).then(({ data }) => {
        if (data && data.code === 0) {
            visible.value = false
            emit('refreshDataList')
            // $message({
            //     message: '操作成功',
            //     type: 'success',
            //     duration: 1500,
            //     onClose: () => {
            //         visible = false
            //         $emit('refreshDataList')
            //     }
            // })
        } else {
            // $message.error(data.msg)
        }
    })
}

defineExpose({
    init
})
</script>

<style></style>