/**
 * @description 自动import导入所有 api 模块
 */

const files = require.context('./model', true, /\.js$/)

const modules = {}
files.keys().forEach((key) => {
	const newKey = key.split('/')
	modules[newKey[newKey.length - 1].replace(/(\.\/|\.js)/g, '')] = files(key).default
})
console.log(module)
export default modules
