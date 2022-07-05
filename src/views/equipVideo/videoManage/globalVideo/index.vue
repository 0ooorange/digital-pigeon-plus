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
      <p class="title">监控信息</p>
      <p>名称：摄像头2</p>
      <p>型号：TCL800</p>
      <p>位置：金绿基地A1棚</p>
      <p>监控方式：固定点</p>
      <p>区域负责人：陈文浩</p>
      <p>联系方式：13539393933</p>
    </div>
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
    return {
      videoList,
      areaList,
      checkboxGroup,
      areaSelectList
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  height: 100%;
  background-color: #fff;
  .center {
    flex: 1;
    padding: 10px;
    background-color: pink;
    .v-box-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .v-box {
        width: 168px;
        height: 240px;
        margin-bottom: 25px;
        box-sizing: border-box;
        border: 1px solid #000;
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
    background-color: skyblue;
    .checkboxs {
      text-align: center;
      padding: 10px;
    }
  }
  .right {
    width: 300px;
    background-color: orange;
    .title {
      font-weight: 700;
    }
  }
  .table {
    width: 100%;
  }
}
</style>
