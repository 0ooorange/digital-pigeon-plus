// 基础信息管理-部门管理

import http from "@/utils/request";

// 通过token获取部门列表
export const getDivisionListApi = () => http.post(`/digitalPigeon/information/DepartmentManagement/getDepartmentInformation`);
