<template>
  <div class="swiper_box">
    <img @mouseover="overImg" @mouseout="showImg" :src="banners[swiper_id]" class="swiper_img" />
    <div class="swiper_circular">
      <div :class="index==swiper_id?'swiper_circular_child':''" @mouseover="circular(index)" v-for="(item, index) in banners.length" :key="index"></div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {
    const swiper_id = ref(0) //定义索引
    const banners = reactive([])
    //获取轮播图片
    banners.value = [
      './img/variety1.jpg',
      './img/variety1.jpg',
      './img/variety1.jpg',
      './img/variety1.jpg',
    ]
    var timerArr = []
    //轮播播放
    var showImg = function () {
      timerArr.push(
        setInterval(() => {
          swiper_id.value = (swiper_id.value + 1) % banners.length
        }, 3000)
      )
    }
    //轮播暂停
    const overImg = () => {
      while (timerArr.length !== 0) {
        clearInterval(timerArr.pop())
      }
    }
    //圆点选择图片
    const circular = (e) => {
      swiper_id.value = e
    }
    showImg()
    return {
      banners,
      swiper_id,
      showImg,
      overImg,
      circular,
    }
  },
}
</script>

<style lang="scss" scoped>
.swiper_box {
  height: 100%;
  width: 100%;
  .swiper_img {
    height: 100%;
    width: 100%;
  }
}
</style>