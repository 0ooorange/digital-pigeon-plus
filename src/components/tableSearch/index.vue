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
  },
  setup(props, { emit }) {
    const dateValue = ref('')
    const selectType = ref([''])
    const isShowMore = ref(false)
    const isShowBfSearch = props.cardData.length < 2 ? ref(true) : ref(false)
    const colors = ['#EE4000', '#EE9A49', '#EEE685', '#43CD80', '#76EE00', '#6495ED', '#7D26CD']
    const cardWidth = 100 / parseInt(props.cardData.length + 1) + '%'
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

    const searchForm = reactive({})

    const handleChange = (val) => {
      if (val == '高级检索') {
        return (isShowMore.value = true)
      }
      isShowMore.value = false
    }

    // 搜索
    const searchClick = () => {
      emit('searchClick')
    }

    // 重置
    const reset = () => {
      emit('reset')
    }

    // 导出
    const outTable = () => {
      emit('outTable')
    }

    // 高级检索模块
    const renderMore = () => (
      <>
        <el-form label-width="70px" inline>
          {props.searchTypes.map((item) =>
            item.label !== '高级检索' ? (
              <el-form-item label={item.label} key={item.label}>
                <el-input
                  v-model={searchForm[item.value]}
                  placeholder={'请输入' + item.label}
                  clearable
                />
              </el-form-item>
            ) : null
          )}
        </el-form>
      </>
    )

    // 卡片
    const renderCards = () => (
      <div class={isShowBfSearch.value ? '' : 'numberCards'}>
        {props.cardData.map((item, index) => {
          return (
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
          )
        })}
      </div>
    )

    return () => (
      <div>
        {isShowMore.value && renderMore()}
        <div class="tableSearch">
          {isShowBfSearch.value && renderCards()}
          <div class="datePickerCss">
            <el-date-picker
              v-model={dateValue.value}
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
              <el-cascader
                v-model={selectType}
                options={props.searchTypes}
                onChange={handleChange}
                placeholder="查询类型"
              />
              <el-input ref="searchInput" placeholder="查询内容" disabled={isShowMore.value} />
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
  margin-right: '10px';
  display: flex;
  align-items: center;
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
  margin: 0px 10px 0 0;
  min-width: 200px;
}
.el-cascader {
  width: 150px;
}
.el-input {
  width: 150px;
}
</style>
