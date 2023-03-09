<template>
    <el-dialog :title="!id ? '新增' : '修改'" :close-on-click-modal="false" v-model="visible" @close="cancel()">
        <el-form @keyup.enter="dataFormSubmit()" label-width="80px" size="mini">
            <el-form-item label="分类" prop="categoryId">
                <el-select v-model="categoryId" placeholder="请选择">
                    <el-option v-for="item in goodsCategoryOptions" :key="item.id" :label="item.categoryName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品图片" prop="imgUrl">
                <SingleUpload v-model="imgUrl" @input="setImg" :imgUrl="imgUrl"></SingleUpload>
            </el-form-item>
            <el-form-item label="商品名称" prop="goodsName">
                <el-input v-model="goodsName" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="price" placeholder="价格"></el-input>
            </el-form-item>
            <el-form-item label="库存" prop="number">
                <el-input-number v-model="number" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="轮播图">
                <img v-if="swiperId" :src="swiperUrl" @click="openSwiperSelector" class="swiper">
                <img v-else src='../../../img/addImg.png' @click="openSwiperSelector" class="swiper" />
                <div v-if="swiperId" class="cancelBindBtn" @click="cancelBind">×</div>
            </el-form-item>
        </el-form>
        <span class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
        <SwiperSelector ref="swiperSelector" @changeSwiper="setSwiper"></SwiperSelector>
    </el-dialog>
</template>

<script setup>
import { nextTick, ref, defineExpose, defineEmits } from 'vue'
import http from '../../../utils/httpRequest'
import { ElMessage } from 'element-plus'
import SingleUpload from '../../../components/upload/singleUpload.vue';
import SwiperSelector from './swiperSelector.vue';
const emit = defineEmits(['refreshDataList'])
const visible = ref(false)

const id = ref(0)
//商品图片
const imgUrl = ref('')
//商品名称
const goodsName = ref('')
//分类id
const categoryId = ref('')
//价格
const price = ref("")
//库存
const number = ref("")
//商品分类选项
const goodsCategoryOptions = ref([])
//选择的轮播图id
const swiperId = ref('')
//选择的轮播图url
const swiperUrl = ref('')
//轮播图选择器组件
const swiperSelector = ref()
//是否一开始有轮播图，判断最后是否进行轮播图取消绑定操作
const originSwiperId = ref('')

const init = (userId) => {
    id.value = userId || 0;
    visible.value = true;
    nextTick()
    if (id.value) {
        //获取用户信息
        getGoodsInfo()
    }
    getGoodsCategoryOptions();
}

//刷新表单
const refreshForm = () => {
    imgUrl.value = ''
    goodsName.value = ''
    categoryId.value = ''
    price.value = 0
    number.value = 1
    swiperId.value = '',
        swiperUrl.value = ''
}

//获取商品信息
const getGoodsInfo = () => {
    http({
        url: http.adornUrl(
            `/shop/goods/info/${id.value}`
        ),
        method: "get",
        params: http.adornParams(),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            categoryId.value = data.goods.categoryId
            imgUrl.value = data.goods.imgUrl
            goodsName.value = data.goods.goodsName
            price.value = data.goods.price
            number.value = data.goods.number
            if (data.swiper) {
                swiperId.value = data.swiper.id
                swiperUrl.value = data.swiper.url
                originSwiperId.value = data.swiper.id
            }
        }
    });
}

//获取商品分类列表
const getGoodsCategoryOptions = () => {
    http({
        url: http.adornUrl(
            `/shop/goodsCategory/list`
        ),
        method: "get",
        params: http.adornParams(),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            goodsCategoryOptions.value = data.page.list;
        }
    });
}

//设置图片
const setImg = (val) => {
    imgUrl.value = val;
}

//打开轮播图选择器
const openSwiperSelector = () => {
    swiperSelector.value.init()
}

//设置轮播图
const setSwiper = (id, url) => {
    swiperId.value = id
    swiperUrl.value = url
}
//绑定轮播图
const bindSwiper = () => {
    http({
        url: http.adornUrl(
            `/staticinfo/swiper/bindGoods/${id.value}/${swiperId.value}`
        ),
        method: 'put'
    }).then(({ data }) => {
        if (data && data.code === 0) {
            //绑定轮播图
            visible.value = false;
            //刷新表单
            refreshForm()
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
    })
}
//取消绑定轮播图
const cancelBindSwiper = () => {
    http({
        url: http.adornUrl(
            `/staticinfo/swiper/cancelBindGoods/${originSwiperId.value}`
        ),
        method: 'put'
    }).then(({ data }) => {
        if (data && data.code === 0) {
            //绑定轮播图
            visible.value = false;
            //刷新表单
            refreshForm()
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
    })
}

//清除绑定轮播图
const cancelBind = () => {
    swiperId.value = ''
    swiperUrl.value = ''
}

// 表单提交
const dataFormSubmit = () => {
    http({
        url: http.adornUrl(
            `/shop/goods/${!id.value ? "save" : "update"}`
        ),
        method: id.value ? 'put' : 'post',
        data: http.adornData({
            id: id.value || undefined,
            categoryId: categoryId.value,
            goodsName: goodsName.value,
            imgUrl: imgUrl.value,
            price: price.value,
            number: number.value
        }),
    }).then(({ data }) => {
        if (data && data.code === 0) {
            if (swiperId.value && originSwiperId.value != swiperId.value) {
                //绑定轮播图（有轮播图，并且与一开始的不一样）
                bindSwiper()
            } else if (!swiperId.value && originSwiperId.value) {
                //一开始绑定了轮播图，最后没有轮播图
                cancelBindSwiper()
            } else {
                visible.value = false;
                //刷新表单
                refreshForm()
                ElMessage({
                    message: `操作成功`,
                    type: "success",
                    duration: 2000,
                    onclose: emit('refreshDataList')
                });
            }
        } else {
            ElMessage({
                message: `操作出错`,
                type: "error",
                duration: 2000
            });
        }
    });
}


const cancel = () => {
    refreshForm()
    visible.value = false
}
defineExpose({
    init
})
</script>
<style scoped>
.swiper {
    border-radius: 10px;
    margin: 1px;
    width: 100px;
    display: block;
}

.btn {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
}

.cancelBindBtn {
    line-height: 20px;
    height: 25px;
    width: 25px;
    margin-left: 5px;
    font-size: 25px;
    text-align: center;
    cursor: pointer;
    border-radius: 60px;
    border: 1px solid;
}

.cancelBindBtn:hover {
    line-height: 20px;
    height: 25px;
    width: 25px;
    font-size: 30px;
    text-align: center;
    color: #409eff;
    cursor: pointer;
    border-radius: 60px;
    border: 1px solid #409eff;
}
</style>
  