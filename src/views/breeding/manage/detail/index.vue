<script>
import { defineComponent } from 'vue'
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
        remark: '无',
      },
      {
        pigeonnumber: 'A8',
        boardnumber: '2',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '孵化',
        remark: '无',
      },
      {
        pigeonnumber: 'B10',
        boardnumber: '3',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '抽蛋',
        remark: '无',
      },
      {
        pigeonnumber: 'A15',
        boardnumber: '4',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '孵化',
        remark: '无',
      },
      {
        pigeonnumber: 'B1',
        boardnumber: '5',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '孵化',
        remark: '无',
      },
      {
        pigeonnumber: 'B10',
        boardnumber: '6',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '抽蛋',
        remark: '无',
      },
      {
        pigeonnumber: 'C4',
        boardnumber: '7',
        layEggDate: '2022年4月14日 12:30:19',
        layEggdays: '10天',
        hatchEggdays: '19天',
        actionType: '抽蛋',
        remark: '无',
      },
    ]
    // 查询类型下拉框列表的数据，value和label为必传，其他需求可自行添加
    const searchTypes = [
      {
        value: '鸽笼号',
        label: '鸽笼号',
      },
      {
        value: '板子号',
        label: '板子号',
      },
      {
        value: '生蛋天数',
        label: '生蛋天数',
      },
      {
        value: '孵化天数',
        label: '孵化天数',
      },
    ]
    const column = [
      {
        label: '鸽笼号',
        prop: 'pigeonnumber',
        width: '180',
        sortable: true
      },
      {
        label: '板子号',
        prop: 'boardnumber',
        width: '180',
        sortable: true
      },
      {
        label: '生蛋时间',
        prop: 'layEggDate',
        width: '200',
        sortable: true
      },
      {
        label: '生蛋天数',
        prop: 'layEggdays',
        width: '180'
      },
      {
        label: '孵化天数',
        prop: 'hatchEggdays',
        width: '180'
      },
      {
        label: '备注',
        prop: 'remark'
      },
    ]

    const searchClick = () => {
      console.log('点击查询')
    }

    const reset = () => {
      console.log('点击重置')
    }

    const outTable = () => {
      console.log('点击导出')
    }

    return () => (
      <div>
        <table-search searchTypes={searchTypes} onSearchClick={searchClick} onReset={reset} onOutTable={outTable} />
        <sc-table ref="table" column={column} data={eggsList} pageSize={5} stripe highlightCurrentRow />
      </div>
    )
  },
})
</script>