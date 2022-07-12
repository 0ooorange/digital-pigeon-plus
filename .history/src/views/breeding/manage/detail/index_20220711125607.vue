<script>
import { defineComponent, reactive, ref } from 'vue'
import { Setting, Search } from '@element-plus/icons-vue'
import { getBreedingDetail } from '@api/breeding/manage/detail'
import tool from '@utils/tool'
export default defineComponent({
  name: 'breedingDetail', // 养殖明细
  setup() {
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
      },
      {
        text: '近半年',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 360)
          return [start, end]
        }
      }
    ]
    const query = reactive({
      startTime: '2022-3-05 00:00:00',
      endTime: '2022-4-30 00:10:00',
      // eslint-disable-next-line no-undef
      shedId: '1518124016571797507',
      codes: '',
      fieldTime: '',
      incubationDay: '',
      layEggDay: '',
      pageNum: 1,
      pageSize: 5,
      panelCode: '',
      death_time: ''
      /*
	  	fieldTime：选择哪个字段时间查询
		startTime：开始时间
		endTime：结束时间
		codes：鸽笼编号
		incubationDay：孵化天数
		layEggDay：下蛋天数
		panelCode：鸽板编号
		shedId：鸽棚id
		pageNum：页数
		pageSize：页面大小
	 */
    })
    /* table */
    const eggsList = ref([])
    const column = ref([
      {
        label: '鸽笼编号',
        prop: 'codes',
        width: '104',
        sortable: true,
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '鸽板编号',
        prop: 'panelCode',
        width: '104',
        sortable: true,
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '抽蛋/孵蛋', //=
        prop: 'takeOrHatch',
        width: '90',
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '下蛋时间',
        prop: 'layEggTime',
        width: '150',
        sortable: true,
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '下蛋天数',
        prop: 'layEggDays',
        width: '90',
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '查蛋时间', //
        prop: 'layEggTime',
        width: '180',
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '蛋状态', //=
        prop: 'eggState',
        width: '70',
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '孵化天数',
        prop: 'incubationDays',
        width: '90',
        hide: false,
        checked: true,
        disabled: false
      },
      //   {
      //     label: '查仔时间',
      //     prop: 'cubGmtCreate',
      //     width: '120',
      //     hide: false,
      //     checked: true,
      //     disabled: false
      //   },
      {
        label: '仔状态', //=
        prop: 'cubState',
        width: '70',
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '死仔时间', //
        prop: 'deathTime',
        width: '180',
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '死仔个数',
        prop: 'deathNumber',
        width: '100',
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '回蛋时间',
        prop: 'reLayEggTime',
        width: '180',
        hide: false,
        checked: true,
        disabled: false
      },
      {
        label: '备注',
        prop: 'remarks',
        width: '180',
        hide: false,
        checked: true,
        disabled: false
      }
    ])
    const queryData = () => {
      const queryStringify = tool.http.stringify(query)
      getBreedingDetail(queryStringify).then((res) => {
        eggsList.value = res.data?.data || []
      })
    }
    queryData() // 初始化
    /* 工具栏  下拉框 时间类型选择 */
    const dateType = ref('')
    const dateTypes = [
      {
        label: '下蛋日期',
        value: 'lay_egg_time'
      },
      {
        label: '回蛋日期',
        value: 're_lay_egg_time'
      },
      {
        label: '死仔日期',
        value: 'death_time'
      },
      {
        label: '查蛋日期',
        value: 'check_egg_record.gmt_create'
      },
      {
        label: '查仔日期',
        value: 'check_cub_record.gmt_create'
      }
    ]
    // 时间选择器
    const dateValue = ref([])
    const datePickerChange = (dateValue) => {
      let [startTime = '', endTime = ''] = dateValue || []

      if (!dateValue) {
        let [st, et] = shortcuts[3].value()
        startTime = tool.dateFormat(st)
        endTime = tool.dateFormat(et)
      }
      console.log(startTime, endTime, 'startTime endTime')
      query.startTime = startTime
      query.endTime = endTime
      queryData()
    }
    const dateTypeChange = (dateType) => {
      if (!dateType) {
        query.fieldTime = ''
        queryData()
        return
      }
      console.log(dateType, 'dateTypeChange')
      query.fieldTime = dateType
      queryData()
    }
    /* 选择显示列 */
    const checkboxChange = (value, item) => {
      //   console.log(value, item, 'checkboxChange')
      //   至少选中一个检查
      //   const hasCheckedCount = column.value.reduce((pre, cur) => (pre += cur.checked ? 1 : 0), 0)
      //   console.log(hasCheckedCount, 'hasCheckedCount')
      // 控制列显示隐藏
      item.hide = !value
      item.checked = value
    }
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
    const searchMoreList = {
      input: [
        {
          value: 'codes',
          label: '鸽笼编号'
        },
        {
          value: 'panelCode',
          label: '鸽板编号'
        },
        {
          value: 'layEggDays',
          label: '下蛋天数'
        },
        {
          value: 'incubationDays',
          label: '孵化天数'
        },
        {
          value: 'deathNumber',
          label: '死仔个数'
        },
        {
          value: 'remarks',
          label: '备注'
        }
      ],
      select: [
        // {
        //   //   value: 'takeOrHatch',
        //   label: '抽蛋/孵蛋',
        //   option: [
        //     { label: '抽蛋', value: 0 },
        //     { label: '孵蛋', value: 1 }
        //   ]
        // },
        // {
        //   value: 'eggState',
        //   label: '蛋状态',
        //   option: [
        //     { label: '正常', value: 0 },
        //     { label: '单蛋', value: 1 },
        //     { label: '光蛋1', value: 2 },
        //     { label: '光蛋2', value: 3 },
        //     { label: '踩蛋1', value: 4 },
        //     { label: '踩蛋2', value: 5 }
        //   ]
        // },
        // {
        //   value: 'cubState',
        //   label: '仔状态',
        //   option: [
        //     { label: '正常', value: 0 },
        //     { label: '冷蛋1', value: 1 },
        //     { label: '冷蛋2', value: 2 },
        //     { label: '死精1', value: 3 },
        //     { label: '死精2', value: 4 }
        //   ]
        // }
      ]
    }
    const searchForm = reactive({})
    const isShowMore = ref(false)
    /* const search = () => {
      if (isShowMore.value) {
        queryData()
        return
      }
    } */
    const renderMore = () => (
      <>
        <el-form label-width="70px" inline>
          {searchMoreList.input.map((item) => (
            <el-form-item label={item.label} key={item.value}>
              <el-input v-model={searchForm[item.value]} placeholder={'请输入' + item.label} clearable />
            </el-form-item>
          ))}
          {searchMoreList.select.map((item) => (
            <el-form-item label={item.label} key={item.label}>
              <el-select v-model={searchForm[item.value]} placeholder={'请输入' + item.label} clearable>
                {item.option.map((opt) => (
                  <el-option key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </el-select>
            </el-form-item>
          ))}
          <el-form-item label="死仔时间" key="death_time">
            <el-date-picker
              v-model={query.death_time}
              type="daterange"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD HH:mm:ss"
              unlink-panels
              range-separator="-"
              start-placeholder="起始时间"
              end-placeholder="结束时间"
              shortcuts={shortcuts}
              style={{ width: '250px' }}
              onChange={datePickerChange}
            />
          </el-form-item>
          <el-form-item label="查蛋时间" key="death_time">
            <el-date-picker
              v-model={dateValue.value}
              type="daterange"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD HH:mm:ss"
              unlink-panels
              range-separator="-"
              start-placeholder="起始时间"
              end-placeholder="结束时间"
              shortcuts={shortcuts}
              style={{ width: '250px' }}
              onChange={datePickerChange}
            />
          </el-form-item>
          <el-form-item label="查仔时间" key="death_time">
            <el-date-picker
              v-model={dateValue.value}
              type="daterange"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD HH:mm:ss"
              unlink-panels
              range-separator="-"
              start-placeholder="起始时间"
              end-placeholder="结束时间"
              shortcuts={shortcuts}
              style={{ width: '250px' }}
              onChange={datePickerChange}
            />
          </el-form-item>
        </el-form>
      </>
    )
    return () => (
      <>
        {isShowMore.value && renderMore()}
        <el-row justify="space-between" class="row-bottom">
          <el-col span={8} class="col-center">
            <el-cascader
              v-model={dateType.value}
              options={dateTypes}
              placeholder="日期类型"
              style={{ width: '150px' }}
              onChange={dateTypeChange}
              clearable
            />
            <el-date-picker
              v-model={dateValue.value}
              type="daterange"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD HH:mm:ss"
              unlink-panels
              range-separator="-"
              start-placeholder="起始时间"
              end-placeholder="结束时间"
              shortcuts={shortcuts}
              style={{ width: '250px' }}
              onChange={datePickerChange}
            />
          </el-col>
          <el-col span={isShowMore.value ? 4 : 2} class="col-center">
            {isShowMore.value && <el-button onClick={queryData}>搜索</el-button>}
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
.ml-auto {
  width: 100%;
  margin-left: auto;
}
</style>
