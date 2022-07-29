// 环境参数
<template>
  <div class="echarts2-content">
    <div class="weather">
      <img src="../img/weather/小雨.png" alt="ERROR" height="100%"><span>19℃</span><span>68%</span>
    </div>
    <div class="parameters">
      <div class="echarts2Content">
        <div class="e2Content">
          <span class="c1">
            <div>硫化氢</div>
            <div class="t1">7.57mg/m²</div>
          </span>
          <span class="c2">
            <div>二氧化碳</div>
            <div class="t2">2092.79mg/m²</div>
          </span>
          <span class="c3">
            <div>粉尘</div>
            <div class="t3">10g/m²</div>
          </span>
        </div>
        <div class="e2Content">
          <span class="c4">
            <div>氨气</div>
            <div class="t4">2092.79mg/m²</div>
          </span>
          <span class="c5">
            <div>噪音</div>
            <div class="t5">20dB</div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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