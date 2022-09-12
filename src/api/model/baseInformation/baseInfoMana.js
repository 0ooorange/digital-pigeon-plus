import http from "@/utils/request";
export const getBaseInfoApi =  {
	url: `/digitalPigeon/ucenter/ucenter/pigeon-base/getBaseAndShed`,
	name: "获取所有基地信息",
	get: async function () {
		return await http.get(`${this.url}?userId=1543954778680303600`);
	},
}
