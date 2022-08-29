import http from "@/utils/request";
export const getUserInfoApi =  {
	url: `/digitalPigeon/ucenter/ucenter/new-user/getUserInfoById`,
	name: "获取个人信息",
	get: async function () {
		// console.log("url", this.url);
		return await http.get(this.url);
	},
}

export const updateUserInfoApi =  {
	url: `/digitalPigeon/ucenter/ucenter/new-user/updateUserInfo`,
	name: "获取编辑前的信息",
	post: async function (params) {
		// console.log("url", this.url);
		return await http.post(`${this.url}?id=${params.id}&name=${params.name}&phone=${params.phone}`);
	},
}

export const updatePasswordApi =  {
	url: `/digitalPigeon/ucenter/ucenter/new-user/updateUserInfo`,
	name: "获取编辑前的信息",
	post: async function (passwd) {
		// console.log("url", this.url);
		return await http.post(`${this.url}?id=1543954778680303600&passwd=${passwd}`);
	},
}



// export const updateUserInfoApi =  {
// 	url: `/digitalPigeon/ucenter/ucenter/new-user/updateUserInfo`,
// 	name: "修改个人信息",
// 	post: async function (params) {
// 		// console.log("url", this.url);
// 		return await http.post(`${this.url}?id=${params.id}&name=${params.name}&phone=${params.phone}`);
// 	},
// }
