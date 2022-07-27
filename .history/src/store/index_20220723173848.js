/**
 * @description 自动import导入所有 vuex 模块
 */

import { createStore } from 'vuex';

const files = require.context('./modules', false, /\.js$/);
const modules = {}
files.keys().forEach((key) => {
	modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
console.log(modules)
export default createStore({
	modules
});
