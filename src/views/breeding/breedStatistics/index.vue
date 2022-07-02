<template>
	<div class="title">
		<el-date-picker
			v-model="dateVals"
			type="daterange"
			format="YYYY-MM-DD"
			unlink-panels
			range-separator="至"
			start-placeholder="起始时间"
			end-placeholder="结束时间"
			:shortcuts="shortcuts"
		/>
	</div>
	<DovecoteInfo></DovecoteInfo>
	<div class="leftMain">
		<div class="leftMain_middle_leftIn">
			<h3>当日预警信息</h3>
			<TableCustom></TableCustom>
		</div>

		<div class="leftmain-right">
			<h3>加料统计</h3>
			<EchartStatistics></EchartStatistics>
		</div>
	</div>

	<div class="bottomMain">
		<div class="leftMain_middle_rightIn">
			<div class="jiankong">
				<h3>监控视频区</h3>
				<el-select
					style="width:100px"
					v-model="value"
					placeholder="监控1"
					@change="applicantTypes"
				>
					<el-option
						v-for="item in monitor_idlist"
						:key="item.id"
						:label="item.devicename"
						:value="item.id"
					>
					</el-option>
				</el-select>
			</div>
			<div class="biaoge biaoge_bi" style="width: 100%; height: 28vh">
				<div class="contList">
					<div class="boxVideo">
						<video
							class="video-js vjs-big-play-button"
							data-setup="{}"
							controls
							:src="monitor_idlist[0]"
						>
							<!-- <source
								src="http://hls01open.ys7.com/openlive/cf40f99cc9cb4a23bd52e0b2119b534c.m3u8"
								type="application/x-mpegURL"
							/> -->
						</video>
					</div>
				</div>
			</div>
		</div>

		<div class="leftMain_middle_leftIn">
			<h3>环境监测数据展示</h3>
			<EchartsEnvironment></EchartsEnvironment>
		</div>

		<div class="rightMain">
			<div class="rightMain_bottomIn">
				<h3>环境预警信息</h3>
				<div class="biaoge biaoge_list">
					<div class="biaoge_listIn">
						<ul class="ul_title">
							<li style="width: 110px">时间</li>
							<li style="width: 55px">地点</li>
							<li style="width: 125px">预警信息</li>
						</ul>
						<div class="ul_list">
							<div class="ul_listIn">
								<ul class="ul_con">
									<li>2022-4-23</li>
									<li>A3仓</li>
									<li>温度过高</li>
								</ul>
								<ul class="ul_con">
									<li>2022-5-13</li>
									<li>A1仓</li>
									<li>温度过高</li>
								</ul>
								<ul class="ul_con">
									<li>2022-5-13</li>
									<li>A3仓</li>
									<li>温度过高</li>
								</ul>
								<ul class="ul_con">
									<li>2022-2-17</li>
									<li>A1仓</li>
									<li>温度过高</li>
								</ul>
								<ul class="ul_con">
									<li>2022-4-13</li>
									<li>A2仓</li>
									<li>温度过高</li>
								</ul>
								<ul class="ul_con">
									<li>2022-3-3</li>
									<li>A1仓</li>
									<li>温度过高</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import DovecoteInfo from "./components/DovecoteInfo.vue";
import TableCustom from "./components/table-custom.vue";
import EchartStatistics from "./components/echartStatistics.vue";
import EchartsEnvironment from "./components/echartsEnvironment.vue";
export default {
	name: "bsBreedingStatistics",
	components: {
		DovecoteInfo,
		TableCustom,
		EchartStatistics,
		EchartsEnvironment,
	},

	data() {
		return {
			baseid:'',
			monitor_idlist:[],
			currentmonitorid:'',
			monitorcontent:'',
			NumberOfParents:'',
			timeDefaultShow: "",
			dateVals: "",
			shortcuts: [
				{
					text: "近一周",
					value: () => {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
						return [start, end];
					},
				},
				{
					text: "近一个月",
					value: () => {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
						return [start, end];
					},
				},
				{
					text: "近3个月",
					value: () => {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
						return [start, end];
					},
				},
			],
			value2: "",
			//指定图表的配置项和数据
			chartDom: document.getElementById("main"),
			value: "",
		};
	},

	methods: {
		// 获取监控视频id
		 async getMonitorByShedID(){
            const res =await this.$API.breedStatistics.getMonitorByShedID.post('1518124016571797507');
			this.monitor_idlist=res.data.urlList;  
			console.log('监控视频111',this.monitor_idlist)  
        },
		async applicantTypes(value){
			// this.currentmonitorid=value;
			//  console.log("由选择id获取详情视频内容",this.currentmonitorid);
			//   const{data:res}=await this.$API.breedStatistics.getMonitorByID.get(this.currentmonitorid);
			//  console.log("获取数据",res);
			//  this.monitorcontent=res.data 
			//  console.log( console.log("获取详情视频内容",this.monitorcontent));  
            
		},
		getstyles() {
			document.documentElement.style.fontSize =
				(document.documentElement.clientWidth / 768) * 100 + "px";
		},
		//设置默认日期
		defaultDate() {
			//获取新的时间(2019.4.12）
			let date = new Date();
			//获取当前时间的年份转为字符串
			let year = date.getFullYear().toString(); //'2019'
			//获取月份，由于月份从0开始，此处要加1，判断是否小于10，如果是在字符串前面拼接'0'
			let month =
				date.getMonth() + 1 < 10
					? "0" + (date.getMonth() + 1).toString()
					: (date.getMonth() + 1).toString(); //'04'
			//获取天，判断是否小于10，如果是在字符串前面拼接'0'
			let da =
				date.getDate() < 10
					? "0" + date.getDate().toString()
					: date.getDate().toString(); //'12'
			//字符串拼接，开始时间，结束时间
			let end = year + "-" + month + "-" + da; //当天'2019-04-12'
			let beg = year + "-" + month + "-01"; //当月第一天'2019-04-01'
			this.dateVals = [beg, end]; //将值设置给插件绑定的数据
			console.log("获取选择日期区间：",this.dateVals);
		},
		
	},

	mounted() {
		this.baseid=this.$TOOL.data.get('BASE_INFO')
		console.log(this.baseid.shed.id);
		this.getstyles();
		this.defaultDate();
		this.getMonitorByShedID();
	},
};
</script>
<style  scoped>
body,p,div,h1,h2,h3,h4,h5,h6,button,input,ol,li,ul,dl,dt,dd,img,table,tr,td,th,select{
	margin:0;
	padding:0;
    border:0;
    list-style:none;
	box-sizing:border-box;}
a,img,button,input,textarea{-webkit-tap-highlight-color:rgba(255,255,255,0); outline-color:#0081ff; background:none;}
button{
	outline:none;}
input::-webkit-input-placeholder {
    color:#aaa;
	}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
}
input[type="number"]{-moz-appearance:textfield;}
body{
	margin:0 auto;
	font-size:16px;
	color:#121212;
	font-family:"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	position:relative;
	}

/* CSS Document */

.biaoge .contList {
	position: relative;
	width: 100%;
	height: 11vw;
	margin: 1vw auto 0;
  }
  .biaoge  .boxVideo {
	width: 100%;
	height: 100%;
  }
  .biaoge .boxVideo video {
	width: 100%;
	height: 100%;
  }
  /* lafite video样式 */
  .jiankong{
	  display: flex;
	  flex-direction: row;
  }
  .jiankong h3{
	  margin-right: 70px;
  }
.video-js {
  width: 100%;
  height: 100%;
}
.video-js:hover .vjs-big-play-button {
  background: none;
}
.video-js .vjs-big-play-button:hover {
  background: none;
}
.video-js .vjs-big-play-button {
  border: none;
  background: none;
}
.bg{
	margin:0 auto;
    width:99%;
	height: 880px;
    background-color: #FFFFFF;
    background-size: cover;
    margin-top: 10px;
	margin-left: 15px;
	margin-right: 15px;
	position: relative;
	
}
.title{
	width:500px;
	font-size:0.12rem;
	line-height:0.3rem;
	color:rgba(14,253,255,1);
    margin-left: 48px;
	font-weight:bold;
	margin-top: -16px;
	}
.tip{
	/* padding: auto; */
	text-align: center;
	justify-content: center;
	align-items: center;
	height: 10%;
}
.leftMain{
	margin-left: 40px;
	margin-top: 22px;
	display: flex;
	flex-direction: row;
	height: 335px;
	width: 1140px;

	}

.rightMain{
	width:350px;
	height: 100%;
	margin-left:35px;
	
 }
.leftmain-right{
	margin-left: 90px;
	width: 375px;
	height: 323px;
	
	position: relative;
}
.bottomMain{

	height: 310px;
	margin-top: 15px;
	margin-left: 40px;
	display: flex;
	flex-direction: row;
}
.leftMain_top{
	width:100%;
	}
.leftMain_top ul{
	display:flex;
	display: -webkit-flex;
	}
.leftMain_top ul li{
	
	float:left;
	width:14%;
	padding-right:0.1rem;}
.leftMain_top ul li:last-child{
	padding:0;}
.leftMain_top ul li .liIn{
	border:0.008rem solid rgba(0, 8, 8, 0.5);
	width:100%;
	min-height:60px;
	text-align: center;
	}
.leftMain_top ul li .liIn h3{
	font-size:0.08rem;
	
	margin-bottom:0.05rem;
	}

.leftMain_top ul li .liIn .shu{
	font-size:0.12rem;
	color:rgb(2, 2, 2);
	font-family:dig;
	margin-bottom:0.02rem;}
.leftMain_top ul li .liIn .shu i{
	font-size:0.04rem;
	margin-left:0.06rem;
	font-style:normal;}
.leftMain_middle{
	width:100%;
	height: 345px;
	padding-bottom:0.1rem;
	display:flex;
	display: -webkit-flex;}
.bottomMain .leftMain_bottom{
      margin-top: 24px;
	  margin-left: -32px;
}
.bottomMain .leftMain_middle_leftIn{
	width:530px;
	height: 300px;
	min-height:60px;
	position:relative;
	}
	.leftMain_middle_leftIn h3{
	font-size:0.08rem;
	margin-top: -3px;
	margin-bottom:0.05rem;
	}
	.leftmain-right h3{
		font-size:0.08rem;
	margin-top: -3px;
	margin-bottom:0.05rem;
	}
/* .bottomMain .leftMain_middle_leftIn .biaoge{
	min-height:200px;} */

.bottomMain  .leftMain_middle_rightIn{
	margin-top: -2px;
	width:300px;
	height: 260px;
	margin-right: 30px;
	}
.bottomMain .leftMain_middle_rightIn h3{
	font-size:0.08rem;
	
	margin-bottom:0.05rem;
	}
/* .bottomMain  .leftMain_middle_rightIn .biaoge{
	min-height:200px;} */
/*左边中间部分排行榜*/
.bottomMain .leftMain_middle_rightIn  .biaoge_pai{
	width:100%;
	overflow:hidden;
	}
	
/*右边部分*/
  .bingtu{
	  height: 377px;
	  width: 100%;
	  position: relative;
	  right: 3px;
	  top:-35px;
  }

.rightMain .rightMain_bottom{
	width:100%;
	height: 295px;
	margin-top: -7px;
	margin-left: 58px;
	border:0.008rem solid rgba(0, 8, 8, 0.5);
	}
.rightMain .rightMain_bottomIn{
	width:100%;
	height: 100%;
	min-height:90px;
	position:relative;
	margin-top: 3px;
	}
	
.rightMain .rightMain_bottomIn h3{
	font-size:0.08rem;
	margin-bottom:0.05rem;
	}
/*右下角表格*/
.rightMain .rightMain_bottomIn .biaoge{
	min-height:200px;}
.rightMain .rightMain_bottomIn .biaoge_list{
	width:100%;
	 height:250px;
	border: 10px solid rgb(119, 172, 166);
	overflow:hidden;
	position: relative;
}
.rightMain .rightMain_bottomIn .biaoge_list .biaoge_listIn .ul_list{
	overflow:hidden;
	position: relative;
	margin-left: 5px;
}
.rightMain .rightMain_bottomIn .biaoge_list .biaoge_listIn .ul_listIn{
	-webkit-animation: 14s gundong linear infinite normal;
    animation: 14s gundong linear infinite normal;
    position: relative;}
@keyframes gundong {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    100% {
        -webkit-transform: translate3d(0, -30vh, 0);
        transform: translate3d(0, -30vh, 0);
    }
}

.rightMain .rightMain_bottomIn .biaoge_list ul{
	display:flex;
	display: -webkit-flex;
	width:100%;
	}
.rightMain .rightMain_bottomIn .biaoge_list .ul_con{
	border-bottom:0.008rem solid rgba(10, 10, 10, 0.5);}
.rightMain .rightMain_bottomIn .biaoge_list ul li{
	width:90px;
	text-align:center;
	font-size:0.06rem;
	height:0.2rem;
	line-height:0.2rem;}
.rightMain .rightMain_bottomIn .biaoge_list ul li:frist-child{
	text-align:left;}

</style>
