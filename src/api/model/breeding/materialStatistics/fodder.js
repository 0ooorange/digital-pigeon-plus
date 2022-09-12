// 饲料统计
import http from "@/utils/request"

export default {
	feedBrandNum: {
		url: `/digitalPigeon/breed/materialstatistic/material-statistic-feed-shed-entity/`,
		name: "获取各种数量不用时间",
		get: async function(differ){
		// get: async function(differ,data={}){
            // console.log('url',this.url+ differ +`/${data.currShed}`)
			// return await http.get(this.url+ differ +`/${data.currShed}`);
			return await http.get(this.url+ differ +`/1518124016571797507`);
		}
	},
    FeedNumByIDTime:{
        url: `/digitalPigeon/breed/materialstatistic/material-statistic-feed-shed-entity/`,
		name: "获取各种数量需要时间",
		get: async function(differ,data={}){
            // console.log('url',this.url+ differ +`/${data.currShed}` + `/${data.startTime}` + `/${data.endTime}`)
			// return await http.get(this.url+ differ +`/${data.currShed}` + `/${data.startTime}` + `/${data.endTime}`);
			return await http.get(this.url+ differ +`/1518124016571797507` + `/${data.startTime}` + `/${data.endTime}`);
		}
    },
	FeedStatisticByIDTIme:{
        url: `/digitalPigeon/breed/materialstatistic/material-statistic-feed-shed-entity/getFeedStatisticByIDTIme`,
		name: "获取各种数量需要时间",
		get: async function(data={}){
            // console.log('url',this.url +`/${data.currShed}` + `/${data.startTime}` + `/${data.endTime}`  + `/${data.page}` + `/${data.pageSize}`)
			// return await http.get(this.url +`/${data.currShed}` + `/${data.startTime}` + `/${data.endTime}` + `/${data.page}` + `/${data.pageSize}`);
			return await http.get(this.url + `/1518124016571797507` + `/${data.startTime}` + `/${data.endTime}` + `/${data.page}` + `/${data.pageSize}`);
		}
    },
}