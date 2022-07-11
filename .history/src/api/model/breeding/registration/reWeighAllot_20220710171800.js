// 饲料fu
import http from "@/utils/request"
import qs from 'qs'
export default {
  delivermanagement:{
    url:`digitalPigeon/breed/informationinput/getallocatefeed`,
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
    url:`digitalPigeon/breed/informationinput/addallocatefeed`,
    name:'添加饲料记录',
    post: async function (data) {
			console.log("url", this.url);
			return await http.post(this.url, data);
		},
  },
  modifydeliver:{
    url:`digitalPigeon/breed/informationinput/modifyallocatefeed`,
    name:'修改饲料记录',
    post: async function (data) {
			console.log("url", this.url);
			return await http.post(this.url, data);
		},
  },
  deletedeliver:{
    url:`digitalPigeon/breed/informationinput/deleteallocatefeed`,
    name:'删除饲料记录',
    post: async function (id) {
			console.log("url", this.url);
			return await http.post(this.url,{id});
		},
  },
}