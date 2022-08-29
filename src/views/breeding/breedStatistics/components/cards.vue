<template>
  <div v-for="(item, index) in cardList" :key="index">
    <el-card class="mini_card"><span class="fontcolor">{{item.title}}</span><span :style="'color: '+ colors[index]" class="cardnumber">{{item.number}}</span></el-card>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { dateFormat } from '@/hooks/dateFormat.js'
import { getNumberOfParents, getNumberOfChildren, getNumOfTakeEgg, getNumOfLayEggs, getNumOfCubs, getNumOfOut, getNumOfDeath } from '@api/breeding/breedStatistics'

const props = defineProps({shed_id: {type: String, require: true}, start_time: {type: Object, require: true}, end_time: {type: Object, require: true}})

// 卡片
let colors = ['#EE4000', '#EE9A49', '#7D26CD', '#43CD80', '#76EE00', '#6495ED', '#EE4000']
let cardList = ref([{ title: '成鸽数: ', number: '0' }, { title: '幼鸽数: ', number: '0' }, { title: '抽蛋数: ', number: '0' }, { title: '产蛋数: ', number: '0' },
                    { title: '出仔数: ', number: '0' }, { title: '出栏数: ', number: '0' },  { title: '死仔数: ', number: '0' }])
const getCardData = (shedId, startTime, endTime) => {
  getNumberOfParents(shedId).then((res) => { cardList.value[0].number = res.data.data })
  getNumberOfChildren(shedId).then((res) => { cardList.value[1].number = res.data.data })
  getNumOfTakeEgg(shedId, startTime, endTime).then((res) => { cardList.value[2].number = res.data.data })
  getNumOfLayEggs(shedId, startTime, endTime).then((res) => { cardList.value[3].number = res.data.data })
  getNumOfCubs(shedId, startTime, endTime).then((res) => { cardList.value[4].number = res.data.data })
  getNumOfOut(shedId, startTime, endTime).then((res) => { cardList.value[5].number = res.data.data })
  getNumOfDeath(shedId, startTime, endTime).then((res) => { cardList.value[6].number = res.data.data })
}
getCardData(props.shed_id, dateFormat(props.start_time), dateFormat(props.end_time))
</script>

<style lang="scss" scoped>
.mini_card {display: flex; flex-direction: column; align-items: center; justify-content: center; width: 95%; height: 100%; font-size: 15px; margin-right: 40px;
  .fontcolor {/* color: #38424a; */ font-weight: 400; font-size: 14px;}
  .cardnumber {font-weight: 700; font-size: 16px;}
}
</style>