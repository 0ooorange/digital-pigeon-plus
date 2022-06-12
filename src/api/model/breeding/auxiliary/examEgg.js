// 查蛋辅助
import http from "@/utils/request";
import Qs from 'qs'

export default{
    checkEggAssistant: {
        url: `/digitalPigeon/breed/breedassistance/checkEggAssistant`,
        post: async function (data) {
            var params =  Qs.stringify({
                pageNum: data.pageNum,
                pageSize: data.pageSize,
                shedId: "1518124016571797507",
            });
            return await http.post(this.url, params,{headers:{'Content-Type':'application/x-www-form-urlencoded'}});
        },
    },
}
