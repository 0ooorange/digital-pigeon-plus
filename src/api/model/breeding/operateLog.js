// 操作日志和统计
import http from "@/utils/request";

export default {
	findAbnormalByPigeonCodesAndDate: {
		url: `/digitalPigeon/breed/overviewAndStatistics/pigeon-cage-state/findAbnormalByPigeonCodesAndDate/`,
		name: "查询异常记录",
		get: async function (data = {}) {
			console.log("url", this.url);
			//本来不用的，但是表格分页参数名和接口的不一样，所以再转换下
			let params = {
				codes: data.pigeonId,
				beginDate: data.beginDate,
				endDate: data.endDate,
				current: data.page,
				size: data.pageSize,
			};
			console.log("最后的请求参数", params);
			return await http.get(this.url, params);
		},
	},
	findLogByPigeonCodesAndDate: {
		url: `/digitalPigeon/breed/overviewAndStatistics/pigeon-cage-state/findLogByPigeonCodesAndDate/`,
		name: "查询操作记录",
		get: async function (data = {}) {
			console.log("url", this.url);
			//本来不用的，但是表格分页参数名和接口的不一样，所以再转换下
			let params = {
				codes: data.pigeonId,
				beginDate: data.beginDate,
				endDate: data.endDate,
				current: data.page,
				size: data.pageSize,
			};
			console.log("最后的请求参数", params);
			return await http.get(this.url, params);
		},
	},
	findCageDataByPigeonAndDate: {
		url: `/digitalPigeon/breed/overviewAndStatistics/pigeon-cage-state/findCageDataByPigeonAndDate/`,
		name: "获取各种数据",
		get: async function (data = {}) {
			console.log("url", this.url);
            let params = {
				codes: data.pigeonId,
				beginDate: data.beginDate,
				endDate: data.endDate
			};
			return await http.get(this.url, params);
		},
	},
};
