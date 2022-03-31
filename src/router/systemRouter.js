import config from "@/config"

//系统路由
const routes = [
	{
		name: "layout",
		path: "/",
		component: () => import(/* webpackChunkName: "layout" */ '@/layout'),
		redirect: config.DASHBOARD_URL || '//breedingSystem/breedingStatistics',
		children: []
	},
	{
		path: "/login",
		// component: () => import(/* webpackChunkName: "login" */ '@/views/base/login/login'),
		component: () => import(/* webpackChunkName: "login" */ '@/views/userCenter/login'),
		meta: {
			title: "登录"
		}
	},
	{
		path: "/navigator",
		component: () => import(/* webpackChunkName: "login" */ '@/views/base/navigator/navigator'),
		meta: {
			title: "环形目录"
		}
	}
]

export default routes;
