// 出栏管理
import http from "@/utils/request"

export default {
  delivermanagement:{
    url:`digitalPigeon/breed/informationinput/delivermanagement`,
    name:'获取出栏管理信息',
    get: async function (data = {}) {
			console.log("url", this.url);
      let params
			return await http.get(this.url, data);
		},
  }
}