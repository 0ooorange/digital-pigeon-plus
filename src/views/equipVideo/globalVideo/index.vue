<template>
    <div class="container">
        <div class="left">
            <Left />
        </div>
        <!-- 视频列表 -->
        <div class="center">
            <Center />
        </div>
        <div class="right">
            <Right />
            <div class="map">
                <SCMap adress="" />
            </div>
        </div>
    </div>
</template>
<script>
import Left from "./components/left.vue"
import Center from "./components/center.vue"
import Right from "./components/right.vue"
import SCMap from '@/components/scMap'
// import { reactive, ref } from '@vue/reactivity'
export default {
    name: 'globalVideo',
    components: { Left, Center, Right, SCMap },
    setup() {

        /* 右侧 监控信息 */
        // const curInfo = reactive({})
        // const curIndex = ref(1)
        // const videoChange = ({ id }, i) => {
        //   curIndex.value = i
        //   getMonitorData(id)
        //   // 更新监控信息
        // }
        return {
            // curIndex,
            // curInfo,
            // videoChange,
        }
    },
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  height: 100%;
  .center {
    flex: 1;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }
  }
  .left {
    width: 200px;
    background-color: #fff;
    border-radius: 8px;
  }
  .right {
    width: 260px;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
    .map {
      width: 100%;
      height: 200px;
	  padding: 10px 0 20px;
    }
  }
}
</style>
