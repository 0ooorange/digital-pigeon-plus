import http from "@/utils/request";
export const showPageApi =  {
	url: `/digitalPigeon/ucenter/ucenter/new-user/getShedListByUserId`,
	name: "通过用户id获取所有鸽棚信息",
	get: async function () {
		// console.log("url", this.url);
		return await http.get(`${this.url}?userId=1543954778680303600`);
	},
}

export const selectUserApi =  {
	url: `/digitalPigeon/ucenter/ucenter/new-user/getUnassignedUserListByUserId`,
	name: "获取未被分配到的鸽棚员工",
	get: async function () {
		// console.log("url", this.url);
		return await http.get(`${this.url}?userId=1543954778680303600`);
	},
}

export const deletedoveApi =  {
	url: `/digitalPigeon/ucenter/ucenter/shed/removeShed`,
	name: "获取未被分配到的鸽棚员工",
	post: async function (shedId) {
		// console.log("url", this.url);
		return await http.post(`${this.url}?shedId=${shedId}`);
	},
}
