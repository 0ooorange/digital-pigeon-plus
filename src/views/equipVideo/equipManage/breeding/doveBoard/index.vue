<template>
    <div>
        <div style="display: flex; align-content: center">
            <el-button
                color="#409eff"
                style="color: #fff"
                class="reflashSearch"
                @click="addDoceBoard()"
            >
                +添加鸽板
            </el-button>
            <table-search
                :searchTypes="searchTypes"
                :showDatePk="false"
                :cardData="[]"
                @searchClick="searchClick"
                @outTable="outTable"
                class="table_search"
            >
            </table-search>
        </div>
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
                label="鸽笼编号"
                prop="number"
                width="220"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="添加时间"
                prop="addTime"
                width="220"
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="状态"
                prop="status"
                width="220"
                sortable
            >
            </el-table-column>
            <el-table-column align="option" label="停用" width="220">
                <template #default="scope">
                    <el-switch
                        v-model="scope.row.stop"
                        class="ml-2"
                        active-color="#13ce66"
                        inactive-color="#dfdfe0"
                    />
                </template>
            </el-table-column>
            <el-table-column label="操作" align="option" width="220">
                <template #default="scope">
                    <el-popconfirm
                        title="确定删除吗？"
                        @confirm="table_del(scope.row, scope.$index)"
                    >
                        <template #reference>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </scTable>
        <addDoceBoardDialog
            ref="addDoceBoardDialogRef"
            :dialogFormVisible="dialogFormVisible"
            @showChooseCageDialog="showChooseCageDialog"
             @closeDialog="closeDialog"
            :showTag="showTag"
        />
        <chooseCageDialog
        @closeDialog="closeDialog"
            ref="chooseCageDialogRef"
        />
    </div>
</template>
<script >
import { defineComponent, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import addDoceBoardDialog from "@/components/equipVideo/addDoceBoardDialog";
import chooseCageDialog from "@/components/equipVideo/chooseCageDialog"
export default defineComponent({
    name: "doceBoard", //鸽板
    components: {
        addDoceBoardDialog,
        chooseCageDialog
    },
    setup() {
        let searchTypes = reactive([]);
        // let cardData = reactive([]);
        let cardWidth = ref("14%");

        //时间选择器
        // const defaultTime = reactive([
        //     new Date(2022, 4, 22, 0, 0, 0),
        //     new Date(2022, 4, 23, 0, 0, 0),
        // ]);

        //查询下拉框数组
        searchTypes = [
            {
                value: "鸽笼编号",
                label: "鸽笼编号",
            },
            {
                value: "状态",
                label: "状态",
            },
        ];

        //各种用量
        let fodderList = reactive([]);
        fodderList = [
            {
                label: "加料量",
                value: "100kg",
                color: "#EE4000",
            },
            {
                label: "食用量",
                value: "80kg",
                color: "#EE9A49",
            },
            {
                label: "今天均用量",
                value: "0.04kg",
                color: "#EEE685",
            },
            {
                label: "本月已用量",
                value: "160kg",
                color: "#43CD80",
            },
            {
                label: "当月均用量",
                value: "0.08kg",
                color: "#76EE00",
            },
            {
                label: "上月用量",
                value: "2000kg",
                color: "#6495ED",
            },
            {
                label: "上月均用量",
                value: "1kg",
                color: "#7D26CD",
            },
        ];
        // cardData = [
        //     {
        //         cardText: "加料量",
        //         cardNumber: "100kg",
        //     },
        // ];

        //表格数据
        let tableList = reactive([]);
        let tableListTemp = [
            {
                number: "A1",
                addTime: "2022-04-20 09:36:24",
                status: "正常使用",
                stop: true,
            },
            {
                number: "A2",
                addTime: "2022-04-20 09:36:24",
                status: "停用",
                stop: false,
            },
            {
                number: "A3",
                addTime: "2022-04-20 09:36:24",
                status: "停用",
                stop: false,
            },
            {
                number: "A4",
                addTime: "2022-04-20 09:36:24",
                status: "停用",
                stop: false,
            },
            {
                number: "A5",
                addTime: "2022-04-20 09:36:24",
                status: "停用",
                stop: false,
            },
        ];
        tableListTemp.forEach((item) => {
            tableList.push(item);
        });

        //弹框相关
        const dialogFormVisible = ref(false);
        const addDoceBoardDialogRef = ref(null);
        const chooseCageDialogRef = ref(null);

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

        const showTag = ref(false)

        const closeDialog = function () {
            showTag.value = true
            console.log(showTag)
            addDoceBoardDialogRef.value?.changeShowTag()
        }

        const beforeChange = function (scope) {
            console.log("改变", scope);
            let action = "";

            if (scope.row.stop) {
                action = "停用";
            } else {
                action = "开启";
            }
            ElMessageBox({
                title: "Message",
                message: "确定" + action + "板子？",
                showCancelButton: true,
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                beforeClose: (action, instance, done) => {
                    if (action === "confirm") {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = "Loading...";
                        setTimeout(() => {
                            done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 300);
                        }, 3000);
                    } else {
                        done();
                    } 
                },
            }).then((action) => {
                ElMessage({
                    type: "info",
                    message: `action: ${action}`,
                });
            });
        };

        //添加鸽板
        const addDoceBoard = function () {
            console.log("促发");
            console.log(addDoceBoardDialogRef.value, 111);
            addDoceBoardDialogRef.value?.show();
        };

        const showChooseCageDialog = function () {
            console.log("选择鸽笼");
            console.log(chooseCageDialogRef.value, 11111);
            chooseCageDialogRef.value?.show();
        };

        return {
            searchTypes,
            fodderList,
            cardWidth,
            tableList,
            dialogFormVisible,
            addDoceBoardDialogRef,
            chooseCageDialogRef,
            // cardData,
            beforeChange,
            datePickerChange,
            searchClick,
            outTable,
            addDoceBoard,
            showChooseCageDialog,
            closeDialog
        };
    },
});
</script>
<style lang="scss">
.table {
    margin-top: 30px;
}
.table_search {
    flex: 1
}
</style>