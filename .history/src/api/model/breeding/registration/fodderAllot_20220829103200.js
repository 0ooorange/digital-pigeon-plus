// 饲料调拨
import http from "@/utils/request"
import qs from 'qs'
export default {
  getallocatefeed:{
    url:`digitalPigeon/breed/informationinput/getallocatefeed`,
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
  addallocatefeed:{
    url:`digitalPigeon/breed/informationinput/addallocatefeed`,
    name:'添加饲料记录',
    post: async function (data) {
			// console.log("url", this.url);
      // console.log(data.brand);
      let n=data.brand.length;
      let index=0;
      while(n){
        if(data.brand[index]==="") return;
        let params={
          brand:data.brand[index],
          num:data.num[index],
          shedId:data.shedId,
          size:data.size[index],
          weight:data.weight[index],
          origin:data.origin,
          type:0,
          unit:"斤",
        }
        n--;
        if(n===0)
        return await http.post(this.url, params);
        await http.post(this.url, params);
        index++;
		}
  }},
  modifyallocatefeed:{
    url:`digitalPigeon/breed/informationinput/modifyallocatefeed`,
    name:'修改饲料记录',
    post: async function (data) {
			// console.log("url", this.url);
			return await http.post(this.url, data);
		},
  },
  deleteallocatefeed:{
    url:`digitalPigeon/breed/informationinput/deleteallocatefeed`,
    name:'删除饲料记录',
    post: async function (id) {
			// console.log("url", this.url);
			return await http.post(this.url,id,{headers:{'Content-Type':'application/json'}});
		},
  },
}