<template>
  <!-- <el-row :gutter="10">
        <template v-for="(item, index) in videoList"
                  :key="index">
          <el-col :xs="24"
                  :sm="6"
                  :md="4"
                  :lg="3"
                  :xl="1">
            <div class="v-box"></div>
          </el-col>
        </template>
      </el-row> -->
  <div class="v-box-container">
    <div :class="['v-box', { 'v-box-active': index === curIndex }]" v-for="(item, index) in videoList" :key="index">
      <el-card @click="videoChange(item, index)">
        <template #header>
          <span>{{ '摄像头' + (index + 1) }}</span>
        </template>
        <video class="video" controls autoplay muted loop>
          <source :src="item.url" type="video/mp4" />
          <source :src="item.url" type="video/quicktime" />
        </video>
      </el-card>
    </div>
    <div class="v-box">
      <el-card @click="addVideo" class="add-video">
        <div class="">
          <el-icon :size="50" color="#dcdfe6">
            <CirclePlus />
          </el-icon>
        </div>
      </el-card>
    </div>

    <!-- <div class="v-box-video">
          <video class="video-js vjs-big-play-button"
                 controls>
            <source src="http://hls01open.ys7.com/openlive/cf40f99cc9cb4a23bd52e0b2119b534c.m3u8"
                    type="application/x-mpegURL" />
          </video>
        </div> -->
  </div>

  <!-- 新增监控 -->
  <el-drawer v-model="isDrawerShow" size="50%">
    <template #title>
      <h4>添加监控</h4>
    </template>
    <template #default>
      <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="名称" width="120">
          <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column property="model" label="型号" width="120" />
        <el-table-column property="site" label="位置" show-overflow-tooltip />
        <el-table-column property="type" label="监控方式" show-overflow-tooltip />
        <el-table-column property="userid" label="区域负责人" show-overflow-tooltip />
        <el-table-column property="name" label="联系方式" width="120" />
      </el-table>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { getMonitorList, getMonitorInfo } from '@api/equipVideo/globalVideo'
import { CirclePlus } from '@element-plus/icons-vue'

/* 视频逻辑 */
const videoList = ref([])
const shedID = '1518124016571797507'
getMonitorList(shedID).then((res) => {
  const urlList = res.data?.urlList || []
  videoList.value = urlList.map((url) => ({ url, id: '1545974946201624577' }))
})
/* 查摄像头信息 */
// eslint-disable-next-line no-unused-vars
let monitorInfo = {}
const getMonitorData = async (id = '1545974946201624577') => {
  await getMonitorInfo(id).then((res) => {
    // console.log(res.data.data, 'getMonitorInfo')
    monitorInfo = res.data?.data || {}
  })
}
getMonitorData()

// 添加对话框
const isDrawerShow = ref(false)
// const addTableData = ref([
//   {
//     date: '2016-05-03',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     date: '2016-05-02',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     date: '2016-05-04',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     date: '2016-05-01',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     date: '2016-05-08',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     date: '2016-05-06',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     date: '2016-05-07',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
// ])
/* 添加监控 */
const addVideo = () => {
  isDrawerShow.value = true
}
</script>

<style lang="less" scoped>
.v-box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  .v-box {
    min-width: 168px;
    width: 31.5%;
    min-height: 100px;
    margin-left: 10px;
    margin-bottom: 25px;
    box-sizing: border-box;
    border: 2px dashed transparent;
    overflow: hidden;
    /deep/.el-card__header {
      font-weight: 400;
    }
    /deep/.el-card__body {
      padding: 8px 5px 5px 5px;
    }
    .video {
      width: 100%;
      height: 100%;
    }
    .add-video {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .v-box-active {
    border-color: var(--el-color-primary);
  }
}
</style>