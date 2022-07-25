import http from "@/utils/request";
/* 养殖明细 */
// export const getMonitorList = (shedID) => http.post('/digitalPigeon/environment/enviroment/camera/getCamera?sheId=' + shedID)
export const getThresholdBYDay = (day) =>
	http.post(
		"/digitalPigeon/environment/enviroment/threshold/getThresholdBYDay?day=" +
			day
	);
export const setThreshold = (form) => {
    console.log(form,'参数')
	// return http.post(
	// 	"/digitalPigeon/environment/enviroment/threshold/setThreshold?day=" +
	// 		form.day +
	// 		"&gmtCreate=" +
	// 		form.gmtCreate +
    //         "&gmtModified=" +
	// 		form.gmtModified +
	// 		"&id=" +
	// 		form.id +
	// 		"&isDeleted=" +
	// 		form.isDeleted +
	// 		"&max=" +
	// 		form.max +
	// 		"&maxinfo=" +
	// 		form.maxinfo +
	// 		"&min=" +
	// 		form.min +
	// 		"&mininfo=" +
	// 		form.mininfo +
	// 		"&name=" +
	// 		form.name +
	// 		"&version=" +
	// 		form.version 
	// );
    return http.post(
		"/digitalPigeon/environment/enviroment/threshold/setThreshold",form
	);
};
// export const getMonitorInfo = (id) => http.post('/digitalPigeon/environment/enviroment/camera/getCameraByID?id=' + id)
