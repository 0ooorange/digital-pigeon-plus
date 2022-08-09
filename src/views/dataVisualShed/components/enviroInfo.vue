// 环境参数
<template>
  <div class="echarts2-content">
    <div class="weather">
      <img src="../img/weather/小雨.png" alt="ERROR" height="100%"><span>{{wen}}</span><span>空气湿度：{{shi}}</span>
    </div>
    <div class="parameters">
      <div class="echarts2Content">
        <div class="e2Content">
          <span class="c1">
            <div>硫化氢</div>
            <div class="t1">{{H2S}}</div>
          </span>
          <span class="c2">
            <div>二氧化碳</div>
            <div class="t2">{{CO2}}</div>
          </span>
          <span class="c3">
            <div>粉尘</div>
            <div class="t3">{{fen}}</div>
          </span>
        </div>
        <div class="e2Content">
          <span class="c4">
            <div>氨气</div>
            <div class="t4">{{NH4}}</div>
          </span>
          <span class="c5">
            <div>噪音</div>
            <div class="t5">{{yin}}</div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import store from '@/store'
import { getSensor } from '@api/dataVisual/shed'
const wen = ref()
const shi = ref()
const H2S = ref()
const CO2 = ref()
const fen = ref()
const NH4 = ref()
const yin = ref()
getSensor(store.state.baseInfo.SHED_ID, '空气温度').then(res => {wen.value = res.data.data.datavalue + res.data.data.dataunit})
getSensor(store.state.baseInfo.SHED_ID, '空气湿度').then(res => {shi.value = res.data.data.datavalue + res.data.data.dataunit})
getSensor(store.state.baseInfo.SHED_ID, '硫化氢').then(res => {H2S.value = res.data.data.datavalue + res.data.data.dataunit})
getSensor(store.state.baseInfo.SHED_ID, '二氧化碳').then(res => {CO2.value = res.data.data.datavalue + res.data.data.dataunit})
getSensor(store.state.baseInfo.SHED_ID, 'PM2.5').then(res => {fen.value = res.data.data.datavalue + res.data.data.dataunit})
getSensor(store.state.baseInfo.SHED_ID, '氨气浓度').then(res => {NH4.value = res.data.data.datavalue + res.data.data.dataunit})
getSensor(store.state.baseInfo.SHED_ID, '噪音').then(res => {yin.value = res.data.data.datavalue + res.data.data.dataunit})
</script>

<style lang="less" scoped>
.echarts2-content {
  height: 85%;
  width: 100%;
  .weather {
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 16px;
      margin-right: 10px;
    }
  }
  .parameters {
    height: 70%;
    .echarts2Content {
      height: 95%;
      .e2Content {
        height: 50%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        .c1 {
          width: 33%;
          padding-left: 15%;
          background: url('../img/硫化氢.png') no-repeat;
          background-size: 20%;
          background-position: 25px 6px;
        }
        .c2 {
          width: 33%;
          padding-left: 15%;
          background: url('../img/二氧化碳.png') no-repeat;
          background-size: 25%;
          background-position: 22px 0px;
        }
        .c3 {
          width: 33%;
          padding-left: 15%;
          background: url('../img/粉尘.png') no-repeat;
          background-size: 30%;
          background-position: 20px -3px;
        }
        .c4 {
          width: 33%;
          padding-left: 15%;
          background: url('../img/氨气.png') no-repeat;
          background-size: 20%;
          background-position: 23px 5px;
        }
        .c5 {
          width: 33%;
          padding-left: 15%;
          background: url('../img/噪音.png') no-repeat;
          background-size: 20%;
          background-position: 25px 6px;
        }
        .t1,
        .t2,
        .t3,
        .t4,
        .t5 {
          font-size: 12px;
        }
      }
    }
  }
}
</style>