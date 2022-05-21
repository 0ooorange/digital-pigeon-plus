import config from "@/config";

//系统路由
const routes = [
	{
		name: "layout",
		path: "/",
		component: () => import(/* webpackChunkName: "layout-chunk" */ "@/layout"),
		redirect: config.DASHBOARD_URL || "/login",
	},
	{
		path: "/login",
		component: () => import(/* webpackChunkName: "login-chunk" */ "@/views/base/login"),
		meta: {
			title: "登录",
		},
	},
	{
		path: "/navigator",
		component: () =>
			import(
				/* webpackChunkName: "navigator-chunk" */ "@/views/base/navigator"
			),
		meta: {
			title: "环形目录",
		},
	},
	{
		path: "/dataVisual",
		component: () =>
			import(
				/* webpackChunkName: "dataVisual-chunk" */ "@/views/dataVisual"
			),
		meta: {
			title: "可视化",
		}
	}
];

export default routes;
