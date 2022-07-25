import http from "@/utils/request";
export const getUserInfoApi =  {
	url: `/digitalPigeon/ucenter/ucenter/new-user/getUserListByUserId`,
	name: "获取所有员工信息",
	get: async function () {
		// console.log("url", this.url);
		return await http.get(`${this.url}?userId=1543954778680303600`);
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
