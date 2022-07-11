// 饲料管理
import http from "@/utils/request"
import qs from 'qs'
export default {
  delivermanagement:{
    url:`http://106.12.160.172:8000/digitalPigeon/breed/informationinput/getaddfeed`,
    name:'获取饲料记录',
    post: async function (data) {
			console.log("url", this.url);
      let params =qs.stringify({
        pageNum:data.page,
        pageSize:data.pageSize,
        shedId:data.shedId,
        startTime:data.startTime,
        endTime:data.endTime
      })
      console.log("参数",params);
			return await http.post(this.url, params);
		},
  },
  adddeliver:{
    url:`digitalPigeon/breed/informationinput/addpigeon`,
    name:'添加饲料记录',
    post: async function (data) {
			console.log("url", this.url);
			return await http.post(this.url, data);
		},
  },
  modifydeliver:{
    url:``,
    name:'修改出栏记录',
    post: async function (data) {
			console.log("url", this.url);
			return await http.post(this.url, data);
		},
  },
  deletedeliver:{
    url:``,
    name:'删除出栏记录',
    post: async function (id) {
			console.log("url", this.url);
			return await http.post(this.url,{id});
		},
  },
}