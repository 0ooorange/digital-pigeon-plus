import http from "@/utils/request";

//获取环境数据环境
// export const getPredict = (data) => http.post('/predict/api/v1/predict/?feature=' + data.feature + '&data=' + data.data + '&target_length=' + data.target_length);

export const getPredict = (data) => http.post('/api/v1/predict/',data);