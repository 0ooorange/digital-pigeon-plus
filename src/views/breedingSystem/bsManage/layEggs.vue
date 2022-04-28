<script>
import TableSearch from '@/components/tableSearch/index.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'layEggsManage',
  components: {
    TableSearch
  },
  setup() {
    const eggsList = [
      {
        pigeonnumber: 'A1',
        boardnumber: '1',
        actionTime: '2022年4月14日16:06:34',
        actionType: '抽蛋',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'A8',
        boardnumber: '2',
        actionTime: '2022年4月14日16:06:34',
        actionType: '孵化',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'B10',
        boardnumber: '3',
        actionTime: '2022年4月14日16:06:34',
        actionType: '抽蛋',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'A15',
        boardnumber: '4',
        actionTime: '2022年4月14日16:06:34',
        actionType: '孵化',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'B1',
        boardnumber: '5',
        actionTime: '2022年4月14日16:06:34',
        actionType: '孵化',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'B10',
        boardnumber: '6',
        actionTime: '2022年4月14日16:06:34',
        actionType: '抽蛋',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'C4',
        boardnumber: '7',
        actionTime: '2022年4月14日16:06:34',
        actionType: '抽蛋',
        principal: '益达',
        remark: '无'
      }
    ]
    // 查询类型下拉框列表的数据，格式固定
    const searchTypes = [
      {
        value: '鸽笼编号',
        label: '鸽笼编号'
      },
      {
        value: '面板编号',
        label: '面板编号',
        type: ''
      },
      {
        value: '操作时间',
        label: '操作时间'
      },
      {
        value: '抽蛋',
        label: '抽蛋'
      },
      {
        value: '孵化',
        label: '孵化'
      },
      {
        value: '操作员',
        label: '操作员'
      },
      {
        value: '备注',
        label: '备注'
      }
    ]
    const cardList = [
      {
        cardText: '总产蛋数',
        cardNumber: 800
      }
    ]
    return () => (
      <>
        <table-search searchTypes={searchTypes} cardData={cardList} />
        <sc-table ref="table" data={eggsList} pageSize={5} stripe highlightCurrentRow>
          <el-table-column align="center" label="鸽笼编号" prop="pigeonnumber" width="150" sortable />
          <el-table-column align="center" label="面板编号" prop="boardnumber" width="150" sortable />
          <el-table-column align="center" label="操作时间" prop="actionTime" width="200" sortable />
          <el-table-column
            align="center"
            label="抽蛋/孵化"
            width="130"
            v-slots={{
              default: ({ row }) => <el-tag type={row.actionType === '抽蛋' ? '' : 'warning'}>{row.actionType}</el-tag>
            }}
          />
          <el-table-column align="center" label="操作员" prop="principal" width="150" />
          <el-table-column align="center" label="备注" prop="remark" />
        </sc-table>
      </>
    )
  }
})
</script>
<style lang="less" scoped>
/deep/ .scTable .scTable-table {
  height: 0 !important;
}
</style>
