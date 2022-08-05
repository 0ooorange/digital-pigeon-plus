//环境检测

import http from "@/utils/request";

//查询环境数据

export const getCarbonDioxideData = (data = {},type = "") => http.post(`/digitalPigeon/environment/enviroment/sensordevice/getSensorByIDTypeTime` + '?start_time=' + data.start_time + '&end_time=' + data.end_time +  '&shed_id=1518124016571797507' + '&type=' + type);