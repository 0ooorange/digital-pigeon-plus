<template>
  <div class="container">
    <div class="left">
      <!-- 系统选择 -->
      <div class="checkboxs">
        <el-checkbox-group v-model="checkboxGroup">
          <el-checkbox-button v-for="area in areaSelectList" :key="area" :label="area">
            {{ area }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
      <!-- 地区列表 -->
      <sc-table class="table" :data="areaList" stripe highlightCurrentRow hidePagination>
        <el-table-column align="center" label="路段" prop="route" width="70" />
        <el-table-column align="center" label="状态" prop="status" width="70" />
        <el-table-column align="center" label="操作" width="70">
          <template v-slot:default="{ row }">
            <el-switch v-model="row.action" />
          </template>
        </el-table-column>
      </sc-table>
    </div>
    <!-- 视频列表 -->
    <div class="center">
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
            <video class="video" controls autoplay>
              <source :src="item.url" type="video/mp4" />
              <source :src="item.url" type="video/quicktime" />
            </video>
          </el-card>
        </div>
        <div class="v-box">
          <el-card @click="addVideo" class="add-video">
            <div class="">
              <el-icon :size="50" color="#dcdfe6"><CirclePlus /></el-icon>
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
    </div>
    <div class="right">
      <el-descriptions title="监控信息" :column="1" :size="600" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">名称</div>
          </template>
          兴宁鸽舍1列监控(G24611101)
          <!-- {{ monitorInfo.name || `摄像头${curIndex + 1}` }} -->
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">型号</div>
          </template>
          <el-tag size="small">G24611101</el-tag>
          <!-- <el-tag size="small">{{ monitorInfo.serial || '-' }}</el-tag> -->
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">状态</div>
          </template>
          在线
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">位置</div>
          </template>
          金绿基地A1棚
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
          <el-tag size="small">陈文浩</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">联系方式</div>
          </template>
          13539393933
        </el-descriptions-item>
      </el-descriptions>
      <div class="map">
        <!-- <SCMap adress="兴宁" /> -->
      </div>
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
  </div>
</template>
<script>
import { reactive, ref } from '@vue/reactivity'
// import SCMap from '@/components/scMap'
import { getMonitorList, getMonitorInfo } from '@api/equipVideo/globalVideo'
import { CirclePlus } from '@element-plus/icons-vue'
export default {
  name: 'globalVideo',
  components: { CirclePlus },
  setup() {
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

    /* 视频表格 */
    const areaList = [
      { route: '园区门', status: '--', action: false },
      { route: '仓库', status: '播放中', action: true },
      { route: '鸽棚', status: '监控中', action: true }
    ]
    const checkboxGroup = ref([])
    const areaSelectList = ['养殖', '屠宰', '加工']
    /* 右侧 监控信息 */
    const curInfo = reactive({})
    const curIndex = ref(1)
    const videoChange = ({ id }, i) => {
      curIndex.value = i
      getMonitorData(id)
      // 更新监控信息
    }
    // 添加对话框
    const isDrawerShow = ref(false)
    const addTableData = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ])
    /* 添加监控 */
    const addVideo = () => {
      isDrawerShow.value = true
    }
    return {
      videoList,
      areaList,
      checkboxGroup,
      areaSelectList,
      isDrawerShow,
      addTableData,

      curIndex,
      curInfo,
      videoChange,

      addVideo
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  height: 100%;
  .center {
    flex: 1;
    margin-left: 10px;
    margin-right: -10px;
    .v-box-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      .v-box {
        min-width: 168px;
        width: 30%;
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
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }
  }
  .left {
    width: 230px;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
    .checkboxs {
      text-align: center;
      padding: 10px;
    }
  }
  .right {
    width: 300px;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px 15px;
    .title {
      font-weight: 700;
    }
    .map {
      width: 100%;
      height: 300px;
    }
  }
  .table {
    width: 100%;
  }
}
</style>
