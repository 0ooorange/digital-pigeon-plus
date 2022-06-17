// 养殖统计
import http from "@/utils/request"

  export default {
    getNumberOfParents: {
      url: `/digitalPigeon/breed/breed/breedstatistic/breedstatistic-pigeon-cage-state-entity/getNumberOfParents`,
      get: async function(breedId){
        return await http.get(this.url+`/${breedId}`);
      }
    },
    getNumberOfChildren: {
      url: `/digitalPigeon/breed/breed/breedstatistic/breedstatistic-pigeon-cage-state-entity/getNumberOfChildren`,
      get: async function(shed_id){
        return await http.get(this.url+`/${shed_id}`);
      }
    },
    getNumOfTakeEgg: {
      url: `/digitalPigeon/breed/breed/breedstatistic/breedstatistic-pigeon-cage-state-entity/getNumOfTakeEgg`,
      get: async function(shed_id,start_time,end_time){
        return await http.get(this.url+`/${shed_id}/${start_time}/${end_time}`);
      }
    },
    getNumOfLayEggs: {
      url: `/digitalPigeon/breed/breed/breedstatistic/breedstatistic-pigeon-cage-state-entity/getNumOfLayEggs`,
      get: async function(shed_id,start_time,end_time){
        return await http.get(this.url+`/${shed_id}/${start_time}/${end_time}`);
      }
    },
    getNumOfCubs: {
      url: `/digitalPigeon/breed/breed/breedstatistic/breedstatistic-pigeon-cage-state-entity/getNumOfCubs`,
      get: async function(shed_id,start_time,end_time){
        return await http.get(this.url+`/${shed_id}/${start_time}/${end_time}`);
      }
    },
    getNumOfOut: {
      url: `/digitalPigeon/breed/breed/breedstatistic/breedstatistic-pigeon-cage-state-entity/getNumOfOut`,
      get: async function(shed_id,start_time,end_time){
        return await http.get(this.url+`/${shed_id}/${start_time}/${end_time}`);
      }
    },
    getNumOfDeath: {
      url: `/digitalPigeon/breed/breed/breedstatistic/breedstatistic-pigeon-cage-state-entity/getNumOfDeath`,
      get: async function(shed_id,start_time,end_time){
        return await http.get(this.url+`/${shed_id}/${start_time}/${end_time}`);
      }
    },
    getFeedShedByIDTime: {
      url: `/digitalPigeon/breed/breed/breedstatistic/breedstatistic-pigeon-cage-state-entity/getFeedShedByIDTime`,
      get: async function(shed_id,start_time,end_time){
        return await http.get(this.url+`/${shed_id}/${start_time}/${end_time}`);
      }
    },
    // 获取监控视频id
    getMonitorByShedID: {
      url: `/digitalPigeon/breed/breed/breedstatistic/breedstatistic-pigeon-cage-state-entity/getMonitorByShedID`,
      get: async function(breedId){
        return await http.get(this.url+`/${breedId}`);
      }
    },
    // 根据监控视频id获取对应的监控视频资料
     getMonitorByID: {
      url: `/digitalPigeon/breed/breed/breedstatistic/breedstatistic-pigeon-cage-state-entity/getMonitorByID`,
      get: async function(breedId){
        return await http.get(this.url+`/${breedId}`);
      }
    },
  }