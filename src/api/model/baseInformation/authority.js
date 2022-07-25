import http from "@/utils/request";
export const getAllAuthorityApi =  {
	url: `/digitalPigeon/ucenter/ucenter/new-permission/getPermissionList`,
	name: "通过用户id获取所有鸽棚信息",
	get: async function () {
		return await http.get(`${this.url}`);
	},
}
