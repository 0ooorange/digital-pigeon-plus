export default {
	// 养殖管理
	breeding: [
		{
			name: "breedStatistics",
			path: "/breeding/breedStatistics",
			meta: {
				title: "养殖统计",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "breeding/breedStatistics/index",
		},
		{
			name: "breedingAuxiliary",
			path: "/breeding/auxiliary",
			meta: {
				title: "养殖辅助",
				icon: "el-icon-connection",
				type: "menu",
			},
			children: [
				{
					path: "/breeding/auxiliary/incubate",
					name: "incubateAuxiliary",
					meta: {
						title: "抽孵辅助",
						icon: "el-icon-office-building",
						type: "menu",
					},
					component: "breeding/auxiliary/incubate/index",
				},
				{
					path: "/breeding/auxiliary/examEgg",
					name: "examEggAuxiliary",
					meta: {
						title: "查蛋辅助",
						icon: "el-icon-office-building",
						type: "menu",
					},
					component: "breeding/auxiliary/examEgg/index",
				},
				{
					path: "/breeding/auxiliary/examCub",
					name: "examCubAuxiliary",
					meta: {
						title: "查仔辅助",
						icon: "el-icon-office-building",
						type: "menu",
					},
					component: "breeding/auxiliary/examCub/index",
				},
				{
					path: "/breeding/auxiliary/outCage",
					name: "outCageAuxiliary",
					meta: {
						title: "出栏辅助",
						icon: "el-icon-office-building",
						type: "menu",
					},
					component: "breeding/auxiliary/outCage/index",
				},
			],
		},
		{
			name: "breedingManage",
			path: "/breeding/manage",
			meta: {
				title: "养殖管理",
				icon: "el-icon-calendar",
				type: "menu",
			},
			children: [
				{
					path: "/breeding/manage/detail",
					name: "breedingDetail",
					meta: {
						title: "养殖明细",
						icon: "el-icon-office-building",
						type: "menu",
					},
					component: "breeding/manage/detail/index",
				},
				{
					path: "/breeding/manage/allState",
					name: "allStateManage",
					meta: {
						title: "鸽棚总览",
						icon: "el-icon-office-building",
						type: "menu",
					},
					component: "breeding/manage/allState/index",
				},
			],
		},
		{
			name: "dovePerformance",
			path: "/breeding/performance",
			meta: {
				title: "种鸽性能测试",
				icon: "el-icon-compass",
				type: "menu",
			},
			component: "breeding/performance/index",
		},
		{
			name: "operateLog",
			path: "/breeding/operateLog",
			meta: {
				title: "操作日志和统计",
				icon: "el-icon-document",
				type: "menu",
			},
			component: "breeding/operateLog/index",
		},
		{
			name: "materialStatistics",
			path: "/breeding/materialStatistics",
			meta: {
				title: "物料统计",
				icon: "el-icon-data-line",
				type: "menu",
			},
			children: [
				{
					path: "/breeding/materialStatistics/fodder",
					name: "fodderStatistics",
					meta: {
						title: "饲料统计",
						icon: "el-icon-office-building",
						type: "menu",
					},
					component: "breeding/materialStatistics/fodder/index",
				},
			],
		},
		{
			name: "registration",
			path: "/breeding/registration",
			meta: {
				title: "信息登记",
				icon: "el-icon-data-line",
				type: "menu",
			},
			children: [
				{
					path: "/breeding/registration/regOutCage",
					name: "outCageRegistration",
					meta: {
						title: "出栏管理",
						icon: "el-icon-office-building",
						type: "menu",
					},
					component: "breeding/registration/regOutCage/index",
				},
				{
					path: "/breeding/registration/regDove",
					name: "doveRegistration",
					meta: {
						title: "鸽子登记",
						icon: "el-icon-office-building",
						type: "menu",
					},
					component: "breeding/registration/regDove/index",
				},
				{
					path: "/breeding/registration/regFodder",
					name: "fodderRegistration",
					meta: {
						title: "饲料管理",
						icon: "el-icon-office-building",
						type: "menu",
					},
					component: "breeding/registration/regFodder/index",
				},
				{
					path: "/breeding/registration/fodderAllot",
					name: "fodderAllot",
					meta: {
						title: "饲料调拨",
						icon: "el-icon-office-building",
						type: "menu",
					},
					component: "breeding/registration/fodderAllot/index",
				},
				{
					path: "/breeding/registration/reWeighAllot",
					name: "reWeighAllot",
					meta: {
						title: "复称调拨",
						icon: "el-icon-office-building",
						type: "menu",
					},
					component: "breeding/registration/reWeighAllot/index",
				},
			],
		},
	],
	// 环境监控
	equipVideo: [
		{
			name: "envForecast",
			path: "/equipVideo/envForecast",
			meta: {
				title: "环境监测",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "equipVideo/envForecast/index",
		},
		{
			name: "globalVideo",
			path: "/equipVideo/globalVideo",
			meta: {
				title: "视频监控",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "equipVideo/globalVideo/index",
		},
		{
			name: "warnCenter",
			path: "/equipVideo/warnCenter",
			meta: {
				title: "预警中心",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "equipVideo/warnCenter/index",
		},
		{
			name: "setValue",
			path: "/equipVideo/setValue",
			meta: {
				title: "阈值设置",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "equipVideo/setValue/index",
		},
		{
			name: "eauipManage",
			path: "/equipVideo/equipManage",
			meta: {
				title: "设备管理",
				icon: "el-icon-histogram",
				type: "menu",
			},
			children: [
				{
					name: "breeding",
					path: "/equipVideo/equipManage/breeding",
					meta: {
						title: "养殖设备管理",
						icon: "el-icon-histogram",
						type: "menu",
					},
					children: [
						{
							name: "doveBoard",
							path: "/equipVideo/equipManage/breeding/doveBoard",
							meta: {
								title: "鸽板管理",
								icon: "el-icon-histogram",
								type: "menu",
							},
							component:
								"equipVideo/equipManage/breeding/doveBoard/index",
						},
						{
							name: "tagManage",
							path: "/equipVideo/equipManage/breeding/tagManage",
							meta: {
								title: "标签管理",
								icon: "el-icon-histogram",
								type: "menu",
							},
							component:
								"equipVideo/equipManage/breeding/tagManage/index",
						},
					],
				},
			],
		},
	],
	// 产品溯源
	toSource: [
		{
			name: "source",
			path: "/toSource/traceSource",
			meta: {
				title: "溯源管理",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "toSource/traceSource/index",
		},
		{
			name: "blockchain",
			path: "/toSource/blockchain",
			meta: {
				title: "区块链管理",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "toSource/blockchain/index",
		},
	],
	// AI+精准管控
	AIControl: [
		{
			name: "actRcognition",
			path: "/AIControl/actRcognition",
			meta: {
				title: "行为识别",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "AIControl/actRcognition/index",
		},
		{
			name: "forecastCenter",
			path: "/AIControl/forecastCenter",
			meta: {
				title: "预测中心",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "AIControl/forecastCenter/index",
		},
		{
			name: "forecastVideo",
			path: "/AIControl/forecastVideo",
			meta: {
				title: "预测视频",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "AIControl/forecastVideo/index",
		},
	],
	// 基础信息管理
	baseInformation: [
		{
			name: "personInf",
			path: "/baseInformation/personInf",
			meta: {
				title: "个人信息",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "baseInformation/personInf/index",
		},
		{
			name: "baseInfo",
			path: "/baseInformation/baseInfo",
			meta: {
				title: "基地信息",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "baseInformation/baseInfo/index",
		},
		{
			name: "employee",
			path: "/baseInformation/employee",
			meta: {
				title: "员工管理",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "baseInformation/employee/index",
		},
		{
			name: "dovecote",
			path: "/baseInformation/dovecote",
			meta: {
				title: "鸽棚管理",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "baseInformation/dovecote/index",
		},
		{
			name: "baseInfoMana",
			path: "/baseInformation/baseInfoMana",
			meta: {
				title: "基地信息管理",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "baseInformation/baseInfoMana/index",
		},
		{
			name: "authority",
			path: "/baseInformation/authority",
			meta: {
				title: "权限管理",
				icon: "el-icon-histogram",
				type: "menu",
			},
			component: "baseInformation/authority/index",
		},
	],
};
