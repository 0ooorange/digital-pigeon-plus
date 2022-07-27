// 养殖统计
import http from "@/utils/request"

const baseUrl = '/digitalPigeon/breed/breed/breedstatistic/breedstatistic-pigeon-cage-state-entity'

// 根据鸽棚ID查询成鸽对数
export const getNumberOfParents = (shed_id) => http.get(`${baseUrl}/getNumberOfParents/${shed_id}`)

// 根据鸽棚ID查询幼鸽数
export const getNumberOfChildren = (shed_id) => http.get(`${baseUrl}/getNumberOfChildren/${shed_id}`)

// 根据鸽棚ID和起止日期统计抽蛋数量
export const getNumOfTakeEgg = (shed_id, start_time, end_time) => http.get(`${baseUrl}/getNumOfTakeEgg/${shed_id}/${start_time}/${end_time}`)

// 根据鸽棚ID和起止时间查询产蛋数
export const getNumOfLayEggs = (shed_id, start_time, end_time) => http.get(`${baseUrl}/getNumOfLayEggs/${shed_id}/${start_time}/${end_time}`)

// 根据鸽棚ID和起止时间查询出仔数
export const getNumOfCubs = (shed_id, start_time, end_time) => http.get(`${baseUrl}/getNumOfCubs/${shed_id}/${start_time}/${end_time}`)

// 根据鸽棚ID和起止时间查询出栏数
export const getNumOfOut = (shed_id, start_time, end_time) => http.get(`${baseUrl}/getNumOfOut/${shed_id}/${start_time}/${end_time}`)

// 通过鸽棚ID和起止时间统计死仔数
export const getNumOfDeath = (shed_id, start_time, end_time) => http.get(`${baseUrl}/getNumOfDeath/${shed_id}/${start_time}/${end_time}`)

// 根据鸽棚ID和起止时间查询鸽棚饲料用料情况
export const getFeedShedByIDTime = (shed_id, start_time, end_time) => http.get(`${baseUrl}/getFeedShedByIDTime/${shed_id}/${start_time}/${end_time}`)

// 获取监控视频id
export const getMonitorByShedID = (data) => http.post(`/digitalPigeon/aliyun/video/getListVideoUrlList?sheId=${data}`)
