import http from "@/utils/request";
export const getBaseInfoApi =  {
	url: `/digitalPigeon/ucenter/ucenter/pigeon-base/getBaseInfoById`,
	name: "获取所在信息",
	get: async function () {
		return await http.get(`${this.url}?baseId=1546756048684097537`);
	},
}



export const editBaseInfoApi =  {
	url: `/digitalPigeon/ucenter/ucenter/pigeon-base/updateBaseInfo`,
	name: "编辑信息",
	post: async function(data) {
		return await http.post(`${this.url}`,data);
	},
}
