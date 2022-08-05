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
                <div class="right--tip">
                    <el-tag
                        class="right--tip__tag"
                        color="#fef0f0"
                        style="color: #f15d5d"
                        v-show="selectedArr.indexOf('0') != -1"
                        >二氧化碳</el-tag
                    >
                    <el-tag
                        class="right--tip__tag"
                        color="#F3EAFA"
                        style="color: #ab82ff"
                        v-show="selectedArr.indexOf('1') != -1"
                        >温度</el-tag
                    >
                    <el-tag
                        class="right--tip__tag"
                        color="#edf4ed"
                        style="color: #548b54"
                        v-show="selectedArr.indexOf('2') != -1"
                        >湿度</el-tag
                    >
                    <el-tag
                        class="right--tip__tag"
                        type="warning"
                        v-show="selectedArr.indexOf('3') != -1"
                        >光照强度</el-tag
                    >
                    <el-tag
                        class="right--tip__tag"
                        type="success"
                        v-show="selectedArr.indexOf('4') != -1"
                        >PM2.5</el-tag
                    >
                    <el-tag
                        class="right--tip__tag"
                        color="#fef0f0"
                        style="color: #f15d5d"
                        v-show="selectedArr.indexOf('5') != -1"
                        >PM10</el-tag
                    >
                </div>
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
import { ElMessage } from "element-plus";
import { getPredict } from "@api/AiControl/predict";
import { getCarbonDioxideData } from "@api/equipVideo/envForecast";
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
            "dataname",
            "datavalue",
            "dataunit",
            "devicetime",
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
        };

        //相同series
        let seriesObject = {
            name: "",
            type: "line",
            symbol: "none",
            smooth: true,
            dimensions: ["time", "datavalue"],
            encode: {
                x: ["time"], // 表示维度 3、1、5 映射到 x 轴。
                y: "datavalue", // 表示维度 2 映射到 y 轴。
            },
        };
        //相同的tooltip
        let commonTooltip = {
            trigger: "axis",
            //位置
            position: function () {
                return { left: "50%", top: 40 };
            },
            formatter(params) {
                return commomFormatter(params);
            },
        };

        //相同的配置
        let commomOption = {
            xAxis: {
                boundaryGap: false,
                type: "category",
                // name: "时间",

                axisLabel: {
                    //x轴文字的配置
                    show: true,
                    interval: 0, //使x轴文字显示全
                },
                axisTick: {
                    show: false,
                },
            },
            data: [
                {
                    textStyle: {
                        fontSize: 28,
                    },
                },
            ],
        };

        //相同的预测配置
        let commonPredictSeries = {
            name: "预测值",
            type: "line",
            symbol: "none",
            smooth: true,
            dimensions: ["name", "forcastValue"],
            encode: {
                x: ["name"],
                y: "forcastValue",
            },
            lineStyle: {
                width: 2,
                color: "#6495ED",
            },
        };

        // 图表相同的提示框配置函数
        let commomFormatter = (params) => {
            var result = "";
            let value1 = "";
            let value2 = "";
            if (params[0].data.datavalue == undefined) {
                value1 = params[0].data.forcastValue;
            } else {
                value1 = params[0].data.datavalue;
            }
            if (params[0].data.devicetime == undefined) {
                value2 = params[0].data.name;
            } else {
                value2 = params[0].data.devicetime;
            }
            var dotHtml = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params[0].data.color}"></span>`;
            var textHtml = `<span style="font-weight: 700;">${value1}${params[0].data.dataunit} </span>`;
            // console.log(params, "数据对象");
            result += value2 + "</br>" + dotHtml + textHtml;
            return result;
        };

        //二氧化碳的图表值
        let carbonDioxideYAxis = [{ ...commonY, name: "二氧化碳/ppm" }];
        let carbonDioxideDataset = { dimensions: commonDimensions, source: [] };
        let carbonDioxideSeriesObject = {
            ...seriesObject,
            lineStyle: {
                width: 2,
                color: "#f15d5d",
            },
        };

        let carbonDioxideOptionStatic = {
            ...commomOption,
            yAxis: carbonDioxideYAxis,
            dataset: carbonDioxideDataset,
            series: [carbonDioxideSeriesObject, commonPredictSeries],
            tooltip: commonTooltip,
        };
        //二氧化碳
        const carbonDioxideOption = reactive(carbonDioxideOptionStatic);

        //温度的图表值
        let temperatureYAxis = [{ ...commonY, name: "空气温度/℃" }];
        let temperatureDataset = { dimensions: commonDimensions, source: [] };
        let temperatureSeriesObject = {
            ...seriesObject,
            lineStyle: {
                width: 2,
                color: "#AB82FF",
            },
        };

        let temperatureOptionStatic = {
            ...commomOption,
            yAxis: temperatureYAxis,
            dataset: temperatureDataset,
            series: [temperatureSeriesObject, commonPredictSeries],
            tooltip: commonTooltip,
        };

        //空气温度
        const temperatureOption = reactive(temperatureOptionStatic);

        //湿度的图表值
        let humidityYAxis = [{ ...commonY, name: "空气湿度/%" }];
        let humidityDataset = { dimensions: commonDimensions, source: [] };
        let humiditySeriesObject = {
            ...seriesObject,
            lineStyle: {
                width: 2,
                color: "#548B54",
            },
        };

        let humidityOptionStatic = {
            ...commomOption,
            yAxis: humidityYAxis,
            dataset: humidityDataset,
            series: [humiditySeriesObject, commonPredictSeries],
            tooltip: commonTooltip,
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
                width: 2,
                color: "#EEEE00",
            },
        };

        let illuminationIntensityOptionStatic = {
            ...commomOption,
            yAxis: illuminationIntensityYAxis,
            dataset: illuminationIntensityDataset,
            series: [illuminationIntensitySeriesObject, commonPredictSeries],
            tooltip: commonTooltip,
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
                width: 2,
                color: "#5ee59e",
            },
        };

        let PMOptionStatic = {
            ...commomOption,
            yAxis: PMYAxis,
            dataset: PMDataset,
            series: [PMSeriesObject, commonPredictSeries],
            tooltip: commonTooltip,
        };

        //PM10
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
                width: 2,
                color: "#f15d5d",
            },
        };

        let PM10OptionStatic = {
            ...commomOption,
            yAxis: PM10YAxis,
            dataset: PM10Dataset,
            series: [PM10SeriesObject, commonPredictSeries],
            tooltip: commonTooltip,
        };

        //PM10
        const PM10Option = reactive(PM10OptionStatic);

        //当前日期
        const nowTime = new Date();

        //调接口传的时间
        //这样拿到的时间都是当天的零点，如果不传直接拿，拿到的也会有现在的时分秒,而理解上需要结束时间当天的最后一秒
        const endTime = ref(
            new Date(
                nowTime.getFullYear(),
                nowTime.getMonth(),
                nowTime.getDate(),
                nowTime.getHours(),
                nowTime.getMinutes(),
                nowTime.getSeconds()
            )
        );

        const startTime = ref(
            new Date(
                nowTime.getFullYear(),
                nowTime.getMonth(),
                nowTime.getDate(),
                nowTime.getHours() - 2,
                nowTime.getMinutes(),
                nowTime.getSeconds()
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
                // let temp = [];
                // selectOptions.forEach((item1) => {
                //     temp.push(item1);
                // });
                echartArray.length = 0;
                echartArray.push(...selectOptions);
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
                echartArray.push({
                    ref: "carbonDioxideRef",
                    label: "二氧化碳",
                    value: "0",
                    option: carbonDioxideOption,
                });
                ElMessage({
                    message: "默认显示二氧化碳",
                    type: "success",
                    duration: 2000,
                });
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
            }
        };

        //获取环境数据
        const getCarbonDioxideDataMethod = async function () {
            console.log("参数", commonParams);
            let CarbonDioxRes = await getCarbonDioxideData(
                commonParams,
                "二氧化碳"
            );
            console.log("二氧化碳请求结果", CarbonDioxRes);

            if (CarbonDioxRes.code === 200) {
                let data = CarbonDioxRes.data.data;

                //获取预测的数据
                let forcastValue = data.map((item) => {
                    return item.datavalue;
                });
                console.log("预测的数据", forcastValue);

                let carbonDioxideTemp = data.map((item) => {
                    item.time = item.devicetime.substring(10, 16);
                    item.color = "#f15d5d";
                    return item;
                });
                console.log("数据处理", carbonDioxideTemp);

                let predictPramse = {
                    feature: "CO2",
                    data: forcastValue,
                    target_length: 6,
                };

                let predictRes = await getPredict(predictPramse);
                console.log("预测结果11", predictRes);
                if (predictRes.success) {
                    let carbonDioxidePredict = predictRes.output.map(
                        (item, index) => {
                            console.log(item);
                            let temp = {
                                name: "预测值" + (index + 1),
                                dataunit: "ppm",
                                forcastValue: item,
                                color: "#1C86EE",
                            };
                            console.log(temp);
                            return temp;
                        }
                    );
                    console.log("处理后的数据", carbonDioxidePredict);
                    //数据赋值
                    carbonDioxideOption.dataset.source = carbonDioxideTemp;
                    carbonDioxideOption.dataset.source.push(
                        ...carbonDioxidePredict
                    );
                }
            }
            let temperatureRes = await getCarbonDioxideData(
                commonParams,
                "空气温度"
            );
            console.log("空气温度请求结果", temperatureRes);
            if (temperatureRes.code === 200) {
                let data = temperatureRes.data.data;

                //获取预测的数据
                let forcastValue = data.map((item) => {
                    return item.datavalue;
                });

                console.log("预测的数据", forcastValue);
                let temperatureTemp = data.map((item) => {
                    item.time = item.devicetime.substring(10, 16);
                    item.color = "#f15d5d";
                    return item;
                });
                console.log("数据处理", temperatureTemp);
                let predictPramse = {
                    feature: "temperature",
                    data: forcastValue,
                    target_length: 6,
                };

                let predictRes = await getPredict(predictPramse);
                console.log("预测结果11", predictRes);
                if (predictRes.success) {
                    let temperaturePredict = predictRes.output.map(
                        (item, index) => {
                            console.log(item);
                            let temp = {
                                name: "预测值" + (index + 1),
                                dataunit: "ppm",
                                forcastValue: item,
                                color: "#1C86EE",
                            };
                            return temp;
                        }
                    );
                    //数据赋值
                    temperatureOption.dataset.source = temperatureTemp;
                    temperatureOption.dataset.source.push(
                        ...temperaturePredict
                    );
                }
            }
            // console.log("环境数据请求结果", temperatureRes);

            let humidityRes = await getCarbonDioxideData(
                commonParams,
                "空气湿度"
            );
            if (humidityRes.code === 200) {
                let data = humidityRes.data.data;

                //获取预测的数据
                let forcastValue = data.map((item) => {
                    return item.datavalue;
                });
                console.log("预测的数据", forcastValue);

                let humidityTemp = data.map((item) => {
                    item.time = item.devicetime.substring(10, 16);
                    item.color = "#f15d5d";
                    return item;
                });
                console.log("数据处理", humidityTemp);
                let predictPramse = {
                    feature: "humidity",
                    data: forcastValue,
                    target_length: 6,
                };

                let predictRes = await getPredict(predictPramse);
                console.log("预测结果11", predictRes);
                if (predictRes.success) {
                    let humidityPredict = predictRes.output.map(
                        (item, index) => {
                            console.log(item);
                            let temp = {
                                name: "预测值" + (index + 1),
                                dataunit: "ppm",
                                forcastValue: item,
                                color: "#1C86EE",
                            };
                            return temp;
                        }
                    );
                    //数据赋值
                    humidityOption.dataset.source = humidityTemp;
                    humidityOption.dataset.source.push(...humidityPredict);
                }

                //数据赋值
                // console.log("空气湿度请求结果", humidityRes);
            }

            //光照强度
            let illuminationIntensityRes = await getCarbonDioxideData(
                commonParams,
                "光照强度"
            );
            if (illuminationIntensityRes.code === 200) {
                let data = illuminationIntensityRes.data.data;
                //获取预测的数据
                let forcastValue = data.map((item) => {
                    return item.datavalue;
                });
                console.log("预测的数据", forcastValue);

                let illuminationIntensityTemp = data.map((item) => {
                    item.time = item.devicetime.substring(10, 16);
                    item.color = "#f15d5d";
                    return item;
                });
                console.log("数据处理", illuminationIntensityTemp);

                let predictPramse = {
                    feature: "Light_intensity",
                    data: forcastValue,
                    target_length: 6,
                };

                let predictRes = await getPredict(predictPramse);
                if (predictRes.success) {
                    let illuminationIntensityPredict = predictRes.output.map(
                        (item, index) => {
                            console.log(item);
                            let temp = {
                                name: "预测值" + (index + 1),
                                dataunit: "ppm",
                                forcastValue: item,
                                color: "#1C86EE",
                            };
                            return temp;
                        }
                    );
                    //数据赋值
                    illuminationIntensityOption.dataset.source =
                        illuminationIntensityTemp;
                    illuminationIntensityOption.dataset.source.push(
                        ...illuminationIntensityPredict
                    );
                }
            }

            //PM2.5
            let PMRes = await getCarbonDioxideData(commonParams, "PM2.5");
            console.log("Pm2.5", PMRes);
            if (PMRes.code === 200) {
                let data = PMRes.data.data;
                //获取预测的数据
                let forcastValue = data.map((item) => {
                    return item.datavalue;
                });
                console.log("预测的数据", forcastValue);

                let PMTemp = data.map((item) => {
                    item.time = item.devicetime.substring(10, 16);
                    item.color = "#f15d5d";
                    return item;
                });
                console.log("数据处理", PMTemp);
                let predictPramse = {
                    feature: "pm2.5",
                    data: forcastValue,
                    target_length: 6,
                };

                let predictRes = await getPredict(predictPramse);
                console.log("预测结果", predictRes);
                if (predictRes.success) {
                    let PMPredict = predictRes.output.map((item, index) => {
                        console.log(item);
                        let temp = {
                            name: "预测值" + (index + 1),
                            dataunit: "μg/m3",
                            forcastValue: item,
                            color: "#1C86EE",
                        };
                        return temp;
                    });
                    //数据赋值
                    PMOption.dataset.source = PMTemp;
                    PMOption.dataset.source.push(...PMPredict);
                    console.log("PM2.5请求结果", PMRes);
                }
            }

            //PM10
            let PM10Res = await getCarbonDioxideData(commonParams, "PM10");
            if (PM10Res.code === 200) {
                let data = PM10Res.data.data;
                //获取预测的数据
                let forcastValue = data.map((item) => {
                    return item.datavalue;
                });
                console.log("预测的数据", forcastValue);
                let PM10Temp = data.map((item) => {
                    item.time = item.devicetime.substring(10, 16);
                    item.color = "#f15d5d";
                    return item;
                });
                console.log("数据处理", PM10Temp);

                let predictPramse = {
                    feature: "pm10",
                    data: forcastValue,
                    target_length: 6,
                };

                let predictRes = await getPredict(predictPramse);
                console.log("预测结果", predictRes);
                if (predictRes.success) {
                    let PM10Predict = predictRes.output.map((item, index) => {
                        console.log(item);
                        let temp = {
                            name: "预测值" + (index + 1),
                            dataunit: "μg/m3",
                            forcastValue: item,
                            color: "#1C86EE",
                        };
                        return temp;
                    });
                    //数据赋值
                    PM10Option.dataset.source = PM10Temp;
                    PM10Option.dataset.source.push(...PM10Predict);
                    // console.log("PM10请求结果", PM10Res);
                }
            }
        };

        getCarbonDioxideDataMethod();

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
            .right--tip {
                width: 100%;
                // height: 400px;
                // background-color: pink;
                // margin-top: 20px;
                // padding-left: 10px;
                padding-right: 40px;
                text-align: center;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                .right--tip__tag {
                    display: block;
                    width: 47%;
                    height: 40px;
                    line-height: 40px;
                    // margin: auto;
                    margin-top: 30px;
                    margin-left: 0px !important;
                }
            }
        }
    }
}
</style>