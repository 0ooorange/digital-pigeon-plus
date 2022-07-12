//环境检测

import http from "@/utils/request";

export default {
	getCarbonDioxideData: {
		url: `/digitalPigeon/environment/enviroment/sensordevice/getSensorByIDTypeTime`,
		name: "查询环境数据",
		post: async function (data = {},type = "") {
			console.log("url", this.url,data);
			return await http.post(this.url + '?start_time=' + data.start_time + '&end_time=' + data.end_time + '&shed_id=' + data.shed_id + '&type=' + type);
		},
	}
};
