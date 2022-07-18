<template>
  <div class="video">
    <h3>监控视频区</h3>
    <el-select style="width:100px" v-model="value" placeholder="监控1">
      <el-option v-for="item in monitor_idlist" :key="item.id" :label="item.devicename" :value="item.id">
      </el-option>
    </el-select>
  </div>
  <div class="video2">
    <div class="contList">
      <div class="boxVideo">
        <video class="video-js video-btn" data-setup="{}" controls :src="monitor_idlist[0]">
        </video>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { getMonitorByShedID } from '@api/breeding/breedStatistics'
const props = defineProps({
  shed_id: {
    type: String,
    require: true,
  },
})
// 获取监控视频id
const monitor_idlist = ref([])
getMonitorByShedID(props.shed_id).then((res) => {
  monitor_idlist.value = res.data.urlList
})
</script>

<style lang="scss" scoped>
/* 监控样式 */
.bottomLeft {
  width: 25%;
  .video {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .video2 {
    width: 100%;
    height: 28vh;
    .contList {
      position: relative;
      width: 100%;
      height: 11vw;
      margin: 1vw auto 0;
      .boxVideo {
        width: 100%;
        height: 100%;
        .video-js {
          width: 100%;
          height: 100%;
        }
        .video-js:hover .video-btn {
          background: none;
        }
        .video-btn:hover {
          background: none;
        }
        .video-btn {
          border: none;
          background: none;
        }
      }
    }
  }
}
</style>