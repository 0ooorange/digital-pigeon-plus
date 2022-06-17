// 抽孵辅助
import http from "@/utils/request";
import Qs from 'qs'
export default {
	getTakeOrHatchAssistance: {
		url: `/digitalPigeon/breed/breedassistance/getTakeOrHatchAssistance`,
		post: async function (data) {
			var params =  Qs.stringify({
			    shedId: "1518124016571797507",
			    pageNum: data.pageNum,
			    pageSize: data.pageSize
			});
			return await http.post(this.url, params,{headers:{'Content-Type':'application/x-www-form-urlencoded'}});
		},
	},
	
};
