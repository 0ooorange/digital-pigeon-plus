<template>
    <div>
        <table-search
            :searchTypes="searchTypes"
            :cardData="cardData"
            :cardWidth="cardWidth"
            @searchClick="searchClick"
            @printTable="printTable"
            @outTable="outTable"
            class="table_search"
            :datePkDefalt="defaultTimeValue"
            ref="tableSearch"
        >
            <!-- <el-date-picker
                style="
                    background-color: #fff;
                    width: 200px;
                    margin-left: 10px; 
                    flex: 0 0 auto;
                "
                v-model="dateConcreteValue"
                type="daterange"
                start-placeholder="起始时间"
                end-placeholder="最终时间"
                :default-time="defaultTime"
                @change="datePickerChange"
            /> -->
        </table-search>
        <!-- <div class="card_list">
            <el-card
                class="box-card card_list_item"
                v-for="(item, index) in fodderList"
                :key="index"
            >
                <span style="font-size: 14px">{{ item.label }}:</span>
                <span
                    :style="
                        'font-size:16px;margin-right:2px; font-weight: 700;' +
                        'color:' +
                        item.color
                    "
                    >{{ item.value }}</span
                >
            </el-card>
        </div> -->
        <scTable
            class="table"
            ref="table"
            row-key="id"
            stripe
            highlightCurrentRow
            :data="[]"
            :apiObj="getFeedStatisticApi"
            :params="getFeedStatisticParams"
            :column="column"
            :tableName="food"
        >
            <!-- <el-table-column
                align="center"
                label="料槽编号"
                prop="number"
                width="200"
                sortable
            ></el-table-column> -->
            <!-- <el-table-column 
                align="center"
                label="加料时间"
                prop="gmtCreate"
                width="240"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="饲料品种"
                prop="brand"
                width="220"
            ></el-table-column>
            <el-table-column
                align="center"
                label="数量"
                prop="num"
                width="220"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="规格"
                prop="size"
                width="220"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="加料量"
                prop="weight"
                width="220"
                sortable
            ></el-table-column> -->
        </scTable>
    </div>
</template>

<script>
import {
    defineComponent,
    reactive,
    ref,
    getCurrentInstance,
    onMounted,
    computed,
} from "vue";
import print from "@/utils/print";
import LAY_EXCEL from "lay-excel";
import { ElMessage } from "element-plus";
export default defineComponent({
    name: "fodderStatistics", // 饲料统计
    setup() {
        const { proxy } = getCurrentInstance();

        //搜索实例
        const tableSearch = ref(null);

        //表格实例
        const table = ref(null);

        //当前鸽棚鸽笼信息
        const currShed = computed(() => {
            return proxy.$store.state.baseInfo.SHED_ID;
        });

        // console.log("鸽棚信息", currShed.value);

        let searchTypes = reactive([]);
        let cardData = reactive([
            {
                cardText: "加料量",
                cardNumber: "160kg",
            },
            {
                cardText: "复称量",
                cardNumber: "0.8kg",
            },
            {
                cardText: "食用量",
                cardNumber: "80kg",
            },
            {
                cardText: "本月已用量",
                cardNumber: "80kg",
            },
            {
                cardText: "本月均用量",
                cardNumber: "80kg",
            },
            {
                cardText: "上月用量",
                cardNumber: "2000kg",
            },
            {
                cardText: "上月均用量",
                cardNumber: "1kg",
            },
            {
                cardText: "喜粮",
                cardNumber: "100kg",
            },
            {
                cardText: "中粮",
                cardNumber: "20kg",
            },
            // {
            //     cardText: "玉粮",
            //     cardNumber: "80kg",
            // },
        ]);
        let cardWidth = ref("14%");

        //查询下拉框数组
        searchTypes = [
            {
                value: "料槽编号",
                label: "料槽编号",
            },
        ];

        //表格头
        const column = [
            {
                label: "加料时间",
                prop: "gmtCreate",
                width: 240,
                sortable: true,
            },
            {
                label: "饲料品种",
                prop: "brand",
                width: 220,
                sortable: true,
            },
            {
                label: "数量",
                prop: "num",
                width: 220,
                sortable: true,
            },
            {
                label: "规格",
                prop: "size",
                width: 220,
                sortable: true,
            },
            {
                label: "加料量",
                prop: "weight",
                width: 220,
                sortable: true,
            },
        ];

        // cardData = [
        //     {
        //         cardText: "加料量",
        //         cardNumber: "100kg",
        //     },
        //     {
        //         cardText: "复称量",
        //         cardNumber: "20kg",
        //     },
        //     {
        //         cardText: "食用量",
        //         cardNumber: "80kg",
        //     },
        //     {
        //         cardText: "本月已用量",
        //         cardNumber: "160kg",
        //     },
        //     {
        //         cardText: "当月均用量",
        //         cardNumber: "0.8kg",
        //     },
        //     {
        //         cardText: "饲料1剩余量",
        //         cardNumber: "80kg",
        //     },
        //     {
        //         cardText: "饲料2剩余量",
        //         cardNumber: "80kg",
        //     },
        //     {
        //         cardText: "饲料3剩余量",
        //         cardNumber: "80kg",
        //     },
        //     {
        //         cardText: "上月用量",
        //         cardNumber: "2000kg",
        //     },
        //     {
        //         cardText: "上月均用量",
        //         cardNumber: "1kg",
        //     },
        // ];

        //表格数据
        // let tableList = reactive([]);

        // tableList = [
        //     {
        //         number: 1,
        //         chargeTime: "2022-04-20 09:36:24",
        //         chargeAmount: "25kg",
        //         weighAgain: "2022-04-20 17:36:24",
        //         surplusWeight: "5kg",
        //         edibleAmount: "20kg",
        //         variety: "混料",
        //     },
        //     {
        //         number: 2,
        //         chargeTime: "2022-04-20 09:36:24",
        //         chargeAmount: "25kg",
        //         weighAgain: "2022-04-20 17:36:24",
        //         surplusWeight: "5kg",
        //         edibleAmount: "20kg",
        //         variety: "混料",
        //     },
        //     {
        //         number: 3,
        //         chargeTime: "2022-04-20 09:36:24",
        //         chargeAmount: "25kg",
        //         weighAgain: "2022-04-20 17:36:24",
        //         surplusWeight: "5kg",
        //         edibleAmount: "20kg",
        //         variety: "混料",
        //     },
        //     {
        //         number: 4,
        //         chargeTime: "2022-04-20 09:36:24",
        //         chargeAmount: "25kg",
        //         weighAgain: "2022-04-20 17:36:24",
        //         surplusWeight: "5kg",
        //         edibleAmount: "20kg",
        //         variety: "混料",
        //     },
        //     {
        //         number: 5,
        //         chargeTime: "2022-04-20 09:36:24",
        //         chargeAmount: "25kg",
        //         weighAgain: "2022-04-20 17:36:24",
        //         surplusWeight: "5kg",
        //         edibleAmount: "20kg",
        //         variety: "混料",
        //     },
        // ];

        //日期选择器改变
        const datePickerChange = function () {
            // const datePickerChange = function (e) {
            // console.log("日期改变", e);
        };

        const searchClick = function (e) {
            let dataValue = e.dateValue;
            // console.log(dataValue[0], e, "时间数据");
            // console.log(new Date(dataValue[0]));
            let startTimeTemp = new Date(dataValue[0]);
            let endTimeTemp = new Date(dataValue[1]);
            startTime.value = new Date(
                startTimeTemp.getFullYear(),
                startTimeTemp.getMonth(),
                startTimeTemp.getDate()
            );
            endTime.value = new Date(
                endTimeTemp.getFullYear(),
                endTimeTemp.getMonth(),
                endTimeTemp.getDate(),
                23,
                59,
                59
            );
            // console.log(
            //     "开始时间",
            //     "结束时间",
            //     formatDate(startTime.value),
            //     formatDate(endTime.value)
            // );
            getCardData();
            getFeedStatisticParams.startTime = formatDate(startTime.value);
            getFeedStatisticParams.endTime = formatDate(endTime.value);

            proxy.$nextTick(() => {
                // console.log(getFeedStatisticParams.value, 1111);
                // proxy.$refs.table.getData()
            });
        };

        const printTable = function () {
            console.log(table.value);
            print(table.value);
        };
        let isExport = false;

        const outTable = function () {
            console.log(table.value.tableData, "表格组件");
            let tableData = table.value.tableData.slice(0);
            if (tableData.length === 0) {
                console.log("没有数据导出");
                ElMessage({
                    message: `表格无数据,暂时无法导出`,
                    type: "warning",
                    duration: 2000,
                });
            } else {
                if (!isExport) {
                    isExport = true;
                    setTimeout(() => {
                        isExport = false;
                    }, 2000);
                    tableData.unshift({
                        gmtCreate: "加料时间",
                        brand: "饲料品种",
                        num: "数量",
                        size: "规格",
                        weight: "加料量",
                    });
                    tableData = LAY_EXCEL.filterExportData(tableData, [
                        "gmtCreate",
                        "brand",
                        "num",
                        "size",
                        "weight",
                    ]);
                    LAY_EXCEL.exportExcel(
                        {
                            sheet1: tableData,
                        },
                        "饲料统计导出表格.xlsx",
                        "xlsx"
                    );

                    ElMessage({
                        message: `表格导出成功,请查收`,
                        type: "success",
                        duration: 2000,
                    });
                    console.log("导出成功");
                } else {
                    ElMessage({
                        message: `表格导出中,请勿重复操作`,
                        type: "warning",
                        duration: 2000,
                    });
                }
            }
        };

        //和日期相关的

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
                nowTime.getMonth(),
                nowTime.getDate() - 1
            )
        );

        //本月开始时间
        const thisBegin = ref(
            new Date(endTime.value.getFullYear(), endTime.value.getMonth(), 1)
        );
        // console.log("上月开始时间", thisBegin.value);

        //时间组件的默认时间
        const defaultTimeValue = reactive([
            formatDate(startTime.value).substring(0, 10),
            formatDate(endTime.value).substring(0, 10),
        ]);
        // console.log(
        //     formatDate(endTime.value),
        //     formatDate(startTime.value),
        //     defaultTimeValue,
        //     "当前时间"
        // );

        //上个月的起止时间

        const lastMonthStartDate = ref(
            new Date(
                endTime.value.getFullYear(),
                endTime.value.getMonth() - 1,
                1
            )
        );
        const lastMonthEndDate = ref(
            new Date(endTime.value.getFullYear(), endTime.value.getMonth(), 0)
        );
        // const hasLastDate = function (nowYear, nowMonth) {
        //     const monthStartDate = new Date(nowYear, nowMonth - 2, 1);
        //     const monthEndDate = new Date(nowYear, nowMonth - 1, 1);
        //     console.log("上个月", formatDate(monthStartDate));
        //     console.log("这个月", formatDate(monthEndDate));
        //     console.log(
        //         "天数",
        //         (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
        //     );
        // };

        //调接口
        //获取各品牌饲料剩余量
        const getCardData = async function () {
            // console.log("当前鸽棚", currShed);
            let data = {
                currShed: currShed.value,
            };
            // console.log("参数", data);

            //根据鸽棚ID和起止时间查询饲料加料量
            const getFeedNumByIDTimeData = {
                currShed: currShed,
                startTime: formatDate(startTime.value),
                endTime: formatDate(endTime.value),
            };
            // console.log("参数", getFeedNumByIDTimeData);
            const FeedNum = await proxy.$API.fodder.FeedNumByIDTime.get(
                "getFeedNumByIDTime",
                getFeedNumByIDTimeData
            );
            if (FeedNum.code == 200) {
                let data = FeedNum.data.data;
                let temp = {
                    cardText: "加料量",
                    cardNumber: data,
                };
                // console.log("加料量数据", temp);
                // cardData.push(temp);
                cardData[0] = temp;
            }

            //根据鸽棚ID和起止时间查询饲料复称量

            let getTwiceNumByIDTimeData = {
                currShed: currShed,
                startTime: formatDate(startTime.value),
                endTime: formatDate(endTime.value),
            };
            // console.log("参数", getTwiceNumByIDTimeData);
            const TwiceNum = await proxy.$API.fodder.FeedNumByIDTime.get(
                "getTwiceNumByIDTime",
                getTwiceNumByIDTimeData
            );
            if (TwiceNum.code == 200) {
                let data = TwiceNum.data.data;
                let temp = {
                    cardText: "复称量",
                    cardNumber: data,
                };
                // console.log("复称量数据", temp);
                // cardData.push(temp);
                cardData[1] = temp;
            }

            //获取食用量
            if (FeedNum.code == 200 && TwiceNum.code == 200) {
                // console

                let firstData = FeedNum.data.data.substring(
                    0,
                    FeedNum.data.data.indexOf("斤")
                );
                let endData = TwiceNum.data.data.substring(
                    0,
                    TwiceNum.data.data.indexOf("斤")
                );
                const hadEat = firstData - endData;
                // console.log(hadEat, "食用量");
                let temp = {
                    cardText: "食用量",
                    cardNumber: hadEat + "斤",
                };
                // cardData.push(temp);
                cardData[2] = temp;
            }

            //本月饲料使用量
            //  console.log(
            //     formatDate(thisBegin.value).substring(0, 10),
            //     "本月开始时间"
            // );

            let getMonthNumByIDTimeData = {
                currShed: currShed,
                startTime: formatDate(thisBegin.value),
                endTime: formatDate(endTime.value),
            };
            // console.log("参数", getTwiceNumByIDTimeData);
            const monthNum = await proxy.$API.fodder.FeedNumByIDTime.get(
                "getMonthNumByIDTime",
                getMonthNumByIDTimeData
            );
            if (monthNum.code == 200) {
                let data = monthNum.data.data;
                let temp = {
                    cardText: "本月已用量",
                    cardNumber: data,
                };
                // console.log("本月已用量", temp);
                // cardData.push(temp);
                cardData[3] = temp;
            }

            //本月均用量
            let getMonthAvgNumByIDTimeData = {
                currShed: currShed,
                startTime: formatDate(thisBegin.value),
                endTime: formatDate(endTime.value),
            };
            // console.log("参数", getTwiceNumByIDTimeData);
            const monthAvgNum = await proxy.$API.fodder.FeedNumByIDTime.get(
                "getMonthAvgNumByIDTime",
                getMonthAvgNumByIDTimeData
            );
            if (monthAvgNum.code == 200) {
                let data = monthAvgNum.data.data;
                let temp = {
                    cardText: "本月均用量",
                    cardNumber: data,
                    // cardNumber:
                    //     parseFloat(
                    //         data.substring(0, data.indexOf("k"))
                    //     ).toFixed(3) + "kg",
                };
                // console.log("本月均用量", data);
                // cardData.push(temp);
                cardData[4] = temp;
            }

            //查询上月饲料用量
            // console.log("上个月第一天", formatDate(lastMonthStartDate.value));
            // console.log("上个月最后一天", lastMonthEndDate.value);
            let getLastMonthNumBYIDTimedata = {
                currShed: currShed,
                startTime: formatDate(lastMonthStartDate.value),
                endTime: formatDate(lastMonthEndDate.value),
            };
            // console.log("参数", getTwiceNumByIDTimeData);
            const lastMonthNum = await proxy.$API.fodder.FeedNumByIDTime.get(
                "getLastMonthNumBYIDTime",
                getLastMonthNumBYIDTimedata
            );
            if (lastMonthNum.code == 200) {
                let data = lastMonthNum.data.data;
                let temp = {
                    cardText: "上月用量",
                    cardNumber: data,
                };
                // console.log("上月用量", temp);
                // cardData.push(temp);
                cardData[5] = temp;
            }

            //上月饲料均用量
            let getLastAvgNUmByIDTimedata = {
                currShed: currShed,
                startTime: formatDate(lastMonthStartDate.value),
                endTime: formatDate(lastMonthEndDate.value),
            };
            // console.log("参数", getTwiceNumByIDTimeData);
            const lastAvgNUm = await proxy.$API.fodder.FeedNumByIDTime.get(
                "getLastAvgNUmByIDTime",
                getLastAvgNUmByIDTimedata
            );
            if (lastAvgNUm.code == 200) {
                let data = lastAvgNUm.data.data;
                let temp = {
                    cardText: "上月均用量",
                    cardNumber: data,
                    // cardNumber:
                    //     parseFloat(
                    //         data.substring(0, data.indexOf("k"))
                    //     ).toFixed(3) + "kg",
                };
                // console.log("上月饲料用量", data);
                // cardData.push(temp);
                cardData[6] = temp;
            }
            let current = 6;

            const feedBrandNum = await proxy.$API.fodder.feedBrandNum.get(
                "getFeedBrandNumByShedID",
                data
            );
            // console.log("数据11111111", feedBrandNum);
            if (feedBrandNum.code == 200) {
                // console.log("各种饲料量数据", data);
                feedBrandNum.data.data.forEach((item) => {
                    let temp = {
                        cardText: item.brand,
                        cardNumber: item.weight + item.unit,
                    };
                    // return temp;
                    cardData[current + 1] = temp;
                    current++;
                });
                // cardData.length = 7 + feedBrandNum.data.data.length
                // cardData.push(...temp);
            }
        };

        //列表
        //接口
        const getFeedStatisticApi = proxy.$API.fodder.FeedStatisticByIDTIme;
        //参数
        const getFeedStatisticParams = reactive(
            computed(() => {
                // console.log("监听改变");
                return {
                    currShed: currShed,
                    startTime: formatDate(startTime.value),
                    endTime: formatDate(endTime.value),
                };
            })
        );

        // reactive({

        // });

        //获取列表数据
        // const getList = function () {
        //     //上月饲料均用量
        //     let getLastAvgNUmByIDTimedata = {
        //         currShed: currShed,
        //         startTime: formatDate(lastMonthStartDate.value),
        //         endTime: formatDate(lastMonthEndDate.value),
        //     };
        //     console.log("参数", getTwiceNumByIDTimeData);
        //     const lastAvgNUm = await proxy.$API.fodder.FeedNumByIDTime.get(
        //         "getLastAvgNUmByIDTime",
        //         getLastAvgNUmByIDTimedata
        //     );
        //     if (lastAvgNUm.code == 200) {
        //         let data = lastAvgNUm.data.data;
        //         let temp = {
        //             cardText: "上月均用量",
        //             cardNumber:
        //                 parseFloat(
        //                     data.substring(0, data.indexOf("k"))
        //                 ).toFixed(3) + "kg",
        //         };
        //         console.log("上月饲料用量", temp);
        //         // cardData.push(temp);
        //         cardData[9] = temp;
        //     }
        // };

        onMounted(() => {
            // console.log(proxy.$refs.tableSearch, "搜索组件");
        });

        //获取各品牌数量
        getCardData();

        //根据鸽棚ID和起止时间查询饲料加料量
        // getFeedNumByIDTime();

        //根据鸽棚ID和起止时间查询饲料复称量
        // getTwiceNumByIDTime()

        return {
            column, //表格头
            tableSearch, //搜索实例
            table,
            searchTypes,
            cardWidth,
            defaultTimeValue, //默认时间
            // tableList,
            cardData,
            getFeedStatisticApi, //表格请求接口
            getFeedStatisticParams, //表格请求参数
            // tableDataChange, //表格数据改变后触发
            datePickerChange,
            searchClick,
            outTable,
            printTable,
        };
    },
});
</script>

<style scoped  lang="scss">
.card_list {
    display: flex;
    .card_list_item {
        width: 15.4%;
        margin-right: 0.6%;
        text-align: center;
    }
}
.table {
    margin-top: 30px;
}
</style>