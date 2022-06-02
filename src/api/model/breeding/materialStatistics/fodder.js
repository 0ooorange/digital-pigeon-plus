// 饲料统计
import http from "@/utils/request"

export default {
	feedBrandNumByShedID: {
		url: `/digitalPigeon/breed/materialstatistic/material-statistic-feed-shed-entity/getFeedBrandNumByShedID/`,
		name: "登录获取TOKEN",
		get: async function(data={}){
			return await http.post(this.url+`${data.currShed}`);
		}
	}
}