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
	getUserInfo: {
		url: `/digitalPigeon/ucenter/ucenter/new-user/getUserInfoById`,
		name: "通过TOKEN获取个人信息",
		get: async function(){
			return await http.get(this.url);
		}
	}
}
