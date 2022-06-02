<template>
    <div>
        <table-search
            :searchTypes="searchTypes"
            :cardData="cardData"
            :cardWidth="cardWidth"
            @searchClick="searchClick"
            @outTable="outTable"
            class="table_search"
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
            :data="tableList"
            @selection-change="selectionChange"
        >
            <el-table-column
                align="center"
                label="料槽编号"
                prop="number"
                width="140"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="加料时间"
                prop="chargeTime"
                width="180"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="加料量"
                prop="chargeAmount"
                width="160"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="复称时间"
                prop="weighAgain"
                width="180"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="剩余量"
                prop="surplusWeight"
                width="160"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="食用量"
                prop="edibleAmount"
                width="160"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="饲料品种"
                prop="variety"
                width="160"
            ></el-table-column>
        </scTable>
    </div>
</template>

<script>
import { defineComponent, reactive, ref ,getCurrentInstance} from "vue";
export default defineComponent({
    name: "fodderStatistics", // 饲料统计
    setup() {

        const { proxy } = getCurrentInstance();

        //当前鸽棚鸽笼信息
        const currShed = proxy.$TOOL.data.get("CURR_INFO").CURR_SHED;
        
        let searchTypes = reactive([]);
        let cardData = reactive([]);
        let cardWidth = ref("14%");

        //时间选择器
        // const defaultTime = reactive([
        //     new Date(2022, 4, 22, 0, 0, 0),
        //     new Date(2022, 4, 23, 0, 0, 0),
        // ]);

        //日期值
        let dateConcreteValue = ref("");
        // dateConcreteValue = []

        //查询下拉框数组
        searchTypes = [
            {
                value: "料槽编号",
                label: "料槽编号",
            },
        ];

        cardData = [
            {
                cardText: "加料量",
                cardNumber: "100kg",
            },
            {
                cardText: "复称量",
                cardNumber: "20kg",
            },
            {
                cardText: "食用量",
                cardNumber: "80kg",
            },
            {
                cardText: "本月已用量",
                cardNumber: "160kg",
            },
            {
                cardText: "当月均用量",
                cardNumber: "0.8kg",
            },
            {
                cardText: "饲料1剩余量",
                cardNumber: "80kg",
            },
            {
                cardText: "饲料2剩余量",
                cardNumber: "80kg",
            },
            {
                cardText: "饲料3剩余量",
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
        ];

        //表格数据
        let tableList = reactive([]);

        tableList = [
            {
                number: 1,
                chargeTime: "2022-04-20 09:36:24",
                chargeAmount: "25kg",
                weighAgain: "2022-04-20 17:36:24",
                surplusWeight: "5kg",
                edibleAmount: "20kg",
                variety: "混料",
            },
            {
                number: 2,
                chargeTime: "2022-04-20 09:36:24",
                chargeAmount: "25kg",
                weighAgain: "2022-04-20 17:36:24",
                surplusWeight: "5kg",
                edibleAmount: "20kg",
                variety: "混料",
            },
            {
                number: 3,
                chargeTime: "2022-04-20 09:36:24",
                chargeAmount: "25kg",
                weighAgain: "2022-04-20 17:36:24",
                surplusWeight: "5kg",
                edibleAmount: "20kg",
                variety: "混料",
            },
            {
                number: 4,
                chargeTime: "2022-04-20 09:36:24",
                chargeAmount: "25kg",
                weighAgain: "2022-04-20 17:36:24",
                surplusWeight: "5kg",
                edibleAmount: "20kg",
                variety: "混料",
            },
            {
                number: 5,
                chargeTime: "2022-04-20 09:36:24",
                chargeAmount: "25kg",
                weighAgain: "2022-04-20 17:36:24",
                surplusWeight: "5kg",
                edibleAmount: "20kg",
                variety: "混料",
            },
        ];

        //日期选择器改变
        const datePickerChange = function (e) {
            console.log("日期改变", e);
        };
        const searchClick = function () {
            console.log("嘻嘻嘻，我被点击啦");
        };

        const outTable = function () {
            console.log("哈哈哈，我被点击了噢");
        };

        //和日期相关的

        //当前日期
        const nowTime = new Date();
        console.log(nowTime, "当前时间");

        //格式化时间
        const formatDate = function (date) {
            var myyear = date.getFullYear();
            var mymonth = date.getMonth() + 1;
            var myweekday = date.getDate();

            if (mymonth < 10) {
                mymonth = "0" + mymonth;
            }
            if (myweekday < 10) {
                myweekday = "0" + myweekday;
            }
            return myyear + "-" + mymonth + "-" + myweekday;
        };

        //上个月的起止时间
        const hasLastDate = function (nowYear,nowMonth) {
            const monthStartDate = new Date(nowYear, nowMonth - 2, 1);
            const monthEndDate = new Date(nowYear, nowMonth - 1, 1);
            console.log('上个月',formatDate(monthStartDate))
            console.log('这个月',formatDate(monthEndDate))
            console.log('天数',(monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24) )
        };

        console.log(formatDate(nowTime, "格式化后的"));
        console.log(hasLastDate(2022,6))

        //获取各品牌饲料剩余量
        const getFeedBrandNumByShedID = async function() {

            console.log('当前鸽棚',currShed)
            let data = {
                currShed: currShed.id
            }
             const feedBrandNum = await proxy.$API.fodder.feedBrandNumByShedID.get(data)
             console.log('各种饲料剩余量数据',feedBrandNum)
        }
        getFeedBrandNumByShedID()

        return {
            searchTypes,
            cardWidth,
            // defaultTime,
            dateConcreteValue,
            tableList,
            cardData,

            datePickerChange,
            searchClick,
            outTable,
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