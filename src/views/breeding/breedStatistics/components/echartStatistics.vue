<template>
    <div class="biaoge" style="width:380px; height:320px" id="chartmain_bing"></div>
</template>
<script>
import * as echarts from 'echarts';

export default {
      data(){
          return {
             feedShedlist:[]
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
          },
          async  getFeedShedByIDTime(){
            const{data:res}=await this.$API.breedStatistics.getFeedShedByIDTime.get('1518124016571797507','2022-05-22 00:00:00','2022-05-30 23:59:59');
            this.feedShedlist=res.data;
            console.log("获取养殖饲料：",this.feedShedlist);
        }
      },
      mounted() {
        this.initEcharts();
        this.getFeedShedByIDTime()
    },
}
</script>
<style scoped>
.biaoge{
	position:absolute;
  top:-10px;
  left: 2px;
    }
</style>