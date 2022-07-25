const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);
module.exports = {
	//设置为空打包后不分更目录还是多级目录
	publicPath: "",
	//build编译后存放静态文件的目录
	//assetsDir: "static",

	// build编译后不生成资源MAP文件
	productionSourceMap: false,

	//开发服务,build后的生产模式还需nginx代理
	devServer: {
		open: true, //运行后自动打开浏览器
		port: 2800, //挂载端口
		proxy: {
			// 养殖模块
			"/digitalPigeon": {
				target: "http://106.12.160.172:8000",
				ws: true,
				// pathRewrite: {
				// 	"^/digitalPigeon": "/digitalPigeon",
				// },
			},

			images: {
				target: "http://106.12.160.172:8013",
				pathRewrite: {
					"^/images": "/images",
				},
			},
		},
	},
	chainWebpack: (config) => {
		// 移除 prefetch 插件
		config.plugins.delete("preload");
		config.plugins.delete("prefetch");
		config.resolve.alias.set("vue-i18n", "vue-i18n/dist/vue-i18n.cjs.js");
		config.resolve.alias.set("@", resolve("src"));
		config.resolve.alias.set("@components", resolve("src/components"));
		config.resolve.alias.set("@api", resolve("src/api/model"));
		config.resolve.alias.set("@utils", resolve("src/utils"));
		config.resolve.alias.set("@images", resolve("src/assets/images"));
		config.resolve.alias.set("@icons", resolve("src/assets/icons"));
		config.resolve.alias.set("@style", resolve("src/style"));
		config.resolve.alias.set("@store", resolve("src/store/modules"));
	},

	configureWebpack: (config) => {
		//性能提示
		config.performance = {
			hints: false,
		};
		config.optimization = {
			splitChunks: {
				chunks: "all",
				automaticNameDelimiter: "~",
				name: true,
				cacheGroups: {
					//第三方库抽离
					vendor: {
						name: "modules",
						test: /[\\/]node_modules[\\/]/,
						priority: -10,
					},
					elicons: {
						name: "elicons",
						test: /[\\/]node_modules[\\/]@element-plus[\\/]icons[\\/]/,
					},
					tinymce: {
						name: "tinymce",
						test: /[\\/]node_modules[\\/]tinymce[\\/]/,
					},
					echarts: {
						name: "echarts",
						test: /[\\/]node_modules[\\/]echarts[\\/]/,
					},
					xgplayer: {
						name: "xgplayer",
						test: /[\\/]node_modules[\\/]xgplayer.*[\\/]/,
					},
				},
			},
		};
	},
};
