<template>
    <div class="top">
        <span class="top--title common--title">指标所属</span>
        <el-select
            v-model="timeValue"
            class="m-2"
            placeholder="Select"
            size="large"
            style="width: 150px"
            @change="changeTime"
        >
            <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </el-select>
    </div>
    <div class="main">
        <!-- <span class="top--title common--title">阀值所属:</span> -->
        <!-- <el-card class="main--card" shadow="never">
            <div class="card--header">
                <span>阀值所属</span>
            </div>
            <div class="card--main">
                <el-row class="card--mainRow">
                    <el-col :span="2">空气温度</el-col>
                    <el-col :span="4">
                      <span style="font-size:14px;margin-right:10px;width:30%">Min:</span>
                        <el-input
                        show-overflow-tooltip
                            v-model="input"
                            style="width:70%"
                            size="large"
                            placeholder="Please input"
                    /></el-col>
                    <el-col :span="5"
                        ><el-input
                            v-model="input"
                            class="card--mainRow__input"
                            size="large"
                            placeholder="Please input"
                    /></el-col>
                    <el-col :span="4">
                      <span style="font-size:14px;margin-right:10px;width:30%">Max:</span>
                        <el-input
                            v-model="input"
                            style="width:70%"
                            size="large"
                            placeholder="Please input"
                    /></el-col>
                    <el-col :span="5"
                        ><el-input
                            v-model="input"
                            class="card--mainRow__input"
                            size="large"
                            placeholder="Please input"
                    /></el-col>
                    <el-col :span="3">
                      <el-button type="success">修改</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-card> -->
        <scTable
            class="table"
            ref="table"
            row-key="id"
            stripe
            style="height: 700px"
            :hidePagination="true"
            highlightCurrentRow
            :data="resultList"
        >
            <el-table-column
                align="center"
                label="类别"
                prop="name"
                width="180"
            ></el-table-column>
            <el-table-column
                align="center"
                label="最小值"
                prop="min"
                width="200"
            ></el-table-column>
            <el-table-column
                align="center"
                label="预警信息"
                prop="mininfo"
                width="260"
            ></el-table-column>
            <el-table-column
                align="center"
                label="最大值"
                prop="max"
                width="200"
            ></el-table-column>
            <el-table-column
                align="center"
                label="预警信息"
                prop="maxinfo"
                width="260"
            ></el-table-column>
            <el-table-column
                align="center"
                label="操作"
                prop="weight"
                width="200"
            >
                <template #default="scope">
                    <el-button
                        type="primary"
                        plain
                        icon="el-icon-edit"
                        @click="editData(scope.row)"
                        >编辑</el-button
                    >
                    <!-- <el-button
                        size="mini"
                        type="danger"
                        icon="el-icon-delete"
                        @click="removeOutcage(scope.row.id)"
                        >删除</el-button
                    > -->
                </template></el-table-column
            >
        </scTable>
        <!-- <eitSetDialog
            ref="eitSetDialog"
            :dialogFormVisible="dialogFormVisible"
            @showEitSetDialog="showEitSetDialog"
            @closeDialog="closeDialog"
            :showTag="showTag"
        /> -->
        <eitSetDialog
            ref="eitSetDialog"
            :dialogForm="dialogForm"
            :dialogFormVisible="dialogFormVisible"
            @closeDialog="closeDialog"
        />
    </div>
</template>
<script >
import { defineComponent, reactive, ref } from "vue";
import eitSetDialog from "@/components/equipVideo/editSet";
import { getThresholdBYDay } from "@/api/model/equipVideo/set";
export default defineComponent({
    name: "setValue", // 阀值设置
    components: {
        eitSetDialog,
    },
    setup() {
        //当前时间

        const currentTime = new Date();
        // console.log("当前时间", currentTime.getHours());

        //临时变量
        var temp = "";

        if (currentTime.getHours() < 18 || currentTime.getHours > 6) {
            temp = "白昼";
        } else {
            temp = "夜晚";
        }
        const timeValue = ref(temp);
        const timeOptions = [
            {
                value: "白昼",
                label: "白昼",
            },
            {
                value: "夜晚",
                label: "夜晚",
            },
        ];

        //改变时间
        const changeTime = function () {
        // const changeTime = function (e) {
            // console.log("选择器发生改变", e);
            // console.log(timeValue.value, 555);

            resultList.length = 0;
            getThresholdBYDayMethods();
        };

        const resultList = reactive([]);

        const getThresholdBYDayMethods = async function () {
            let params;
            switch (timeValue.value) {
                case "白昼":
                    params = 0;
                    break;
                case "夜晚":
                    params = 1;
                    break;
            }
            // console.log("参数", params);
            let res = await getThresholdBYDay(params);
            // console.log("获取数据列表结果", res);
            if (res.code == 200) {
                resultList.push(...res.data.data);
                // console.log(resultList, "结果");
            }
        };
        getThresholdBYDayMethods();

        //

        //弹框相关

        //弹框是否显示
        const dialogFormVisible = ref(false);

        //编辑的弹框
        const eitSetDialog = ref(null);

        //弹框默认数据
        const dialogForm = reactive({
            name: "",
            min: "",
            mininfo: "",
            max: "",
            maxinfo: "",
            day: timeValue.value,
            gmtCreate: "",
            gmtModified: "",
            id: "",
            isDeleted: "",
            version: "",
        });

        const editData = function (e) {
            // console.log("编辑数据", e);
            // console.log(eitSetDialog.value, 11111);
            dialogForm.name = e.name;
            dialogForm.min = e.min;
            dialogForm.mininfo = e.mininfo;
            dialogForm.max = e.max;
            dialogForm.maxinfo = e.maxinfo;
            dialogForm.gmtCreate = e.gmtCreate;
            dialogForm.gmtModified = e.gmtModified;
            dialogForm.id = e.id;
            dialogForm.isDeleted = e.isDeleted;
            dialogForm.version = e.version;
            eitSetDialog.value.form = e
            eitSetDialog.value?.show(e.name);
        };

        return {
            timeValue,
            timeOptions,
            resultList,
            dialogForm,
            dialogFormVisible,
            changeTime,
            eitSetDialog,
            editData,
        };
    },
});
</script>

<style scoped lang="scss">
.common--title {
    margin-right: 10px;
    margin-left: 8px;
    font-size: 16px;
    letter-spacing: 1px;
}
.top {
    margin-bottom: 20px;
}
.main {
    margin-bottom: 10px;
    .main--card {
        :deep(.el-card__body) {
            height: 100%;
            padding: 10px !important;
        }

        .card--header {
            height: 40px;
            margin-bottom: 20px;
            border-bottom: 4px solid #f6f8f9;
            // padding: 20px;
            line-height: 30px;
            font-size: 16px;
        }
        .card--main {
            .card--mainRow {
                text-align: center;
                font-size: 16px;
                height: 60px;
                line-height: 60px;

                .card--mainRow__input {
                    width: 90%;
                }
            }
            .card--mainRow:nth-child(odd) {
                background-color: #f7f7f7;
            }
        }
        .grid-content {
            border-radius: 4px;
            min-height: 36px;
        }
    }
}
</style>
