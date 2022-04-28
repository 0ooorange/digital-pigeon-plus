<script>
import { defineComponent } from 'vue'
import TableSearch from '@/components/tableSearch/index.vue'

export default defineComponent({
  name: 'reEggsManage',
  components: {
    TableSearch
  },
  setup() {
    const dateConcreteValue = ''
    const defaultTime = ''
    const eggsList = [
      {
        pigeonnumber: 'A1',
        boardnumber: '1',
        actionTime: '2022年4月14日16:06:34',
        action: '已取走',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'A8',
        boardnumber: '2',
        actionTime: '2022年4月14日16:06:34',
        action: '已取走',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'B10',
        boardnumber: '3',
        actionTime: '2022年4月14日16:06:34',
        action: '已取走',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'A15',
        boardnumber: '4',
        actionTime: '2022年4月14日16:06:34',
        action: '已取走',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'B1',
        boardnumber: '5',
        actionTime: '2022年4月14日16:06:34',
        action: '未取走',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'B10',
        boardnumber: '6',
        actionTime: '2022年4月14日16:06:34',
        action: '已取走',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'C4',
        boardnumber: '7',
        actionTime: '2022年4月14日16:06:34',
        action: '已取走',
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
        value: '回蛋时间',
        label: '回蛋时间',
        type: 'date-picker'
      },
      {
        value: '负责人',
        label: '负责人',
        type: 'select'
      },
      {
        value: '操作',
        label: '操作',
        type: 'select'
      },
      {
        value: '备注',
        label: '备注',
        type: 'input'
      }
    ]
    const cardList = [
      {
        cardText: '回蛋总数',
        cardNumber: '1600只'
      }
    ]
    return () => (
      <>
        <table-search searchTypes={searchTypes} cardData={cardList}>
          <el-date-picker
            style="background-color: #fff; width: 220px; margin: 0 10px 10px 0"
            v-model={dateConcreteValue}
            type="daterange"
            start-placeholder="起始时间"
            end-placeholder="最终时间"
            default-time={defaultTime}
          />
        </table-search>
        <sc-table ref="table" data={eggsList} pageSize={5} stripe highlightCurrentRow>
          <el-table-column align="center" label="鸽笼编号" prop="pigeonnumber" width="150" sortable />
          <el-table-column align="center" label="面板编号" prop="boardnumber" width="150" sortable />
          <el-table-column align="center" label="回蛋时间" prop="actionTime" width="200" sortable />
          <el-table-column align="center" label="负责人" prop="principal" width="150" />
          <el-table-column
            align="center"
            label="操作"
            width="150"
            v-slots={{
              default: ({ row }) => <el-tag type={row.action === '未取走' ? 'danger' : ''}>{row.action}</el-tag>
            }}
          />
          <el-table-column align="center" label="备注" prop="remark" />
        </sc-table>
      </>
    )
  }
})
</script>
