<script>
import { defineComponent, reactive, ref } from 'vue'
import { Setting, Search } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'breedingDetail', // 养殖明细
  setup() {
    /* table */
    const eggsList = [
      {
        pigeonnumber: 'A1',
        boardnumber: '1',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '抽蛋',
        remark: '无'
      },
      {
        pigeonnumber: 'A8',
        boardnumber: '2',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '孵化',
        remark: '无'
      },
      {
        pigeonnumber: 'B10',
        boardnumber: '3',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '抽蛋',
        remark: '无'
      },
      {
        pigeonnumber: 'A15',
        boardnumber: '4',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '孵化',
        remark: '无'
      },
      {
        pigeonnumber: 'B1',
        boardnumber: '5',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '孵化',
        remark: '无'
      },
      {
        pigeonnumber: 'B10',
        boardnumber: '6',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '抽蛋',
        remark: '无'
      },
      {
        pigeonnumber: 'C4',
        boardnumber: '7',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '抽蛋',
        remark: '无'
      }
    ]

    const column = ref([
      {
        label: '鸽笼号',
        prop: 'pigeonnumber',
        width: '180',
        sortable: true,
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '板子号',
        prop: 'boardnumber',
        width: '180',
        sortable: true,
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '生蛋时间',
        prop: 'layEggDate',
        width: '200',
        sortable: true,
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '生蛋天数',
        prop: 'layEggdays',
        width: '180',
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '孵化天数',
        prop: 'hatchEggdays',
        width: '180',
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '备注',
        prop: 'remark',
        hide: false,
        checked: true,
        disabled: false
      }
    ])

    /* 工具栏 */
    //下拉框 时间类型选择
    const dateType = ref('')
    const dateTypes = [
      {
        label: '生蛋日期',
        value: 'layDate'
      },
      {
        label: '回蛋日期',
        value: 'backDate'
      }
    ]
    // 时间选择器
    const dateValue = ref([''])
    const shortcuts = [
      {
        text: '近一周',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        }
      },
      {
        text: '近一个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        }
      },
      {
        text: '近3个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        }
      }
    ]
    const checkboxChange = (value, item) => {
      console.log(value, item, 'checkboxChange')
      //   至少选中一个检查
      const hasCheckedCount = column.value.reduce((pre, cur) => (pre += cur.checked ? 1 : 0), 0)
      console.log(hasCheckedCount, 'hasCheckedCount')
      // 控制列显示隐藏
      item.hide = !value
      item.checked = value
    }
    // 选择显示列
    const renderColList = () => (
      <div style={{ width: '50px' }}>
        {column.value.map((item) => (
          <el-checkbox
            label={item.label}
            v-model={item.checked}
            key={item.label}
            disabled={item.disabled}
            onChange={(e) => checkboxChange(e, item)}
          />
        ))}
      </div>
    )
    // 高级检索
    const searchList = [
      {
        value: 'gelongID',
        label: '鸽笼号'
      },
      {
        value: 'banId',
        label: '板子号'
      },
      {
        value: 'layDays',
        label: '生蛋天数'
      },
      {
        value: 'fuhuaDays',
        label: '孵化天数'
      },
      {
        value: 'remark',
        label: '备注'
      }
    ]
    const searchForm = reactive({})
    const isShowMore = ref(false)
    const renderMore = () => (
      <>
        <el-form label-width="70px" inline>
          {searchList.map((item) => (
            <el-form-item label={item.label}>
              <el-input v-model={searchForm[item.value]} placeholder={'请输入' + item.label} clearable />
            </el-form-item>
          ))}
        </el-form>
      </>
    )
    return () => (
      <>
        {isShowMore.value && renderMore()}
        <el-row justify="space-between" class="row-bottom">
          <el-col span={8} class="col-center">
            <el-cascader v-model={dateType.value} options={dateTypes} placeholder="日期类型" style={{ width: '150px' }} />
            <el-date-picker
              v-model={dateValue.value}
              type="daterange"
              format="YYYY-MM-DD"
              unlink-panels
              range-separator="-"
              start-placeholder="起始时间"
              end-placeholder="结束时间"
              shortcuts={shortcuts}
              style={{ width: '250px' }}
            />
          </el-col>
          <el-col span={2} class="col-center">
            <el-button type="warning" icon={Search} circle onClick={() => (isShowMore.value = !isShowMore.value)} />
            <el-popover width="200" trigger="hover">
              {{
                reference: () => <el-button type="danger" icon={Setting} circle />,
                default: renderColList
              }}
            </el-popover>
          </el-col>
        </el-row>

        <sc-table ref="table" column={column} data={eggsList} pageSize={5} stripe highlightCurrentRow />
      </>
    )
  }
})
</script>
<style scoped>
.row-bottom {
  margin-bottom: 15px;
}
.col-center {
  display: flex;
  align-items: center;
}
</style>
