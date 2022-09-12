<template>
    <div class="search">
        <div class="btnleft">
            <el-button type="primary" class="sousuo">孵蛋</el-button>
            <el-button type="primary" class="sousuo">抽蛋</el-button>
            <el-button type="primary" class="sousuo">全部</el-button>
        </div>
        <div class="btnright">
            <el-button type="danger">亮灯</el-button>
            <el-button type="warning" @click="outTable">导出</el-button>
            <el-button type="success" @click="printTable">打印</el-button>
        </div>
    </div>

    <el-main class="nopadding">
        <scTable
            ref="table"
            :data="tablelist"
            stripe
            highlightCurrentRow
            class="tablestyle"
            :default-sort="{ prop: 'date', order: 'descending' }"
        >
            <el-table-column
                label="鸽笼号"
                prop="codes"
                sortable
                width="120"
                align="center"
            ></el-table-column>
            <el-table-column
                label="板子编号"
                prop="panelCode"
                width="120"
                align="center"
            ></el-table-column>
            <el-table-column
                label="上上次"
                prop="lastTwoOperate"
                width="120"
                align="center"
            ></el-table-column>
            <el-table-column
                label="时间间隔"
                prop="lastTwoDiffer"
                sortable
                width="150"
                align="center"
            ></el-table-column>
            <el-table-column
                label="上次"
                prop="lastOperate"
                width="120"
                align="center"
            ></el-table-column>
            <el-table-column
                label="时间间隔"
                prop="lastDiffer"
                sortable
                width="150"
                align="center"
            ></el-table-column>
            <el-table-column
                label="本次推荐"
                prop="recommendation"
                width="150"
                align="center"
            >
                <template v-slot="scope">
                    <el-select
                        v-model="scope.row.value"
                        class="m-2"
                        placeholder="抽蛋"
                        style="width: 90px"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                label="备注"
                prop="remarks"
                align="center"
            ></el-table-column>
        </scTable>
    </el-main>
</template>

<script>
import { ref } from "vue";
import { getTakeOrHatchAssistance } from "@api/breeding/auxiliary/incubate";
import store from "@/store";
import { ElMessage } from "element-plus";
import print from "@/utils/print";
import LAY_EXCEL from "lay-excel";
export default {
    name: "ExtractAndIncubateAuxiliary",
    setup() {
        const options = [
            { value: "Option1", label: "抽蛋" },
            { value: "Option2", label: "孵化" },
        ];
        const tablelist = ref([]);
        const pageNum = ref(1);
        const pageSize = ref(10);
        const shedId = store.state.baseInfo.SHED_ID;
        getTakeOrHatchAssistance(shedId, pageNum.value, pageSize.value).then(
            (res) => {
                tablelist.value = res.data.data;
            }
        );
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
                        lastTwoOperate: "上上次",
                        lastTwoDiffer: "时间间隔",
                        lastOperate: "上次",
                        lastDiffer: "时间间隔",
                        recommendation: "本次推荐",
                        remarks: "备注",
                    });
                    tableData = LAY_EXCEL.filterExportData(tableData, [
                        "codes",
                        "panelCode",
                        "lastTwoOperate",
                        "lastTwoDiffer",
                        "lastOperate",
                        "lastDiffer",
                        "recommendation",
                        "remarks",
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
        const printTable = () => {
            console.log(table.value);
            print(table.value);
        };
        return {
          outTable,
          printTable,
          table,
            tablelist,
            options,
        };
    },
};
</script>

<style lang="less" scoped>
.search {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    .btnleft {
        display: flex;
        flex-direction: row;
        margin-left: 30px;
        .sousuo {
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
        }
    }
    .btnright {
        margin-left: 780px;
        display: flex;
        flex-direction: row;
    }
}
.el-button {
    height: 27px;
}
</style>
