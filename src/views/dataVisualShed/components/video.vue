// 视频监控
<template>
  <div class="echarts4-content">
    <div class="videoSelect">
      <el-select size="small" style="width: 100px;" v-model="videoSelect" placeholder="监控1" @change="change($event)">
        <el-option v-for="(item, index) in monitor_namelist" :key="index" :label="item" :value="item"></el-option>
      </el-select>
    </div>
    <div class="videoDiv">
      <iframe class="video" :src="monitor_id" allow="autoplay" frameBorder="0" allowfullscreen="true"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import store from '@/store'
import { getMonitorByShedID } from '@api/breeding/breedStatistics'
// 下拉框选项值
const videoSelect = ref('')
// 获取监控视频id
const monitor_idlist = ref([])
const monitor_id = ref('')
const monitor_namelist = ref([])
getMonitorByShedID(store.state.baseInfo.SHED_ID)
  .then((res) => { monitor_idlist.value = res.data.data }) // 获取监控列表
  .then(() => { monitor_id.value = 'https://v.qkeep.cn/?v=' + monitor_idlist.value[0].hls.replace('http', 'https') + '#toolbar=0'; monitor_id.value.slice(25, 's')} ) // 获取当前监控
  .then(() => { for (let i = 1; i <= monitor_idlist.value.length; i++) { monitor_namelist.value.push('监控' + i) } }) // 获取监控下拉框选项名
// 选项变化
const change = (e) => { 
  monitor_id.value = 'https://v.qkeep.cn/?v=' + monitor_idlist.value[parseInt(e.split('')[2])].hls.replace('http', 'https') + '#toolbar=0'; 
  monitor_id.value.slice(25, 's')
}
</script>

<style lang="less" scoped>
.echarts4-content {display: flex; flex-direction: column; width: 90%;
  .videoSelect {align-self: flex-end;}
  .videoDiv {align-self: center;
    .video {height: 75%;}
  }
}
</style>