import http from "@/utils/request";

// export default {
// 	getCarbonDioxideData: {
// 		url: `/digitalPigeon/environment/enviroment/new-warning/getWarning`,
// 		name: "查询环境数据",
// 		post: async function (data = {}) {
// 			// console.log("url", this.url,data);
// 			return await http.post(this.url + '?start_time=' + data.start_time + '&end_time=' + data.end_time +   '&shed_id=1518124016571797507' + '&size=' + data.size + '&current=' + data.current);
// 		},
// 	}
// };
export const getCarbonDioxideData = (start_time, end_time, shedid, baseid, size, current) => 
	http.post(`/digitalPigeon/environment/enviroment/new-warning/getWarning?&start_time=${start_time}&end_time=${end_time}&shedid=${shedid}&baseid=${baseid}&current=${current}&size=${size}`)
