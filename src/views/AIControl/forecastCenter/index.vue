<template>
    <div class="forecastCenter">
        <el-card shadow="never" class="main common">
            <div class="header">监测&&预测</div>
            <div class="left--main">
                <el-card
                    class="echart--box"
                    shadow="never"
                    :style="{
                        width: echartArray.length <= 1 ? '100%' : '100%',

                        'margin-top': echartArray.length == 1 ? '50px' : '20px',
                    }"
                    v-for="(item, index) in echartArray"
                    :key="index"
                >
                    <ScEcharts
                        :ref="item.ref"
                        height="100%"
                        width="100%"
                        :option="item.option"
                    ></ScEcharts>
                </el-card>
            </div>
        </el-card>
        <el-card shadow="never" class="right common">
            <div class="header">预测项</div>
            <div class="right--main">
                <div class="right--label">
                    <span
                        style="
                            color: red;
                            margin-right: 5px;
                            font-weight: 700;
                            font-size: 18px;
                        "
                        >*</span
                    >
                    <span>选择预测内容:</span>
                </div>
                <el-select
                    class="right--option"
                    multiple
                    filterable
                    v-model="selectedArr"
                    :loading="false"
                    :collapse-tags="true"
                    placeholder="请选择"
                    @change="changeSelect"
                    @remove-tag="removeTag"
                >
                    <el-checkbox
                        v-model="checked"
                        @change="selectAll"
                        style="margin-left: 20px"
                        >全选</el-checkbox
                    >
                    <el-option
                        v-for="item in selectOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <!-- <el-row class="right--row">
                    <el-col :span="8" class="right--row__label">
                        <span></span>
                    </el-col>
                    <el-col :span="16">
                        <el-select
                            class="right--option"
                            multiple
                            filterable
                            v-model="selectedArr"
                            :loading="false"
                            :collapse-tags="true"
                            placeholder="请选择"
                            @change="changeSelect"
                            @remove-tag="removeTag"
                        >
                            <el-checkbox
                                v-model="checked"
                                @change="selectAll"
                                style="margin-left: 20px"
                                >全选</el-checkbox
                            >
                            <el-option
                                v-for="item in selectOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row> -->

                <!-- <el-select
                    size="mini"
                    multiple
                    filterable
                    :collapse-tags="true"
                    v-model="selectedArr"
                    placeholder="请选择"
                    @change="changeSelect"
                >

                    <el-option
                        v-for="item in selectOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select> -->
            </div>
        </el-card>
    </div>
</template>
<script>
import {
    defineComponent,
    ref,
    reactive,
    computed,
    getCurrentInstance,
} from "vue";
import ScEcharts from "@/components/scEcharts";
export default defineComponent({
     name: "forecastCenter", // 预测中心
    components: {
        ScEcharts,
    },
    setup() {
        const { proxy } = getCurrentInstance();
        //当前鸽棚鸽笼信息
        const currShed = computed(() => {
            return proxy.$store.state.baseInfo.SHED_ID;
        });

        //相同维度
        let commonDimensions = [
            "id",
            "deviceid",
            "devicecode",
            "dataid",
            "datacode",
            "dataname",
            "datavalue",
            "datavalueText",
            "dataunit",
            "dataicon",
            "dataLevel",
            "devicetime",
            "gmtCreate",
            "gmtModified",
            "isDeleted",
            "version",
        ];

        //相同y轴部分
        let commonY = {
            type: "value",
            nameGap: 20, //坐标轴名称与坐标轴之间的距离

            splitLine: {
                show: false,
            },
            nameTextStyle: {
                color: "#696969",
                fontWeight: "bold",
                //  width: 80,
                fontSize: 12,
            },
            // visualMap: {
            //     top: "top",
            //     left: "center",
            //     orient: "horizontal",
            //     textStyle: {
            //         color: "#fff",
            //     },
            //     dimension: 0,
            //     pieces: [
            //         {
            //             gt: 0,
            //             lte: 22,
            //             color: "cyan",
            //             label: "真实值",
            //         },

            //         {
            //             gt: 22,
            //             color: "purple",
            //             label: "预测值",
            //         },
            //     ],
            //     outOfRange: {
            //         color: "#000",
            //     },
            // },
        };

        //相同series
        let seriesObject = {
            name: "",
            type: "line",
            symbol: "none",
            smooth: true,
            dimensions: ["devicetime", "datavalue"],
            encode: {
                x: ["devicetime"], // 表示维度 3、1、5 映射到 x 轴。
                y: "datavalue", // 表示维度 2 映射到 y 轴。
            },
        };
        //相同的tooltip
        let commonTooltip = {
            trigger: "axis",
            //部分格式化，给数值加单位
            // valueFormatter: (value) => value + "%",
            //位置
            position: function () {
                return { left: "50%", top: 40 };
            },
        };

        let commonAnothetTooltip = {
            trigger: "axis",
            //部分格式化，给数值加单位
            // valueFormatter: (value) => value + "%",
            //位置
            position: function () {
                return { left: "25%", top: "25%" };
            },
        };

        //相同的配置
        let commomOption = {
            xAxis: {
                boundaryGap: false,
                type: "time",
                // name: "时间",
            },
            data: [
                {
                    textStyle: {
                        fontSize: 28,
                    },
                },
            ],
        };

        //二氧化碳的图表值
        let carbonDioxideYAxis = [{ ...commonY, name: "二氧化碳/ppm" }];
        let carbonDioxideDataset = { dimensions: commonDimensions, source: [] };
        let carbonDioxideSeriesObject = {
            ...seriesObject,
            lineStyle: {
                width: 1,
                color: "#f15d5d",
            },
            // areaStyle: {
            //     opacity: 0.1,
            //     color: "#f15d5d",
            // },
        };
        let carbonDioxideTooltip = {
            ...commonTooltip,
            formatter(params) {
                var result = "";
                var dotHtml =
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#f15d5d"></span>';
                var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
                // console.log(params, "数据对象");
                result +=
                    params[0].value.devicetime + "</br>" + dotHtml + textHtml;
                return result;
            },
            // valueFormatter: (value) => value + temperatureDataunit,
            axisPointer: {
                //线的颜色
                lineStyle: {
                    color: "#f15d5d",
                },
            },
        };
        let carbonDioxideOptionStatic = {
            ...commomOption,
            yAxis: carbonDioxideYAxis,
            dataset: carbonDioxideDataset,
            series: [
                carbonDioxideSeriesObject,
                // {
                //     name: "lineAQI",
                //     type: "line",
                //     data: [
                //         4, 2, 1, 0.8, 1, 4, 9, 11.5, 12, 13, 13.2, 13, 12, 11,
                //         12, 11, 10, 9, 8, 8.2, 7, 7.2, 6, 5, 4,
                //     ],
                // },
            ],
            tooltip: carbonDioxideTooltip,
        };
        //二氧化碳
        const carbonDioxideOption = reactive(carbonDioxideOptionStatic);

        //温度的图表值
        let temperatureYAxis = [{ ...commonY, name: "空气温度/℃" }];
        let temperatureDataset = { dimensions: commonDimensions, source: [] };
        let temperatureSeriesObject = {
            ...seriesObject,
            lineStyle: {
                width: 1,
                color: "#EE9A00",
            },
            // areaStyle: {
            //     opacity: 0.1,
            //     color: "#EE9A00",
            // },
        };
        let temperatureTooltip = {
            ...commonTooltip,
            formatter(params) {
                var result = "";
                var dotHtml =
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#EE9A00"></span>';
                var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
                // console.log(params, "数据对象");
                result +=
                    params[0].value.devicetime + "</br>" + dotHtml + textHtml;
                return result;
            },
            // valueFormatter: (value) => value + temperatureDataunit,
            axisPointer: {
                //线的颜色
                lineStyle: {
                    color: "#EE9A00",
                },
            },
        };
        let temperatureOptionStatic = {
            ...commomOption,
            yAxis: temperatureYAxis,
            dataset: temperatureDataset,
            series: [temperatureSeriesObject],
            tooltip: temperatureTooltip,
        };

        //空气温度
        const temperatureOption = reactive(temperatureOptionStatic);

        //湿度的图表值
        let humidityYAxis = [{ ...commonY, name: "空气湿度/%" }];
        let humidityDataset = { dimensions: commonDimensions, source: [] };
        let humiditySeriesObject = {
            ...seriesObject,
            // lineStyle: {
            //     width: 1,
            //     color: "#EEEE00",
            // },
            // areaStyle: {
            //     opacity: 0.1,
            //     color: "#46adff",
            // },
        };
        let humidityTooltip = {
            ...commonTooltip,
            formatter(params) {
                var result = "";
                var dotHtml =
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#46adff"></span>';
                var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
                // console.log(params, "数据对象");
                result +=
                    params[0].value.devicetime + "</br>" + dotHtml + textHtml;
                return result;
            },
            // valueFormatter: (value) => value + humidityDataunit,
            axisPointer: {
                //线的颜色
                lineStyle: {
                    color: "#46adff",
                },
            },
        };
        let humidityOptionStatic = {
            ...commomOption,
            yAxis: humidityYAxis,
            dataset: humidityDataset,
            series: [humiditySeriesObject],
            tooltip: humidityTooltip,
        };

        //湿度
        const humidityOption = reactive(humidityOptionStatic);

        //光照强度的图表值
        let illuminationIntensityYAxis = [{ ...commonY, name: "光照强度/Lx" }];
        let illuminationIntensityDataset = {
            dimensions: commonDimensions,
            source: [],
        };
        let illuminationIntensitySeriesObject = {
            ...seriesObject,
            lineStyle: {
                width: 1,
                color: "#EEEE00",
            },
            // areaStyle: {
            //     opacity: 0.1,
            //     color: "#EEEE00",
            // },
        };
        let illuminationIntensityTooltip = {
            ...commonTooltip,
            formatter(params) {
                var result = "";
                var dotHtml =
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#EEEE00"></span>';
                var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
                // console.log(params, "数据对象");
                result +=
                    params[0].value.devicetime + "</br>" + dotHtml + textHtml;
                return result;
            },
            // valueFormatter: (value) => value + illuminationIntensityDataunit,
            axisPointer: {
                //线的颜色
                lineStyle: {
                    color: "#EEEE00",
                },
            },
        };
        let illuminationIntensityOptionStatic = {
            ...commomOption,
            yAxis: illuminationIntensityYAxis,
            dataset: illuminationIntensityDataset,
            series: [illuminationIntensitySeriesObject],
            tooltip: illuminationIntensityTooltip,
        };

        //光照强度
        const illuminationIntensityOption = reactive(
            illuminationIntensityOptionStatic
        );

        //PM2.5的图表值
        let PMYAxis = [{ ...commonY, name: "PM2.5/um" }];
        let PMDataset = {
            dimensions: commonDimensions,
            source: [],
        };
        let PMSeriesObject = {
            ...seriesObject,
            lineStyle: {
                width: 1,
                color: "#5ee59e",
            },
            // areaStyle: {
            //     opacity: 0.1,
            //     color: "#5ee59e",
            // },
        };
        let PMTooltip = {
            ...commonTooltip,
            formatter(params) {
                var result = "";
                var dotHtml =
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#5ee59e"></span>';
                var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
                // console.log(params, "数据对象");
                result +=
                    params[0].value.devicetime + "</br>" + dotHtml + textHtml;
                return result;
            },
            // valueFormatter: (value) => value + PMDataunit,
            axisPointer: {
                //线的颜色
                lineStyle: {
                    color: "#5ee59e",
                },
            },
        };
        let PMOptionStatic = {
            ...commomOption,
            yAxis: PMYAxis,
            dataset: PMDataset,
            series: [PMSeriesObject],
            tooltip: PMTooltip,
        };

        //PM2.5
        const PMOption = reactive(PMOptionStatic);

        //PM10的图表值
        let PM10YAxis = [{ ...commonY, name: "PM10/μg/m3" }];
        let PM10Dataset = {
            dimensions: commonDimensions,
            source: [],
        };
        let PM10SeriesObject = {
            ...seriesObject,
            lineStyle: {
                width: 1,
                color: "#a59ffa",
            },
            // areaStyle: {
            //     opacity: 0.1,
            //     color: "#a59ffa",
            // },
        };
        let PM10Tooltip = {
            ...commonTooltip,
            formatter(params) {
                var result = "";
                var dotHtml =
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#a59ffa"></span>';
                var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
                // console.log(params, "数据对象");
                result +=
                    params[0].value.devicetime + "</br>" + dotHtml + textHtml;
                return result;
            },
            // valueFormatter: (value) => value + PM10Dataunit,
            axisPointer: {
                //线的颜色
                lineStyle: {
                    color: "#a59ffa",
                },
            },
        };
        let PM10OptionStatic = {
            ...commomOption,
            yAxis: PM10YAxis,
            dataset: PM10Dataset,
            series: [PM10SeriesObject],
            tooltip: PM10Tooltip,
        };

        //PM10
        const PM10Option = reactive(PM10OptionStatic);

        //氨气的图表值
        let ammoniaGasYAxis = [{ ...commonY, name: "氨气/ppm" }];
        let ammoniaGasDataset = {
            dimensions: commonDimensions,
            source: [],
        };
        let ammoniaGasSeriesObject = {
            ...seriesObject,
            lineStyle: {
                width: 1,
                color: "#EE6AA7",
            },
            // areaStyle: {
            //     opacity: 0.1,
            //     color: "#EE6AA7",
            // },
        };
        let ammoniaGasTooltip = {
            ...commonAnothetTooltip,
            formatter(params) {
                var result = "";
                var dotHtml =
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#EE6AA7"></span>';
                var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
                // console.log(params, "数据对象");
                result +=
                    params[0].value.devicetime + "</br>" + dotHtml + textHtml;
                return result;
            },
            // valueFormatter: (value) => value + ammoniaGasDataunit,
            axisPointer: {
                //线的颜色
                lineStyle: {
                    color: "#EE6AA7",
                },
            },
        };
        let ammoniaGasOptionStatic = {
            ...commomOption,
            yAxis: ammoniaGasYAxis,
            dataset: ammoniaGasDataset,
            series: [ammoniaGasSeriesObject],
            tooltip: ammoniaGasTooltip,
        };

        //ammoniaGas
        const ammoniaGasOption = reactive(ammoniaGasOptionStatic);

        //硫化氢的图表值
        let sulfurettedHydrogenYAxis = [{ ...commonY, name: "硫化氢/ppm" }];
        let sulfurettedHydrogenDataset = {
            dimensions: commonDimensions,
            source: [],
        };
        let sulfurettedHydrogenSeriesObject = {
            ...seriesObject,
            lineStyle: {
                width: 1,
                color: "#1C86EE",
            },
            // areaStyle: {
            //     opacity: 0.1,
            //     color: "#1C86EE",
            // },
        };
        let sulfurettedHydrogenTooltip = {
            ...commonAnothetTooltip,
            formatter(params) {
                var result = "";
                var dotHtml =
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1C86EE"></span>';
                var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
                // console.log(params, "数据对象");
                result +=
                    params[0].value.devicetime + "</br>" + dotHtml + textHtml;
                return result;
            },
            // valueFormatter: (value) => value + sulfurettedHydrogenDataunit,
            axisPointer: {
                //线的颜色
                lineStyle: {
                    color: "#1C86EE",
                },
            },
        };
        let sulfurettedHydrogenOptionStatic = {
            ...commomOption,
            yAxis: sulfurettedHydrogenYAxis,
            dataset: sulfurettedHydrogenDataset,
            series: [sulfurettedHydrogenSeriesObject],
            tooltip: sulfurettedHydrogenTooltip,
        };

        //硫化氢配置
        const sulfurettedHydrogenOption = reactive(
            sulfurettedHydrogenOptionStatic
        );

        //TSP的图表值
        let TSPYAxis = [{ ...commonY, name: "TSP" }];
        let TSPDataset = {
            dimensions: commonDimensions,
            source: [],
        };
        let TSPSeriesObject = {
            ...seriesObject,
            lineStyle: {
                width: 1,
                color: "#EE9A00",
            },
            // areaStyle: {
            //     opacity: 0.1,
            //     color: "#EE9A00",
            // },
        };
        let TSPTooltip = {
            ...commonAnothetTooltip,
            formatter(params) {
                var result = "";
                var dotHtml =
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#EE9A00"></span>';
                var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
                // console.log(params, "数据对象");
                result +=
                    params[0].value.devicetime + "</br>" + dotHtml + textHtml;
                return result;
            },
            // valueFormatter: (value) => value + TSPDataunit,
            axisPointer: {
                //线的颜色
                lineStyle: {
                    color: "#EE9A00",
                },
            },
        };
        let TSPOptionStatic = {
            ...commomOption,
            yAxis: TSPYAxis,
            dataset: TSPDataset,
            series: [TSPSeriesObject],
            tooltip: TSPTooltip,
        };

        //硫化氢配置
        const TSPOption = reactive(TSPOptionStatic);

        //噪声的图表值
        let noiseYAxis = [{ ...commonY, name: "噪声/dB" }];
        let noiseDataset = {
            dimensions: commonDimensions,
            source: [],
        };
        let noiseSeriesObject = {
            ...seriesObject,
            lineStyle: {
                width: 1,
                color: "#5ee59e",
            },
            // areaStyle: {
            //     opacity: 0.1,
            //     color: "#5ee59e",
            // },
        };
        let noiseTooltip = {
            ...commonAnothetTooltip,
            formatter(params) {
                var result = "";
                var dotHtml =
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#5ee59e"></span>';
                var textHtml = `<span style="font-weight: 700;right:20px; position: absolute;">${params[0].value.datavalue}${params[0].value.dataunit} </span>`;
                // console.log(params, "数据对象");
                result +=
                    params[0].value.devicetime + "</br>" + dotHtml + textHtml;
                return result;
            },
            // valueFormatter: (value) => value + noiseDataunit,
            axisPointer: {
                //线的颜色
                lineStyle: {
                    color: "#5ee59e",
                },
            },
        };
        let noiseOptionStatic = {
            ...commomOption,
            yAxis: noiseYAxis,
            dataset: noiseDataset,
            series: [noiseSeriesObject],
            tooltip: noiseTooltip,
        };

        //硫化氢配置
        const noiseOption = reactive(noiseOptionStatic);
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
        //请求参数
        let commonParams = {
            start_time: proxy.$TOOL.dateFormat(startTime.value),
            end_time: proxy.$TOOL.dateFormat(endTime.value),
            shed_id: currShed.value,
        };

        //左边的结果
        const echartArray = reactive([
            {
                ref: "carbonDioxideRef",
                label: "二氧化碳",
                value: "0",
                option: carbonDioxideOption,
                // changeSize: false,
            },
        ]);

        //检测项
        const selectedArr = ref(["0"]);
        const selectOptions = reactive([
            {
                ref: "carbonDioxideRef",
                label: "二氧化碳",
                value: "0",
                option: carbonDioxideOption,
                // changeSize: false,
            },
            {
                ref: "temperatureRef",
                label: "温度",
                value: "1",
                option: temperatureOption,
                // changeSize: false,
            },
            {
                ref: "humidityRef",
                label: "湿度",
                value: "2",
                option: humidityOption,
                // changeSize: false,
            },
            {
                ref: "illuminationIntensityRef",
                label: "光照强度",
                value: "3",
                option: illuminationIntensityOption,
                // changeSize: false,
            },
            {
                ref: "PMRef",
                label: "PM2.5",
                value: "4",
                option: PMOption,
                // changeSize: false,
            },
            {
                ref: "PM10Ref",
                label: "PM10",
                value: "5",
                option: PM10Option,
                // changeSize: false,
            },
        ]);

        //六个echarts盒子
        const carbonDioxideRef = ref(null);
        const temperatureRef = ref(null);
        const humidityRef = ref(null);
        const illuminationIntensityRef = ref(null);
        const PMRef = ref(null);
        const PM10Ref = ref(null);

        //是否全选
        const checked = ref(false);

        //全选的事件
        const selectAll = function () {
            console.log("选择的值", selectedArr.value);
            if (checked.value) {
                selectedArr.value.length = 0;
                for (let i = 0; i < selectOptions.length; i++) {
                    selectedArr.value.push(selectOptions[i].value);
                }
                let temp = [];
                selectOptions.forEach((item1) => {
                    temp.push(item1);
                });
                echartArray.length = 0;
                echartArray.push(...temp);
                // echartArray.value = temp;
            } else {
                if (selectedArr.value.length == selectOptions.length) {
                    checked.value = true;
                }
            }
        };

        //选择框内容发生改变时
        const changeSelect = function (val) {
            console.log("选择的值", val, selectedArr.value);
            if (selectedArr.value.length == selectOptions.length) {
                checked.value = true;
            } else {
                checked.value = false;
            }

            //默认选项
            if (selectedArr.value.length == 0) {
                selectedArr.value.push("0");
                echartArray.length = 0;
                echartArray.push([
                    {
                        ref: "carbonDioxideRef",
                        label: "二氧化碳",
                        value: "0",
                        option: carbonDioxideOption,
                        // changeSize: false,
                    },
                ]);
                // echartArray.value = [
                //     {
                //         ref: "carbonDioxideRef",
                //         label: "二氧化碳",
                //         value: "0",
                //         option: carbonDioxideOption,
                //         changeSize: false,
                //     },
                // ];
                // echartArray.value[0].changeSize = !echartArray.value[0].changeSize;
            } else {
                let temp = [];
                selectedArr.value.forEach((item) => {
                    selectOptions.forEach((item1) => {
                        if (item == item1.value) {
                            temp.push(item1);
                        }
                    });
                });
                console.log("左边的结果", temp);
                echartArray.length = 0;

                echartArray.push(...temp);
                // echartArray.value[0].changeSize = true;
            }
            // console.log(echartArray.length,'第一个元素')
            // echartArray[0].changeSize = !echartArray[0].changeSize;
        };

        let carbonDioxide = [];
        let temperature = [];
        let humidityc = [];
        let illuminationIntensity = [];
        let PM = [];
        let PM10 = [];
        let ammoniaGas = [];
        let sulfurettedHydrogen = [];
        let TSP = [];
        let noise = [];

        //获取环境数据
        const getCarbonDioxideData = async function () {
            let CarbonDioxRes =
                await proxy.$API.envForecast.getCarbonDioxideData.post(
                    commonParams,
                    "二氧化碳"
                );
            // console.log("二氧化碳请求结果", CarbonDioxRes);

            if (CarbonDioxRes.code === 200) {
                carbonDioxide = CarbonDioxRes.data.data;
                //数据赋值
                carbonDioxideOption.dataset.source = carbonDioxide;
                // console.log(
                //     "二氧化碳请求结果",
                //     CarbonDioxRes,
                //     carbonDioxideOption
                // );
            }
            let temperatureRes =
                await proxy.$API.envForecast.getCarbonDioxideData.post(
                    commonParams,
                    "空气温度"
                );
            // console.log("空气温度请求结果", temperatureRes);
            if (temperatureRes.code === 200) {
                temperature = temperatureRes.data.data;
                //数据赋值
                temperatureOption.dataset.source = temperature;
            }
            // console.log("环境数据请求结果", temperatureRes);

            let humidityRes =
                await proxy.$API.envForecast.getCarbonDioxideData.post(
                    commonParams,
                    "空气湿度"
                );
            if (humidityRes.code === 200) {
                humidityc = humidityRes.data.data;

                //数据赋值
                humidityOption.dataset.source = humidityc;
                // console.log("空气湿度请求结果", humidityRes);
            }

            //光照强度
            let illuminationIntensityRes =
                await proxy.$API.envForecast.getCarbonDioxideData.post(
                    commonParams,
                    "光照强度"
                );
            if (illuminationIntensityRes.code === 200) {
                illuminationIntensity = illuminationIntensityRes.data.data;
                //数据赋值
                illuminationIntensityOption.dataset.source =
                    illuminationIntensity;
                // console.log("光照强度请求结果", illuminationIntensityRes);
            }

            //PM2.5
            let PMRes = await proxy.$API.envForecast.getCarbonDioxideData.post(
                commonParams,
                "二氧化碳"
            );
            if (PMRes.code === 200) {
                PM = PMRes.data.data;
                //数据赋值
                PMOption.dataset.source = PM;
                // console.log("PM2.5请求结果", PMRes);
            }

            //PM10
            let PM10Res =
                await proxy.$API.envForecast.getCarbonDioxideData.post(
                    commonParams,
                    "二氧化碳"
                );
            if (PM10Res.code === 200) {
                PM10 = PM10Res.data.data;
                //数据赋值
                PM10Option.dataset.source = PM10;
                // console.log("PM10请求结果", PM10Res);
            }

            //氨气浓度
            let ammoniaGasRes =
                await proxy.$API.envForecast.getCarbonDioxideData.post(
                    commonParams,
                    "氨气浓度"
                );
            if (ammoniaGasRes.code === 200) {
                ammoniaGas = ammoniaGasRes.data.data;
                //数据赋值
                ammoniaGasOption.dataset.source = ammoniaGas;
                // console.log("氨气浓度请求结果", ammoniaGasRes);
            }

            //硫化氢浓度
            let sulfurettedHydrogenRes =
                await proxy.$API.envForecast.getCarbonDioxideData.post(
                    commonParams,
                    "硫化氢"
                );
            if (sulfurettedHydrogenRes.code === 200) {
                sulfurettedHydrogen = sulfurettedHydrogenRes.data.data;
                //数据赋值
                sulfurettedHydrogenOption.dataset.source = sulfurettedHydrogen;
                // console.log("硫化氢请求结果", sulfurettedHydrogenRes);
            }

            //TSP浓度
            let TSPRes = await proxy.$API.envForecast.getCarbonDioxideData.post(
                commonParams,
                "二氧化碳"
            );
            if (TSPRes.code === 200) {
                TSP = TSPRes.data.data;
                //数据赋值
                TSPOption.dataset.source = TSP;
                // console.log("TSP请求结果", TSPRes);
            }

            //噪音
            let noiseRes =
                await proxy.$API.envForecast.getCarbonDioxideData.post(
                    commonParams,
                    "噪音"
                );
            // console.log("噪音", noiseRes);
            if (noiseRes.code === 200) {
                noise = noiseRes.data.data;
                //数据赋值
                noiseOption.dataset.source = noise;
                // console.log("噪音请求结果", noiseRes);
            }
        };

        getCarbonDioxideData();

        return {
            checked,
            selectedArr,
            selectOptions,
            echartArray,
            temperatureOption,
            carbonDioxideRef,
            temperatureRef,
            humidityRef,
            illuminationIntensityRef,
            PMRef,
            PM10Ref,
            selectAll,
            changeSelect,
        };
    },
});
</script>
<style scoped lang="scss">
.forecastCenter {
    width: 100%;
    display: flex;
    justify-content: space-around;
    min-height: 100%;
    .header {
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-size: 16px;
        border-bottom: 1px solid #c2c0c0;
    }
    .common {
        :deep(.el-card__body) {
            height: 100%;
            padding: 10px !important;
        }
    }
    .main {
        width: 75%;
        .left--main {
            // height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            // align-items: center;
            .echart--box {
                height: 350px;
                // margin: auto;
                margin-top: 20px;
                padding: 10px;

                // background-color: pink;
            }
        }
    }
    .right {
        width: 24%;
        :deep(.el-card__body) {
            height: 100%;
            padding: 10px !important;
        }
        .right--main {
            // text-align: center;
            padding-left: 10px;
            .right--label {
                margin-top: 20px;

                font-size: 16px;
                letter-spacing: 1px;
            }
            .right--option {
                margin-top: 15px;
            }
        }
    }
}
</style>