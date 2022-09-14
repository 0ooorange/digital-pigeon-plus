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

export const getRoleById =  {
	url: `/digitalPigeon/ucenter/ucenter/new-role-permission/getPermissionByRoleId`,
	name: "根据id获取对应权限",
	get: async function (roleId) {
		return await http.get(`${this.url}?roleId=${roleId}`);
	},

}

// 数组可能要处理一下
export const affiropDistribution =  {
	url: `/digitalPigeon/ucenter/ucenter/new-role-permission/addPermissionToRole`,
	name: "确认分配权限",
	post: async function (roleId,arr) {
		return await http.post(`${this.url}?permissionList=${arr}&roleId=${roleId}`);
	},
}
