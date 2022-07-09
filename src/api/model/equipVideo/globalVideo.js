import http from '@/utils/request'
/* 养殖明细 */
export const getMonitorList = (shedID) => http.post('/digitalPigeon/aliyun/video/getListVideoUrlList?sheId=' + shedID)
