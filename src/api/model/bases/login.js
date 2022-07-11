// 登录
import http from "@/utils/request"

export default {
	token: {
		url: `/digitalPigeon/ucenter/ucenter/new-user/login`,
		name: "登录获取TOKEN",
		post: async function(data={}){
			return await http.post(this.url+`?NameOrPhone=${data.NameOrPhone}&password=${data.password}`);
		}
	},
	getHomeInf: {
		url: `/digitalPigeon/ucenter/getHomeInformation`,
		name: "获取首页信息",
		get: async function(){
			return await http.get(this.url);
		}
	}
}
