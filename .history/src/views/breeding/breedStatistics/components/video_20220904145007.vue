<template>
  <div class="video">
    <h3>监控视频区</h3>
    <el-select style="width:100px" v-model="videoSelect" placeholder="监控1" @change='change($event)'>
      <el-option v-for="(item, index) in monitor_namelist" :key="index" :label="item" :value="item"></el-option>
    </el-select>
  </div>
  <div class="video2">
    <div class="contList">
      <div class="boxVideo">
        <iframe class="video-js video-btn" :src="monitor_id" scrolling="no" allow="autoplay" frameBorder="0" allowfullscreen="true"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getMonitorByShedID } from '@api/breeding/breedStatistics'
// 下拉框选项值
const videoSelect = ref('')
// 获取监控视频id
const monitor_idlist = ref([])
const monitor_id = ref('')
const monitor_namelist = ref([])
getMonitorByShedID()
  .then((res) => {monitor_idlist.value = res.data.data}) // 获取监控列表
  .then(() => {monitor_id.value = 'https://v.qkeep.cn/?v=' + monitor_idlist.value[0].hls.replace('http', 'https') + '#toolbar=0'; monitor_id.value.slice(25, 's')}) // 获取当前监控
  .then(() => {for (let i = 1; i <= monitor_idlist.value.length; i++) {monitor_namelist.value.push('监控' + i)}}) // 获取监控下拉框选项名
// 选项变化
const change = (e) => { 
  console
  monitor_id.value = 'https://v.qkeep.cn/?v=' + monitor_idlist.value[parseInt(e.split('')[2])].hls.replace('http', 'https') + '#toolbar=0'; 
  monitor_id.value.slice(25, 's')
}
</script>

<style lang="scss" scoped>
/* 监控样式 */
.bottomLeft {width: 25%;
  .video {display: flex; flex-direction: row; justify-content: space-between;}
  .video2 {width: 100%; height: 28vh;
    .contList {position: relative; width: 100%; height: 11vw; margin: 1vw auto 0;
      .boxVideo {width: 100%; height: 100%;
        .video-js {width: 100%; height: 100%;}
        .video-js:hover .video-btn {background: none;}
        .video-btn:hover {background: none;}
        .video-btn {border: none; background: none;}
      }
    }
  }
}
</style>