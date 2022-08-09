import { ref, reactive, getCurrentInstance, computed } from "vue";
export default {
	setup() {
		const { proxy } = getCurrentInstance();

		//获取当前鸽棚信息

		//当前鸽棚鸽笼信息
		const currShed = computed(() => {
			return proxy.$store.state.baseInfo.SHED_ID;
		});

		//当前日期
		const nowTime = new Date();
		//调接口传的时间
		//这样拿到的时间都是当天的零点，如果不传直接拿，拿到的也会有现在的时分秒,而理解上需要结束时间当天的最后一秒
		const endTime = ref(
			new Date(
				nowTime.getFullYear(),
				nowTime.getMonth(),
				nowTime.getDate(),
				23,
				59,
				59
			)
		);

		const startTime = ref(
			new Date(
				nowTime.getFullYear(),
				nowTime.getMonth(),
				nowTime.getDate() - 1
			)
		);

		// //时间选择器绑定的值
		// const dateValue = ref([
		// 	proxy.$TOOL.dateFormat(startTime.value).substring(0, 10),
		// 	proxy.$TOOL.dateFormat(endTime.value).substring(0, 10),
		// ]);
		//请求参数
		let commonParams = {
			start_time: proxy.$TOOL.dateFormat(startTime.value),
			end_time: proxy.$TOOL.dateFormat(endTime.value),
			shed_id: currShed.value,
		};

		// //日期选择器
		// const visibleChange = function (e) {
		// 	console.log("选择日期", e);
		// 	console.log(
		// 		proxy.$TOOL.dateFormat(e[0]),
		// 		proxy.$TOOL.dateFormat(e[1]).substring(0, 10) + " 23:59:59"
		// 	);
		// 	commonParams.start_time = proxy.$TOOL.dateFormat(e[0]);
		// 	commonParams.end_time =
		// 		proxy.$TOOL.dateFormat(e[1]).substring(0, 10) + " 23:59:59";
		// 	console.log("参数", commonParams);
		// 	getCarbonDioxideData();
		// };

		//相同的配置
		// let commonObject = {
		//     tooltip: {
		//         trigger: "axis",
		//         //部分格式化，给数值加单位
		//         valueFormatter: (value) => value + "%",
		//         //位置
		//         position: function () {
		//             return { left: "50%", top: 40 };
		//         },
		//     },
		//     grid: {
		//         bottom: "20%",
		//     },
		//     dataZoom: [
		//         {
		//             type: "inside",
		//             start: 0,
		//             end: 100,
		//         },
		//         {
		//             start: 0,
		//             end: 100,
		//         },
		//     ],
		//     dataset: {
		//         // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
		//         // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
		//         // 如果不指定 dimensions，也可以通过指定 series.encode
		//         // 完成映射，参见后文。
		//         dimensions: [
		//             "id",
		//             "deviceid",
		//             "devicecode",
		//             "dataid",
		//             "datacode",
		//             "dataname",
		//             "datavalue",
		//             "datavalueText",
		//             "dataunit",
		//             "dataicon",
		//             "dataLevel",
		//             "devicetime",
		//             "gmtCreate",
		//             "gmtModified",
		//             "isDeleted",
		//             "version",
		//         ],
		//         source: [],
		//     },
		//     xAxis: {
		//         boundaryGap: false,
		//         type: "time",
		//         name: "时间",
		//         // data: [20, 30, 40, 50, 60],
		//     },
		//     yAxis: [
		//         {
		//             type: "value",
		//             name: "二氧化碳",
		//             nameGap: 20, //坐标轴名称与坐标轴之间的距离
		//             splitLine: {
		//                 show: false,
		//             },
		//             nameTextStyle: {
		//                 color: "#696969",
		//                 fontWeight: "bold",
		//                 fontSize: 15,
		//             },
		//         },
		//     ],
		//     series: [
		//         {
		//             name: "二氧化碳",
		//             type: "line",
		//             symbol: "none",
		//             smooth: true,
		//             dimensions: ["devicetime", "datavalue"],
		//             lineStyle: {
		//                 width: 1,
		//                 color: "#409EFF",
		//             },
		//             areaStyle: {
		//                 opacity: 0.1,
		//                 color: "#79bbff",
		//             },
		//             encode: {
		//                 x: ["devicetime"], // 表示维度devicetime 映射到 x 轴。
		//                 y: "datavalue", // 表示维度datavalue映射到 y 轴。
		//             },
		//         },
		//     ],
		// };

		//相关单位
		// const unit = ["ppm","℃","%","Lx","PM2.5","PM10","ppm","ppm","TSP","dB"]
		//相同维度
		let commonDimensions = [
			"id",
			"deviceid",
			"devicecode",
			"dataid",
			"datacode",
			"dataname",
			"datavalue",
			"datavalueText",
			"dataunit",
			"dataicon",
			"dataLevel",
			"devicetime",
			"gmtCreate",
			"gmtModified",
			"isDeleted",
			"version",
		];

		//相同y轴部分
		let commonY = {
			type: "value",
			nameGap: 20, //坐标轴名称与坐标轴之间的距离

			splitLine: {
				show: false,
			},
			nameTextStyle: {
				color: "#696969",
				fontWeight: "bold",
				//  width: 80,
				fontSize: 12,
			},
		};

		//相同series
		let seriesObject = {
			name: "",
			type: "line",
			symbol: "none",
			smooth: true,
			dimensions: ["devicetime", "datavalue"],
			encode: {
				x: ["devicetime"], // 表示维度 3、1、5 映射到 x 轴。
				y: "datavalue", // 表示维度 2 映射到 y 轴。
				// tooltip: [3, 2, 4], // 表示维度 3、2、4 会在 tooltip 中显示。
			},
		};
		//相同的tooltip
		let commonTooltip = {
			trigger: "axis",
			//部分格式化，给数值加单位
			// valueFormatter: (value) => value + "%",
			//位置
			position: function () {
				return { left: "50%", top: 40 };
			},
		};

		let commonAnothetTooltip = {
			trigger: "axis",
			//部分格式化，给数值加单位
			// valueFormatter: (value) => value + "%",
			//位置
			position: function () {
				return { left: "25%", top: "25%" };
			},
		};

		//相同的配置
		let commomOption = {
			grid: {
				// bottom: "20%",
			},
			dataZoom: [
				// {
				//     type: "inside",
				//     start: 0,
				//     end: 100,
				//     backgroundColor: '#f3be6f'
				// },
				// {
				//     start: 0,
				//     end: 100,
				//     backgroundColor: "#fffaf1",
				//     dataBackground: {
				//         lineStyle: {
				//             color: "#ffd17a",
				//         },
				//         areaStyle: {
				//             shadowColor: "#fef9f1",
				//             shadowBlur: 10,
				//         },
				//     },
				// },
			],
			xAxis: {
				boundaryGap: false,
				type: "time",
				name: "时间",
			},
			data: [
				{
					textStyle: {
						fontSize: 28,
					},
				},
			],
		};

		//二氧化碳的图表值
		let carbonDioxideYAxis = [{ ...commonY, name: "二氧化碳/ppm" }];
		let carbonDioxideDataset = { dimensions: commonDimensions, source: [] };
		let carbonDioxideSeriesObject = {
			...seriesObject,
			lineStyle: {
				width: 1,
				color: "#f15d5d",
			},
			areaStyle: {
				opacity: 0.1,
				color: "#f15d5d",
			},
		};
		let carbonDioxideTooltip = {
			...commonTooltip,
			formatter(params) {
				var result = "";
				var dotHtml =
					'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#f15d5d"></span>';
				var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
				// console.log(params, "数据对象");
				result +=
					params[0].value.devicetime + "</br>" + dotHtml + textHtml;
				return result;
			},
			// valueFormatter: (value) => value + temperatureDataunit,
			axisPointer: {
				//线的颜色
				lineStyle: {
					color: "#f15d5d",
				},
			},
		};
		let carbonDioxideOptionStatic = {
			...commomOption,
			yAxis: carbonDioxideYAxis,
			dataset: carbonDioxideDataset,
			series: [carbonDioxideSeriesObject],
			tooltip: carbonDioxideTooltip,
		};
		//二氧化碳
		const carbonDioxideOption = reactive(carbonDioxideOptionStatic);

		//温度的图表值
		let temperatureYAxis = [{ ...commonY, name: "空气温度/℃" }];
		let temperatureDataset = { dimensions: commonDimensions, source: [] };
		let temperatureSeriesObject = {
			...seriesObject,
			lineStyle: {
				width: 1,
				color: "#EE9A00",
			},
			areaStyle: {
				opacity: 0.1,
				color: "#EE9A00",
			},
		};
		let temperatureTooltip = {
			...commonTooltip,
			formatter(params) {
				var result = "";
				var dotHtml =
					'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#EE9A00"></span>';
				var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
				// console.log(params, "数据对象");
				result +=
					params[0].value.devicetime + "</br>" + dotHtml + textHtml;
				return result;
			},
			// valueFormatter: (value) => value + temperatureDataunit,
			axisPointer: {
				//线的颜色
				lineStyle: {
					color: "#EE9A00",
				},
			},
		};
		let temperatureOptionStatic = {
			...commomOption,
			yAxis: temperatureYAxis,
			dataset: temperatureDataset,
			series: [temperatureSeriesObject],
			tooltip: temperatureTooltip,
		};

		//空气温度
		const temperatureOption = reactive(temperatureOptionStatic);

		//湿度的图表值
		let humidityYAxis = [{ ...commonY, name: "空气湿度/%" }];
		let humidityDataset = { dimensions: commonDimensions, source: [] };
		let humiditySeriesObject = {
			...seriesObject,
			// lineStyle: {
			//     width: 1,
			//     color: "#EEEE00",
			// },
			areaStyle: {
				opacity: 0.1,
				color: "#46adff",
			},
		};
		let humidityTooltip = {
			...commonTooltip,
			formatter(params) {
				var result = "";
				var dotHtml =
					'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#46adff"></span>';
				var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
				// console.log(params, "数据对象");
				result +=
					params[0].value.devicetime + "</br>" + dotHtml + textHtml;
				return result;
			},
			// valueFormatter: (value) => value + humidityDataunit,
			axisPointer: {
				//线的颜色
				lineStyle: {
					color: "#46adff",
				},
			},
		};
		let humidityOptionStatic = {
			...commomOption,
			yAxis: humidityYAxis,
			dataset: humidityDataset,
			series: [humiditySeriesObject],
			tooltip: humidityTooltip,
		};

		//湿度
		const humidityOption = reactive(humidityOptionStatic);

		//光照强度的图表值
		let illuminationIntensityYAxis = [{ ...commonY, name: "光照强度/Lx" }];
		let illuminationIntensityDataset = {
			dimensions: commonDimensions,
			source: [],
		};
		let illuminationIntensitySeriesObject = {
			...seriesObject,
			lineStyle: {
				width: 1,
				color: "#EEEE00",
			},
			areaStyle: {
				opacity: 0.1,
				color: "#EEEE00",
			},
		};
		let illuminationIntensityTooltip = {
			...commonTooltip,
			formatter(params) {
				var result = "";
				var dotHtml =
					'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#EEEE00"></span>';
				var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
				// console.log(params, "数据对象");
				result +=
					params[0].value.devicetime + "</br>" + dotHtml + textHtml;
				return result;
			},
			// valueFormatter: (value) => value + illuminationIntensityDataunit,
			axisPointer: {
				//线的颜色
				lineStyle: {
					color: "#EEEE00",
				},
			},
		};
		let illuminationIntensityOptionStatic = {
			...commomOption,
			yAxis: illuminationIntensityYAxis,
			dataset: illuminationIntensityDataset,
			series: [illuminationIntensitySeriesObject],
			tooltip: illuminationIntensityTooltip,
		};

		//光照强度
		const illuminationIntensityOption = reactive(
			illuminationIntensityOptionStatic
		);

		//PM2.5的图表值
		let PMYAxis = [{ ...commonY, name: "PM2.5/um" }];
		let PMDataset = {
			dimensions: commonDimensions,
			source: [],
		};
		let PMSeriesObject = {
			...seriesObject,
			lineStyle: {
				width: 1,
				color: "#5ee59e",
			},
			areaStyle: {
				opacity: 0.1,
				color: "#5ee59e",
			},
		};
		let PMTooltip = {
			...commonTooltip,
			formatter(params) {
				var result = "";
				var dotHtml =
					'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#5ee59e"></span>';
				var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
				// console.log(params, "数据对象");
				result +=
					params[0].value.devicetime + "</br>" + dotHtml + textHtml;
				return result;
			},
			// valueFormatter: (value) => value + PMDataunit,
			axisPointer: {
				//线的颜色
				lineStyle: {
					color: "#5ee59e",
				},
			},
		};
		let PMOptionStatic = {
			...commomOption,
			yAxis: PMYAxis,
			dataset: PMDataset,
			series: [PMSeriesObject],
			tooltip: PMTooltip,
		};

		//PM2.5
		const PMOption = reactive(PMOptionStatic);

		//PM10的图表值
		let PM10YAxis = [{ ...commonY, name: "PM10/μg/m3" }];
		let PM10Dataset = {
			dimensions: commonDimensions,
			source: [],
		};
		let PM10SeriesObject = {
			...seriesObject,
			lineStyle: {
				width: 1,
				color: "#a59ffa",
			},
			areaStyle: {
				opacity: 0.1,
				color: "#a59ffa",
			},
		};
		let PM10Tooltip = {
			...commonTooltip,
			formatter(params) {
				var result = "";
				var dotHtml =
					'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#a59ffa"></span>';
				var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
				// console.log(params, "数据对象");
				result +=
					params[0].value.devicetime + "</br>" + dotHtml + textHtml;
				return result;
			},
			// valueFormatter: (value) => value + PM10Dataunit,
			axisPointer: {
				//线的颜色
				lineStyle: {
					color: "#a59ffa",
				},
			},
		};
		let PM10OptionStatic = {
			...commomOption,
			yAxis: PM10YAxis,
			dataset: PM10Dataset,
			series: [PM10SeriesObject],
			tooltip: PM10Tooltip,
		};

		//PM10
		const PM10Option = reactive(PM10OptionStatic);

		//氨气的图表值
		let ammoniaGasYAxis = [{ ...commonY, name: "氨气/ppm" }];
		let ammoniaGasDataset = {
			dimensions: commonDimensions,
			source: [],
		};
		let ammoniaGasSeriesObject = {
			...seriesObject,
			lineStyle: {
				width: 1,
				color: "#EE6AA7",
			},
			areaStyle: {
				opacity: 0.1,
				color: "#EE6AA7",
			},
		};
		let ammoniaGasTooltip = {
			...commonAnothetTooltip,
			formatter(params) {
				var result = "";
				var dotHtml =
					'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#EE6AA7"></span>';
				var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
				// console.log(params, "数据对象");
				result +=
					params[0].value.devicetime + "</br>" + dotHtml + textHtml;
				return result;
			},
			// valueFormatter: (value) => value + ammoniaGasDataunit,
			axisPointer: {
				//线的颜色
				lineStyle: {
					color: "#EE6AA7",
				},
			},
		};
		let ammoniaGasOptionStatic = {
			...commomOption,
			yAxis: ammoniaGasYAxis,
			dataset: ammoniaGasDataset,
			series: [ammoniaGasSeriesObject],
			tooltip: ammoniaGasTooltip,
		};

		//ammoniaGas
		const ammoniaGasOption = reactive(ammoniaGasOptionStatic);

		//硫化氢的图表值
		let sulfurettedHydrogenYAxis = [{ ...commonY, name: "硫化氢/ppm" }];
		let sulfurettedHydrogenDataset = {
			dimensions: commonDimensions,
			source: [],
		};
		let sulfurettedHydrogenSeriesObject = {
			...seriesObject,
			lineStyle: {
				width: 1,
				color: "#1C86EE",
			},
			areaStyle: {
				opacity: 0.1,
				color: "#1C86EE",
			},
		};
		let sulfurettedHydrogenTooltip = {
			...commonAnothetTooltip,
			formatter(params) {
				var result = "";
				var dotHtml =
					'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1C86EE"></span>';
				var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
				// console.log(params, "数据对象");
				result +=
					params[0].value.devicetime + "</br>" + dotHtml + textHtml;
				return result;
			},
			// valueFormatter: (value) => value + sulfurettedHydrogenDataunit,
			axisPointer: {
				//线的颜色
				lineStyle: {
					color: "#1C86EE",
				},
			},
		};
		let sulfurettedHydrogenOptionStatic = {
			...commomOption,
			yAxis: sulfurettedHydrogenYAxis,
			dataset: sulfurettedHydrogenDataset,
			series: [sulfurettedHydrogenSeriesObject],
			tooltip: sulfurettedHydrogenTooltip,
		};

		//硫化氢配置
		const sulfurettedHydrogenOption = reactive(
			sulfurettedHydrogenOptionStatic
		);

		//TSP的图表值
		let TSPYAxis = [{ ...commonY, name: "TSP" }];
		let TSPDataset = {
			dimensions: commonDimensions,
			source: [],
		};
		let TSPSeriesObject = {
			...seriesObject,
			lineStyle: {
				width: 1,
				color: "#EE9A00",
			},
			areaStyle: {
				opacity: 0.1,
				color: "#EE9A00",
			},
		};
		let TSPTooltip = {
			...commonAnothetTooltip,
			formatter(params) {
				var result = "";
				var dotHtml =
					'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#EE9A00"></span>';
				var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
				// console.log(params, "数据对象");
				result +=
					params[0].value.devicetime + "</br>" + dotHtml + textHtml;
				return result;
			},
			// valueFormatter: (value) => value + TSPDataunit,
			axisPointer: {
				//线的颜色
				lineStyle: {
					color: "#EE9A00",
				},
			},
		};
		let TSPOptionStatic = {
			...commomOption,
			yAxis: TSPYAxis,
			dataset: TSPDataset,
			series: [TSPSeriesObject],
			tooltip: TSPTooltip,
		};

		//硫化氢配置
		const TSPOption = reactive(TSPOptionStatic);

		//噪声的图表值
		let noiseYAxis = [{ ...commonY, name: "噪声/dB" }];
		let noiseDataset = {
			dimensions: commonDimensions,
			source: [],
		};
		let noiseSeriesObject = {
			...seriesObject,
			lineStyle: {
				width: 1,
				color: "#5ee59e",
			},
			areaStyle: {
				opacity: 0.1,
				color: "#5ee59e",
			},
		};
		let noiseTooltip = {
			...commonAnothetTooltip,
			formatter(params) {
				var result = "";
				var dotHtml =
					'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#5ee59e"></span>';
				var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
				// console.log(params, "数据对象");
				result +=
					params[0].value.devicetime + "</br>" + dotHtml + textHtml;
				return result;
			},
			// valueFormatter: (value) => value + noiseDataunit,
			axisPointer: {
				//线的颜色
				lineStyle: {
					color: "#5ee59e",
				},
			},
		};
		let noiseOptionStatic = {
			...commomOption,
			yAxis: noiseYAxis,
			dataset: noiseDataset,
			series: [noiseSeriesObject],
			tooltip: noiseTooltip,
		};

		//硫化氢配置
		const noiseOption = reactive(noiseOptionStatic);

		let carbonDioxide = [];
		let temperature = [];
		let humidityc = [];
		let illuminationIntensity = [];
		let PM = [];
		let PM10 = [];
		let ammoniaGas = [];
		let sulfurettedHydrogen = [];
		let TSP = [];
		let noise = [];

		//获取环境数据
		const getCarbonDioxideData = async function () {
			let CarbonDioxRes =
				await proxy.$API.envForecast.getCarbonDioxideData.post(
					commonParams,
					"二氧化碳"
				);
			// console.log("二氧化碳请求结果", CarbonDioxRes);

			if (CarbonDioxRes.code === 200) {
				carbonDioxide = CarbonDioxRes.data.data;
				//数据赋值
				carbonDioxideOption.dataset.source = carbonDioxide;
			}
			let temperatureRes =
				await proxy.$API.envForecast.getCarbonDioxideData.post(
					commonParams,
					"空气温度"
				);
			// console.log("空气温度请求结果", temperatureRes);
			if (temperatureRes.code === 200) {
				temperature = temperatureRes.data.data;
				//数据赋值
				temperatureOption.dataset.source = temperature;
			}
			// console.log("环境数据请求结果", temperatureRes);

			let humidityRes =
				await proxy.$API.envForecast.getCarbonDioxideData.post(
					commonParams,
					"空气湿度"
				);
			if (humidityRes.code === 200) {
				humidityc = humidityRes.data.data;

				//数据赋值
				humidityOption.dataset.source = humidityc;
				// console.log("空气湿度请求结果", humidityRes);
			}

			//光照强度
			let illuminationIntensityRes =
				await proxy.$API.envForecast.getCarbonDioxideData.post(
					commonParams,
					"光照强度"
				);
			if (illuminationIntensityRes.code === 200) {
				illuminationIntensity = illuminationIntensityRes.data.data;
				//数据赋值
				illuminationIntensityOption.dataset.source =
					illuminationIntensity;
				// console.log("光照强度请求结果", illuminationIntensityRes);
			}

			//PM2.5
			let PMRes = await proxy.$API.envForecast.getCarbonDioxideData.post(
				commonParams,
				"二氧化碳"
			);
			if (PMRes.code === 200) {
				PM = PMRes.data.data;
				//数据赋值
				PMOption.dataset.source = PM;
				// console.log("PM2.5请求结果", PMRes);
			}

			//PM10
			let PM10Res =
				await proxy.$API.envForecast.getCarbonDioxideData.post(
					commonParams,
					"二氧化碳"
				);
			if (PM10Res.code === 200) {
				PM10 = PM10Res.data.data;
				//数据赋值
				PM10Option.dataset.source = PM10;
				// console.log("PM10请求结果", PM10Res);
			}

			//氨气浓度
			let ammoniaGasRes =
				await proxy.$API.envForecast.getCarbonDioxideData.post(
					commonParams,
					"氨气浓度"
				);
			if (ammoniaGasRes.code === 200) {
				ammoniaGas = ammoniaGasRes.data.data;
				//数据赋值
				ammoniaGasOption.dataset.source = ammoniaGas;
				// console.log("氨气浓度请求结果", ammoniaGasRes);
			}

			//硫化氢浓度
			let sulfurettedHydrogenRes =
				await proxy.$API.envForecast.getCarbonDioxideData.post(
					commonParams,
					"硫化氢"
				);
			if (sulfurettedHydrogenRes.code === 200) {
				sulfurettedHydrogen = sulfurettedHydrogenRes.data.data;
				//数据赋值
				sulfurettedHydrogenOption.dataset.source = sulfurettedHydrogen;
				// console.log("硫化氢请求结果", sulfurettedHydrogenRes);
			}

			//TSP浓度
			let TSPRes = await proxy.$API.envForecast.getCarbonDioxideData.post(
				commonParams,
				"二氧化碳"
			);
			if (TSPRes.code === 200) {
				TSP = TSPRes.data.data;
				//数据赋值
				TSPOption.dataset.source = TSP;
				// console.log("TSP请求结果", TSPRes);
			}

			//噪音
			let noiseRes =
				await proxy.$API.envForecast.getCarbonDioxideData.post(
					commonParams,
					"噪音"
				);
			// console.log("噪音", noiseRes);
			if (noiseRes.code === 200) {
				noise = noiseRes.data.data;
				//数据赋值
				noiseOption.dataset.source = noise;
				// console.log("噪音请求结果", noiseRes);
			}
		};

		getCarbonDioxideData();

		return {
			carbonDioxideOption,
			// tempOption,
			temperatureOption,
			humidityOption,
			illuminationIntensityOption,
			PMOption,
			PM10Option,
			ammoniaGasOption,
			sulfurettedHydrogenOption,
			TSPOption,
			noiseOption,
			// dateValue,
			// visibleChange,
		};
	},
};
