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
│	├── api     		// 接口
│	├── assets			// 静态资源(会被打包)
│	├── components		// 组件库(包括自定义的组件)
│	├── config          // 配置
│	├── directives      // 自定义指令
│	├── layout          // 框架布局视图
│	├── router			// 路由表(路由相关文件)
│	├── store			// VUEX状态管理
│	├── style           // 全局样式
│	├── utils			// 全局公用方法/工具函数
│	├── views			// 视图，其中每个文件夹按照功能模块(子系统)划分
│	├── App.vue			// 入口视图
│	└── main.js		    // 入口文件
├── .editorconfig		// 统一编辑器样式
├── .gitignore	    	// git忽略配置
├── babel.config.js		// babel配置
└── package.json		// 包管理
```

## :pencil2:页面编写

页面在`src/views`下，找到自己的文件夹编写对应代码即可，如无请往下看

举个栗子：需求是需要编写养殖管理系统(breedingSystem)下的养殖统计(breedingStatistics)，遵循预设的规范

- 文件夹命名全部以“小驼峰命名法”命名
- 统一的文件结构
- 等等

## 🚔提交代码

提交到`dev-*`，*表示当前开发模块及版本，如下例：（ZZN为本地分支）

~~~bash
git pull origin dev-breeding-v1.0
git push origin ZZN:dev-breeding-v1.0
~~~

## 👍风格统一

1.表格查询

（1）用法一

~~~vue
<template>
  <table-search :searchTypes="searchTypes" :cardData="cardData"  @searchClick="searchClick" 
                @reset="reset" @outTable="outTable" />
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    // 这是卡片数据数组，一个元素一个卡片，元素超过两个自动渲染到查询模块下方
    cardData: [
      {
        cardText: '查仔个数',
        cardNumber: '666只',
      },
      {
        cardText: '查仔个数',
        cardNumber: '666只',
      },
      {
        cardText: '查仔个数',
        cardNumber: '666只',
      }
    ],
    // 查询类型下拉框列表的数据示例，value和label为必传，其他需求可自行添加
    const searchTypes = [
      {
        value: '鸽笼号',
        label: '鸽笼号',
      },
      {
        value: '板子号',
        label: '板子号',
      },
      {
        value: '生蛋天数',
        label: '生蛋天数',
      },
      {
        value: '孵化天数',
        label: '孵化天数',
      }
    ]
  }
  
  const searchClick = () => {
    console.log('点击查询')
  }

  const reset = () => {
    console.log('点击重置')
  }

  const outTable = () => {
    console.log('点击导出')
  }
  
  return {
    searchTypes,
    cardData,
    searchClick,
    reset,
    outTable
  }
}
</script>
~~~

（2）用法二

~~~vue
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    // 这是卡片数据数组，一个元素一个卡片，元素超过两个自动渲染到查询模块下方
    cardData: [
      {
        cardText: '查仔个数',
        cardNumber: '666只',
      },
      {
        cardText: '查仔个数',
        cardNumber: '666只',
      },
      {
        cardText: '查仔个数',
        cardNumber: '666只',
      }
    ],
    // 查询类型下拉框列表的数据，value和label为必传，其他需求可自行添加
    const searchTypes = [
      {
        value: '鸽笼号',
        label: '鸽笼号',
      },
      {
        value: '板子号',
        label: '板子号',
      },
      {
        value: '生蛋天数',
        label: '生蛋天数',
      },
      {
        value: '孵化天数',
        label: '孵化天数',
      }
    ]

    const searchClick = () => {
      console.log('点击查询')
    }

    const reset = () => {
      console.log('点击重置')
    }

    const outTable = () => {
      console.log('点击导出')
    }

    return () => (
      <>
        <table-search
          searchTypes={searchTypes}
          onSearchClick={searchClick}
          onReset={reset}
          onOutTable={outTable}
        ></table-search>
      </>
    )
  },
})
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

推送到远程仓库分支上

```bash
git push origin <远程分支名>: <本地分支名>
```

# :pushpin:规范

## 代码风格

### ESLint

Eslint 是一个可以检验代码，并给出报告的工具。它的目标是保证代码的一致性，避免错误。

你需要在你的 VSC 安装插件：ESLint

### prettier

Prettier 是一款强大的代码格式化工具

你需要在你的 VSC 安装插件：Prettier-Code formatter

### editorconfig

约束编辑器代码的风格，消除编码差异：回车符合、缩进距离等

你需要在你的 VSC 安装插件：EditorConfig for VS Code

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

