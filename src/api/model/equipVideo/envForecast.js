//环境检测

import http from "@/utils/request";

//export default {
//	getCarbonDioxideData: {
//		url: `/digitalPigeon/environment/enviroment/sensordevice/getSensorByIDTypeTime`,
//		name: "查询环境数据",
//		post: async function (data = {},type = "") {
//			console.log("url", this.url,data);
//			return await http.post(this.url + '?start_time=' + data.start_time + '&end_time=' + data.end_time +  '&shed_id=1518124016571797507' + '&type=' + type);
//		},
//	}
//};
const url  = '/digitalPigeon/environment/enviroment/sensordevice/getSensorByIDTypeTime'
export const getCarbonDioxideData = (data = {},type = "") => http.post(url + '?start_time=' + data.start_time + '&end_time=' + data.end_time +  '&shed_id=1518124016571797507' + '&type=' + type)
