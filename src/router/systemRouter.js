import config from "@/config";

//系统路由
const routes = [
	{
		name: "layout",
		path: "/",
		component: () => import(/* webpackChunkName: "layout" */ "@/layout"),
		redirect: config.DASHBOARD_URL || "/login",
		children: [],
	},
	{
		path: "/login",
		component: () => import(/* webpackChunkName: "login" */ "@/views/base/login/index"),
		// component: () => import(/* webpackChunkName: "login" */ '@/views/userCenter/login'),
		meta: {
			title: "登录",
		},
	},
	{
		path: "/navigator",
		component: () =>
			import(
				/* webpackChunkName: "login" */ "@/views/base/navigator/index"
			),
		meta: {
			title: "环形目录",
		},
	},
	{
		path: "/dataVisual",
		component: () =>
			import(
				/* webpackChunkName: "login" */ "@/views/dataVisual/index"
			),
		meta: {
			title: "可视化",
		}
	}
];

export default routes;
