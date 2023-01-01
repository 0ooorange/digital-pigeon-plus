// 登录
import http from "@/utils/request"
// 登录获取TOKEN
// export const login = (data) => http.post(`/digitalPigeon/ucenter/ucenter/new-user/login?NameOrPhone=${data.NameOrPhone}&password=${data.password}`)

// 登录获取TOKEN
export const login = (data) => http.post(`/digitalPigeon/login/getToken?NameOrPhone=${data.NameOrPhone}&password=${data.password}`)

// 根据TOKEN获取个人信息
export const getPersonalInfo = () => http.post(`/digitalPigeon/login/getAuthority/getpersonalInformation`)

// 根据TOKEN获取用户菜单
export const getUserMenu = () => http.post(`/digitalPigeon/login/getAuthority/getUserMenuByToken`)

// 根据TOKEN获取基地和棚
export const getBreedBaseAndShed = (data) => http.post(`/digitalPigeon/login/getAuthority/getBreedBaseAndShedByToken?baseId=${data}`)
export const getBreedBaseAndShed_0 = () => http.post(`/digitalPigeon/login/getAuthority/getBreedBaseAndShedByToken`)

