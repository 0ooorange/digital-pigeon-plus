// 出栏辅助
import http from "@/utils/request";

export const getMarketingAssistance = (shedId, pageNum, pageSize) => 
	http.post(`/digitalPigeon/breed/breedassistance/getMarketingAssistance?shedId=${shedId}&pageNum=${pageNum}&pageSize=${pageSize}`)