// 出栏管理
import http from "@/utils/request"
import qs from 'qs'
export default {
  delivermanagement:{
    url:`digitalPigeon/breed/informationinput/delivermanagement`,
    name:'获取出栏记录',
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
  adddeliver:{
    url:`digitalPigeon/breed/informationinput/adddeliver`,
    name:'增加出栏记录',
    post: async function (data) {
<<<<<<< HEAD
			console.log("url", this.url);
=======
			// console.log("url", this.url);
>>>>>>> 7ead86bfa0533e573907fb7c1f5665a7c47594c4
			return await http.post(this.url, data);
		},
  },
  modifydeliver:{
    url:`digitalPigeon/breed/informationinput/modifydeliver`,
    name:'修改出栏记录',
    post: async function (data) {
<<<<<<< HEAD
			console.log("url", this.url);
=======
			// console.log("url", this.url);
>>>>>>> 7ead86bfa0533e573907fb7c1f5665a7c47594c4
			return await http.post(this.url, data);
		},
  },
  deletedeliver:{
    url:`digitalPigeon/breed/informationinput/deletedeliver`,
    name:'删除出栏记录',
    post: async function (id) {
<<<<<<< HEAD
			console.log("url", this.url);
=======
			// console.log("url", this.url);
>>>>>>> 7ead86bfa0533e573907fb7c1f5665a7c47594c4
			return await http.post(this.url,id,{headers:{'Content-Type':'application/json'}});
		},
  },
}