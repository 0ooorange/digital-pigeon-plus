<template>
    <div class="top">
        <el-date-picker
            v-model="dateValue"
            type="daterange"
            format="YYYY-MM-DD"
            unlink-panels
            range-separator="-"
            start-placeholder="起始时间"
            end-placeholder="结束时间"
            :shortcuts="shortcuts"
            style="width: 250px"
            @change="visibleChange"
        />

        <el-select v-model="currBaseName" class="m-2" placeholder="选择基地" style="width: 150px" @change="currBaseChange">
            <el-option v-for="item in bases" :key="item.id" :label="item.name" :value="item.name"/>
        </el-select>

        <el-select v-model="currShedCode" class="m-2" placeholder="选择鸽棚" style="width: 150px" @change="currShedChange">
            <el-option v-for="item in sheds" :key="item.id" :label="item.code" :value="item.code"/>
        </el-select>
    </div>
    <!-- <div class="timeContent">
        <div class="timeContent--main" v-if="leftData.length != 0">
            <div class="timeContent--common timeContent--left">
                <el-timeline>
                    <el-timeline-item
                        v-for="(item, index) in leftData"
                        :key="index"
                        :timestamp="item.gmtCreate"
                        placement="top"
                    >
                        <el-card>
                            <h4>
                                {{ item.code }}{{ item.warninfo }}
                                <span v-if="item.value != ''"
                                    >{{ item.name }}的值为{{ item.value
                                    }}{{ item.unit }}</span
                                >
                            </h4>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
            <div class="timeContent--common timeContent--right">
                <el-timeline>
                    <el-timeline-item
                        v-for="(item, index) in rightData"
                        :key="index"
                        :timestamp="item.gmtCreate"
                        placement="top"
                    >
                        <el-card>
                            <h4>
                                {{ item.code }}{{ item.warninfo }}
                                <span v-if="item.value != ''"
                                    >{{ item.name }}的值为{{ item.value
                                    }}{{ item.unit }}</span
                                >
                            </h4>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2022/4/3" placement="top">
                        <el-card>
                            <h4>A2仓二氧化碳浓度过高</h4>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2022/4/2" placement="top">
                        <el-card>
                            <h4>A仓PM2.5过高</h4>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2022/4/12" placement="top">
                        <el-card>
                            <h4>A3仓氨气浓度过高</h4>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
        <div v-else class="timeContent--main">
            <el-card shadow="never" class="timeContent--main__noData">
                暂无数据！
            </el-card>
        </div>
        <div class="timeContent--pagination" v-if="leftData.length != 0">
            <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                :small="true"
                :total="total"
                :page-sizes="pageSizes"
                v-model:currentPage="currentPage"
                v-model:page-size="pageSize"
                @current-change="paginationChange"
                @size-change="handleSizeChange"
            ></el-pagination>
        </div>
    </div> -->
    <scTable
        ref="table"
        :column="column"
        :data="tablelist"
        :cell-style="cellStyle"
        stripe
        highlightCurrentRow
        class="tablestyle"
        :default-sort="{ prop: 'date', order: 'descending' }"
    />
</template>
<script>
import { ElMessage } from "element-plus";
import { defineComponent, ref, getCurrentInstance, reactive, nextTick } from "vue";
import { getCarbonDioxideData } from "@api/equipVideo/warnCenter";
import { dateFormat } from '@/hooks/dateFormat.js'
import { getBreedBaseAndShed } from '@api/bases/login'
import tool from '@/utils/tool'
import store from "@/store";
export default defineComponent({
    name: "warnCenter", // 预警中心
    setup() {
        const { proxy } = getCurrentInstance();

               //当前鸽棚鸽笼信息
        // const currShed = computed(() => {
        //     return proxy.$store.state.baseInfo.SHED_ID
        //  })

        //基地和棚
        const bases = ref([])
        const sheds = ref([])
        const currBase = ref({})
        const currShed = ref({})
        const currBaseName = ref('')
        const currShedCode = ref('')
        const currOperator = ref('')
        const currInfo = ref(tool.data.get('CURR_INFO'))
        const currBaseId = ref('')

        getBreedBaseAndShed().then(res => {
          if(currInfo?.value?.CURR_BASE.id) {
                currBaseId.value = currInfo.value.CURR_BASE.id
          } else {
                currBaseId.value = res.data.BaseList[0].id
          }
        })
        getBreedBaseAndShed(currBaseId.value).then(res => {
        // 判断是否采用默认情况
        currBase.value = currInfo?.value?.CURR_BASE ? currInfo.value.CURR_BASE : res.data.BaseList[0]
        currShed.value = currInfo?.value?.CURR_SHED ? currInfo.value.CURR_SHED : res.data.ShedList[0]
        currOperator.value = currInfo?.value?.CHARGE_NAME ? currInfo.value.CHARGE_NAME : res.data.ShedList[0].userName
      
        // 存储当前信息
        currInfo.value = {
            CURR_BASE: currBase.value,
            CURR_SHED: currShed.value,
            CHARGE_NAME: currOperator.value,
        }
        tool.data.set('CURR_INFO', currInfo.value)

        // 设置展示数据
        bases.value = res.data.BaseList
        sheds.value = res.data.ShedList
        currBaseName.value = currInfo.value.CURR_BASE.name
        currShedCode.value = currInfo.value.CURR_SHED.code
        })

        // 切换基地
        let menuFlag = ref(true)
        const currBaseChange = e => {
          // 筛选基地      
          bases.value.some((val) => {
            if (val.name === e) {
                currBase.value = val
                return true
            }
          })
          // 获取shedList
          const currBaseId = currBase.value.id
          getBreedBaseAndShed(currBaseId).then(res => {
              // 获取shedList、shed、currOperator
              sheds.value = res.data?.ShedList
              if(res.data?.ShedList.length !== 0) {
                currShed.value = res.data?.ShedList[0]
              } else {
                currShed.value = {}
              }
              currOperator.value = currShed.value?.userName || '无'
              // 设置currInfo
              currInfo.value = {
                CURR_BASE: currBase.value,
                CURR_SHED: currShed.value,
                CHARGE_NAME: currOperator.value,
              }
              tool.data.set('CURR_INFO', currInfo.value)
              // 设置展示数据
              currBaseName.value = currInfo.value.CURR_BASE.name
              currShedCode.value = currInfo.value.CURR_SHED.code || '暂无鸽棚'
              // 刷新
              menuFlag.value = false
              nextTick(function () {
                menuFlag.value = true
              })
          })          
        }

        // 切换鸽棚
        const currShedChange = async (e) => {
           // 筛选鸽棚
            sheds.value.some((val) => {
               if (val.code === e) {
                    currShed.value = val
                    return true
               }
            })
            // 设置currInfo最新信息
            currInfo.value = {
                CURR_BASE: currBase.value,
                CURR_SHED: currShed.value,
                CHARGE_NAME: currOperator.value,
            }
            tool.data.set('CURR_INFO', currInfo.value)
            // 刷新
            menuFlag.value = false
            nextTick(function () {
                menuFlag.value = true
            })
        }

        //当前日期
        const nowTime = new Date();
        //调接口传的时间
        //这样拿到的时间都是当天的零点，如果不传直接拿，拿到的也会有现在的时分秒,而理解上需要结束时间当天的最后一秒
        const endTime = ref(
            new Date(
                nowTime.getFullYear(),
                nowTime.getMonth(),
                nowTime.getDate(),
                23,
                59,
                59
            )
        );

        const startTime = ref(
            new Date(
                nowTime.getFullYear(),
                nowTime.getMonth(),
                nowTime.getDate() - 0
            )
        );

        //时间选择器绑定的值
        const dateValue = ref([
            proxy.$TOOL.dateFormat(startTime.value).substring(0, 10),
            proxy.$TOOL.dateFormat(endTime.value).substring(0, 10),
        ]);

        //时间选择器
        const shortcuts = [
            {
                text: "近一周",
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    return [start, end];
                },
            },
            {
                text: "近一个月",
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    return [start, end];
                },
            },
            {
                text: "近3个月",
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    return [start, end];
                },
            },
        ];

        // 表格
        const tablelist = ref([]);
        const column = ref([
            {
                label: "基地",
                prop: "basename",
                width: 150,
                align: "center",
            },
            {
                label: "鸽棚",
                prop: "shedname",
                width: 110,
                align: "center",
            },
            {
                label: "预警级别",
                prop: "level",
                width: 150,
                align: "center",
            },
            {
                label: "预警时间",
                prop: "gmtCreate",
                width: 190,
                align: "center",
            },
            {
                label: "设备",
                prop: "name",
                width: 150,
                align: "center",
            },
            {
                label: "阈值",
                prop: "threshold",
                width: 160,
                align: "center",
            },
            { 
                label: "数值",
                prop: "value", 
                width: 150, 
                align: "center" 
            },
            {
                label: "预警信息",
                prop: "warninfo",
                width: 280,
                align: "center",
            },
        ]);

        // 页码选择器
        const total = ref(10);
        const pageSizes = ref([5, 10, 20, 50]);
        const currentPage = ref(10);
        const pageSize = ref(10);

        //请求参数
        let params = {
            start_time: proxy.$TOOL.dateFormat(startTime.value),
            end_time: proxy.$TOOL.dateFormat(endTime.value),
            current: currentPage.value,
            size: pageSize.value,
            shed_id: currShed.value,
        };

        //日期选择器
        const visibleChange = function (e) {
            // console.log("选择日期", e);
            // console.log(
            //     proxy.$TOOL.dateFormat(e[0]),
            //     proxy.$TOOL.dateFormat(e[1]).substring(0, 10) +
            //         " 23:59:59"
            // );
            params.start_time = proxy.$TOOL.dateFormat(e[0]);
            params.end_time = proxy.$TOOL.dateFormat(e[1]).substring(0, 10) + " 23:59:59";
            // console.log("参数", params);
            getData();
        };

        //左右两个数组
        const leftData = reactive([]);
        const rightData = reactive([]);

        //获取数据
        const getData = async function () {
            let res = await proxy.$API.warnCenter.getCarbonDioxideData(params);
            leftData.length = 0;
            rightData.length = 0;
            if (res.code == 200) {
                let data = res.data.data;
                // leftData.length = 0;
                leftData.push(...data.slice(0, Math.ceil(data.length / 2)));
                rightData.push(...data.slice(Math.ceil(data.length / 2)));
                
                // leftData.length = 0;
                // console.log( Math.ceil(data.length / 2), "左边数据");
                // console.log((data.length / 2) + 1, "右边数据");
            } else {
                ElMessage({
                    message: "暂无数据",
                    type: "warning",
                });
            }
            // console.log("请求结果", res);
        };
        const shedId = store.state.baseInfo.SHED_ID;
        const baseId = tool.data.get('CURR_INFO')?.CURR_BASE.id
        console.log(dateFormat(startTime.value), dateFormat(endTime.value), shedId, baseId, currentPage.value, pageSize.value);
        getCarbonDioxideData(dateFormat(startTime.value), dateFormat(endTime.value), shedId, baseId, currentPage.value, pageSize.value).then(
            (res) => {
                tablelist.value = res.data.data;
            },
            
        );

        getData();

        const paginationChange = function () {
            // console.log("触发这里", pageSize.value, currentPage.value);
            params.current = currentPage.value;
            params.size = pageSize.value;
            getData();
        };
        const handleSizeChange = function () {
            params.current = currentPage.value;
            params.size = pageSize.value;
            getData();
        };

        return {
            bases,
            sheds,
            currBaseName,
            currShedCode,
            currOperator,
            column,
            tablelist,
            dateValue,
            total,
            shortcuts,
            pageSizes,
            currentPage,
            pageSize,
            leftData,
            rightData,
            currBaseChange,
            currShedChange,
            visibleChange,
            paginationChange,
            handleSizeChange,
        };
    },
    methods:{
        cellStyle({ row, columnIndex }) {
            if (row.level === '严重' && columnIndex === 2) {
                return{'color':'red!important'}
            } else if(row.level === '普通' && columnIndex === 2){
                return{'color':'lightblue!important'}
            }
            return "";
        }
    } 
});
</script>
<style scoped lang="scss">
.top {
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    width: 50%;
}
// .timeContent {
//     .timeContent--main {
//         display: flex;
//         .timeContent--common {
//             width: 50%;
//             margin-right: 10px;
//         }
//         // .timeContent--main__noData {
//         //     margin: auto;
//         //     width: 60%;
//         //     height: 300px;
//         //     text-align: center;
//         //     line-height: 300px;
//         //     font-size: 30px;

//         //     :deep(.el-card__body) {
//         //         // display: flex;
//         //         // height: 100%;
//         //         // padding: 20px !important;

//         //         // background-color: #d9f0f7;
//         //     }
//         // }
//     }
//     .timeContent--pagination {
//         display: flex;
//         align-content: center;
//         justify-content: center;
//         margin-top: 20px;
//         .el-pagination {
//         }
//     }
// }
</style>
