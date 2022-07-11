// 饲料管理
import http from "@/utils/request"
import qs from 'qs'
export default {
  getfeed:{
    url:`digitalPigeon/breed/informationinput/getaddfeed`,
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
  addfeed:{
    url:`digitalPigeon/breed/informationinput/addfeed`,
    name:'添加饲料记录',
    post: async function (data) {
			console.log("url", this.url);
      let params
			return await http.post(this.url, data);
		},
  },
  modifyfeed:{
    url:`digitalPigeon/breed/informationinput/modifyfeed`,
    name:'修改饲料记录',
    post: async function (data) {
			console.log("url", this.url);
			return await http.post(this.url, data);
		},
  },
  deletefeed:{
    url:`digitalPigeon/breed/informationinput/deletefeed`,
    name:'删除饲料记录',
    post: async function (id) {
			console.log("url", this.url);
			return await http.post(this.url,{id});
		},
  },
}