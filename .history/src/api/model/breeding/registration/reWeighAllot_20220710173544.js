// 饲料复称
import http from "@/utils/request"
import qs from 'qs'
export default {
  reweighfeedmanagement:{
    url:`digitalPigeon/breed/informationinput/getreweighfeed`,
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
  addreweighfeed:{
    url:`digitalPigeon/breed/informationinput/addreweighfeed`,
    name:'添加饲料记录',
    post: async function (data) {
			console.log("url", this.url);
			return await http.post(this.url, data);
		},
  },
  modifyreweighfeed:{
    url:`digitalPigeon/breed/informationinput/modifyreweighfeed`,
    name:'修改饲料记录',
    post: async function (data) {
			console.log("url", this.url);
			return await http.post(this.url, data);
		},
  },
  deletereweighfeed:{
    url:`digitalPigeon/breed/informationinput/deletereweighfeed`,
    name:'删除饲料记录',
    post: async function (id) {
			console.log("url", this.url);
			return await http.post(this.url,{id});
		},
  },
}