import http from "@/utils/request";

//获取环境数据环境
export const getActRcognition = (data,config={}) => http.post('/images' ,data,config);

// export const getPredict = (data) => http.post('/api/v1/predict/',data);