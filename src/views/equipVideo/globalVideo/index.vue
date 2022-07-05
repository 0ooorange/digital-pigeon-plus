<template>
  <div class="container">
    <div class="left">
      <!-- 系统选择 -->
      <div class="checkboxs">
        <el-checkbox-group v-model="checkboxGroup"
                           size="large">
          <el-checkbox-button v-for="area in areaSelectList"
                              :key="area"
                              :label="area">
            {{ area }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
      <!-- 地区列表 -->
      <sc-table class="table"
                :data="areaList"
                stripe
                highlightCurrentRow
                hidePagination>
        <el-table-column align="center"
                         label="路段"
                         prop="route"
                         width="100" />
        <el-table-column align="center"
                         label="状态"
                         prop="status"
                         width="100" />
        <el-table-column align="center"
                         label="操作"
                         width="100">
          <template v-slot:default="{ row }">
            <el-switch v-model="row.action" />
          </template>
        </el-table-column>
      </sc-table>
    </div>
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
        <div class="v-box"
             v-for="(item, index) in videoList"
             :key="index">
          <el-card>
            <template #header>
              <span>摄像头</span>
            </template>
            <video class="video"
                   controls>
              <source src="http://hls01open.ys7.com/openlive/cf40f99cc9cb4a23bd52e0b2119b534c.m3u8"
                      type="application/x-mpegURL" />
            </video>
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
      <el-descriptions title="监控信息"
                       :column="1"
                       :size="600"
                       border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              名称
            </div>
          </template>
          摄像头2
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              型号
            </div>
          </template>
          <el-tag size="small">TCL800</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              位置
            </div>
          </template>
          金绿基地A1棚
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              监控方式
            </div>
          </template>
          固定点
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              区域负责人
            </div>
          </template>
          <el-tag size="small">陈文浩</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              联系方式
            </div>
          </template>
          13539393933
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <el-drawer v-model="isDrawerShow">
      <template #title>
        <h4>添加监控</h4>
      </template>
      <template #default>
        <el-table ref="multipleTableRef"
                  :data="tableData"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55" />
          <el-table-column label="名称"
                           width="120">
            <template #default="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column property="name"
                           label="型号"
                           width="120" />
          <el-table-column property="address"
                           label="位置"
                           show-overflow-tooltip />
          <el-table-column property="address"
                           label="监控方式"
                           show-overflow-tooltip />
          <el-table-column property="address"
                           label="区域负责人"
                           show-overflow-tooltip />
          <el-table-column property="name"
                           label="联系方式"
                           width="120" />
        </el-table>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary"
                     @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
export default {
  name: 'globalVideo',
  setup () {
    const videoList = [
      { id: 1, url: 'http' },
      { id: 2, url: 'https' },
      { id: 3, url: 'http' },
      { id: 4, url: 'https' },
      // { id: 5, url: 'http' },
      // { id: 6, url: 'https' },
      // { id: 7, url: 'http' },
      // { id: 8, url: 'https' }
    ]
    const areaList = [
      { route: '园区门', status: '--', action: false },
      { route: '仓库', status: '播放中', action: true },
      { route: '鸽棚', status: '监控中', action: true }
    ]
    const checkboxGroup = ref([])
    const areaSelectList = ['养殖', '屠宰', '加工']



    // 添加对话框
    const isDrawerShow = ref(false)
    const addTableData = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      }])
    return {
      videoList,
      areaList,
      checkboxGroup,
      areaSelectList,
      isDrawerShow,
      addTableData
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
    padding: 0 10px;
    .v-box-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .v-box {
        width: 168px;
        height: 240px;
        margin-bottom: 25px;
        box-sizing: border-box;
        /deep/.el-card__body {
          padding: 5px;
        }
        .video {
          width: 100%;
          height: 200px;
        }
      }
    }
  }
  .left {
    width: 300px;
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
  }
  .table {
    width: 100%;
  }
}
</style>
