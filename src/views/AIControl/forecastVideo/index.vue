<template>
    <div class="container">
      <div>
        <div class="cell no1">
			<!--autoplay muted 两个属性组合在一起才能自动播放  -->
          <video id="videoId1" ref="video1" controls autoplay muted >
            <source
              src=""
              type="video/mp4"
            />
            您的浏览器不支持 video 元素。
          </video>
        </div>
        <div class="cell no2">
          <video id="videoId2" ref="video2" controls autoplay muted >
            <source
              src=""
              type="video/mp4"
            />
            您的浏览器不支持 video 元素。
          </video>
        </div>
      </div>
      <div>
        <div class="cell no3">
          <video id="videoId3" ref="video3" controls autoplay muted >
            <source
              src=""
              type="video/mp4"
            />
            您的浏览器不支持 video 元素。
          </video>
        </div>
        <div class="cell no4">
          <video id="videoId4" ref="video4" controls autoplay muted >
            <source
              src=""
              type="video/mp4"
            />
            您的浏览器不支持 video 元素。
          </video>
        </div>
      </div>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs, ref } from "vue";
import { getVideo } from "@/api/model/AiControl/forecastVideo";
import { MyVideo } from "./video.vue";

export default {
  name: "forecastVideo", // 预测视频
  components: {
    MyVideo,
  },
  setup() {
    let video1 = ref(null);
	let video2 = ref(null);
	let video3 = ref(null);
	let video4 = ref(null);

    onMounted(() => {
      showPage_methods.getRandomVideo1();
	  showPage_methods.getRandomVideo2();
	  showPage_methods.getRandomVideo3();
	  showPage_methods.getRandomVideo4();
    });
    const showPage_state = reactive({
      videoId: [
        "589df0a5acb04f7a9a6e6696bed0231a",
        "b60cffa50ee84ca88be115b17790e825",
        "70c5fdfc9ae645e49bed83c28a846ecd",
        "9a323155e6024395a2736df5fdfe09ea",
        "89e8bc9accfe497183352b6d13e7dd45",
        "11531dfb082c4ae6836c56ef728c27c7",
        "c044af7269f4437db763206e00ee24b4",
        "d5b9c430d6494390abf218edf7ebc1c8",
      ],
      videoSrc1: "",
    });
    const showPage_methods = {
      async getRandomVideo1() {
        console.log("这是video", video1.value);

        let index =
          Math.floor(Math.random() * showPage_state.videoId.length + 1) - 1;
        // console.log(index);
        const res = await getVideo.post(showPage_state.videoId[index]);
        // console.log("这是我的",res);

		// 视频1
        video1.value.src = res.data.url;
		const eleVideo1 = document.getElementById('videoId1')

		//播放结束事件
		eleVideo1.addEventListener('ended', function () {
			showPage_methods.getRandomVideo1();
    }, false);

      },

	async getRandomVideo2() {
        // console.log("这是video", video1.value);

        let index =
        Math.floor(Math.random() * showPage_state.videoId.length + 1) - 1;
        const res = await getVideo.post(showPage_state.videoId[index]);


		// 视频2
        video2.value.src = res.data.url;
		const eleVideo1 = document.getElementById('videoId2')

		//播放结束事件
		eleVideo1.addEventListener('ended', function () {
			showPage_methods.getRandomVideo2();
    }, false);
      },


	async getRandomVideo3() {
        // console.log("这是video", video1.value);

        let index =
        Math.floor(Math.random() * showPage_state.videoId.length + 1) - 1;
        const res = await getVideo.post(showPage_state.videoId[index]);


		// 视频3
        video3.value.src = res.data.url;
		const eleVideo1 = document.getElementById('videoId3')

		//播放结束事件
		eleVideo1.addEventListener('ended', function () {
			showPage_methods.getRandomVideo3();
    }, false);
      },

	  async getRandomVideo4() {
        // console.log("这是video", video1.value);

        let index =
        Math.floor(Math.random() * showPage_state.videoId.length + 1) - 1;
        const res = await getVideo.post(showPage_state.videoId[index]);


		// 视频4
        video4.value.src = res.data.url;
		const eleVideo1 = document.getElementById('videoId4')

		//播放结束事件
		eleVideo1.addEventListener('ended', function () {
			showPage_methods.getRandomVideo4();
    }, false);
      },
    };


    return {
      video1,
	  video2,
	  video3,
	  video4,
      ...toRefs(showPage_state),
      ...showPage_methods,
    };
  },
};
</script>

<style scoped lang="scss">
.container,
.container * {
  padding: 0;
  margin: 0;
  line-height: 0;
}
.cell > video {
	margin: -11px 20px;
	width: 540px;
	height: 100%;
	background-color: rgb(163, 172, 172);
}

.container {
  display: flex;
  flex-flow: column;
}
.container > div {
  display: flex;
  margin: 5px auto;
}

</style>
