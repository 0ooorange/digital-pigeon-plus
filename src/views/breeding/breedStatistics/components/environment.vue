<template>
  <div class="biaoge biaoge_list">
    <div class="biaoge_listIn">
      <ul class="ul_title">
        <li>时间</li>
        <li>地点</li>
        <li>预警信息</li>
      </ul>
      <div class="ul_list">
        <div class="ul_listIn">
          <ul class="ul_con" v-for="(item, index) in list" :key="index">
            <li>{{item?.gmtCreate?.split(' ')[0] || ''}}</li>
            <li>{{item.code}}</li>
            <li>{{item.warninfo}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { getWarningByID } from '@api/breeding/breedStatistics'
import { dateFormat } from '@/hooks/dateFormat.js'

const props = defineProps({shed_id: {type: String, require: true}, start_time: {type: Object, require: true}, end_time: {type: Object, require: true}})
let list = ref([])
getWarningByID(props.shed_id, dateFormat(props.start_time), dateFormat(props.end_time)).then(res => {list.value = res.data.data})
</script>

<style scoped>
/*右下角表格*/
.biaoge {min-height: 200px;}
.biaoge_list {width: 100%; height: 250px; border: 10px solid rgb(119, 172, 166); overflow: hidden; position: relative;}
.biaoge_list .biaoge_listIn .ul_list {overflow: hidden; position: relative; margin-left: 5px;}
.biaoge_list .biaoge_listIn .ul_listIn {-webkit-animation: 14s gundong linear infinite normal; animation: 14s gundong linear infinite normal; position: relative;}
@keyframes gundong {
  0% {-webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0);}
  100% {-webkit-transform: translate3d(0, -30vh, 0); transform: translate3d(0, -30vh, 0);}
}
.biaoge_list ul {display: flex; width: 100%; list-style: none;}
.biaoge_list .ul_con {border-bottom: 0.008rem solid rgba(10, 10, 10, 0.5);}
.biaoge_list ul li {width: 30%; text-align: center; font-size: 0.06rem; height: 0.2rem; line-height: 0.2rem;}
.biaoge_list ul li:nth-child(3) {flex: 1;}
</style>