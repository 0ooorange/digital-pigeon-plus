# ✨ 介绍

本项目使用 vue3 +  webpack + ElementPlusUI + Vuex +less/sass + npm 编写

~~网址：暂未部署~~

# :fire:Quick Start

## :runner:如何运行


```bash
npm i 		  # 安装依赖
npm run dev    # 运行项目脚本
```

## :package:项目结构

```js
┌── public				// 静态资源(不会被Webpack打包)
├── src					// 源代码
│	├── services		// API相关文件
│	├── assets			// 静态资源(会被打包)
│	├── components		// 组件库(包括自定义的组件)
│	├── router			// 路由表(路由相关文件)
│	├── store			// Redux状态管理
│	├── utils			// 全局公用方法/工具函数
│	├── common			// 通用文件(常量)
│	├── pages			// 页面，其中每个文件夹按照功能模块(子系统)划分
│	├── App.tsx			// 入口视图
│	└── index.js		// 入口文件
├── .editorconfig		// 统一编辑器样式
└── .gitignore	    	// git忽略配置
└── craco.config.js		// 项目webpack配置
├── babel.config.js		// babel配置
├── package.json		// 包管理
└── craco.config.js		// webpack配置
└── pnpm-lock.yaml		// pnpm锁版本文件
└── tsconfig.json		// ts配置
```

## :pencil2:页面编写

1.页面在`src/views`下，找到自己的文件夹编写对应代码即可，如无请往下看

举个栗子：需求是需要编写加工模块(Process)下的加工过程管理(ProcessManage)，遵循预设的规范

- 文件夹命名全部小写，中划线分割
- 统一的文件结构
- 等等

2.提交代码：

提交到`dev-*`，*表示当前开发模块及版本，如下例：

~~~bash
git pull origin dev-breeding-v1.0
git push origin dev-breeding-v1.0
~~~

## 👍风格统一

1.表格查询

~~~vue
<template>
  <table-search :searchTypes="searchTypes" :cardData="cardData"  @searchClick="searchClick" @outTable="outTable" />
</template>
<script>
import tableSearch from '@/components/tableSearch/index.vue'
export default {
  name: 'abnormalCaseManage',
  components: {
    tableSearch
  },
  data() {
    return {
      // 这是卡片数据数组，一个元素一个卡片
      // 建议：需要展示的卡片太多就不要传cardData进组件了
      cardData: [{
        cardText: '仔数',
        cardNumber: 666
      }, {
        cardText: '死仔数',
        cardNumber: 666
      }],
      // 查询类型下拉框列表的数据，格式固定
      searchTypes: [{
        value: '鸽笼编号',
        label: '鸽笼编号',
      }, {
        value: '鸽板编号',
        label: '鸽板编号',
      }, {
        value: '日期',
        label: '日期',
      }, {
        value: '仔数',
        label: '仔数',
      }, {
        value: '死仔数',
        label: '死仔数',
      }, {
        value: '负责人',
        label: '负责人',
      }, {
        value: '操作',
        label: '操作',
      }]
    }
  },
  methods: {
    // 表格查询事件
    searchClick() {
      console.log("嘻嘻嘻，我被点击啦")
    },
    // 表格导出事件
    outTable() {
      console.log("哈哈哈，我被点击了噢");
    }
  }
}
</script>
~~~

2.表格

用scTable组件就好，我已经改了一些样式，但是居中还是要使用的时候设置

# :book:简明教程


## Git

开发前，需要确认在你自己的分支上进行

### 一、初始化

链接远程仓库（为远程仓库起别名）

```bash
git remote add origin https://gitee.com/jenny-zhuang/digital-pigeon-plus.git
```

### 二、基本操作

#### 2.1 查看状态

```bash
git status
```

#### 2.2 添加

指定文件提交到暂存区

```bash
git add <filename>
```

将工作目录文件全都提交到缓存区

```bash
git add .
```

#### 2.3 提交

缓存区文件提交到仓库

```bash
git commit -m "<消息>"
```

#### 2.4 推送

推送到远程仓库你的分支上

```bash
git push origin  <你的分支名>
```

# :pushpin:规范

## 代码风格

### ESLint

Eslint 是一个可以检验代码，并给出报告的工具。它的目标是保证代码的一致性，避免错误。

你需要在你的 VSC 安装插件：eslint

![image-20220404092235901](README.assets/image-20220404092235901.png)

### prettier

Prettier 是一款强大的代码格式化工具

你需要在你的 VSC 安装插件：prettier

![image-20210722214543454](README.assets/008i3skNgy1gsq2acx21rj30ow057mxp.jpg)

### editorconfig

约束编辑器代码的风格，消除编码差异：回车符合、缩进距离等

你需要在你的 VSC 安装插件：EditorConfig for VS Code

<img src="README.assets/008i3skNgy1gsq2gh989yj30pj05ggmb.jpg" alt="image-20210722215138665" style="zoom:80%;" align="left"/>

## Git 提交规范

`commit 消息组成：类型 + 冒号 + 空格 + 动宾短语`

如：feat: 完成 xxx 页面编写

fix: 修复了页面无法跳转的 bug

`feat`/`fix`最为常用

### 类型

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中

