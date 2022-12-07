// 基础信息管理-用户管理

import http from "@/utils/request";

// 通过token获取个人信息
export const getPersonalInfoApi = () => http.post(`/digitalPigeon/information/UserManagement/getpersonalInformation`);

// 通过token修改个人信息
export const editorPersonalInfoApi = (params) => http.post(`/digitalPigeon/information/UserManagement/updataPersonalInformation?
	address=${params.address}&
	birth=${params.birth}&
	introduce=${params.introduce}&
	phone=${params.phone}`
);

// 通过token修改用户密码
export const editorUserPasswordApi = (params) => http.post(`/digitalPigeon/information/UserManagement/updataPersonalPassword?password=${params}`);

