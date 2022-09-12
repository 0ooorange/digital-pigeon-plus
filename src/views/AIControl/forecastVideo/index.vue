<template>

  <div class="container">
    <div>
        <div class="cell no1">
        <iframe
          src="https://v.qkeep.cn/?v=https://hls01open.ys7.com/openlive/2929fb95448f496d98a964d09a9b43f9.m3u8?rel=0&amp;autoplay=1"
          allow="autoplay"
          frameBorder="0"
          allowfullscreen="true"
        />
        </div>
        <div class="cell no2">
            <iframe
          src="https://v.qkeep.cn/?v=https://hls01open.ys7.com/openlive/2929fb95448f496d98a964d09a9b43f9.m3u8?rel=0&amp;autoplay=1"
          allow="autoplay"
          frameBorder="0"
          allowfullscreen="true"
        />
        </div>
    </div>
    <div>
        <div class="cell no3">
          <iframe
          src="https://v.qkeep.cn/?v=https://hls01open.ys7.com/openlive/2929fb95448f496d98a964d09a9b43f9.m3u8?rel=0&amp;autoplay=1"
          allow="autoplay"
          frameBorder="0"
          allowfullscreen="true"
        />
        </div>
        <div class="cell no4">
             <iframe
          src="https://v.qkeep.cn/?v=https://hls01open.ys7.com/openlive/2929fb95448f496d98a964d09a9b43f9.m3u8?rel=0&amp;autoplay=1"
          allow="autoplay"
          frameBorder="0"
          allowfullscreen="true"
        />
        </div>
    </div>
</div>

</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
export default {
  name: "forecastVideo", // 预测视频

  setup() {
	onMounted(()=>{

	})
	const showPage_state = reactive({

	})
	const showPage_methods = {
	}
	return {
		...toRefs(showPage_state),
		...showPage_methods
	}
}
};

</script>

<style scoped lang="scss">
/*CSS Reset*/
.container, .container * { padding: 0; margin: 0; line-height: 0; }
.cell{
	width: 50%;
	height: 300px;
	margin: 0;
}
.cell>iframe {
	width: 100%;
	height:  100%;
	// background-color: rgb(203, 238, 230);
	margin: 0;
	// padding: 0;
	}

/*方案二 ———— flex*/
.container {
    display: flex;
    flex-flow: column;
}
.container>div {
    display: flex;
    // margin: 5px 0;
}
.cell>div {
    // margin: 0 5px;
}
</style>
