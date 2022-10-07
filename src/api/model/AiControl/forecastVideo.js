import http from "@/utils/request";

export const getVideo =  {
	url: `/digitalPigeon/aliyun/video/getPlayVideoUrl`,
	name: "随机获取预测视频",
	post: async function (videoId) {
		return await http.post(`${this.url}?videoId=${videoId}`);
	},
}
