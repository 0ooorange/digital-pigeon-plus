// 抽孵辅助
import http from "@/utils/request";
export const getTakeOrHatchAssistance = (shedId, pageNum, pageSize) => 
		http.post(`/digitalPigeon/breed/breedassistance/getTakeOrHatchAssistance?shedId=${shedId}&pageNum=${pageNum}&pageSize=${pageSize}`)

