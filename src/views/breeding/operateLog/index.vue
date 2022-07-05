<template>
    <div class="page">
        <table-search
            :searchTypes="searchTypes"
            :cardData="[]"
            @searchClick="searchClick"
            @outTable="outTable"
            class="table_search"
            :datePkDefalt="defaultTimeValue"
            ref="tableSearch"
        >
        </table-search>
        <div class="table_box">
            <div class="table_item">
                <el-card class="item_title" style="color: #6959cd">
                    操作记录
                </el-card>
                <!-- <div class="item_title"></div> -->
                <scTable
                    class="table"
                    height="auto"
                    ref="table"
                    row-key="id"
                    stripe
                    highlightCurrentRow
                    :data="[]"
                    :apiObj="findLogApi"
                    :params="findLogParams"
                    @selection-change="selectionChange"
                >
                    <el-table-column
                        align="center"
                        label="时间"
                        prop="time"
                        width="160"
                        sortable
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="鸽笼编号"
                        prop="codes"
                        width="120"
                        sortable
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="操作记录"
                        prop="message"
                        width="100"
                    ></el-table-column>
                </scTable>
            </div>
            <div class="table_item">
                <el-card class="item_title" style="color: #cd0000">
                    异常信息
                </el-card>
                <!-- <div class="item_title"></div> -->
                <scTable
                    class="table"
                    ref="table"
                    row-key="id"
                    stripe
                    highlightCurrentRow
                    height="auto"
                    :data="[]"
                    :apiObj="findAbnormalApi"
                    :params="findAbnormalParams"
                >
                    <el-table-column
                        align="center"
                        label="时间"
                        prop="time"
                        width="160"
                        sortable
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="鸽笼编号"
                        prop="codes"
                        width="120"
                        sortable
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="异常信息"
                        prop="message"
                        width="120"
                    ></el-table-column>
                </scTable>
            </div>
            <div class="table_item">
                <el-card class="item_title" style="color: #8fbc8f">
                    数据统计
                </el-card>
                <!-- <div class="item_title"></div> -->
                <scTable
                    class="table"
                    ref="table"
                    row-key="id"
                    :height="300"
                    stripe
                    highlightCurrentRow
                    hidePagination
                    :data="dataCount"
                    @selection-change="selectionChange"
                >
                    <el-table-column
                        align="center"
                        label="类别"
                        prop="dataTitle"
                        width="140"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="数量"
                        prop="count"
                        width="150"
                        sortable
                    ></el-table-column>
                </scTable>
                <div
                    class="dataList"
                    style="
                        height: 260px;
                        width: 100%;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        background-color: #fff;
                        margin-top: 40px;
                    "
                >
                    <el-carousel
                        trigger="click"
                        height="100%"
                        style="height: 100%; width: 100%; padding: 10px"
                    >
                        <el-carousel-item
                            v-for="item in 3"
                            :key="item"
                            style="height: 100%; width: 100%"
                        >
                            <img
                                src="../../../assets/images/pigeon2.jpg"
                                style="height: 100%; width: 100%"
                            />
                        </el-carousel-item>
                    </el-carousel>
                    <!-- <img
                            src="@/assets/images/pigeon.png"
                            style="height: 100%"
                        /> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, ref, getCurrentInstance } from "vue";
export default defineComponent({
    name: "operateLog", // 饲料统计
    setup() {
        const { proxy } = getCurrentInstance();

        let searchTypes = reactive([]);
        let cardData = reactive([]);
        let cardWidth = ref("14%");
        //格式化时间
        const formatDate = function (date) {
            var myyear = date.getFullYear();
            var mymonth = date.getMonth() + 1;
            var myweekday = date.getDate();
            var myHour = date.getHours();
            var myMinu = date.getMinutes();
            var mySec = date.getSeconds();

            if (mymonth < 10) {
                mymonth = "0" + mymonth;
            }
            if (myweekday < 10) {
                myweekday = "0" + myweekday;
            }
            if (myHour < 10) {
                myHour = "0" + myHour;
            }
            if (myMinu < 10) {
                myMinu = "0" + myMinu;
            }
            if (mySec < 10) {
                mySec = "0" + mySec;
            }
            return (
                myyear +
                "-" +
                mymonth +
                "-" +
                myweekday +
                " " +
                myHour +
                ":" +
                myMinu +
                ":" +
                mySec
            );
        };

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
                nowTime.getMonth() - 6,
                nowTime.getDate()
            )
        );

        //时间组件的默认时间
        const defaultTimeValue = reactive([
            formatDate(startTime.value).substring(0, 10),
            formatDate(endTime.value).substring(0, 10),
        ]);

        //日期值
        let dateConcreteValue = ref("");
        // dateConcreteValue = []

        //查询下拉框数组
        searchTypes = [
            {
                value: "鸽笼编号",
                label: "鸽笼编号",
            },
        ];

        //操作记录接口
        const findLogApi = ref(proxy.$API.allState.findLogByPigeonIdAndDate);
        //操作记录参数
        const findLogParams = reactive({
            pigeonId: "3",
            beginDate: formatDate(startTime.value).substring(0, 10),
            endDate: formatDate(endTime.value).substring(0, 10),
        });

        //异常信息接口
        const findAbnormalApi =
            proxy.$API.allState.findAbnormalByPigeonIdAndDate;
        //参数
        const findAbnormalParams = reactive({
            pigeonId: "3",
            beginDate: formatDate(startTime.value).substring(0, 10),
            endDate: formatDate(endTime.value).substring(0, 10),
        });

        //数据信息接口
        const findCageDataApi =
            proxy.$API.allState.findCageDataByPigeonIdAndDat;

        //参数
        const findCageDataParams = reactive({
            pigeonId: "3",
            beginDate: formatDate(startTime.value).substring(0, 10),
            endDate: formatDate(endTime.value).substring(0, 10),
        });

        //表格数据
        const tableList = reactive([]);
        const tableListOption = reactive([]);
        const tableListAbnormal = reactive([]);
        const dataCount = reactive([
            {
                dataTitle: "产蛋数",
                count: "2个",
            },
            {
                dataTitle: "抽蛋数",
                count: "6个",
            },
            {
                dataTitle: "孵蛋数量",
                count: "0个",
            },
            {
                dataTitle: "孵蛋次数",
                count: "2只",
            },
            {
                dataTitle: "出仔数",
                count: "16个",
            },
            {
                dataTitle: "死仔数",
                count: "0只",
            },
        ]);

        const isSearch = ref(false);

        // tableListOption = [
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         option: "查蛋(抽取)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         option: "查蛋(抽取)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         option: "查蛋(抽取)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         option: "查蛋(抽取)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         option: "查蛋(抽取)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         option: "查蛋(抽取)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         option: "查蛋(抽取)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         option: "查蛋(抽取)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         option: "查蛋(抽取)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         option: "查蛋(抽取)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         option: "查蛋(抽取)",
        //     },
        // ];

        // tableListAbnormal = [
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         abnormal: "蛋异常(单蛋)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         abnormal: "仔异常(冷蛋)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         abnormal: "蛋异常(单蛋)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         abnormal: "仔异常(冷蛋)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         abnormal: "蛋异常(单蛋)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         abnormal: "仔异常(冷蛋)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         abnormal: "蛋异常(单蛋)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         abnormal: "仔异常(冷蛋)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         abnormal: "仔异常(冷蛋)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         abnormal: "仔异常(冷蛋)",
        //     },
        //     {
        //         time: "2022-04-21",
        //         number: "A01",
        //         abnormal: "仔异常(冷蛋)",
        //     },
        // ];

        // dataCount = [
        //     {
        //         dataTitle: "产蛋数",
        //         count: "2个",
        //     },
        //     {
        //         dataTitle: "抽蛋数",
        //         count: "6个",
        //     },
        //     {
        //         dataTitle: "孵蛋数量",
        //         count: "0个",
        //     },
        //     {
        //         dataTitle: "孵蛋次数",
        //         count: "2只",
        //     },
        //     {
        //         dataTitle: "出仔数",
        //         count: "16个",
        //     },
        //     {
        //         dataTitle: "死仔数",
        //         count: "0只",
        //     },
        // ];

        //日期选择器改变
        const datePickerChange = function (e) {
            console.log("日期改变", e);
        };
        const searchClick = function (e) {
            isSearch.value = true;
            // let dataValue = e.dateValue;
            // console.log(dataValue[0], e, "时间数据");
            // console.log(new Date(dataValue[0]));
            // let startTimeTemp = new Date(dataValue[0]);
            // let endTimeTemp = new Date(dataValue[1]);
            // startTime.value = new Date(
            //     startTimeTemp.getFullYear(),
            //     startTimeTemp.getMonth(),
            //     startTimeTemp.getDate()
            // );
            // endTime.value = new Date(
            //     endTimeTemp.getFullYear(),
            //     endTimeTemp.getMonth(),
            //     endTimeTemp.getDate(),
            //     23,
            //     59,
            //     59
            // );
            // console.log(
            //     "开始时间",
            //     "结束时间",
            //     formatDate(startTime.value).substring(0, 10),
            //     formatDate(endTime.value).substring(0, 10)
            // );

            console.log("拿到的参数", e);
            findAbnormalApi.value =
                proxy.$API.operateLog.findAbnormalByPigeonCodesAndDate;
            findAbnormalParams.pigeonId = e.inputValue;

            findLogParams.value =
                proxy.$API.operateLog.findLogByPigeonCodesAndDate;
            findLogParams.pigeonId = e.inputValue;
        };

        const outTable = function () {
            console.log("哈哈哈，我被点击了噢");
        };

        //获取操作记录
        // const getOptionLog = function () {
        //     findLogParams.beginDate = startTime;
        //     findLogParams.endDate = endTime;
        // };

        //获取各种数据
        const getDataList = async function () {
            let getDataList 
            if (isSearch.value) {
                getDataList =
                    await proxy.$API.operateLog.findCageDataByPigeonAndDate.get(
                        findCageDataParams
                    );
            } else {
                 getDataList = await proxy.$API.allState.findCageDataByPigeonIdAndDate.get(
                    findCageDataParams)
            }
            if (getDataList.code == 200) {
                console.log("各种数据", getDataList);
                let data = getDataList.data.data;
                console.log("各种数据", data);
                dataCount[0].count = data.layEggNum + "个";
                dataCount[1].count = data.takeEggNum + "个";
                dataCount[2].count = data.hatchEggNum + "个";
                dataCount[3].count = data.hatchEgg + "个";
                dataCount[4].count = data.newCubNum + "个";
                dataCount[5].count = data.deadCubNum + "个";
            }
        };
        getDataList();

        return {
            searchTypes,
            cardWidth,
            defaultTimeValue,
            dateConcreteValue,
            findLogApi,
            findLogParams,
            findAbnormalApi,
            findAbnormalParams,
            findCageDataApi,
            findCageDataParams,
            tableList,
            tableListAbnormal,
            tableListOption,
            cardData,
            dataCount,
            datePickerChange,
            searchClick,
            outTable,
        };
    },
});
</script>

<style scoped lang="scss">
.page {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}
.table_box {
    width: 100%;
    height: 100%;
    // background-color: pink;
    margin-top: 20px;
    display: flex;
    // margin-left: 1%;
    .table_item {
        width: 32%;
        margin-right: 4%;
        .item_title {
            height: 55px;
            line-height: 30px;
            width: 60%;
            margin: auto;
            margin-bottom: 10px;
            text-align: center;
            font-size: 18px;
            :deep(.el-card__body) {
                height: 100%;
                padding: 10px !important;
                // background-color: #d9f0f7;
            }
        }
        .table {
            width: 100%;
            height: 700px;
        }
    }
}
</style>