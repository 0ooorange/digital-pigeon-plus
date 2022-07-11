import { createRouter, createWebHashHistory } from "vue-router";
import { ElNotification } from "element-plus";
import config from "@/config";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import tool from "@/utils/tool";
import systemRouter from "./systemRouter";
import userRoutes from "@/config/route";
import { beforeEach, afterEach } from "./scrollBehavior";

import menu from "./menu";

//系统路由
const routes = systemRouter;
//系统特殊路由
const routes_404 = {
	path: "/:pathMatch(.*)*",
	hidden: true,
	component: () => import(/* webpackChunkName: "404" */ "@/layout/other/404"),
};
let routes_404_r = () => {};

const router = createRouter({
	routes: routes,
	history: createWebHashHistory(),
});

//设置标题
document.title = config.APP_NAME;

//判断是否已加载过动态/静态路由
var isGetRouter = false;

router.beforeEach(async (to, from) => {
	NProgress.start();
	//动态标题
	document.title = to.meta.title
		? `${to.meta.title} - ${config.APP_NAME}`
		: `${config.APP_NAME}`;

	let token = tool.cookie.get("TOKEN");

	if (to.path === "/login") {
		//删除路由(替换当前layout路由)
		router.addRoute(routes[0]);
		//删除路由(404)
		routes_404_r();
		isGetRouter = false;
		return;
	}

	if (!token) {
		return "/login";
	}

	//整页路由处理
	if (to.meta.fullpage) {
		to.matched = [to.matched[to.matched.length - 1]];
	}
	//加载动态/静态路由
	if (!isGetRouter) {
		// 保存menu
		tool.data.set("MENU", menu);
		// 获取当前菜单,从vuex/本地获取（登录时存放）
		//   import menu
		// debugger
		// 注册全部路由
		Object.keys(menu).forEach((system) => {
			if (system === "currunt") return;
			const menuRoutes = menuMapRoutes(menu[system]);
			// console.log(system, "=>", menuRoutes, "menuMapRoutes(menu[system]");
			menuRoutes.forEach((r) => router.addRoute(system, r));
			// menuRoutes.forEach((r) => router.addRoute("layout", r));
			// router.addRoute('layout', menuRoutes[0])
		});
		routes_404_r = router.addRoute(routes_404);
		if (to.matched.length == 0) {
			router.push(to.fullPath);
		}
		isGetRouter = true;
	}
	beforeEach(to, from);
	return;
});

router.afterEach((to, from) => {
	afterEach(to, from);
	NProgress.done();
});

router.onError((error) => {
	NProgress.done();
	ElNotification.error({
		title: "路由错误",
		message: error.message,
	});
});

//入侵追加自定义方法、对象
router.sc_getMenu = () => {
	// var apiMenu = tool.data.get("MENU") || [];
	let totalMenus = [
		{
			menuIndex: 0,
			systemName: "breeding",
			menus: [
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
							component:
								"breeding/materialStatistics/fodder/index",
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
								title: "复称饲料",
								icon: "el-icon-office-building",
								type: "menu",
							},
							component: "breeding/registration/reWeighAllot/index",
						},
					],
				},
			],
		},
		{},
		{},
		{},
		{},
		{},
		{},
		{
			menuIndex: 7,
			systemName: "dataVisual",
			menus: [
				{
					name: "dataVisual",
					path: "/dataVisual",
					component: "dataVisual/index",
				},
			],
		},
		{
			menuIndex: 8,
			systemName: "equipVideo",
			menus: [
				{
					name: "videoManage",
					path: "/equipVideo/videoManage",
					meta: {
						title: "视频管理",
						icon: "el-icon-histogram",
						type: "menu",
					},
					component: "equipVideo/videoManage/index",
				},
			],
		},
	];
	let currMenuIndex = tool.data.get("CURR_MENU_INDEX");
	let currMenu = totalMenus[currMenuIndex].menus;
	let userInfo = tool.data.get("USER_INFO");
	let userMenu = treeFilter(userRoutes, (node) => {
		return node.meta.role
			? node.meta.role.filter((item) => userInfo.role.indexOf(item) > -1)
					.length > 0
			: true;
	});
	var menu = [...userMenu, ...currMenu];
	return menu;
};

//转换
function menuMapRoutes(menu = []) {
	let routes = [];
	menu.map(({ path, name, meta = {}, redirect, component, children }) => {
		const route = {
			path,
			name,
			meta,
			redirect,
			component: loadComponent(component),
		};
		// 一级菜单直接生成路由对象
		if (!children) {
			routes.push(route);
		} else {
			const childRoutes = menuMapRoutes(children);
			routes = routes.concat(childRoutes);
		}
	});
	return routes;
}

// function filterAsyncRouter(routerMap) {
//   const accessedRouters = []
//   routerMap.forEach((item) => {
//     item.meta = item.meta ? item.meta : {}
//     //处理外部链接特殊路由
//     if (item.meta.type == 'iframe') {
//       item.meta.url = item.path
//       item.path = `/i/${item.name}`
//     }
//     //MAP转路由对象
//     var route = {
//       path: item.path,
//       name: item.name,
//       meta: item.meta,
//       redirect: item.redirect,
//       children: item.children ? filterAsyncRouter(item.children) : null,
//       component: loadComponent(item.component)
//     }
//     accessedRouters.push(route)
//   })
//   return accessedRouters
// }
function loadComponent(component) {
	if (component) {
		return () =>
			import(/* webpackChunkName: "[request]" */ `@/views/${component}`);
	} else {
		return () => import(`@/layout/other/empty`);
	}
}

// //路由扁平化
// function flatAsyncRoutes(routes, breadcrumb = []) {
//   let res = []
//   routes.forEach((route) => {
//     const tmp = { ...route }
//     if (tmp.children) {
//       let childrenBreadcrumb = [...breadcrumb]
//       childrenBreadcrumb.push(route)
//       let tmpRoute = { ...route }
//       tmpRoute.meta.breadcrumb = childrenBreadcrumb
//       delete tmpRoute.children
//       res.push(tmpRoute)
//       let childrenRoutes = flatAsyncRoutes(tmp.children, childrenBreadcrumb)
//       childrenRoutes.map((item) => {
//         res.push(item)
//       })
//     } else {
//       let tmpBreadcrumb = [...breadcrumb]
//       tmpBreadcrumb.push(tmp)
//       tmp.meta.breadcrumb = tmpBreadcrumb
//       res.push(tmp)
//     }
//   })
//   return res
// }

//过滤树
function treeFilter(tree, func) {
	return tree
		.map((node) => ({ ...node }))
		.filter((node) => {
			node.children = node.children && treeFilter(node.children, func);
			return func(node) || (node.children && node.children.length);
		});
}

export default router;
