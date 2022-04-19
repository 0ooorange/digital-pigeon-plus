<template>
  <div class="tableSearch">
    <div class="left">
      <slot class="slotCss"></slot>
      <template v-if="isShowBfSearch">
        <el-card v-for="(item, index) in cardData" :key="index">
        <span class="cardText">{{item.cardText+"："}}</span>
        <span class="cardNumber">{{item.cardNumber}}</span>
      </el-card>
      </template>
      <span class="searchInputs" >
        <el-select style="width: 100px" v-model="searchType" class="m-2" placeholder="查询类型">
          <el-option v-for="item in searchTypes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="searchInner" placeholder="查询内容" class="searchInner" :input-style="inputStyle" />
        <el-button type="success" class="searchBtn" @click="searchClick">查询</el-button>
      </span>
    </div>
    <div class="right">
      <el-button type="danger" class="reflashSearch" @click="reflashSearch">重置</el-button>
      <el-button type="warning" class="outTable" @click="outTable">导出</el-button>
    </div>
  </div>
  <template v-if="isShowAfSearch">
    <div class="numberCards">
      <el-card v-for="(item, index) in cardData" :key="index">
        <span class="cardText">{{item.cardText+"："}}</span>
        <span class="cardNumber">{{item.cardNumber}}</span>
      </el-card>
    </div>
  </template>
</template>

<script>
export default {
  emits: ['searchClick', 'outTable'],
  props: {
    searchTypes: {
      type: Array,
      require: true,
    },
    cardData: {
      type: Array,
    },
  },
  data() {
    return {
      searchInner: '',
      searchType: '',
      inputStyle: {
        width: '150px',
      }
    }
  },
  computed: {
    isShowBfSearch() {
      return this.cardData.length < 3 ? true : false
    },
    isShowAfSearch() {
      return this.cardData.length >= 3 ? true : false
    }
  },
  methods: {
    searchClick() {
      this.$emit('searchClick')
    },
    reflashSearch() {
      this.input = ''
      this.searchType = ''
    },
    outTable() {
      this.$emit('outTable')
    },
  },
}
</script>

<style lang="less" scoped>
@import '@/style/compStyle/tableSlot.less';
.tableSearch {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 70px;
  min-width: 860px;
}
.left {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70px;
}
.right {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70px;
  margin-right: 10px;
}
.searchInner {
  width: 100px;
}
.searchBtn {
  height: 27px;
  margin-left: 2px;
}
.reflashSearch,
.outTable {
  height: 27px;
}
.searchInputs {
  margin-left: 15px
}
.numberCards {
  margin-bottom: 10px; 
  display: flex;
  flex-direction: row;
}
</style>