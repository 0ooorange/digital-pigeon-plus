<template>
  <div>
    <input type="text" readonly="true" id="lnglat" style="display: none" />
    <div id="map"></div>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader"; // 使用加载器加载JSAPI，可以避免异步加载、重复加载等常见错误加载错误
import { shallowRef } from "@vue/reactivity";
import { onMounted } from "vue";

export default {
  name: "map",

  setup(props, context) {
    const map = shallowRef(null);
    function getLongAndLati(data) {
      let arr = data.split(",");
      context.emit("getlongitude", arr[0]);
      context.emit("getlatitude", arr[1]);
    }

    // 初始化地图
    function initMap() {
      AMapLoader.load({
        key: "d817ed03fe6871a4bd85c69500618e6e", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      })
        .then((AMap) => {
          let map = new AMap.Map("map", {
            //设置地图容器id
            zoom: 10, //初始化地图层级
            viewMode: "3D", //是否为3D地图模式
            center: [115.74446, 24.21877], //初始化地图中心点位置
            dragEnable: true, //禁止鼠标拖拽
            scrollWheel: true, //鼠标滚轮放大缩小
          });
          //为地图注册click事件获取鼠标点击出的经纬度坐标
          map.on("click", function (e) {
            document.getElementById("lnglat").value =
              e.lnglat.getLng() + "," + e.lnglat.getLat();
            getLongAndLati(document.getElementById("lnglat").value);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }

    // 调用地图初始化函数：onMounted 函数会在 DOM 初始化完成后调用，建议在 mounted 函数中调用地图初始化方法
    onMounted(() => {
      initMap();
    });

    return { map, initMap };
  },
};
</script>

<style scoped>
#map {
  width: 300px;
  height: 200px;
}
</style>
