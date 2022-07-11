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
        <div class="timeContent--main">
            <div class="timeContent--common timeContent--left">
                <el-timeline>
                    <el-timeline-item timestamp="2022/4/12" placement="top">
                        <el-card>
                            <h4>A1仓温度过高</h4>
                            <!-- <p>Tom committed 2022/4/12 20:46</p> -->
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2022/4/3" placement="top">
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
                    </el-timeline-item>
                </el-timeline>
            </div>
            <div class="timeContent--common timeContent--right">
                <el-timeline>
                    <el-timeline-item timestamp="2022/4/12" placement="top">
                        <el-card>
                            <h4>A1仓温度过高</h4>
                            <!-- <p>Tom committed 2022/4/12 20:46</p> -->
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2022/4/3" placement="top">
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
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
        <div class="timeContent--pagination">
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
import { defineComponent, ref, getCurrentInstance } from "vue";
export default defineComponent({
    name: "warnCenter", // 预警中心
    setup() {
        const { proxy } = getCurrentInstance();
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
        const paginationChange = function () {
            console.log('触发这里',pageSize.value,currentPage.value);

        };
        const handleSizeChange = function () {
                        console.log('触发这里',pageSize.value,currentPage.value);
        };

        return {
            dateValue,
            total,
            shortcuts,
            pageSizes,
            currentPage,
            pageSize,
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
    }
    .timeContent--pagination {
      display: flex;
      align-content: center;
      justify-content: center;

        .el-pagination {
        }
    }
}
</style>
