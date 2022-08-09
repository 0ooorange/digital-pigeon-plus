<template>
  <el-descriptions title="监控信息" :column="1" :size="600" border>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">名称</div>
      </template>
      {{ monitorInfo.name || `摄像头${curIndex + 1}` }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">型号</div>
      </template>
      <el-tag size="small">{{ monitorInfo.serial || '-' }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">状态</div>
      </template>
      {{monitorInfo.status || '在线'}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">位置</div>
      </template>
      {{monitorInfo.place || '-'}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">监控方式</div>
      </template>
      固定点
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">区域负责人</div>
      </template>
      <el-tag size="small">{{monitorInfo.person || '-'}}</el-tag>
    </el-descriptions-item>
    <!-- <el-descriptions-item>
      <template #label>
        <div class="cell-item">联系方式</div>
      </template>
      13539393933
    </el-descriptions-item> -->
  </el-descriptions>
</template>

<script>
import { ref } from '@vue/reactivity'
import { getMonitorInfo } from '@api/equipVideo/globalVideo'
import store from '@/store'
export default {
  props: {curIndex: {type: Number}},
  setup(props) {
    /* 查摄像头信息 */
    // eslint-disable-next-line no-unused-vars
    let currIndex = ref(props.curIndex)
    let monitorInfo = ref({name: '', serial: '', status: '', place: '', person: ''})
    const getMonitorData = async (id = '1545974946201624577') => {
      await getMonitorInfo(id).then((res) => {
        res = res.data?.data || {}
        monitorInfo.value.name = res.name.split('(')[0]
        monitorInfo.value.serial = res.serial
        monitorInfo.value.status = res.status === 0 ? '在线' : '掉线'
        monitorInfo.value.place = store.state.baseInfo.CURR_INFO.CURR_BASE.code + '基地' + store.state.baseInfo.CURR_INFO.CURR_SHED.code + '棚'
        monitorInfo.value.person = store.state.baseInfo.CURR_INFO.CHARGE_NAME
      })
    }
    getMonitorData()
    return {currIndex, monitorInfo}
  },
}
</script>

<style lang="less" scoped>
.title {font-weight: 700;}
.map {width: 100%; height: 300px;}
</style>
