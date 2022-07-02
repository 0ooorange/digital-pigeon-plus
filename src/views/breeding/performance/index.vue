<template>
    <div>
        <table-search
            :searchTypes="searchTypes"
            :cardData="[]"
            @searchClick="searchClick"
            @outTable="outTable"
            class="table_search"
            :datePkDefalt="defaultTimeValue"
        >
        </table-search>

        <!-- <scTable
            class="table"
            ref="table"
            row-key="id"
            :data="tableList"
            requestMethods= "post"
            @selection-change="selectionChange"
            stripe
            highlightCurrentRow
        > -->

        <scTable
            class="table"
            ref="table"
            row-key="id"
            :data="[]"
            :apiObj="dataApi"
            :params="params"
            requestMethods="post"
            @selection-change="selectionChange"
            stripe
            highlightCurrentRow
        >
            <!-- <el-table-column type="selection" width="40"></el-table-column> -->
            <el-table-column
                align="center"
                label="鸽笼号"
                prop="cageNumber"
                width="100"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="板子编号"
                prop="boardNumber"
                width="110"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="一个月未下蛋"
                prop="oneMonNoLayEgg"
                width="140"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="生蛋次数"
                prop="layEggInterval"
                width="110"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="回蛋次数"
                prop="backEggAmount"
                width="110"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="光蛋"
                prop="lightEgg"
                width="80"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="冷蛋"
                prop="coolEgg"
                width="80"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="单蛋"
                prop="aloneEgg"
                width="80"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="踩蛋"
                prop="stampEgg"
                width="80"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="死仔"
                prop="deathChild"
                width="80"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="淘汰建议"
                prop="suggest"
                width="110"
            ></el-table-column>
            <el-table-column
                align="center"
                label="备注"
                prop="remark"
                width="140"
                show-overflow-tooltip
            ></el-table-column>
        </scTable>
    </div>
</template>

<script>
import { defineComponent, reactive, ref, getCurrentInstance } from "vue";
export default defineComponent({
    name: "dovePerformance", // 种鸽性能测试
    setup() {
        const { proxy } = getCurrentInstance();
        let searchTypes = reactive([]);

        //查询下拉框数组
        searchTypes = [
            {
                value: "鸽笼编号",
                label: "鸽笼编号",
            },
        ];

        //获取鸽棚id
        let currShed = reactive(proxy.$TOOL.data.get("CURR_INFO").CURR_SHED);
        console.log("当前鸽棚", currShed);

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

        //接口地址
        const dataApi = ref(proxy.$API.performance.getData);

        //请求参数
        let params = reactive({
            fieldCommon: "A", //鸽棚编号，后面要问问师兄确定一下
            startTime: formatDate(startTime.value).substring(0, 10),
            endTime: formatDate(endTime.value).substring(0, 10),
            shedId: currShed.id, //后面要用computed
        });

        //获取数据
        // const getData = async function () {
        //   console.log('')
        //     const getDataList = await dataApi.value.post(params);
        //                 if (getDataList.code == 200) {
        //         console.log("各种数据", getDataList);
        //         let data = getDataList.data.data;
        //         console.log("各种数据", data);
        //     }
        // };
        // getData()

        //表格数据
        let tableList = reactive([]);
        tableList = [
            {
                cageNumber: "A1",
                boardNumber: 1,
                oneMonNoLayEgg: "1次",
                layEggInterval: "——",
                backEggAmount: "——",
                lightEgg: "——",
                coolEgg: "——",
                aloneEgg: "——",
                stampEgg: "——",
                deathChild: "——",
                suggest: "无",
                remark: "该种鸽一个月未下蛋，建议换掉",
            },
            {
                cageNumber: "A2",
                boardNumber: 2,
                oneMonNoLayEgg: "——",
                layEggInterval: "——",
                backEggAmount: "——",
                lightEgg: "2个",
                coolEgg: "——",
                aloneEgg: "——",
                stampEgg: "——",
                deathChild: "——",
                suggest: "无",
                remark: "该种鸽最近有光蛋，建议换掉",
            },
            {
                cageNumber: "A3",
                boardNumber: 3,
                oneMonNoLayEgg: "——",
                layEggInterval: "——",
                backEggAmount: "——",
                lightEgg: "——",
                coolEgg: "1个",
                aloneEgg: "——",
                stampEgg: "——",
                deathChild: "——",
                suggest: "无",
                remark: "该种鸽最近有冷蛋，建议换掉",
            },
            {
                cageNumber: "A4",
                boardNumber: 4,
                oneMonNoLayEgg: "——",
                layEggInterval: "——",
                backEggAmount: "——",
                lightEgg: "——",
                coolEgg: "——",
                aloneEgg: "1个",
                stampEgg: "——",
                deathChild: "——",
                suggest: "无",
                remark: "该种鸽最近有单蛋，建议换掉",
            },
            {
                cageNumber: "A5",
                boardNumber: 5,
                oneMonNoLayEgg: "——",
                layEggInterval: "——",
                backEggAmount: "——",
                lightEgg: "——",
                coolEgg: "——",
                aloneEgg: "——",
                stampEgg: "1次",
                deathChild: "——",
                suggest: "无",
                remark: "该种鸽最近有踩蛋，建议换掉",
            },
            {
                cageNumber: "A6",
                boardNumber: 6,
                oneMonNoLayEgg: "——",
                layEggInterval: "——",
                backEggAmount: "——",
                lightEgg: "——",
                coolEgg: "——",
                aloneEgg: "——",
                stampEgg: "——",
                deathChild: "1个",
                suggest: "无",
                remark: "该种鸽最近有死仔，建议换掉",
            },
            {
                cageNumber: "A7",
                boardNumber: 7,
                oneMonNoLayEgg: "——",
                layEggInterval: "——",
                backEggAmount: "——",
                lightEgg: "——",
                coolEgg: "——",
                aloneEgg: "——",
                stampEgg: "——",
                deathChild: "——",
                suggest: "无",
                remark: "该种鸽行为正常",
            },
            {
                cageNumber: "A8",
                boardNumber: 8,
                oneMonNoLayEgg: "——",
                layEggInterval: "——",
                backEggAmount: "——",
                lightEgg: "——",
                coolEgg: "——",
                aloneEgg: "——",
                stampEgg: "——",
                deathChild: "——",
                suggest: "无",
                remark: "该种鸽行为正常",
            },
        ];

        const searchClick = function () {
            console.log("嘻嘻嘻，我被点击啦");
        };

        const outTable = function () {
            console.log("哈哈哈，我被点击了噢");
        };

        return {
            defaultTimeValue,
            searchTypes,
            dataApi,
            params,
            tableList,
            searchClick,
            outTable,
        };
    },
});
</script>

<style scoped>
</style>