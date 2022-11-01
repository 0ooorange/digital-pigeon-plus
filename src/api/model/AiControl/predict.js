import http from "@/utils/request";

//export default {
//	getPredict: {
//		url: `/api/v1/predict/`,
//		name: "预测环境",
//		post: async function (data = {}) {
//			console.log("url", this.url,data);
//			return await http.post(this.url + '?feature=' + data.feature + '&data=' + data.data + '&target_length=' + data.target_length);
//		},
//	}
//};

const url = '/api/v1/predict/'

export const getPredict = (data = {}) => http.post(url,data);