// 鸽棚信息
<template>
  <div class="echarts1Content">
    <div class="e1Content">
      <span class="c1">
        <div>鸽棚名称：</div>
        <div class="t1">{{infos.code}}</div>
      </span>
      <span class="c2">
        <div>养殖员</div>
        <div class="t2">{{infos.name}}</div>
      </span>
    </div>
    <div class="e1Content">
      <span class="c3">
        <div>成鸽数</div>
        <div class="t3">{{infos.adultPigeonNum}}</div>
      </span>
      <span class="c4">
        <div>幼鸽数</div>
        <div class="t4">{{infos.youngPigeonNum}}</div>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import store from '@/store'
import { getPigeonShedInfo } from "@api/dataVisual/shed";

const infos = ref({adultPigeonNum: "", code: "", name: "", youngPigeonNum: ""})
getPigeonShedInfo(store.state.baseInfo.SHED_ID).then(res => {infos.value = res.data.data[0]})
</script>

<style lang="less" scoped>
.echarts1Content {
  width: 90%;
  height: 90%;
  .e1Content {
    height: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: 700;
    .c1 {
      width: 40%;
      padding-left: 15%;
      background: url('../img/shedNums.png') no-repeat;
      background-size: 23%;
      background-position: 5px 0px;
    }
    .c2 {
      width: 40%;
      padding-left: 15%;
      background: url('../img/nonghu.png') no-repeat;
      background-size: 24%;
    background-position: 5px 3px;
    }
    .c3 {
      width: 40%;
      padding-left: 15%;
      background: url('../img/dove1.png') no-repeat;
      background-size: 48%;
      background-position: -13px -20px;
    }
    .c4 {
      width: 40%;
      padding-left: 15%;
      background: url('../img/dove2.png') no-repeat;
      background-size: 25%;
      background-position: 8px 0;
    }
    .t1 {
      color: #ee4000;
      font-size: 18px;
    }
    .t2 {
      color: #ee9a49;
      font-size: 18px;
    }
    .t3 {
      color: #eee685;
      font-size: 18px;
    }
    .t4 {
      color: #43cd80;
      font-size: 18px;
    }
  }
}
</style>