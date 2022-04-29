<template>
  <div class="tableSearch">
    <div class="left">
      <template v-if="isShowBfSearch">
        <el-card class="lessCard" v-for="(item, index) in cardData" :key="index">
          <span class="cardText">{{item.cardText+"："}}</span>
          <span class="cardNumber" :style="{color: colors[index]}">{{item.cardNumber}}</span>
        </el-card>
      </template>
      <slot></slot>
      <span class="searchInputs" :style="isShowBfSearch ? 'margin-bottom: 10px;' : 'margin: 10px 0 10px 10px;'">
        <el-cascader v-model="searchType" :options="searchTypes" placeholder="查询类型" @change="handleChange" />
        <el-input ref="searchInput" v-model="searchInner" placeholder="查询内容" :disabled="isDisabled" />
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
      <el-card class="moreCard" :style="{width: cardWidth}" v-for="(item, index) in cardData" :key="index">
        <span class="cardText">{{item.cardText+"："}}</span>
        <span class="cardNumber" :style="{color: colors[index]}">{{item.cardNumber}}</span>
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
    cardWidth: {
      type: String,
      default: '15%',
    },
  },
  data() {
    return {
      searchInner: '',
      searchType: '',
      colors: ['#EE4000', '#EE9A49', '#EEE685', '#43CD80', '#76EE00', '#6495ED', '#7D26CD'],
      isDisabled: false,
    }
  },
  computed: {
    isShowBfSearch() {
      return this.cardData.length < 3 ? true : false
    },
    isShowAfSearch() {
      return this.cardData.length >= 3 ? true : false
    },
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
    handleChange(e) {
      if (e.length === 1) {
        console.log(this.$refs.searchInput, 111)
        this.isDisabled = false
        return
      }
      this.isDisabled = true
    },
  },
}
</script>

<style lang="less" scoped>
.tableSearch {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  min-width: 950px;
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