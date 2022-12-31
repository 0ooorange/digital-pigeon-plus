// 基础信息管理-人员管理

import http from "@/utils/request";

// 通过token获取员工管理界面数据
export const getEmployeeManagementInfoByTokenApi = (params) => http.post(`/digitalPigeon/information/UserManagement/getEmployeeManagementInfoByToken?
	baseId=${params.baseId}&
	departmentId=${params.departmentId}&
	workshopId=${params.workshopId}&
	pageNum=${params.pageNum}&
	pageSize=${params.pageSize}`
)

// 通过员工id修改员工数据
export const updataEmployeeManagementInfoByUserIdApi = (params) => http.post(`/digitalPigeon/information/UserManagement/updataEmployeeManagementInfoByUserId?
	birth=${params.birth}&
	phone=${params.phone}&
	roleId=${params.roleId}&
	sex=${params.sex}&
	userId=${params.userId}&
	userName=${params.userName}&
	address=${params.address}&
	introduce=${params.introduce}`
)

// 通过员工ID删除员工
export const deleteEmployeeByUserIdApi = (params) => http.post(`/digitalPigeon/information/UserManagement/deleteEmployeeByUserId?userId=${params.userId}`)

// 添加用户
export const addUserApi = (params) => http.post(`/digitalPigeon/information/UserManagement/AddUser?
	birth=${params.birth}&
	phone=${params.phone}&
	roleId=${params.roleId}&
	sex=${params.sex}&
	userName=${params.userName}&
	address=${params.address}&
	introduce=${params.introduce}`
)

// 通过token获得部门下拉菜单
export const getDepartmentsApi = () => http.post(`/digitalPigeon/information/DropDownMenu/getDepartments`)

// 通过部门id获得基地下拉菜单
export const getBasesByDepartmentIdApi = (params) => http.post(`/digitalPigeon/information/DropDownMenu/getBasesByDepartmentId?departmentId=${params.departmentId}`)

// 通过基地id获得车间/鸽棚下拉菜单
export const getPlantByBaseIdApi = (params) => http.post(`/digitalPigeon/information/DropDownMenu/getPlantByBaseId?baseId=${params.baseId}&departmentId=${params.departmentId}`)

// 通过部门id获取职位信息(在添加/修改员工时使用)
export const getPositionInfoByDepartmentIdApi = (params) => http.post(`/digitalPigeon/information/UserManagement/getPositionInfoByDepartmentId?departmentId=${params.departmentId}`)


