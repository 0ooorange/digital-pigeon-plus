// 查蛋辅助
import http from "@/utils/request";

export const checkEggAssistant = (shedId, pageNum, pageSize) => 
		http.post(`/digitalPigeon/breed/breedassistance/checkEggAssistant?shedId=${shedId}&pageNum=${pageNum}&pageSize=${pageSize}`)

export const checkEggNumbers = (shedId) => http.post(`/digitalPigeon/breed/breedassistance/checkEggNumbers?shedId=${shedId}`)