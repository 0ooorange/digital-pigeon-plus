<template>
  <el-dialog title="分配鸽笼" :close-on-click-modal="false" v-model="visible">
    <el-form @keyup.enter="dataFormSubmit()" label-width="80px">
      <el-form-item label="鸽笼编码" prop="number">
        <el-input v-model="cage.number" disabled></el-input>
      </el-form-item>
      <el-form-item label="层" prop="position">
        <el-input v-model="cage.position" disabled></el-input>
      </el-form-item>
      <el-form-item label="认养人" prop="userId">
        <el-select v-model="userId" placeholder="请选择" @change="getAdoptionTimeOptions">
          <el-option v-for="user in userList" :key="user.userId" :label="user.username" :value="user.userId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="认养时长" prop="adoptionTime">
        <el-select v-model="adoptionTime" placeholder="请选择" :disabled="!userId">
          <el-option v-for="(adoptionTime, index) in adoptionTimeOptions" :key="index" :label="adoptionTime"
            :value="adoptionTime">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" class="btn"  @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose, defineProps, defineEmits } from 'vue';
import http from '../../../utils/httpRequest'
import { ElMessage } from "element-plus";
const emit = defineEmits(['refreshDataList'])
const props = defineProps({ handingAdoptionOrderList: { type: Array } })
//认养订单数据，props获取，将其转换为认养时长选项和用户列表选项
const adoptionOrderList = ref([])
//鸽笼数据，通过init传过来
const cage = ref({})
//认养时长选项，
const adoptionTimeOptions = ref([])
//用户列表选项
const userList = ref([])
//当前组件显示状态
const visible = ref(false)
//表单
const userId = ref(0)
const adoptionTime = ref('')

//选中的订单id
const orderId = ref(0)

//从认养订单中抽一个符合的，修改其状态。
const getOrderId = () => {
  for (var i = 0; i < adoptionOrderList.value.length; ++i) {
    let adoptionOrder = adoptionOrderList.value[i];
    if (adoptionOrder.userId == userId.value &&
      adoptionOrder.adoptionTime == adoptionTime.value) {
      return adoptionOrder.orderId;
    }
  }
}
//对象数组去重,uniId为可唯一标识的字段
const uniqueFunc = (arr, uniId) => {
  const res = new Map();
  return arr.value.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
}
//获取认养时长选项，直接从认养订单列表获取，选择用户时触发
const getAdoptionTimeOptions = () => {
  adoptionOrderList.value.forEach(item => {
    if (item.userId == userId.value) {
      adoptionTimeOptions.value.push(item.adoptionTime);
    }
  })
  //去重
  adoptionTimeOptions.value = Array.from(new Set(adoptionTimeOptions.value));
}
//获取用户列表，直接从认养订单列表里获取
const getUserList = () => {
  adoptionOrderList.value.forEach(item => {
    userList.value.push({ 'userId': item.userId, 'username': item.username })
  })
  //去重
  userList.value = uniqueFunc(userList, 'userId');
}
//初始化，由父组件调用
const init = (cageInfo) => {
  //获取鸽笼数据
  cage.value = cageInfo
  adoptionOrderList.value = props.handingAdoptionOrderList
  //表单清空
  userId.value = ''
  adoptionTime.value = ''
  visible.value = true;
  getUserList();
}

// 表单提交
const dataFormSubmit = () => {
  orderId.value = getOrderId();
  http({
    url: http.adornUrl(`/user/adoptionCage/save`),
    method: 'post',
    data: http.adornData({
      'cageId': cage.value.id,
      'userId': userId.value,
      'adoptionTime': adoptionTime.value,
      'orderId': orderId.value,
    })
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
  })
}

defineExpose({
  init
})
</script>
<style scoped>
  .btn{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
}
</style>