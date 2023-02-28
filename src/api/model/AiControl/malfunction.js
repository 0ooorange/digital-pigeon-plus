// 故障诊断

import http from '@/utils/request'

// 通过token获取部门下拉菜单
export const getDepartments = () => http.post(`/digitalPigeon/information/DropDownMenu/getDepartments`)

// 通过部门id获得基地下拉菜单
export const getBases = (departmentId) => http.post(`/digitalPigeon/information/DropDownMenu/getBasesByDepartmentId?departmentId=${departmentId}`)

// 通过基地id获取车间/棚下拉菜单
export const getPlant = (departmentId,baseId) => http.post(`/digitalPigeon/information/DropDownMenu/getPlantByBaseId?departmentId=${departmentId}&baseId=${baseId}`)

// 获取数据
export const getTrouble = (department_id, base_id, shed_id, current, size) => http.post(`/digitalPigeon/environment/Ai/device/getTrouble?departmentId=${department_id}&baseId=${base_id}&shedId=${shed_id}&current=${current}&size=${size}`)