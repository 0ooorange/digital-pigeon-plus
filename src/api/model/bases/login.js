// 登录
import http from "@/utils/request"
// 登录获取TOKEN
// export const login = (data) => http.post(`/digitalPigeon/ucenter/ucenter/new-user/login?NameOrPhone=${data.NameOrPhone}&password=${data.password}`)

// 登录获取TOKEN
export const login = (data) => http.post(`/digitalPigeon/login/getToken?NameOrPhone=${data.NameOrPhone}&password=${data.password}`)

export default {
	getUserInfo: {
		url: `/digitalPigeon/ucenter/ucenter/new-user/getUserInfoById`,
		name: "通过TOKEN获取个人信息",
		get: async function(){
			return await http.get(this.url);
		}
	}
}
