<template>

  <div class="bg">
     <div class=" title">
      <el-date-picker v-model="value1" type="date" placeholder="选择日期"> </el-date-picker>
     </div>
     <div class="tip">
      	<DovecoteInfo></DovecoteInfo>
     </div>
    <div class="leftMain">
        <div class="leftMain_middle">
              <div class="leftMain_middle_leftIn">
                	<h3>当日预警信息</h3>
                  <TableCustom></TableCustom>      
             </div>
        </div>
        <div class="leftMain_middle leftMain_bottom">
        	<div class="leftMain_middle_right" style="margin-right:25px">
            	<div class="leftMain_middle_rightIn">
                	<h3>监控视频区</h3>
                    <div class="biaoge biaoge_bi" style="width:100%; height:28vh">
                    	<div class="contList">
                   <div class="boxVideo">
                  <video class="video-js vjs-big-play-button" data-setup='{}' controls>
                  <source src="http://hls01open.ys7.com/openlive/cf40f99cc9cb4a23bd52e0b2119b534c.m3u8" type="application/x-mpegURL">
                </video>
                </div>
           </div>

                    </div>
                </div>
            </div>
            <div class="leftMain_bottom_right">
            	<div class="leftMain_middle_leftIn">
                	<h3>环境监测数据可视化</h3>
                    <div class="biaoge" style="width:98%; height:32vh" id="main"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="rightMain">
        <div class="rightMain_topIn">
              <h3>加料统计</h3>
              <div class="bingtu">
                  <EchartStatistics></EchartStatistics>
              </div>
                
            </div>
  
        <div class="rightMain_bottom">
            <div class="rightMain_bottomIn">
                <h3>鸽子仓的预警信息</h3>
                <div class="biaoge biaoge_list" style="width:100%; height:250px">
                	<div class="biaoge_listIn">
                    	<ul class="ul_title">
                        	<li style="width:110px">时间</li>
                            <li style="width:55px">地点</li>
                            <li style="width:125px">预警信息</li>
                        </ul>
                        <div class="ul_list">
                        	<div class="ul_listIn">
                                <ul class="ul_con">
                                    <li>2022-4-13</li>
                                    <li>A1仓</li>
                                    <li >温度过高</li>    
                                </ul>
                                 <ul class="ul_con">
                                    <li>2022-4-13</li>
                                    <li>A1仓</li>
                                    <li >温度过高</li>    
                                </ul>
                                 <ul class="ul_con">
                                    <li>2022-4-13</li>
                                    <li>A1仓</li>
                                    <li >温度过高</li>    
                                </ul>
                                 <ul class="ul_con">
                                    <li>2022-4-13</li>
                                    <li>A1仓</li>
                                    <li >温度过高</li>    
                                </ul>
                                 <ul class="ul_con">
                                    <li>2022-4-13</li>
                                    <li>A1仓</li>
                                    <li >温度过高</li>    
                                </ul>
                                 <ul class="ul_con">
                                    <li>2022-4-13</li>
                                    <li>A1仓</li>
                                    <li >温度过高</li>    
                                </ul>
                                 <ul class="ul_con">
                                    <li>2022-4-13</li>
                                    <li>A1仓</li>
                                    <li >温度过高</li>    
                                </ul>
                                 <ul class="ul_con">
                                    <li>2022-4-13</li>
                                    <li>A1仓</li>
                                    <li >温度过高</li>    
                                </ul>
                                 <ul class="ul_con">
                                    <li>2022-4-13</li>
                                    <li>A1仓</li>
                                    <li >温度过高</li>    
                                </ul>

                               
                               
                            </div>
                       </div>
                   </div>

                </div>
            </div>
         </div>
    </div>
    <div style="clear:both;"></div>
</div>

</template>

<script >
import * as echarts from 'echarts';
import DovecoteInfo from "../../components/breedingStatistics/DovecoteInfo.vue";
import TableCustom from "../../components/breedingStatistics/table-custom.vue";
import EchartStatistics from "../../components/breedingStatistics/echartStatistics.vue";


export default {
   name: "BreedingStatistics",
   components: {
       DovecoteInfo,
       TableCustom,
       EchartStatistics
    },
    
    data(){
      return{
        value1: '',
      	//指定图表的配置项和数据
         chartDom:document.getElementById('main'),
         
      }
    },
    methods:{
       getstyles(){
            document.documentElement.style.fontSize = document.documentElement.clientWidth /768*100 + 'px';
        },
        initEcharts() {
           const option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {

    data: ['温度', '湿度', '二氧化碳', '光照强度', 'PM2.5','氮气']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['00:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'],
  },
  yAxis: {
    type: 'value',
     data: ['0', '300', '600', '900', '1200', '1500'],
   
  },
  series: [
    {
      name: '温度',
      type: 'line',
      stack: 'Total',
      data: [10, 20, 40, 60, 10, 90, 50]
    },
    {
      name: '湿度',
      type: 'line',
      stack: 'Total',
      data: [20, 12, 11, 64, 90, 53, 100]
    },
    {
      name: '二氧化碳',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '光照强度',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'PM2.5',
      type: 'line',
      stack: 'Total',
      data: [100, 93, 351, 74, 160, 300, 400]
    },
     {
      name: '氮气',
      type: 'line',
      stack: 'Total',
      data: [120, 250, 100, 98,500, 420, 200]
    }
  ]
};
    const myChart = echarts.init(document.getElementById("main"));// 图标初始化
      myChart.setOption(option);// 渲染页面
        }
    },
     mounted() {
        this.getstyles();
        this.initEcharts();
    },
}
</script>
<style src="@/style/breedingStatistics/index.css" scoped>
</style>