<template>
  <div id="amap">
    <div></div>
  </div>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  props: {
    adress: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      map: null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: 'd817ed03fe6871a4bd85c69500618e6e', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [''] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map('amap', {
            //设置地图容器id
            viewMode: '3D', //是否为3D地图模式
            zoom: 10, //初始化地图级别
            center: [115.74446, 24.21877] //初始化地图中心点位置
          })
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
#amap {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}
</style>
