import http from '@/utils/request'
/* 养殖明细 */
// export const getMonitorList = (shedID) => http.post('/digitalPigeon/environment/enviroment/camera/getCamera?sheId=' + shedID)
export const getMonitorList = () => http.post(`/digitalPigeon/environment/enviroment/camera/getCamera`)
export const getMonitorInfo = (id) => http.post('/digitalPigeon/environment/enviroment/camera/getCameraByID?id=' + id)
