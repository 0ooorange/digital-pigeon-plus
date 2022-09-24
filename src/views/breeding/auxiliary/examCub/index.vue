<template>
    <table-search
        :cardData="cardData"
        :showSearch="false"
        :showDatePk="false"
        @searchClick="searchClick"
        @outTable="outTable"
         @printTable="printTable"
    />
    <scTable
        ref="table"
        :column="column"
        :data="tablelist"
        stripe
        highlightCurrentRow
        class="tablestyle"
        :default-sort="{ prop: 'date', order: 'descending' }"
    />
</template>

<script>
import { ref } from "vue";
import {
    checkCubAssistant,
    checkCubNumbers,
} from "@api/breeding/auxiliary/examCub";
import store from "@/store";
import { ElMessage } from "element-plus";
import print from "@/utils/print";
import LAY_EXCEL from "lay-excel";
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
                        incubationDays: "孵化天数",
                        remarks: "备注",
                    });
                    tableData = LAY_EXCEL.filterExportData(tableData, [
                        "codes",
                        "panelCode",
                        "layEggTime",
                        "incubationDays",
                        "remarks",
                    ]);
                    LAY_EXCEL.exportExcel(
                        {
                            sheet1: tableData,
                        },
                        "查仔辅助导出表格.xlsx",
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
                width: 140,
                align: "center",
            },
            {
                label: "板子编号",
                prop: "panelCode",
                width: 140,
                align: "center",
            },
            {
                label: "生蛋时间",
                prop: "layEggTime",
                sortable: true,
                width: 230,
                align: "center",
            },
            {
                label: "孵化天数",
                prop: "incubationDays",
                width: 180,
                align: "center",
            },
            { label: "备注", prop: "remarks", width: 250, align: "center" },
        ]);
        const pageNum = ref(1);
        const pageSize = ref(10);
        const shedId = store.state.baseInfo.SHED_ID;
        checkCubAssistant(shedId, pageNum.value, pageSize.value).then((res) => {
            tablelist.value = res.data.data;
        });

        checkCubNumbers(shedId).then((res) => {
            cardData.value = [];
            cardData.value.push({
                cardText: "查仔个数",
                cardNumber: res.data.data.checkCubNumber + "个",
            });
        });

        return {
            tablelist,
            cardData,
            column,
            outTable,
            table,
            printTable
        };
    },
};
</script>