// 种鸽性能测试
import http from "@/utils/request";
export default {
	getData: {
		url: `/digitalPigeon/breed/performancetest/pigeon-cage-state/performanceTest/`,
		name: "获取各种数量不用时间",
		post: async function (data = {}) {
			console.log("url", this.url);
			return await http.post(this.url, data);
		},
	}
};