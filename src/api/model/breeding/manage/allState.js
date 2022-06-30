// 鸽棚总览
import http from "@/utils/request";

export default {
	findCageByState: {
		url: `/digitalPigeon/breed/overviewAndStatistics/pigeon-cage-state/findCageByState/`,
		name: "获取各种数量不用时间",
		get: async function (data = {}) {
			console.log("url", this.url);
			return await http.get(this.url, data);
		},
	},
	findAbnormalByPigeonIdAndDate: {
		url: `/digitalPigeon/breed/overviewAndStatistics/pigeon-cage-state/findAbnormalByPigeonIdAndDate/`,
		name: "查询异常记录",
		get: async function (data = {}) {
			console.log("url", this.url);
			//本来不用的，但是表格分页参数名和接口的不一样，所以再转换下
			let params = {
				pigeonId: data.pigeonId,
				beginDate: data.beginDate,
				endDate: data.endDate,
				current: data.page,
				size: data.pageSize,
			};
			console.log("最后的请求参数", params);
			return await http.get(this.url, params);
		},
	},
	findLogByPigeonIdAndDate: {
		url: `/digitalPigeon/breed/overviewAndStatistics/pigeon-cage-state/findLogByPigeonIdAndDate/`,
		name: "查询操作记录",
		get: async function (data = {}) {
			console.log("url", this.url);
			//本来不用的，但是表格分页参数名和接口的不一样，所以再转换下
			let params = {
				pigeonId: data.pigeonId,
				beginDate: data.beginDate,
				endDate: data.endDate,
				current: data.page,
				size: data.pageSize,
			};
			console.log("最后的请求参数", params);
			return await http.get(this.url, params);
		},
	},
	findCageDataByPigeonIdAndDate: {
		url: `/digitalPigeon/breed/overviewAndStatistics/pigeon-cage-state/findCageDataByPigeonIdAndDate/`,
		name: "获取各种数据",
		get: async function (data = {}) {
			console.log("url", this.url);
			return await http.get(this.url, data);
		},
	},
};
