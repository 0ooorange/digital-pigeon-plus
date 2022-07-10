// 出栏管理
import http from "@/utils/request"

export default {
  delivermanagement:{
    url:`digitalPigeon/breed/informationinput/delivermanagement`,
    name:'获取出栏管理信息',
    post: async function (data = {}) {
			console.log("url", this.url);
      let params ={
        pageNum:data.page,
        pageSize:data.pageSize,
        shedId:data.shedId,
        startTime:data.startTime,
        endTime:data.endTime
      }
			return await http.post(this.url, params);
		},
  }
}