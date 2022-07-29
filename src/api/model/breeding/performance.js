// 种鸽性能测试
import http from "@/utils/request";
export default {
	getData: {
		url: `/digitalPigeon/breed/performancetest/pigeon-cage-state/performanceTest`,
		name: "获取种鸽性能检测",
		post: async function (data = {}) {
			console.log("url", this.url);
            let params = {
				endTime: data.endTime,
				shedId: data.shedId,
				startTime: data.startTime,
                fieldCommon:data.fieldCommon,
				pageNum: data.page,
				pageSize: data.pageSize,
			};
            console.log("最后的请求参数", params);
			return await http.post(this.url + '?endTime=' + params.endTime + '&shedId=1518124016571797507' + '&startTime=' + params.startTime + '&fieldCommon=' + params.fieldCommon + '&pageNum=' + params.pageNum + '&pageSize' + params.pageSize, params);
		},
	}
};