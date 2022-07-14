// 基本框架
import http from "@/utils/request"

// 通过用户id获取基地和棚
export const getBaseAndShed = (data) => http.get(`/digitalPigeon/ucenter/ucenter/pigeon-base/getBaseAndShed`, {userId: data})

// 通过基地id获取基地信息
export const getBaseInfoById = (data) => http.get(`/digitalPigeon/ucenter/ucenter/pigeon-base/getBaseInfoById`, {baseId: data})

