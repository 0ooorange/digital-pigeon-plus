<template>
    <table-search
        :cardData="cardData"
        :showSearch="false"
        :showDatePk="false"
        @outTable="outTable"
         @printTable="printTable"
    />
    <scTable
        ref="table"
        :column="column"
        :data="tablelist"
        stripe
        highlightCurrentRow
        :default-sort="{ prop: 'date', order: 'descending' }"
    />
</template>

<script>
import { ref } from "vue";
import {
    checkEggAssistant,
    checkEggNumbers,
} from "@api/breeding/auxiliary/examEgg";
import print from "@/utils/print";
import LAY_EXCEL from "lay-excel";
import store from "@/store";
import { ElMessage } from "element-plus";
export default {
    name: "examineEggAuxiliary",
    setup() {
        // 卡片
        const cardData = ref([]);
        const table = ref(null);
        let isExport = false;
        const outTable = () => {
            // console.log('导出')
            // console.log(table.value.tableData, "表格组件");
            let tableData = tablelist.value.slice(0);
            if (tableData.length === 0) {
                // console.log("没有数据导出");
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
                        codes: "鸽笼号",
                        panelCode: "板子编号",
                        layEggTime: "生蛋时间",
                        takeOrHatch: "操作",
                        layEggDays: "生蛋天数",
                    });
                    tableData = LAY_EXCEL.filterExportData(tableData, [
                        "codes",
                        "panelCode",
                        "layEggTime",
                        "takeOrHatch",
                        "layEggDays",
                    ]);
                    LAY_EXCEL.exportExcel(
                        {
                            sheet1: tableData,
                        },
                        "抽孵辅助导出表格.xlsx",
                        "xlsx"
                    );

                    ElMessage({
                        message: `表格导出成功,请查收`,
                        type: "success",
                        duration: 2000,
                    });
                    // console.log("导出成功");
                } else {
                    ElMessage({
                        message: `表格导出中,请勿重复操作`,
                        type: "warning",
                        duration: 2000,
                    });
                }
            }
        };
                const printTable = function () {
            console.log(table.value);
            print(table.value);
        };

        // 表格
        const tablelist = ref([]);
        const column = ref([
            {
                label: "鸽笼号",
                prop: "codes",
                sortable: true,
                width: 120,
                align: "center",
            },
            {
                label: "板子编号",
                prop: "panelCode",
                width: 150,
                align: "center",
            },
            {
                label: "生蛋时间",
                prop: "layEggTime",
                sortable: true,
                width: 230,
                align: "center",
            },
            { label: "操作", prop: "takeOrHatch", width: 170, align: "center" },
            {
                label: "生蛋天数",
                prop: "layEggDays",
                sortable: true,
                width: 170,
                align: "center",
            },
            { label: "备注", prop: "remarks", width: 270, align: "center" },
        ]);
        const pageNum = ref(1);
        const pageSize = ref(10);
        const shedId = store.state.baseInfo.SHED_ID;
        checkEggAssistant(shedId, pageNum.value, pageSize.value).then((res) => {
            tablelist.value = res.data.data;
        });

        checkEggNumbers(shedId).then((res) => {
            cardData.value = [];
            cardData.value.push({
                cardText: "孵化个数",
                cardNumber: res.data.data.incubationNumbers + "个",
            });
            cardData.value.push({
                cardText: "查蛋个数",
                cardNumber: res.data.data.checkEggNumber + "个",
            });
            cardData.value.push({
                cardText: "抽蛋个数",
                cardNumber: res.data.data.extractionNumbers + "个",
            });
        });

        return {
          table,
            tablelist,
            cardData,
            column,
            outTable,
            printTable
        };
    },
};
</script>