import http from "@/utils/request";
export const getUserInfoApi =  {
	url: `/digitalPigeon/ucenter/ucenter/new-user/getUserListByUserId`,
	name: "获取所有员工信息",
	get: async function (page) {
		// console.log("url", this.url);
		return await http.get(`${this.url}?current=${page.current}&size=${page.pageSize}&userId=1543954778680303600`);
	},
}

export const getEditInfo =  {
	url: `/digitalPigeon/ucenter/ucenter/new-user/getInfoByWorkerId`,
	name: "获取编辑用户前信息",
	get: async function (userId) {
		// console.log("url", this.url);
		return await http.get(`${this.url}?userId=${userId}`);
	},
}

export const updateEditInfo =  {
	url: `/digitalPigeon/ucenter/ucenter/new-user/updateUserInfo`,
	name: "更新用户信息",
	post: async function (params) {
		return await http.post(`${this.url}?id=${params.id}&name=${params.name}&phone=${params.phone}`);
	},
}

export const getAllRole =  {
	url: `/digitalPigeon/ucenter/ucenter/new-role/getAllRole`,
	name: "获取所有角色",
	get: async function () {
		return await http.get(`${this.url}`);
	},
}

export const addEmployeeApi =  {
	url: `/digitalPigeon/ucenter/ucenter/new-user/register`,
	name: "添加员工",
	post: async function (user) {

		return await http.post(`${this.url}?employerId=1543954778680303600`,user);
	},
}

export const deleteUser =  {
	url: `/digitalPigeon/ucenter/ucenter/new-user/deleteById`,
	name: "删除用户信息",
	get: async function (userId) {
		// console.log("url", this.url);
		return await http.get(`${this.url}?userId=${userId}`);
	},
}
