// 出栏辅助
import http from "@/utils/request";
import Qs from 'qs'

export default {
	getMarketingAssistance: {
		url: `/digitalPigeon/breed/breedassistance/getMarketingAssistance`,
		post: async function (data) {
            console.log("qs",Qs);
			var params =  Qs.stringify({
			    pageNum: data.pageNum,
			    pageSize: data.pageSize,
                shedId:"1518124016571797507",
			});
            console.log(params);
			return await http.post(this.url, params,{headers:{'Content-Type':'application/x-www-form-urlencoded'}});
		},
	},
	
};
