// 基础信息管理-养殖鸽棚管理

import http from "@/utils/request";

// 获取鸽棚信息
export const getShedListByBaseIdApi = (params) => http.post(`/digitalPigeon/information/WorkshopAndShedManagement/getShedListByBaseId?
	baseId=${params.baseId}&
	pageNum=${params.pageNum}&
	pageSize=${params.pageSize}`
)

// 修改鸽棚信息
export const updateShedByShedIdApi = (params) => http.post(`/digitalPigeon/information/WorkshopAndShedManagement/updateShedByShedId?
	id=${params.id}&
	cage_num=${params.cage_num}&
	code=${params.code}&
	column_num=${params.column_num}&
	floor_num=${params.floor_num}&
	if_take=${params.if_take}&
	row_num=${params.row_num}&
	take_hatch_perc=${params.take_hatch_perc}`
)

// 添加鸽棚
export const addShedApi = (params) => http.post(`/digitalPigeon/information/WorkshopAndShedManagement/addShed?
	base_id=${params.base_id}&
	cage_num=${params.cage_num}&
	code=${params.code}&
	column_num=${params.column_num}&
	floor_num=${params.floor_num}&
	user_id=${params.user_id}&
	if_take=${params.if_take}&
	row_num=${params.row_num}&
	take_hatch_perc=${params.take_hatch_perc}`
)

// 删除鸽棚信息
export const deleteShedByIdApi = (params) => http.post(`/digitalPigeon/information/WorkshopAndShedManagement/deleteShedById?id=${params.id}`)

// 选择基地下拉菜单(在鸽棚/基地中使用)
export const getAllBaseApi = () => http.post(`/digitalPigeon/information/DropDownMenu/getAllBase`)

// 选择员工下拉菜单(在鸽棚/基地中使用)
export const getAllShedUserDropDownApi = () => http.post(`/digitalPigeon/information/DropDownMenu/getAllShedUser`)

