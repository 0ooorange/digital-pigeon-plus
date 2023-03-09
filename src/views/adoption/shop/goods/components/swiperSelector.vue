<template>
    <el-dialog title="设置轮播图" :close-on-click-modal="false" v-model="visible" @close="cancel">
        <div class="swiperList">
            <img v-for="item in swiperOptions" :key="item.id" :src="item.url" :class="item.id == selectId ? 'swiper-selected' : 'swiper'" @click="select(item)">
        </div>
        <span class="dialog-footer">
            <el-button @click="cancel()">取消</el-button>
            <el-button type="primary" @click="confirm()">确定</el-button>
        </span>
    </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref ,defineExpose, nextTick,defineEmits} from 'vue';
import http from '../../../utils/httpRequest';

const emit = defineEmits(['changeSwiper'])
//显示
const visible = ref(false)
//轮播图选项
const swiperOptions = ref([])
//选中的轮播图id
const selectId = ref()
//选中的轮播图url
const selectUrl = ref()

const init = () =>{
    getSwiperOptions()
    nextTick()
    visible.value = true;
}

//获取轮播图列表
const getSwiperOptions = () => {
    http({
        url: http.adornUrl(
            `/staticinfo/swiper/getSwiperOptions`
        ),
        method: "get",
        params: http.adornParams(),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            swiperOptions.value = data.data;
        }
    });
}

//选择轮播图
const select = (swiper) => {
    selectId.value = swiper.id
    selectUrl.value = swiper.url
}   

//清除表单
const refreshForm = () =>{
    selectId.value = ''
    selectUrl.value = ''
}

//确认选择
const confirm = () =>{
    if(!selectId.value){
        ElMessage({
            message:'还未选择轮播图，请点击选择',
            type:'error',
            duration:2000
        })
    }else{
        emit('changeSwiper',selectId.value,selectUrl.value)
        visible.value = false
        refreshForm()
    }
}

const cancel = () =>{
    refreshForm()
    visible.value = false
}

defineExpose({
    init
})
</script>

<style scoped>
    .swiper{
        width: 100px;
        height: 84.6px;
        overflow: hidden;
        margin: 5px;
        padding-bottom: 8px;
        border-radius: 10px;
    }

    .swiper-selected{
        width: 100px;
        height: 84.6px;
        overflow: hidden;
        margin: 5px;
        padding-bottom: 5px;
        border-bottom: 3px solid #409eff;
        border-radius: 10px;
    }
</style>