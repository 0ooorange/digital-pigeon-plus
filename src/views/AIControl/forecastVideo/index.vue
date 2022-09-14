<template>
  <div class="container">
    <div class="cell no1">
      <video controls autoplay id="videoId1">
        <source :src="videoSrc1" type="video/mp4" />
        <!-- <source src="movie.ogg" type="video/ogg"> -->
        <!-- <source src="movie.webm" type="video/webm"> -->
        您的浏览器不支持 video 属性。
      </video>
    </div>
	<!-- <MyVideo video="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" cover=""  /> -->
    <!-- <div class="demo">
      <video-player
        class="video-player vjs-custom-skin"
        :playsinline="true"
        :options="playerOptions"
      >
      </video-player>
    </div> -->
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { getVideo } from "@/api/model/AiControl/forecastVideo";
import { MyVideo } from './video.vue';

export default {
  name: "forecastVideo", // 预测视频
  components: {
    MyVideo,
  },
  setup() {
    onMounted(() => {
      showPage_methods.getRandomVideo();
    });
    const showPage_state = reactive({
      videoId: [
        "72f8d217fb534d3ab27a6b76150b2360",
        "f934c9ed1eb64f72b54098bd4e60e09e",
        "b5ed2aa1d2b14d2d923b829e906e44a7",
        "42f1d54c92da47e6b1402d42001680d4",
        "4ff564b09b6544d5a0ae90568dcfba71",
        "d7281faaafbe4c418a38e6c22a475744",
        "589f8d6f72e74ed0b1d9bbf7202f93b1",
        "dc36ab74ecab4f0687d20a5cc85dec1c",
        "dc6e635e27b6420ebf02ad1b23a22c0e",
        "045a547fadd147f295d590d94a66a54e",
      ],
      videoSrc1: "",
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: "https://outin-8d4956b72a9911eda11400163e1c9256.oss-cn-shanghai.aliyuncs.com/sv/2f3c5171-18308d7d09b/2f3c5171-18308d7d09b.mp4?Expires=1662304902&OSSAccessKeyId=LTAI3DkxtsbUyNYV&Signature=trfPs7QmWk2jw9l7tNxG6ffjLNs%3D", // url地址
          },
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
    });
    const showPage_methods = {
      async getRandomVideo() {
        let index =
          Math.floor(Math.random() * showPage_state.videoId.length + 1) - 1;
        console.log(index);
        const res = await getVideo.post(showPage_state.videoId[0]);
        showPage_state.videoSrc1 = res.data.url;
        // console.log(res);
        console.log(showPage_state.videoSrc1);
        var video = document.getElementById("videoId1");

        video.addEventListener("ended", function () {}, false);
      },
    };
    return {
      ...toRefs(showPage_state),
      ...showPage_methods,
    };
  },
};
</script>

<style scoped lang="scss">
/*CSS Reset*/
.container,
.container * {
  padding: 0;
  margin: 0;
  line-height: 0;
}
.cell {
  width: 100%;
  height: 300px;
  // height: 100%;
  margin: 0;
}
.cell > iframe {
  width: 100%;
  height: 100%;
  // background-color: rgb(203, 238, 230);
  margin: 0;
  // padding: 0;
}

/*方案二 ———— flex*/
.container {
  display: flex;
  flex-flow: column;
}
.container > div {
  display: flex;
  // margin: 5px 0;
}
.cell > div {
  // margin: 0 5px;
}
</style>
