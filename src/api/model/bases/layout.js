// 基本框架
import http from "@/utils/request"

export default {
  getBaseAndShed: {
    url: `/digitalPigeon/ucenter/ucenter/pigeon-base/getBaseAndShed`,
		name: "通过用户id获取基地和棚",
		get: async function(id){
			return await http.get(this.url, {userId: id});
		}
  },
  getBaseInfoById: {
    url: `/digitalPigeon/ucenter/ucenter/pigeon-base/getBaseInfoById`,
		name: "通过基地id获取基地信息",
		get: async function(id){
			return await http.get(this.url, {baseId: id});
		}
  },
	changeBase: {
		url: `/digitalPigeon/ucenter/changeBase`,
		name: "切换基地",
		post: async function(baseId){
			return await http.post(`${this.url}?baseId=${baseId}`);
		}
	},
  getChargeName: {
    url: `/digitalPigeon/ucenter/changeShed`,
		name: "切换基地",
		post: async function(chargeId){
			return await http.post(`${this.url}?userId=${chargeId}`);
		}
  }
}
