<template>
  <div class="biaoge biaoge_list">
    <div class="biaoge_listIn">
      <ul class="ul_title">
        <li style="width: 110px">时间</li>
        <li style="width: 55px">地点</li>
        <li style="width: 125px">预警信息</li>
      </ul>
      <div class="ul_list">
        <div class="ul_listIn">
          <ul class="ul_con" v-for="(item, index) in list" :key="index">
            <li>{{item.time}}</li>
            <li>{{item.shed}}</li>
            <li>{{item.info}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup() {
    let list = reactive([
      {
        time: 2022 - 5 - 13,
        shed: 'A1仓',
        info: '温度过低',
      },
      {
        time: 2022 - 5 - 13,
        shed: 'A1仓',
        info: '温度过低',
      },
      {
        time: 2022 - 5 - 13,
        shed: 'A1仓',
        info: '温度过低',
      },
      {
        time: 2022 - 5 - 13,
        shed: 'A1仓',
        info: '温度过低',
      },
      {
        time: 2022 - 5 - 13,
        shed: 'A1仓',
        info: '温度过低',
      },
      {
        time: 2022 - 5 - 13,
        shed: 'A1仓',
        info: '温度过低',
      },
    ])

    return {
      list
    }
  },
}
</script>

<style scoped>
/*右下角表格*/
.biaoge {
  min-height: 200px;
}
.biaoge_list {
  width: 100%;
  height: 250px;
  border: 10px solid rgb(119, 172, 166);
  overflow: hidden;
  position: relative;
}
.biaoge_list .biaoge_listIn .ul_list {
  overflow: hidden;
  position: relative;
  margin-left: 5px;
}
.biaoge_list .biaoge_listIn .ul_listIn {
  -webkit-animation: 14s gundong linear infinite normal;
  animation: 14s gundong linear infinite normal;
  position: relative;
}
@keyframes gundong {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -30vh, 0);
    transform: translate3d(0, -30vh, 0);
  }
}

.biaoge_list ul {
  display: flex;
  display: -webkit-flex;
  width: 100%;
  list-style: none;
}
.biaoge_list .ul_con {
  border-bottom: 0.008rem solid rgba(10, 10, 10, 0.5);
}
.biaoge_list ul li {
  width: 90px;
  text-align: center;
  font-size: 0.06rem;
  height: 0.2rem;
  line-height: 0.2rem;
}
.biaoge_list ul li:frist-child {
  text-align: left;
}
</style>