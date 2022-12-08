// 基础信息管理-基地管理

import http from "@/utils/request";

// 获取基地
export const getBaseInfoApi = (params) => http.post(`/digitalPigeon/information/ArchitectureManagement/getBaseInformation?
	departmentId=${params.departmentId}&
	pageNum=${params.pageNum}&
	pageSize=${params.pageSize}`
);

// 更新基地
export const editBaseInfoApi = (params) => http.post(`/digitalPigeon/information/ArchitectureManagement/updataBaseInformation?
	baseId=${params.baseId}&
	address=${params.address}&
	area=${params.area}&
	baseName=${params.baseName}&
	city=${params.city}&
	code=${params.code}&
	introduction=${params.introduction}&
	latitude=${params.latitude}&
	longitude=${params.longitude}&
	province=${params.province}&
	scale=${params.scale}&
	userId=${params.userId}`
)

// 添加基地
export const addBaseInfoApi = (params) => http.post(`/digitalPigeon/information/ArchitectureManagement/addBaseInformation?
	address=${params.address}&
	area=${params.area}&
	baseName=${params.baseName}&
	city=${params.city}&
	code=${params.code}&
	departmentId=${params.departmentId}&
	introduction=${params.introduction}&
	latitude=${params.latitude}&
	longitude=${params.longitude}&
	province=${params.province}&
	scale=${params.scale}&
	userId=${params.userId}`
)

// 删除基地
export const deleteBaseByIdApi = (params) => http.post(`/digitalPigeon/information/ArchitectureManagement/deleteBaseById?baseId=${params.baseId}`)

// 通过token获得部门下拉菜单
export const getDivisionDropDownApi = () => http.post(`/digitalPigeon/information/DropDownMenu/getDepartments`)

// 选择员工下拉菜单(在鸽棚/基地中使用)
export const getShedDropDownApi = () => http.post(`/digitalPigeon/information/DropDownMenu/getAllShedUser`)

