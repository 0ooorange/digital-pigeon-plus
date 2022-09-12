import http from "@/utils/request";
export const getAllAuthorityApi =  {
	url: `/digitalPigeon/ucenter/ucenter/new-permission/getPermissionList`,
	name: "获取所有权限",
	get: async function () {
		return await http.get(`${this.url}`);
	},
}
export const getAllRole =  {
	url: `/digitalPigeon/ucenter/ucenter/new-role/getAllRole`,
	name: "获取所有角色",
	get: async function () {
		return await http.get(`${this.url}`);
	},
}
