// 饲料复称
import http from "@/utils/request"
import qs from 'qs'
export default {
  getreweighfeed:{
    url:`digitalPigeon/breed/informationinput/getreweighfeed`,
    name:'获取饲料记录',
    post: async function (data) {
			// console.log("url", this.url);
      let params =qs.stringify({
        pageNum:data.page,
        pageSize:data.pageSize,
        shedId:data.shedId,
        startTime:data.startTime,
        endTime:data.endTime
      })
      // console.log("参数",params);
			return await http.post(this.url, params);
		},
  },
  addreweighfeed:{
    url:`digitalPigeon/breed/informationinput/addreweighfeed`,
    name:'添加饲料记录',
    post: async function (data) {
			// console.log("url", this.url);
>>>>>>> 7ead86bfa0533e573907fb7c1f5665a7c47594c4
      let params={
        shedId:data.shedId,
        weight:data.weight,
        type:3,
        unit:"斤",
      }
			return await http.post(this.url, params);
		},
  },
  modifyreweighfeed:{
    url:`digitalPigeon/breed/informationinput/modifyreweighfeed`,
    name:'修改饲料记录',
    post: async function (data) {
			// console.log("url", this.url);
			return await http.post(this.url, data);
		},
  },
  deletereweighfeed:{
    url:`digitalPigeon/breed/informationinput/deletereweighfeed`,
    name:'删除饲料记录',
    post: async function (id) {
			// console.log("url", this.url);
			return await http.post(this.url,id,{headers:{'Content-Type':'application/json'}});
		},
  },
}