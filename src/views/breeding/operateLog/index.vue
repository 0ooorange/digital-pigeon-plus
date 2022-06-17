<template>
    <div class="page">
        <table-search
            :searchTypes="searchTypes"
            :cardData="[]"
            @searchClick="searchClick"
            @outTable="outTable"
            class="table_search"
        >
            <el-date-picker
                style="
                    background-color: #fff;
                    width: 200px;
                    margin-left: 10px;
                    margin-right: 10px;
                    flex: 0 0 auto;
                    margin-bottom: 10px;
                "
                v-model="dateConcreteValue"
                type="daterange"
                start-placeholder="起始时间"
                end-placeholder="最终时间"
                :default-time="defaultTime"
                @change="datePickerChange"
            />
        </table-search>
        <div class="table_box">
            <div class="table_item">
                <el-card class="item_title" style="color: #6959cd">
                    操作记录
                </el-card>
                <!-- <div class="item_title"></div> -->
                <scTable
                    class="table"
                    :height="600"
                    ref="table"
                    row-key="id"
                    stripe
                    highlightCurrentRow
                    :data="tableListOption"
                    hidePagination
                    @selection-change="selectionChange"
                >
                    <el-table-column
                        align="center"
                        label="时间"
                        prop="time"
                        width="140"
                        sortable
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="鸽笼编号"
                        prop="number"
                        width="120"
                        sortable
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="操作记录"
                        prop="option"
                        width="100"
                    ></el-table-column>
                </scTable>
                <el-pagination
                    background
                    :small="true"
                    :layout="paginationLayout"
                    :total="total"
                    :page-sizes="pageSizes"
                    v-model:currentPage="currentPage"
                    v-model:page-size="pageSize"
                    @current-change="paginationChange"
                ></el-pagination>
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
                    :height="600"
                    :data="tableListAbnormal"
                    hidePagination
                    @selection-change="selectionChange"
                >
                    <el-table-column
                        align="center"
                        label="时间"
                        prop="time"
                        width="140"
                        sortable
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="鸽笼编号"
                        prop="number"
                        width="120"
                        sortable
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="异常信息"
                        prop="abnormal"
                        width="100"
                    ></el-table-column>
                </scTable>
                <el-pagination
                    background
                    :small="true"
                    :layout="paginationLayout"
                    :total="totalAnother"
                    :page-sizes="pageSizesAnother"
                    v-model:currentPage="currentPageAnother"
                    v-model:page-size="pageSizeAnother"
                    @current-change="paginationChange"
                ></el-pagination>
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
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
    name: "operateLog", // 饲料统计
    setup() {
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
                value: "鸽笼编号",
                label: "鸽笼编号",
            },
        ];

        //表格数据
        let tableList = reactive([]);
        let tableListOption = reactive([]);
        let tableListAbnormal = reactive([]);
        let dataCount = reactive([]);
        let total = ref(12);
        let pageSizes = ref(10);
        let currentPage = ref(1);
        let pageSize = ref(10);

        let totalAnother = ref(10);
        let pageSizesAnother = ref(10);
        let currentPageAnother = ref(1);
        let pageSizeAnother = ref(10);

        tableListOption = [
            {
                time: "2022-04-21",
                number: "A01",
                option: "查蛋(抽取)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                option: "查蛋(抽取)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                option: "查蛋(抽取)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                option: "查蛋(抽取)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                option: "查蛋(抽取)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                option: "查蛋(抽取)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                option: "查蛋(抽取)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                option: "查蛋(抽取)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                option: "查蛋(抽取)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                option: "查蛋(抽取)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                option: "查蛋(抽取)",
            },
        ];

        tableListAbnormal = [
            {
                time: "2022-04-21",
                number: "A01",
                abnormal: "蛋异常(单蛋)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                abnormal: "仔异常(冷蛋)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                abnormal: "蛋异常(单蛋)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                abnormal: "仔异常(冷蛋)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                abnormal: "蛋异常(单蛋)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                abnormal: "仔异常(冷蛋)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                abnormal: "蛋异常(单蛋)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                abnormal: "仔异常(冷蛋)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                abnormal: "仔异常(冷蛋)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                abnormal: "仔异常(冷蛋)",
            },
            {
                time: "2022-04-21",
                number: "A01",
                abnormal: "仔异常(冷蛋)",
            },
        ];

        dataCount = [
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

        return {
            searchTypes,
            cardWidth,
            // defaultTime,
            dateConcreteValue,
            tableList,
            tableListAbnormal,
            tableListOption,
            cardData,
            dataCount,
            total,
            pageSizes,
            currentPage,
            pageSize,
            totalAnother,
            pageSizesAnother,
            currentPageAnother,
            pageSizeAnother,
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