export default {
	//   currunt: '',
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
						title: "出栏登记",
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
						title: "饲料登记",
						icon: "el-icon-office-building",
						type: "menu",
					},
					component: "breeding/registration/regFodder/index",
				},
			],
		},
	],
	equipVideo: [
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
					],
				},
			],
		},
		{
			name: "videoManage",
			path: "/equipVideo/videoManage",
			meta: {
				title: "视频管理",
				icon: "el-icon-histogram",
				type: "menu",
			},
			children: [
				{
					name: "globalVideo",
					path: "/equipVideo/videoManage/globalVideo",
					meta: {
						title: "全局监控",
						icon: "el-icon-histogram",
						type: "menu",
					},
					component: "equipVideo/videoManage/globalVideo/index",
				},
			],
		},
	],
	//   dataVisual: [
	//     {
	//       name: 'dataVisual',
	//       path: '/dataVisual',
	//       component: 'dataVisual/index'
	//     }
	//   ]
};
