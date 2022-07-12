<template>
    <div class="top">
        <el-date-picker
            v-model="dateValue"
            type="daterange"
            format="YYYY-MM-DD"
            unlink-panels
            range-separator="-"
            start-placeholder="起始时间"
            end-placeholder="结束时间"
            :shortcuts="shortcuts"
            style="width: 250px"
            @change="visibleChange"
        />
    </div>
    <div class="timeContent">
        <div class="timeContent--main" v-if="leftData.length != 0">
            <div class="timeContent--common timeContent--left">
                <el-timeline>
                    <el-timeline-item
                        v-for="(item, index) in leftData"
                        :key="index"
                        :timestamp="item.gmtCreate"
                        placement="top"
                    >
                        <el-card>
                            <h4>
                                {{ item.code }}{{ item.warninfo }}
                                <span v-if="item.value != ''"
                                    >{{ item.name }}的值为{{ item.value
                                    }}{{ item.unit }}</span
                                >
                            </h4>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
            <div class="timeContent--common timeContent--right">
                <el-timeline>
                    <el-timeline-item
                        v-for="(item, index) in rightData"
                        :key="index"
                        :timestamp="item.gmtCreate"
                        placement="top"
                    >
                        <el-card>
                            <h4>
                                {{ item.code }}{{ item.warninfo }}
                                <span v-if="item.value != ''"
                                    >{{ item.name }}的值为{{ item.value
                                    }}{{ item.unit }}</span
                                >
                            </h4>
                        </el-card>
                    </el-timeline-item>
                    <!-- <el-timeline-item timestamp="2022/4/3" placement="top">
                        <el-card>
                            <h4>A2仓二氧化碳浓度过高</h4>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2022/4/2" placement="top">
                        <el-card>
                            <h4>A仓PM2.5过高</h4>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2022/4/12" placement="top">
                        <el-card>
                            <h4>A3仓氨气浓度过高</h4>
                        </el-card>
                    </el-timeline-item> -->
                </el-timeline>
            </div>
        </div>
        <!-- <div v-else class="timeContent--main">
            <el-card shadow="never" class="timeContent--main__noData">
                暂无数据！
            </el-card>
        </div> -->
        <div class="timeContent--pagination" v-if="leftData.length != 0">
            <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                :small="true"
                :total="total"
                :page-sizes="pageSizes"
                v-model:currentPage="currentPage"
                v-model:page-size="pageSize"
                @current-change="paginationChange"
                @size-change="handleSizeChange"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
import { ElMessage } from "element-plus";
import { defineComponent, ref, getCurrentInstance, reactive } from "vue";
export default defineComponent({
    name: "warnCenter", // 预警中心
    setup() {
        const { proxy } = getCurrentInstance();

        //当前鸽棚鸽笼信息
        // const currShed = proxy.$TOOL.data.get("CURR_INFO").CURR_SHED;
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

        //时间选择器绑定的值
        const dateValue = ref([
            proxy.$TOOL.date.formateDate(startTime.value).substring(0, 10),
            proxy.$TOOL.date.formateDate(endTime.value).substring(0, 10),
        ]);

        //时间选择器
        const shortcuts = [
            {
                text: "近一周",
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    return [start, end];
                },
            },
            {
                text: "近一个月",
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    return [start, end];
                },
            },
            {
                text: "近3个月",
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    return [start, end];
                },
            },
        ];

        // 页码选择器
        const total = ref(10);
        const pageSizes = ref([5, 10, 20, 50]);
        const currentPage = ref(1);
        const pageSize = ref(10);

        //请求参数
        let params = {
            start_time: proxy.$TOOL.date.formateDate(startTime.value),
            end_time: proxy.$TOOL.date.formateDate(endTime.value),
            current: currentPage.value,
            size: pageSize.value,
            // shed_id: currShed.id,
        };

        //日期选择器
        const visibleChange = function (e) {
            console.log("选择日期", e);
            console.log(
                proxy.$TOOL.date.formateDate(e[0]),
                proxy.$TOOL.date.formateDate(e[1]).substring(0, 10) +
                    " 23:59:59"
            );
            params.start_time = proxy.$TOOL.date.formateDate(e[0]);
            params.end_time =
                proxy.$TOOL.date.formateDate(e[1]).substring(0, 10) +
                " 23:59:59";
            console.log("参数", params);
            getData();
        };

        //左右两个数组
        const leftData = reactive([]);
        const rightData = reactive([]);

        //获取数据
        const getData = async function () {
            let res = await proxy.$API.warnCenter.getCarbonDioxideData.post(
                params
            );
            leftData.length = 0;
            rightData.length = 0;
            if (res.code == 200) {
                let data = res.data.data;
                // leftData.length = 0;
                leftData.push(...data.slice(0, Math.ceil(data.length / 2)));
                 rightData.push(...data.slice(Math.ceil(data.length / 2)));
                
                // leftData.length = 0;
                console.log( Math.ceil(data.length / 2), "左边数据");
                console.log((data.length / 2) + 1, "右边数据");
            } else {
                ElMessage({
                    message: "暂无数据",
                    type: "warning",
                });
            }
            console.log("请求结果", res);
        };

        getData();

        const paginationChange = function () {
            // console.log("触发这里", pageSize.value, currentPage.value);
            params.current = currentPage.value;
            params.size = pageSize.value;
            getData();
        };
        const handleSizeChange = function () {
            params.current = currentPage.value;
            params.size = pageSize.value;
            getData();
        };

        return {
            dateValue,
            total,
            shortcuts,
            pageSizes,
            currentPage,
            pageSize,
            leftData,
            rightData,
            visibleChange,
            paginationChange,
            handleSizeChange,
        };
    },
});
</script>
<style scoped lang="scss">
.top {
    margin-bottom: 15px;
}
.timeContent {
    .timeContent--main {
        display: flex;
        .timeContent--common {
            width: 50%;
            margin-right: 10px;
        }
        // .timeContent--main__noData {
        //     margin: auto;
        //     width: 60%;
        //     height: 300px;
        //     text-align: center;
        //     line-height: 300px;
        //     font-size: 30px;

        //     :deep(.el-card__body) {
        //         // display: flex;
        //         // height: 100%;
        //         // padding: 20px !important;

        //         // background-color: #d9f0f7;
        //     }
        // }
    }
    .timeContent--pagination {
        display: flex;
        align-content: center;
        justify-content: center;
        margin-top: 20px;
        .el-pagination {
        }
    }
}
</style>
