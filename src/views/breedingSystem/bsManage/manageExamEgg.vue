<script>
import { defineComponent } from 'vue'
import TableSearch from '@/components/tableSearch/index.vue'

export default defineComponent({
  name: 'examineEggManage',
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
        abnormal: '光蛋2',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'A8',
        boardnumber: '2',
        actionTime: '2022年4月14日16:06:34',
        actionType: '抽蛋',
        abnormal: '踩蛋2',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'B10',
        boardnumber: '3',
        actionTime: '2022年4月14日16:06:34',
        actionType: '孵化',
        abnormal: '光蛋1',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'A15',
        boardnumber: '4',
        actionTime: '2022年4月14日16:06:34',
        actionType: '孵化',
        abnormal: '单蛋',
        principal: '益达',
        remark: '超过规定天数2天'
      },
      {
        pigeonnumber: 'B1',
        boardnumber: '5',
        actionTime: '2022年4月14日16:06:34',
        actionType: '抽蛋',
        abnormal: '无蛋',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'B10',
        boardnumber: '6',
        actionTime: '2022年4月14日16:06:34',
        actionType: '孵化',
        abnormal: '踩蛋1',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'C4',
        boardnumber: '7',
        actionTime: '2022年4月14日16:06:34',
        actionType: '抽蛋',
        abnormal: '单蛋',
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
        value: '查蛋时间',
        label: '查蛋时间'
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
        value: '异常',
        label: '异常',
        children: [
          {
            value: '冷蛋',
            label: '冷蛋'
          },
          {
            value: '踩蛋',
            label: '踩蛋'
          },
          {
            value: '无蛋',
            label: '无蛋'
          },
          {
            value: '单蛋',
            label: '单蛋'
          }
        ]
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
        cardText: '总查蛋数',
        cardNumber: 700
      }
    ]
    return () => (
      <>
        <table-search searchTypes={searchTypes} cardData={cardList} />
        <sc-table ref="table" data={eggsList} pageSize={5} stripe highlightCurrentRow>
          <el-table-column align="center" label="鸽笼编号" prop="pigeonnumber" width="150" sortable />
          <el-table-column align="center" label="面板编号" prop="boardnumber" width="150" sortable />
          <el-table-column align="center" label="查蛋时间" prop="actionTime" width="200" sortable />
          <el-table-column align="center" label="抽蛋/孵化" prop="action" width="150">
            {{
              default: ({ row }) => <el-tag type={row.actionType === '抽蛋' ? '' : 'warning'}>{row.actionType}</el-tag>
            }}
          </el-table-column>
          <el-table-column align="center" label="异常" width="150">
            {{
              default: ({ row }) => <el-tag type="danger">{row.abnormal}</el-tag>
            }}
          </el-table-column>
          <el-table-column align="center" label="操作员" prop="principal" width="150" />
          <el-table-column align="center" label="备注" prop="remark" />
        </sc-table>
      </>
    )
  }
})
</script>
