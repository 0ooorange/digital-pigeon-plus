<template>
    <el-card class="box-card">
        <el-form size="small" v-model="cage" label-width="40%" label-position="top">
            <el-form-item label="认养人">{{ cage.userId }}</el-form-item>
            <el-form-item label="鸽笼">{{ cage.cageId }}</el-form-item>
            <el-form-item label="开始时间">{{ cage.adoptionStartTime }}</el-form-item>
            <el-form-item label="认养时长">{{ cage.adoptionTime }}</el-form-item>
            <el-form-item label="结束时间">{{ cage.adoptionEndTime }}</el-form-item>
        </el-form>
    </el-card>
</template>
  
<script setup>
import http from '../../../utils/httpRequest';
import { ref, defineProps, onMounted ,defineExpose, onActivated} from 'vue';

const props = defineProps({ id: { type: String } })
const cage = ref({})
onActivated(()=>{
    getCageInfo()
})

onMounted(() => {
    getCageInfo()
});


const getCageInfo = () => {
    http({
        url: http.adornUrl('/user/adoptionCage/info/' + props.id),
        method: 'get',
    }).then(({ data }) => {
        if (data && data.code === 0) {
            cage.value = data.data;
        } else {
            cage.value = {}
        }

    })
}

defineExpose({
    getCageInfo
})
</script>
  
<style lang="scss" scoped></style>