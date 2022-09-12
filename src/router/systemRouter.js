import config from "@/config";

// 子系统需要菜单栏，指定component = Layout
const Layout = () => import(/* webpackChunkName: "layout-chunk" */ "@/layout");
//系统路由
const routes = [
	{
		name: "layout",
		path: "/",
		component: Layout,
		redirect: config.DASHBOARD_URL || "/login",
	},
	{
		name: "breeding",
		path: "/breeding",
		component: Layout,
	},
	{
		name: "equipVideo",
		path: "/equipVideo",
		component: Layout,
	},
	{
		name: "toSource",
		path: "/toSource",
		component: Layout,
	},
	{
		name: "AIControl",
		path: "/AIControl",
		component: Layout,
	},
	{
		name: "baseInformation",
		path: "/baseInformation",
		component: Layout,
	},
	{
		path: "/login",
		component: () =>
			import(/* webpackChunkName: "login-chunk" */ "@/views/base/login"),
		meta: {
			title: "登录",
		},
	},
	{
		name: "navigator",
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
		name: "dataVisual",
		path: "/dataVisual",
		component: () =>
			import(
				/* webpackChunkName: "dataVisual-chunk" */ "@/views/dataVisual"
			),
		meta: {
			title: "可视化",
		},
	},
	{
		name: "dataVisualBase",
		path: "/dataVisualBase",
		component: () =>
			import(
				/* webpackChunkName: "dataVisual-chunk" */ "@/views/dataVisualBase"
			),
		meta: {
			title: "基地可视化",
		},
	},
	{
		name: "dataVisualShed",
		path: "/dataVisualShed",
		component: () =>
			import(
				/* webpackChunkName: "dataVisual-chunk" */ "@/views/dataVisualShed"
			),
		meta: {
			title: "鸽棚可视化",
		},
	},
];

export default routes;
