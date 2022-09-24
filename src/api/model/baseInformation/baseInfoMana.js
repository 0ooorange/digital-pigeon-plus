import http from "@/utils/request";
export const getBaseInfoApi =  {
	url: `/digitalPigeon/ucenter/ucenter/pigeon-base/getAllPigeonBase`,
	name: "获取所有基地信息",
	get: async function () {
		return await http.get(`${this.url}`);
	},
}

export const getBaseById =  {
	url: `/digitalPigeon/ucenter/ucenter/pigeon-base/getBaseInfoById`,
	name: "根据id获取基地信息(编辑用)",
	get: async function (id) {
		return await http.get(`${this.url}?baseId=${id}`);
	},
}

export const editBaseInfo =  {
	url: `/digitalPigeon/ucenter/ucenter/pigeon-base/updateBaseInfo`,
	name: "确定修改基地信息",
	post: async function (data) {
		return await http.post(`${this.url}`,data);
	},
}
export const addBaseInfo =  {
	url: `/digitalPigeon/ucenter/ucenter/pigeon-base/addPigeonBase`,
	name: "新增基地信息",
	post: async function (data) {
		return await http.post(`${this.url}`,data);
	},
}
