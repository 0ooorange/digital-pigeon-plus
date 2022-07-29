// 产蛋统计
<template>
  <ScEcharts :option="productEggOption" height="100%" width="100%"></ScEcharts>
</template>

<script setup>
import ScEcharts from '@/components/scEcharts'
const productEggOption = {
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    boundaryGap: false,
    type: 'category',
    data: (function () {
      // var now = new Date()
      var nowres = 30
      var res = []
      res.unshift(nowres)
      // var len = 30
      while (nowres >= 0) {
        // res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
        nowres -= 5
        if (nowres <= 0) break
        res.unshift(nowres)
      }
      res.unshift(1)
      return res
    })(),
  },
  yAxis: [
    {
      type: 'value',
      name: '产蛋数',
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '产蛋数',
      type: 'line',
      symbol: 'none',
      lineStyle: {
        width: 1,
        color: '#409EFF',
      },
      areaStyle: {
        opacity: 0.1,
        color: '#79bbff',
      },
      data: (function () {
        var res = []
        var len = 30
        while (len--) {
          res.push(Math.round(Math.random() * 250))
        }
        return res
      })(),
    },
  ],
}
</script>

<style lang="less" scoped>
</style>