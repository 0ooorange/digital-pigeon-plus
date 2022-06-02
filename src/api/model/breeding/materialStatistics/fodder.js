// 饲料统计
import http from "@/utils/request"

export default {
	feedBrandNumByShedID: {
		url: `/digitalPigeon/breed/materialstatistic/material-statistic-feed-shed-entity/getFeedNumByIDTime/1518124016571797507/2022-04-01 00:00:00/2022-04-30 23:59:59`,
		name: "获取饲料剩余量",
		get: async function(){
            console.log('url',"/digitalPigeon/breed/materialstatistic/material-statistic-feed-shed-entity/getFeedBrandNumByShedID/1518124016571797507")
			return await http.get(this.url);
		}
	},
    getHomeInf: {
		url: `/digitalPigeon/ucenter/getHomeInformation`,
		name: "获取首页信息",
		get: async function(){
			return await http.get(this.url);
		}
	}
}