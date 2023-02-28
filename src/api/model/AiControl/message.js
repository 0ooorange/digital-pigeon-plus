import http from "@/utils/request";


const urlSecon = '/digitalPigeon/login/getAuthority/getBreedBaseAndShedByToken'
const url = "/digitalPigeon/environment/enviroment/sms-warning/getSMSInfo"
export const getList = {
    post: async (data={}) => {
        console.log(data,'参数')
        return await http.post(url + `?base=${data.base}&shed=${data.shed}&startTime=${data.startTime}&endTime=${data.endTime}&page=${data.page}&pageSize=${data.pageSize}`)
    }
}

export const getBreedBaseAndShedByToken = () => {
   return http.post(urlSecon)
};