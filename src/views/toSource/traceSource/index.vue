<template>
  <div>
    <sc-table class="table"
              :data="rootList"
              stripe
              highlightCurrentRow
              hidePagination>
      <el-table-column align="center"
                       label="产品名"
                       prop="processName"
                       width="150" />
      <el-table-column align="center"
                       label="加工批次"
                       prop="id"
                       width="170" />

      <el-table-column align="shBatch"
                       label="屠宰批次"
                       prop="farmingBatch"
                       width="170" />

      <el-table-column align="center"
                       label="养殖批次"
                       prop="farmingBatch"
                       width="170" />
      <el-table-column align="center"
                       label="创建时间"
                       prop="gmtCreate"
                       width="150" />
      <el-table-column align="center"
                       label="修改时间"
                       prop="gmtModified"
                       width="150" />
      <el-table-column align="center"
                       label="操作"
                       fixed="right"
                       width="200">
        <template #default>
          <el-button type="text"
                     icon="el-icon-set-up"
                     @click="qrCodeDialog = true">生成溯源码
          </el-button>
          <el-button type="text"
                     style="color: #FA6962"
                     icon="el-icon-delete">
            删除
          </el-button>
        </template>
      </el-table-column>
    </sc-table>
    <el-dialog title="溯源码"
               :modelValue="qrCodeDialog"
               width="35%">
      <div class="qrcode-container">
        <vue-qr :text="codeUrl"
                :size="300"></vue-qr>
        <!-- <div>
          <el-link type="primary"
                   :href="codeUrl"
                   icon="el-icon-view">
            {{codeUrl}}
          </el-link>
        </div> -->
      </div>
      <template v-slot:footer>
        <span>
          <el-button @click="qrCodeDialog = false">取 消</el-button>
          <el-button type="primary"
                     @click="qrCodeDialog = false">确 定</el-button>
        </span>
      </template>

    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import res from './data.json'

export default defineComponent({
  nama: 'source', // 溯源管理
  components: { vueQr },
  setup () {
    const rootList = res.records || []
    const qrCodeDialog = ref(false)
    const codeUrl = ref('http://localhost:2800/#/navigator')
    return {
      rootList,
      qrCodeDialog,
      codeUrl
    }
  }
})
</script>

<style scoped>
.qrcode-container {
  text-align: center;
}
.el-dialog__body {
  padding: 0 20px 20px;
}
</style>
