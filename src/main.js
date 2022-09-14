import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import "./style/element-reset.scss";
import scui from "./scui";
import i18n from "./locales";
import router from "./router";
import store from "./store";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus, { size: "default" });
app.use(i18n);
app.use(scui);

//挂载app
app.mount("#app");


// 视频插件



// import VideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

// app.use(VideoPlayer)

