// 查仔辅助
import http from "@/utils/request";

export const checkCubAssistant = (shedId, pageNum, pageSize) => 
		http.post(`/digitalPigeon/breed/breedassistance/checkCubAssistant?shedId=${shedId}&pageNum=${pageNum}&pageSize=${pageSize}`)

export const checkCubNumbers = (shedId) => http.post(`/digitalPigeon/breed/breedassistance/checkCubNumbers?shedId=${shedId}`)