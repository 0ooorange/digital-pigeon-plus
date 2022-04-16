<template>
  <div class="bg">
	<div class="title">智慧数字鸽业</div>
    <div class="leftMain">
    	<div class="leftMain_top">
        	<div class="leftMain_topIn">
            	<ul>
                	<li>
                        <div class="liIn">
                            <h3>成鸽数</h3>
                             <p class="shu"><span class="shu1">2000对</span></p>
                            <span class="border_bg_leftTop"></span>
                            <span class="border_bg_rightTop"></span>
                            <span class="border_bg_leftBottom"></span>
                            <span class="border_bg_rightBottom"></span>
                        </div>
                    </li>
                	<li>
                        <div class="liIn">
                             <h3>幼鸽数</h3>
                             <p class="shu"><span class="shu1">1000只</span></p>
                            <span class="border_bg_leftTop"></span>
                            <span class="border_bg_rightTop"></span>
                            <span class="border_bg_leftBottom"></span>
                            <span class="border_bg_rightBottom"></span>
                        </div>
                    </li>
                	<li>
                        <div class="liIn" >
                             <h3>抽蛋数</h3>
                             <p class="shu"><span class="shu1">800枚</span></p>
                            <span class="border_bg_leftTop"></span>
                            <span class="border_bg_rightTop"></span>
                            <span class="border_bg_leftBottom"></span>
                            <span class="border_bg_rightBottom"></span>
                        </div>
                    </li>
                	<li>
                        <div class="liIn">
                             <h3>产蛋数</h3>
                             <p class="shu"><span class="shu1">600枚</span></p>
                            <span class="border_bg_leftTop"></span>
                            <span class="border_bg_rightTop"></span>
                            <span class="border_bg_leftBottom"></span>
                            <span class="border_bg_rightBottom"></span>
                        </div>
                    </li>
                    <li>
                        <div class="liIn">
                             <h3>出仔数</h3>
                             <p class="shu"><span class="shu1">400只</span></p> 
                            <span class="border_bg_leftTop"></span>
                            <span class="border_bg_rightTop"></span>
                            <span class="border_bg_leftBottom"></span>
                            <span class="border_bg_rightBottom"></span>
                        </div>
                    </li>
                    <li>
                        <div class="liIn">
                             <h3>出栏数</h3>
                             <p class="shu"><span class="shu1">800只</span></p>
                            <span class="border_bg_leftTop"></span>
                            <span class="border_bg_rightTop"></span>
                            <span class="border_bg_leftBottom"></span>
                            <span class="border_bg_rightBottom"></span>
                        </div>
                    </li>
                    <li>
                        <div class="liIn">
                             <h3>死仔数</h3>
                             <p class="shu"><span class="shu1">100只</span></p> 
                            <span class="border_bg_leftTop"></span>
                            <span class="border_bg_rightTop"></span>
                            <span class="border_bg_leftBottom"></span>
                            <span class="border_bg_rightBottom"></span>
                        </div>
                    </li>

                </ul>
            </div>
        </div>

        <div class="leftMain_middle">
        	<div class="leftMain_middle_left">
                <div class="leftMain_middle_leftIn">
                	<h3>当日工作预警表格</h3>
                    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
                    <div class="biaoge" style="width:100%; height:25vh" id="chartmain"></div>
                   
                    <span class="border_bg_leftTop"></span>
                    <span class="border_bg_rightTop"></span>
                    <span class="border_bg_leftBottom"></span>
                    <span class="border_bg_rightBottom"></span>
                </div>
            </div>
        </div>
        <div class="leftMain_middle">
        	
        	<div class="leftMain_middle_right" style="margin-right:25px">
            	<div class="leftMain_middle_rightIn">
                	<h3>监控视频区</h3>
                    <div class="biaoge biaoge_bi" style="width:100%; height:25vh">
                    	<div class="contList">
                   <div class="boxVideo">
                  <video class="video-js vjs-big-play-button" data-setup='{}' controls>
                  <source src="http://hls01open.ys7.com/openlive/cf40f99cc9cb4a23bd52e0b2119b534c.m3u8" type="application/x-mpegURL">
                </video>
                </div>
           </div>

                    </div>
                    <span class="border_bg_leftTop"></span>
                    <span class="border_bg_rightTop"></span>
                    <span class="border_bg_leftBottom"></span>
                    <span class="border_bg_rightBottom"></span>
                </div>
            </div>
            <div class="leftMain_middle_left">
            	<div class="leftMain_middle_leftIn">
                	<h3>环境监测数据可视化</h3>
                    <div class="biaoge" style="width:100%; height:25vh" id="main"></div>
                    <span class="border_bg_leftTop"></span>
                    <span class="border_bg_rightTop"></span>
                    <span class="border_bg_leftBottom"></span>
                    <span class="border_bg_rightBottom"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="rightMain">
         <div class="rightMain_top">
            <div class="rightMain_topIn">
                <h3>加料统计</h3>
                <div class="biaoge" style="width:100%; height:30vh" id="chartmain_bing"></div>
               
                <span class="border_bg_leftTop"></span>
                <span class="border_bg_rightTop"></span>
                <span class="border_bg_leftBottom"></span>
                <span class="border_bg_rightBottom"></span>
            </div>
         </div>
        <div class="rightMain_bottom">
            <div class="rightMain_bottomIn">
                <h3>鸽子仓的预警信息</h3>
                <div class="biaoge biaoge_list" style="width:100%; height:200px">
                	<div class="biaoge_listIn">
                    	<ul class="ul_title">
                        	<li style="width:70px">时间</li>
                            <li style="width:64px">地点</li>
                            <li style="width:80px">预警信息</li>
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
                <span class="border_bg_leftTop"></span>
                <span class="border_bg_rightTop"></span>
                <span class="border_bg_leftBottom"></span>
                <span class="border_bg_rightBottom"></span>
            </div>
         </div>
    </div>
    <div style="clear:both;"></div>
</div>
</template>

<script >
import * as echarts from 'echarts';

export default {
    
    data(){
      return{
      	//指定图表的配置项和数据
         chartDom:document.getElementById('main'),
         
      }
    },
    mounted() {
        this.getstyles();
        this.initEcharts();
    },
    methods:{
       getstyles(){
            document.documentElement.style.fontSize = document.documentElement.clientWidth /768*100 + 'px';
        },
        initEcharts() {
           const option = {
//   title: {
//     text: 'Stacked Line'
//   },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
       textStyle:{
                            fontSize: 18,//字体大小
                            color: '#ffffff'//字体颜色
                        },

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
     axisLine: {
            lineStyle:{
                color:'#fff',//x轴的颜色
                width:2,//轴线的宽度
            }
    }
  },
  yAxis: {
    type: 'value',
     data: ['0', '300', '600', '900', '1200', '1500'],
      axisLine: {
            lineStyle:{
                color:'#fff',//x轴的颜色
                width:2,//轴线的宽度
            }
    }
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
    }
}
</script>
<style src="@/style/breedingStatistics/index.css" scoped>
</style>