<template>
    <div class="biaoge" style="width:400px; height:340px" id="chartmain_bing"></div>
</template>
<script>
import * as echarts from 'echarts';

export default {
      data(){
          return {

          }
      },
      methods: {
          initEcharts(){
                     const option={
               tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
               legend: {
                    bottom: 10,
                    left: 'center',
                    data: ['A牌饲料', 'B牌饲料', 'D牌饲料', 'C牌饲料']
                },
                series: [
                    {
                        name: '单位：kg',
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: [
                       
        { value: 735, name: 'C牌饲料' },
        { value: 510, name: 'D牌饲料' },
        { value: 434, name: 'B牌饲料' },
        { value: 235, name: 'A牌饲料' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
              const myChart = echarts.init(document.getElementById("chartmain_bing"));
               myChart.setOption(option);
          }
      },
      mounted() {
        this.initEcharts();
    },
}
</script>
<style scoped>
.biaoge{
	position: relative;
  top:1px;
  left: 2px;
    }
</style>