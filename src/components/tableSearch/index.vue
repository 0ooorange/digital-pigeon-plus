<script>
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  props: {
    searchTypes: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    cardData: {
      type: Array,
      default() {
        return []
      },
    },
    showDatePk: {
      type: Boolean,
      default: true,
    },
    datePkDefalt: {
      type: Array,
      default() {
        let end = new Date()
        let start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 178)
        let defaultValue = [start, end]
        return defaultValue
      }
    },
  },
  setup(props, { emit }) {
    // 卡片
    const isShowBfSearch = props.cardData.length < 2 ? ref(true) : ref(false)
    const colors = ['#EE4000', '#EE9A49', '#EEE685', '#43CD80', '#76EE00', '#6495ED', '#7D26CD']
    const cardWidth = 100 / parseInt(props.cardData.length + 1) + '%'
    const renderCards = () => (
      <div class={isShowBfSearch.value ? '' : 'numberCards'}>
        {props.cardData.map((item, index) =>
          props.cardData.length <= 7 ? (
            <>
              <el-card
                class={isShowBfSearch.value ? 'lessCard' : 'moreCard'}
                style={{ width: cardWidth }}
              >
                <span class="cardText">{item.cardText + '：'}</span>
                <span class="cardNumber" style={{ color: colors[index] }}>
                  {item.cardNumber}
                </span>
              </el-card>
            </>
          ) : (
            <>
              <el-card class="mostCard" style={{ width: '17%' }}>
                <span class="cardText">{item.cardText + '：'}</span>
                <span class="cardNumber" style={{ color: colors[index] }}>
                  {item.cardNumber}
                </span>
              </el-card>
            </>
          )
        )}
      </div>
    )

    // 时间选择器
    const dateValue = ref([''])
    dateValue.value = reactive(props.datePkDefalt)
    const shortcuts = [
      {
        text: '近一周',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        },
      },
      {
        text: '近一个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        },
      },
      {
        text: '近3个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        },
      },
    ]
    const datePicker = () => (
      <div class="datePickerCss">
        <el-date-picker
          v-model={dateValue.value}
          default-value={props.defaultValue}
          type="daterange"
          format="YYYY-MM-DD"
          unlink-panels
          range-separator="-"
          start-placeholder="起始时间"
          end-placeholder="结束时间"
          shortcuts={shortcuts}
          style={{ width: '250px' }}
        />
      </div>
    )

    const selectType = ref([''])
    const searchClick = () => { emit('searchClick') } // 搜索
    const reset = () => { emit('reset') } // 重置
    const outTable = () => { emit('outTable') } // 导出
    return () => (
      <div>
        <div class="tableSearch">
          {isShowBfSearch.value && renderCards()}
          {props.showDatePk && datePicker()}
          <div class="left">
            <span>
              <el-cascader
                v-model={selectType}
                options={props.searchTypes}
                placeholder="查询类型"
                style={{width: '150px'}}
              />
              <el-input ref="searchInput" placeholder="查询内容" style={{width: '150px'}} />
              <el-button type="success" class="searchBtn" onClick={searchClick}>
                查询
              </el-button>
            </span>
          </div>
          <div class="right">
            <el-button type="danger" class="reflashSearch" onClick={reset}>
              重置
            </el-button>
            <el-button type="warning" class="outTable" onClick={outTable}>
              导出
            </el-button>
          </div>
        </div>
        {!isShowBfSearch.value && renderCards()}
      </div>
    )
  },
})
</script>

<style lang="less" scoped>
.tableSearch {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  min-width: 950px;
  margin: 0 0 10px 12px;
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
.datePickerCss {
  display: flex;
  align-items: center;
}
.numberCards {
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  min-width: 1030px;
  flex-wrap: wrap;
}
.lessCard,
.moreCard,
.mostCard {
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
  margin: 0px 10px 0 0;
  min-width: 200px;
}
.mostCard {
  margin-top: 10px;
}
</style>
