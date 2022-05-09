<template>
	<div class="title">
		<el-date-picker
			v-model="value2"
			type="daterange"
			align="right"
			unlink-panels
			range-separator="至"
			start-placeholder="开始日期"
			end-placeholder="结束日期"
			:shortcuts="shortcuts"
		>
		</el-date-picker>
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
					style="width: 100px"
					v-model="value"
					placeholder="监控1"
				>
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
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
						>
							<source
								src="http://hls01open.ys7.com/openlive/cf40f99cc9cb4a23bd52e0b2119b534c.m3u8"
								type="application/x-mpegURL"
							/>
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
									<li>2022-4-13</li>
									<li>A1仓</li>
									<li>温度过高</li>
								</ul>
								<ul class="ul_con">
									<li>2022-4-13</li>
									<li>A1仓</li>
									<li>温度过高</li>
								</ul>
								<ul class="ul_con">
									<li>2022-4-13</li>
									<li>A1仓</li>
									<li>温度过高</li>
								</ul>
								<ul class="ul_con">
									<li>2022-4-13</li>
									<li>A1仓</li>
									<li>温度过高</li>
								</ul>
								<ul class="ul_con">
									<li>2022-4-13</li>
									<li>A1仓</li>
									<li>温度过高</li>
								</ul>
								<ul class="ul_con">
									<li>2022-4-13</li>
									<li>A1仓</li>
									<li>温度过高</li>
								</ul>
								<ul class="ul_con">
									<li>2022-4-13</li>
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
      timeDefaultShow:'',
			shortcuts: [
				{
					text: "近三天",
					value: () => {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
						return [start, end];
					},
				},
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
			],
			value2: "",
			//指定图表的配置项和数据
			chartDom: document.getElementById("main"),
			options: [
				{
					value: "选项1",
					label: "监控1",
				},
				{
					value: "选项2",
					label: "监控2",
				},
				{
					value: "选项3",
					label: "监控3",
				},
				{
					value: "选项4",
					label: "监控4",
				},
				{
					value: "选项5",
					label: "监控5",
				},
			],
			value: "",
		};
	},
 
	methods: {
		getstyles() {
			document.documentElement.style.fontSize =
				(document.documentElement.clientWidth / 768) * 100 + "px";
		},
	},
	mounted() {
		this.getstyles();
	},
};
</script>
<style src="./index.css" scoped></style>
