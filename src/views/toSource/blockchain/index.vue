<template>
  <div>
    <sc-table class="table"
              :data="blockchainList"
              stripe
              highlightCurrentRow
              hidePagination>
      <el-table-column align="center"
                       label="ID"
                       prop="id"
                       width="50" />
      <el-table-column align="center"
                       label="数据类型"
                       prop="dataType"
                       width="100" />
      <el-table-column align="center"
                       label="数据"
                       prop="status"
                       width="200">
        <template v-slot="{row}">
          <span class="text_truncation">{{row.data}}</span>
          <i class="el-icon-caret-right"></i>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="当前节点Hash"
                       prop="currentblockinfo"
                       width="150" />
      <el-table-column align="center"
                       label="前节点Hash"
                       prop="previousblockinfo"
                       width="150" />
      <el-table-column align="center"
                       label="链高度"
                       prop="blockheight"
                       width="50" />

      <el-table-column align="center"
                       label="Hash寻址码"
                       prop="hashAddress"
                       width="100" />
      <el-table-column align="center"
                       label="溯源二维码"
                       prop="status"
                       width="150">
        <template v-slot="{row}">
          <vue-qr :text="row.traceabilityAddress"
                  :size="150" />
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="溯源码网址"
                       prop="traceabilityAddress"
                       width="100" />
      <el-table-column align="center"
                       label="操作"
                       fixed="right"
                       width="200">
        <template #default>
          <el-button type="text"
                     icon="el-icon-set-up"
                     @click="resultDialog = true">对比
          </el-button>
          <el-button type="text"
                     style="color: #FA6962"
                     icon="el-icon-delete">
            删除
          </el-button>
        </template>
      </el-table-column>
    </sc-table>
    <!-- 对比结果 -->
    <el-dialog title="比对结果"
               :modelValue="resultDialog"
               width="40%">
      <div class="dialog_result">
        <span class="dialog_result_success">
          hash值一致，未被篡改！
        </span>
        <img :src="successImg"
             class="dialog_result_img">
      </div>
      <template v-slot:footer>
        <span>
          <el-button @click="resultDialog = false">取 消</el-button>
          <el-button type="primary"
                     @click="resultDialog = false">确 定</el-button>
        </span>
      </template>

    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import successImg from '@images/hashNotChange.png'

import res from './data.json'
export default defineComponent({
  name: 'blockchain',
  components: {
    vueQr
  },
  setup () {
    const blockchainList = res.records || []
    const resultDialog = ref(false)
    return {
      blockchainList,
      resultDialog,
      successImg
    }
  }
})
</script>

<style lang="less" scoped>
.table {
	width: 100%;
	height: 90%;
}
.text_truncation {
  width: 200px;
  // height: 100px;
  // 宽度需要自己调整
  overflow: hidden;
  text-overflow: ellipsis;
  /* 弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 限制在一个块元素显示的文本的行数 */
  -webkit-line-clamp: 4;
  /* 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-box-orient: vertical;
}
.dialog_result {
  text-align: center;
  font-size: 30px;
  &_success {
    color: green;
  }
  .dialog_result_img {
    width: 350px;
  }
}
</style>
