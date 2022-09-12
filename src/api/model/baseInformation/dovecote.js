import http from "@/utils/request";
export const showPageApi =  {
	url: `/digitalPigeon/ucenter/ucenter/new-user/getShedListByUserId`,
	name: "通过用户id获取所有鸽棚信息",
	get: async function (page) {
		return await http.get(`${this.url}?current=${page.current}&size=${page.pageSize}&userId=1543954778680303600`);
	},
}

export const getEditInfoApi =  {
	url: `/digitalPigeon/ucenter/ucenter/shed/getShedByShedId`,
	name: "获取编辑前信息",
	get: async function (id) {
		return await http.get(`${this.url}?shedId=${id}`);
	},
}

export const updateInfoApi =  {
	url: `/digitalPigeon/ucenter/ucenter/shed/editShed`,
	name: "更新(编辑)信息",
	post: async function (data) {
		return await http.post(`${this.url}`,data);
	},
}


export const selectUserApi =  {
	url: `/digitalPigeon/ucenter/ucenter/new-user/getUserListByUserId`,
	name: "获取鸽棚员工(分配管理员)",
	get: async function () {
		return await http.get(`${this.url}?current=1&size=10&userId=1543954778680303600`);
	},
}



export const addAdminApi =  {
	url: `/digitalPigeon/ucenter/ucenter/new-user-shed/addWorkerToShed`,
	name: "给鸽棚添加管理员",
	post: async function (ShedId,userId) {
		return await http.post(`${this.url}?ShedId=${ShedId}&userId=${userId}`);
	},
}

export const addShedApi =  {
	url: `/digitalPigeon/ucenter/ucenter/shed/addShed`,
	name: "添加鸽棚",
	post: async function (data) {
		return await http.post(`${this.url}`,data);
	},
}



export const deletedoveApi =  {
	url: `/digitalPigeon/ucenter/ucenter/shed/removeShed`,
	name: "删除鸽棚",
	post: async function (shedId) {
		return await http.post(`${this.url}?shedId=${shedId}`);
	},
}
