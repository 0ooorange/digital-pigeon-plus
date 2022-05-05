<script>
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  name: 'breedingDetail', // 养殖明细
  setup() {
    const eggsList = [
      {
        pigeonnumber: 'A1',
        boardnumber: '1',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '抽蛋',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'A8',
        boardnumber: '2',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '孵化',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'B10',
        boardnumber: '3',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '抽蛋',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'A15',
        boardnumber: '4',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '孵化',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'B1',
        boardnumber: '5',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '孵化',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'B10',
        boardnumber: '6',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '抽蛋',
        principal: '益达',
        remark: '无'
      },
      {
        pigeonnumber: 'C4',
        boardnumber: '7',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '抽蛋',
        principal: '益达',
        remark: '无'
      }
    ]
    // 查询类型下拉框列表的数据，格式固定
    const searchTypes = [
      {
        value: '鸽笼号',
        label: '鸽笼号'
      },
      {
        value: '板子号',
        label: '板子号',
        type: ''
      },
      {
        value: '操作时间',
        label: '操作时间'
      },
      {
        value: '生蛋时间',
        label: '生蛋时间'
      },
      {
        value: '生蛋天数',
        label: '生蛋天数'
      },
      {
        value: '孵化天数',
        label: '孵化天数'
      },
      {
        value: '操作员',
        label: '操作员'
      },
      {
        value: '备注',
        label: '备注'
      },
      {
        value: '高级检索',
        label: '高级检索'
      }
    ]
    const dateVuale = ref(['', ''])
    const selectType = ref('')
    const isShowMore = ref(false)
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

    const searchForm = reactive({})

    const handleChange = (val) => {
      if (val == '高级检索') {
        return (isShowMore.value = true)
      }
      isShowMore.value = false
    }

    const renderMore = () => (
      <>
        <el-form label-width="70px" inline>
          {searchTypes.map((item) =>
            item.label !== '高级检索' ? (
              <el-form-item label={item.label}>
                <el-input v-model={searchForm[item.value]} placeholder={'请输入' + item.label} clearable />
              </el-form-item>
            ) : null
          )}
        </el-form>
      </>
    )

    return () => (
      <div>
        {isShowMore.value && renderMore()}
        <div class="tableSearch">
          <div style={{ marginRight: '10px' }}>
            <el-date-picker
              v-model={dateVuale}
              type="daterange"
              format="YYYY-MM-DD"
              unlink-panels
              range-separator="-"
              start-placeholder="起始时间"
              end-placeholder="结束时间"
              shortcuts={shortcuts}
              style={{ width: '200px' }}
            />
          </div>
          <div class="left">
            <span>
              <el-cascader v-model={selectType} options={searchTypes} onChange={handleChange} placeholder="查询类型" />
              <el-input ref="searchInput" placeholder="查询内容" disabled={isShowMore.value} />
              <el-button type="success" class="searchBtn">
                查询
              </el-button>
            </span>
          </div>
          <div class="right">
            <el-button type="danger" class="reflashSearch">
              重置
            </el-button>
            <el-button type="warning" class="outTable">
              导出
            </el-button>
          </div>
        </div>
        <sc-table ref="table" data={eggsList} pageSize={5} stripe highlightCurrentRow>
          <el-table-column align="center" label="鸽笼号" prop="pigeonnumber" width="130" />
          <el-table-column align="center" label="板子号" prop="boardnumber" width="130" />
          <el-table-column align="center" label="生蛋时间" prop="layEggDate" width="180" />
          <el-table-column align="center" label="生蛋天数" prop="layEggdays" width="150" />
          <el-table-column align="center" label="孵化天数" prop="hatchEggdays" width="150" />
          <el-table-column align="center" label="操作员" prop="principal" width="150" />
          <el-table-column align="center" label="备注" prop="remark" />
        </sc-table>
      </div>
    )
  }
})
</script>
<style lang="less" scoped>
.tableSearch {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  min-width: 950px;
  margin-bottom: 10px;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%;
    .searchBtn {
      height: 27px;
      margin-left: 2px;
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
    .reflashSearch,
    .outTable {
      height: 27px;
    }
  }
}
.numberCards {
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  min-width: 1030px;
}
.lessCard,
.moreCard {
  align-items: center;
  text-align: center;
  .cardText {
    font-weight: 400;
    font-size: 14px;
  }
  .cardNumber {
    font-weight: 700;
    font-size: 16px;
  }
}
.lessCard {
  margin: 0px 10px 10px 0;
  width: 180px;
  max-width: 200px;
}
/deep/ .el-cascader {
  width: 150px;
}
.el-input {
  width: 150px;
}
</style>
