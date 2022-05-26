// 基本框架
import http from "@/utils/request"

export default {
	changeBase: {
		url: `/digitalPigeon/ucenter/changeBase`,
		name: "切换基地",
		post: async function(baseId){
			return await http.post(this.url+`?baseId=${baseId}`);
		}
	},
  getChargeName: {
    url: `/digitalPigeon/ucenter/changeShed`,
		name: "切换基地",
		post: async function(chargeId){
			return await http.post(this.url+`?userId=${chargeId}`);
		}
  }
}
