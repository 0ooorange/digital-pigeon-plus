// 鸽子登记
import http from "@/utils/request"
import qs from 'qs'
export default {
  getpigeon:{
    url:``,
    name:'获取鸽子记录',
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
  addpigeon:{
    url:`digitalPigeon/breed/informationinput/addpigeon`,
    name:'增加鸽子记录',
    post: async function (data) {
			console.log("url", this.url);
			return await http.post(this.url, data);
		},
  },
  modifypigeon:{
    url:``,
    name:'修改鸽子记录',
    post: async function (data) {
			console.log("url", this.url);
			return await http.post(this.url, data);
		},
  },
  deletepigeon:{
    url:``,
    name:'删除鸽子记录',
    post: async function (id) {
			console.log("url", this.url);
			return await http.post(this.url,id,{headers:{'Content-Type':'application/json'}});
		},
  },
}