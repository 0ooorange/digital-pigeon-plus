// 基地可视化
import http from "@/utils/request"

const baseUrl = '/digitalPigeon/visualization/pigeonshedvisualization/shed'

// 鸽棚信息
export const getPigeonShedInfo = (shed_id) => http.post(`${baseUrl}/getPigeonShedInfo?shedId=${shed_id}`)

// 饲料统计
export const getFeedStatistics = (shed_id) => http.post(`${baseUrl}/getFeedStatistics?shedId=${shed_id}`)

// 蛋异常统计
export const getEggAbnormal = (shed_id) => http.post(`${baseUrl}/getEggAbnormal?shedId=${shed_id}`)

// 仔数统计
export const getCubStatistics = (shed_id, start_time, end_time) => http.post(`${baseUrl}/getCubStatistics?startTime=${start_time}&endTime=${end_time}&shedId=${shed_id}`)

// 产蛋统计
export const getLayEggNumStatistics = (shed_id) => http.post(`${baseUrl}/getLayEggNumStatistics?shedId=${shed_id}`)

// 产蛋统计
export const getSensor = (shed_id, type) => http.post(`${baseUrl}/getSensor?shedid=${shed_id}&type=${type}`)