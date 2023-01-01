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
        <div>
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
            <span>预测算法:</span>
          </div>
          <el-select
            class="right--option"
            v-model="selectedAlgorith"
            placeholder="请选择"
            @change="selectAligorith"
          >
            <el-option
              v-for="item in algorithmOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
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
          <span>预测:</span>
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
            color="#f0f2f5"
            style="color: #909399"
            v-show="selectedArr.indexOf('0') != -1"
            >二氧化碳</el-tag
          >
          <el-tag
            class="right--tip__tag"
            color="#f0f2f5"
            style="color: #909399"
            v-show="selectedArr.indexOf('1') != -1"
            >温度</el-tag
          >
          <el-tag
            class="right--tip__tag"
            color="#f0f2f5"
            style="color: #909399"
            v-show="selectedArr.indexOf('2') != -1"
            >湿度</el-tag
          >
          <el-tag
            class="right--tip__tag"
            color="#f0f2f5"
            style="color: #909399"
            v-show="selectedArr.indexOf('3') != -1"
            >光照强度</el-tag
          >
          <el-tag
            class="right--tip__tag"
            color="#f0f2f5"
            style="color: #909399"
            v-show="selectedArr.indexOf('4') != -1"
            >PM2.5</el-tag
          >
          <el-tag
            class="right--tip__tag"
            color="#f0f2f5"
            style="color: #909399"
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
  //   computed,
  //   getCurrentInstance,
} from "vue";
// import { dateFormat } from "@/hooks/dateFormat.js";
import ScEcharts from "@/components/scEcharts";
import { ElMessage } from "element-plus";
import { getPredict } from "@api/AiControl/predict";
// import { getCarbonDioxideData } from "@api/equipVideo/envForecast";
export default defineComponent({
  name: "forecastCenter", // 预测中心
  components: {
    ScEcharts,
  },
  setup() {
    // const { proxy } = getCurrentInstance();
    //当前鸽棚鸽笼信息
    // const currShed = computed(() => {
    //   return proxy.$store.state.baseInfo.SHED_ID;
    // });

    // //相同维度
    // let commonDimensions = ["dataname", "datavalue", "dataunit", "devicetime"];

    //相同y轴部分
    let commonY = {
      type: "value",
      scale:true,
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
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
    };

    //相同series
    let seriesObject = {
      name: "真实值",
      type: "line",
      symbol: "none",
      smooth: true,
      lineStyle: {
        width: 2,
        // color: "#32cd32",
        // normal: {
        //   color: "#32cd32",
        // },
      },
      connectNulls: true,
    };
    //相同的tooltip
    let commonTooltip = {
      trigger: "axis",
      //位置
      position: function () {
        return { left: "50%", top: 40 };
      }
    };

    //相同的配置
    let commomOption = {
      textStyle: {
        color: "#000",
      },
      xAxis: {
        // axisLabel:{},
        boundaryGap: false,
        type: "time",
        name: "时间",
      },
      legend: {
        // top: "20%",
        right: "5%",
        // width: "50%",
        data: [
          {
            name: "真实值",
            // 强制设置图形为圆。
            icon: "circle",
            // 设置文本为红色
            textStyle: {
              color: "#000",
            },
            itemStyle: {
              color: "#32cd32",
            },
          },
          {
            name: "预测值",
            // 强制设置图形为圆。
            icon: "circle",
            textStyle: {
              color: "#000",
            },
            itemStyle: {
              color: "#6da2fe",
            },
          },
        ],
      },
    };

    //相同的预测配置
    let commonPredictSeries = {
      name: "预测值",
      type: "line",
      symbol: "none",
      smooth: true,
      lineStyle: {
        width: 2,
        // color: "#6495ED",
      },
      connectNulls: true,
    };
    //二氧化碳的图表值
    let carbonDioxideYAxis = [{ ...commonY, name: "二氧化碳/ppm" }];
    // let carbonDioxideDataset = { dimensions: commonDimensions, source: [] };
    let carbonDioxideSeriesObject = {
      ...seriesObject,
      data: [], //原先数据

      connectNulls: true,

      markLine: {
        lineStyle: {
          color: "red",
        },
        data: [
          {
            name: "最小值",
            type: "min",
            yAxis: 800,
            color: "red",
          },
          {
            name: "最大值",
            type: "max",
            yAxis: 1000,
          },
        ],
      }
    };

    let carbonDioxideOptionStatic = {
      ...commomOption,
      visualMap: [{
        show: false,
        dimension: 1,
        seriesIndex:0,//第一部分数据
        pieces: [{ min: 800, max: 1000,color: "#32cd32" }],
        outOfRange: {
            color:'red',
        },
      },
      {
        show: false,
        dimension: 1,
        seriesIndex:1,//第一部分数据
        pieces: [{min: 800, max: 1000 ,color:"#6da2fe"}],
        outOfRange: {
            color:'red',
        },
      }],
      yAxis: carbonDioxideYAxis,
      series: [carbonDioxideSeriesObject, { ...commonPredictSeries, data: [] }],
      tooltip: commonTooltip,
    };
    //二氧化碳
    const carbonDioxideOption = reactive(carbonDioxideOptionStatic);

    //温度的图表值
    let temperatureYAxis = [{ ...commonY, name: "空气温度/℃" }];
    // let temperatureDataset = { dimensions: commonDimensions, source: [] };
    let temperatureSeriesObject = {
      ...seriesObject,
      data: [], //原先数据
      connectNulls: true,

      markLine: {
        lineStyle: {
          color: "red",
        },
        data: [
          {
            name: "最小值",
            type: "min",
            yAxis: 10,
            color: "red",
          },
          {
            name: "最大值",
            type: "max",
            yAxis: 20,
          },
        ],
      },
    };

    let temperatureOptionStatic = {
      ...commomOption,

      yAxis: temperatureYAxis,
      //   dataset: temperatureDataset,
      series: [temperatureSeriesObject, { ...commonPredictSeries, data: [] }],
      tooltip: commonTooltip,
      visualMap: [{
        show: false,
        dimension: 1,
        seriesIndex:0,//第一部分数据
        pieces: [{ min: 10, max: 20,color: "#32cd32" }],
        outOfRange: {
            color:'red',
        },
      },
      {
        show: false,
        dimension: 1,
        seriesIndex:1,//第一部分数据
        pieces: [{min: 10, max: 20 ,color:"#6da2fe"}],
        outOfRange: {
            color:'red',
        },
      }],
    };

    //空气温度
    const temperatureOption = reactive(temperatureOptionStatic);

    //湿度的图表值
    let humidityYAxis = [{ ...commonY, name: "空气湿度/%" }];
    // let humidityDataset = { dimensions: commonDimensions, source: [] };
    let humiditySeriesObject = {
      ...seriesObject,
      data: [], //原先数据
      connectNulls: true,

      markLine: {
        lineStyle: {
          color: "red",
        },
        data: [
          {
            name: "最小值",
            type: "min",
            yAxis: 30,
            color: "red",
          },
          {
            name: "最大值",
            type: "max",
            yAxis: 85,
          },
        ],
      },

    };

    let humidityOptionStatic = {
      ...commomOption,
      yAxis: humidityYAxis,
      //   dataset: humidityDataset,
      series: [humiditySeriesObject, commonPredictSeries],
      tooltip: commonTooltip,
      visualMap: [{
        show: false,
        dimension: 1,
        seriesIndex:0,//第一部分数据
        pieces: [{ min: 30, max: 85,color: "#32cd32" }],
        outOfRange: {
            color:'red',
        },
      },
      {
        show: false,
        dimension: 1,
        seriesIndex:1,//第一部分数据
        pieces: [{min: 30, max: 85 ,color:"#6da2fe"}],
        outOfRange: {
            color:'red',
        },
      }],
    };

    //湿度
    const humidityOption = reactive(humidityOptionStatic);

    //光照强度的图表值
    let illuminationIntensityYAxis = [{ ...commonY, name: "光照强度/Lx" }];
    // let illuminationIntensityDataset = {
    //   dimensions: commonDimensions,
    //   source: [],
    // };
    let illuminationIntensitySeriesObject = {
      ...seriesObject,
      data: [], //原先数据
      connectNulls: true,

      markLine: {
        lineStyle: {
          color: "red",
        },
        data: [
          {
            name: "最小值",
            type: "min",
            yAxis: 0,
            color: "red",
          },
          {
            name: "最大值",
            type: "max",
            yAxis: 50,
          },
        ],
      },
    };

    let illuminationIntensityOptionStatic = {
      ...commomOption,
      yAxis: illuminationIntensityYAxis,
      //   dataset: illuminationIntensityDataset,
      series: [illuminationIntensitySeriesObject, commonPredictSeries],
      tooltip: commonTooltip,
      visualMap: [{
        show: false,
        dimension: 1,
        seriesIndex:0,//第一部分数据
        pieces: [{ min: 0, max: 160,color: "#32cd32" }],
        outOfRange: {
            color:'red',
        },
      },
      {
        show: false,
        dimension: 1,
        seriesIndex:1,//第一部分数据
        pieces: [{min: 0, max: 160 ,color:"#6da2fe"}],
        outOfRange: {
            color:'red',
        },
      }],
    };

    //光照强度
    const illuminationIntensityOption = reactive(
      illuminationIntensityOptionStatic
    );

    //PM2.5的图表值
    let PMYAxis = [{ ...commonY, name: "PM2.5/um" }];
    // let PMDataset = {
    //   dimensions: commonDimensions,
    //   source: [],
    // };
    let PMSeriesObject = {
      ...seriesObject,
      data: [], //原先数据
      connectNulls: true,

      markLine: {
        lineStyle: {
          color: "red",
        },
        data: [
          {
            name: "最小值",
            type: "min",
            yAxis: 0,
            color: "red",
          },
          {
            name: "最大值",
            type: "max",
            yAxis: 600,
          },
        ],
      },
    };

    let PMOptionStatic = {
      ...commomOption,
      yAxis: PMYAxis,
      //   dataset: PMDataset,
      series: [PMSeriesObject, commonPredictSeries],
      tooltip: commonTooltip,
      visualMap: [{
        show: false,
        dimension: 1,
        seriesIndex:0,//第一部分数据
        pieces: [{ min: 0, max: 600,color: "#32cd32" }],
        outOfRange: {
            color:'red',
        },
      },
      {
        show: false,
        dimension: 1,
        seriesIndex:1,//第一部分数据
        pieces: [{min: 0, max: 600 ,color:"#6da2fe"}],
        outOfRange: {
            color:'red',
        },
      }],
    };

    //PM10
    const PMOption = reactive(PMOptionStatic);

    //PM10的图表值
    let PM10YAxis = [{ ...commonY, name: "PM10/μg/m3" }];
    // let PM10Dataset = {
    //   dimensions: commonDimensions,
    //   source: [],
    // };
    let PM10SeriesObject = {
      ...seriesObject,
      //   lineStyle: {
      //     width: 2,
      //     color: "#f15d5d",
      //   },
      data: [], //原先数据
      connectNulls: true,

      markLine: {
        lineStyle: {
          color: "red",
        },
        data: [
          {
            name: "最小值",
            type: "min",
            yAxis: 0,
            color: "red",
          },
          {
            name: "最大值",
            type: "max",
            yAxis: 1000,
          },
        ],
      },
    };

    let PM10OptionStatic = {
      ...commomOption,
      yAxis: PM10YAxis,
      series: [PM10SeriesObject, commonPredictSeries],
      tooltip: commonTooltip,
      visualMap: [{
        show: false,
        dimension: 1,
        seriesIndex:0,//第一部分数据
        pieces: [{ min: 0, max: 1000,color: "#32cd32" }],
        outOfRange: {
            color:'red',
        },
      },
      {
        show: false,
        dimension: 1,
        seriesIndex:1,//第一部分数据
        pieces: [{min: 0, max: 1000 ,color:"#6da2fe"}],
        outOfRange: {
            color:'red',
        },
      }],
    };

    //PM10
    const PM10Option = reactive(PM10OptionStatic);
    //当前日期
    // const nowTime = new Date();

    //调接口传的时间
    //这样拿到的时间都是当天的零点，如果不传直接拿，拿到的也会有现在的时分秒,而理解上需要结束时间当天的最后一秒
    // const endTime = ref(
    //   new Date(
    //     nowTime.getFullYear(),
    //     nowTime.getMonth(),
    //     nowTime.getDate(),
    //     nowTime.getHours(),
    //     nowTime.getMinutes(),
    //     nowTime.getSeconds()
    //   )
    // );

    // const startTime = ref(
    //   new Date(
    //     nowTime.getFullYear(),
    //     nowTime.getMonth(),
    //     nowTime.getDate(),
    //     nowTime.getHours() - 2,
    //     nowTime.getMinutes(),
    //     nowTime.getSeconds()
    //   )
    // );

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
    //预测项
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

    //预测算法
    const algorithmOptions = reactive([
      {
        value: "0",
        label: "LSTM",
      },
      {
        value: "1",
        label: "XGBOOST",
      },
      {
        value: "2",
        label: "GRU",
      },
      {
        value: "3",
        label: "DT",
      },
      {
        value: "4",
        label: "BP",
      },
      {
        value: "5",
        label: "INFORMER",
      },
    ]);
    const selectedAlgorith = ref("0");

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
      // console.log("选择的值", selectedArr.value);
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
    const changeSelect = function () {
      // const changeSelect = function (val) {
      // console.log("选择的值", val, selectedArr.value);
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
        // console.log("左边的结果", temp);
        echartArray.length = 0;

        echartArray.push(...temp);
      }
    };

    //请求参数
    // let commonParams = {
    //   shed_id: currShed.value,
    // };

    const selectAligorith = function () {
      getCarbonDioxideDataMethod();
      console.log(algorithmOptions[selectedAlgorith.value].label);
    };

    //获取环境数据
    const getCarbonDioxideDataMethod = async function () {
      let aligorith = algorithmOptions[selectedAlgorith.value].label;
      let CarbonDioxRes = await getPredict(5, aligorith, "二氧化碳");
      console.log(CarbonDioxRes, "结果");
      if (CarbonDioxRes.success) {
        let predictdata = CarbonDioxRes.predictdata;
        let time = CarbonDioxRes.time;
        let todaydata = CarbonDioxRes.todaydata;
        let orignaiData = [];
        let predictData = [];
        let tempItem = "";
        time.forEach((item, index) => {
          tempItem = new Date(time[index]).getTime();
          predictData.push(new Array(tempItem, predictdata[index]));
          if (todaydata[index]) {
            orignaiData.push(new Array(tempItem, todaydata[index]));
          } else {
            orignaiData.push(new Array());
          }
        });
        //    console.log(carbonDioxideOption.series[0].)
        carbonDioxideOption.series[0].data = orignaiData;
        carbonDioxideOption.series[1].data = predictData;
      }

      let temperatureRes = await getPredict(5, aligorith, "空气温度");
      console.log(temperatureRes, "结果");
      if (temperatureRes.success) {
        let predictdata = temperatureRes.predictdata;
        let time = temperatureRes.time;
        let todaydata = temperatureRes.todaydata;
        let orignaiData = [];
        let predictData = [];
        let tempItem = "";
        time.forEach((item, index) => {
          tempItem = new Date(time[index]).getTime();
          predictData.push(new Array(tempItem, predictdata[index]));
          if (todaydata[index]) {
            orignaiData.push(new Array(tempItem, todaydata[index]));
          } else {
            orignaiData.push(new Array());
          }
        });
        //    console.log(carbonDioxideOption.series[0].)
        temperatureOption.series[0].data = orignaiData;
        temperatureOption.series[1].data = predictData;
      }
      let humidityRes = await getPredict(5, aligorith, "空气湿度");
      console.log(humidityRes, "结果");
      if (humidityRes.success) {
        let predictdata = humidityRes.predictdata;
        let time = humidityRes.time;
        let todaydata = humidityRes.todaydata;
        let orignaiData = [];
        let predictData = [];
        let tempItem = "";
        time.forEach((item, index) => {
          tempItem = new Date(time[index]).getTime();
          predictData.push(new Array(tempItem, predictdata[index]));
          if (todaydata[index]) {
            orignaiData.push(new Array(tempItem, todaydata[index]));
          } else {
            orignaiData.push(new Array());
          }
        });
        //    console.log(carbonDioxideOption.series[0].)
        humidityOption.series[0].data = orignaiData;
        humidityOption.series[1].data = predictData;
      }

      let illuminationIntensityRes = await getPredict(5, aligorith, "光照强度");
      console.log(illuminationIntensityRes, "结果");
      if (illuminationIntensityRes.success) {
        let predictdata = illuminationIntensityRes.predictdata;
        let time = illuminationIntensityRes.time;
        let todaydata = illuminationIntensityRes.todaydata;
        let orignaiData = [];
        let predictData = [];
        let tempItem = "";
        time.forEach((item, index) => {
          tempItem = new Date(time[index]).getTime();
          predictData.push(new Array(tempItem, predictdata[index]));
          if (todaydata[index]) {
            orignaiData.push(new Array(tempItem, todaydata[index]));
          } else {
            orignaiData.push(new Array());
          }
        });
        //    console.log(carbonDioxideOption.series[0].)
        illuminationIntensityOption.series[0].data = orignaiData;
        illuminationIntensityOption.series[1].data = predictData;
      }
      let PMRes = await getPredict(5, aligorith, "光照强度");
      console.log(PMRes, "结果");
      if (PMRes.success) {
        let predictdata = PMRes.predictdata;
        let time = PMRes.time;
        let todaydata = PMRes.todaydata;
        let orignaiData = [];
        let predictData = [];
        let tempItem = "";
        time.forEach((item, index) => {
          tempItem = new Date(time[index]).getTime();
          predictData.push(new Array(tempItem, predictdata[index]));
          if (todaydata[index]) {
            orignaiData.push(new Array(tempItem, todaydata[index]));
          } else {
            orignaiData.push(new Array());
          }
        });
        //    console.log(carbonDioxideOption.series[0].)
        PMOption.series[0].data = orignaiData;
        PMOption.series[1].data = predictData;
      }

      let PM10Res = await getPredict(5, aligorith, "光照强度");
      console.log(PM10Res, "结果");
      if (PM10Res.success) {
        let predictdata = PM10Res.predictdata;
        let time = PM10Res.time;
        let todaydata = PM10Res.todaydata;
        let orignaiData = [];
        let predictData = [];
        let tempItem = "";
        time.forEach((item, index) => {
          tempItem = new Date(time[index]).getTime();
          predictData.push(new Array(tempItem, predictdata[index]));
          if (todaydata[index]) {
            orignaiData.push(new Array(tempItem, todaydata[index]));
          } else {
            orignaiData.push(new Array());
          }
        });
        //    console.log(carbonDioxideOption.series[0].)
        PM10Option.series[0].data = orignaiData;
        PM10Option.series[1].data = predictData;
      }
    };
    // const getCarbonDioxideDataMethod = async function () {
    //   // console.log("参数", commonParams);
    //   let CarbonDioxRes = await getCarbonDioxideData(commonParams, "二氧化碳");
    //   // console.log("二氧化碳请求结果", CarbonDioxRes);

    //   let lastTime = null;
    //   let protectTime = [];

    //   if (CarbonDioxRes.code === 200) {
    //     let data = CarbonDioxRes.data.data;
    //     // console.log(data[data.length - 1], "时间");

    //     if (data[data.length - 1]) {
    //       lastTime = data[data.length - 1] && data[data.length - 1].devicetime;
    //       lastTime = new Date(lastTime);
    //       for (let i = 0; i < 6; i++) {
    //         lastTime = new Date(
    //           lastTime.getFullYear(),
    //           lastTime.getMonth(),
    //           lastTime.getDate(),
    //           lastTime.getHours(),
    //           lastTime.getMinutes() + 10
    //         );
    //         protectTime.push(dateFormat(lastTime).substring(10, 16));
    //       }
    //     }

    //     // console.log("预测时间数组", protectTime);
    //     //获取预测的数据
    //     let forcastValue = data.map((item) => {
    //       return item.datavalue;
    //     });
    //     // console.log("预测的数据", forcastValue);

    //     let carbonDioxideTemp = data.map((item) => {
    //       item.time = item.devicetime.substring(10, 16);
    //       item.color = "#f15d5d";
    //       return item;
    //     });
    //     // console.log("数据处理", carbonDioxideTemp);

    //     let predictPramse = {
    //       feature: "CO2",
    //       data: forcastValue,
    //       target_length: 6,
    //     };

    //     let predictRes = await getPredict(predictPramse);
    //     // console.log("预测结果11", predictRes);
    //     if (predictRes.success) {
    //       let carbonDioxidePredict = predictRes.output.map((item, index) => {
    //         // console.log(item);
    //         let temp = {
    //           time: protectTime[index],
    //           name: "预测值" + (index + 1),
    //           dataunit: "ppm",
    //           forcastValue: item,
    //           color: "#1C86EE",
    //         };
    //         // console.log(temp);
    //         return temp;
    //       });
    //       // console.log("处理后的数据", carbonDioxidePredict);
    //       // let carbonDioxidePredict = [
    //       //     // {
    //       //     //     devicetime: "22:50",
    //       //     //     dataunit: "ppm",
    //       //     //     datavalue: 576,
    //       //     //     color: "#1C86EE",
    //       //     // },
    //       //     // {
    //       //     //     devicetime: "23:00",
    //       //     //     dataunit: "ppm",
    //       //     //     datavalue: 576,
    //       //     //     color: "#1C86EE",
    //       //     // },
    //       //     {
    //       //         time: "21:31",
    //       //         dataunit: "ppm",
    //       //         forcastValue: 686,
    //       //         color: "#1C86EE",
    //       //     },
    //       //     {
    //       //         time: "21:41",
    //       //         dataunit: "ppm",
    //       //         forcastValue: 614,
    //       //         color: "#1C86EE",
    //       //     },
    //       //     {
    //       //         time: "21:51",
    //       //         dataunit: "ppm",
    //       //         forcastValue: 606,
    //       //         color: "#1C86EE",
    //       //     },
    //       //     {
    //       //         time: "22:01",
    //       //         dataunit: "ppm",
    //       //         forcastValue: 580,
    //       //         color: "#1C86EE",
    //       //     },
    //       //     {
    //       //         time: "22:11",
    //       //         dataunit: "ppm",
    //       //         forcastValue: 536,
    //       //         color: "#1C86EE",
    //       //     },
    //       // ];
    //       //数据赋值
    //       carbonDioxideOption.dataset.source = carbonDioxideTemp;
    //       carbonDioxideOption.dataset.source.push(...carbonDioxidePredict);
    //       // console.log(carbonDioxideOption,'配置')
    //     }
    //   }
    //   let temperatureRes = await getCarbonDioxideData(commonParams, "空气温度");
    //   // console.log("空气温度请求结果", temperatureRes);
    //   if (temperatureRes.code === 200) {
    //     let data = temperatureRes.data.data;

    //     //获取预测的数据
    //     let forcastValue = data.map((item) => {
    //       return item.datavalue;
    //     });

    //     // console.log("预测的数据", forcastValue);
    //     let temperatureTemp = data.map((item) => {
    //       item.time = item.devicetime.substring(10, 16);
    //       item.color = "#f15d5d";
    //       return item;
    //     });
    //     // console.log("数据处理", temperatureTemp);
    //     let predictPramse = {
    //       feature: "temperature",
    //       data: forcastValue,
    //       target_length: 6,
    //     };

    //     let predictRes = await getPredict(predictPramse);
    //     // console.log("预测结果11", predictRes);
    //     if (predictRes.success) {
    //       let temperaturePredict = predictRes.output.map((item, index) => {
    //         // console.log(item);
    //         let temp = {
    //           time: protectTime[index],
    //           name: "预测值" + (index + 1),
    //           dataunit: "ppm",
    //           forcastValue: item,
    //           color: "#1C86EE",
    //         };
    //         return temp;
    //       });

    //       //数据赋值
    //       temperatureOption.dataset.source = temperatureTemp;
    //       temperatureOption.dataset.source.push(...temperaturePredict);
    //     }
    //   }
    //   // console.log("环境数据请求结果", temperatureRes);

    //   let humidityRes = await getCarbonDioxideData(commonParams, "空气湿度");
    //   if (humidityRes.code === 200) {
    //     let data = humidityRes.data.data;

    //     //获取预测的数据
    //     let forcastValue = data.map((item) => {
    //       return item.datavalue;
    //     });
    //     // console.log("预测的数据", forcastValue);

    //     let humidityTemp = data.map((item) => {
    //       item.time = item.devicetime.substring(10, 16);
    //       item.color = "#f15d5d";
    //       return item;
    //     });
    //     // console.log("数据处理", humidityTemp);
    //     let predictPramse = {
    //       feature: "humidity",
    //       data: forcastValue,
    //       target_length: 6,
    //     };

    //     let predictRes = await getPredict(predictPramse);
    //     // console.log("预测结果11", predictRes);
    //     if (predictRes.success) {
    //       let humidityPredict = predictRes.output.map((item, index) => {
    //         // console.log(item);
    //         let temp = {
    //           time: protectTime[index],
    //           name: "预测值" + (index + 1),
    //           dataunit: "ppm",
    //           forcastValue: item,
    //           color: "#1C86EE",
    //         };
    //         return temp;
    //       });
    //       //数据赋值
    //       humidityOption.dataset.source = humidityTemp;
    //       humidityOption.dataset.source.push(...humidityPredict);
    //     }

    //     //数据赋值
    //     // console.log("空气湿度请求结果", humidityRes);
    //   }

    //   //光照强度
    //   let illuminationIntensityRes = await getCarbonDioxideData(
    //     commonParams,
    //     "光照强度"
    //   );
    //   if (illuminationIntensityRes.code === 200) {
    //     let data = illuminationIntensityRes.data.data;
    //     //获取预测的数据
    //     let forcastValue = data.map((item) => {
    //       return item.datavalue;
    //     });
    //     // console.log("预测的数据", forcastValue);

    //     let illuminationIntensityTemp = data.map((item) => {
    //       item.time = item.devicetime.substring(10, 16);
    //       item.color = "#f15d5d";
    //       return item;
    //     });
    //     // console.log("数据处理", illuminationIntensityTemp);

    //     let predictPramse = {
    //       feature: "Light_intensity",
    //       data: forcastValue,
    //       target_length: 6,
    //     };

    //     let predictRes = await getPredict(predictPramse);
    //     if (predictRes.success) {
    //       let illuminationIntensityPredict = predictRes.output.map(
    //         (item, index) => {
    //           // console.log(item);
    //           let temp = {
    //             time: protectTime[index],
    //             name: "预测值" + (index + 1),
    //             dataunit: "ppm",
    //             forcastValue: item,
    //             color: "#1C86EE",
    //           };
    //           return temp;
    //         }
    //       );
    //       //数据赋值
    //       illuminationIntensityOption.dataset.source =
    //         illuminationIntensityTemp;
    //       illuminationIntensityOption.dataset.source.push(
    //         ...illuminationIntensityPredict
    //       );
    //     }
    //   }

    //   //PM2.5
    //   let PMRes = await getCarbonDioxideData(commonParams, "PM2.5");
    //   // console.log("Pm2.5", PMRes);
    //   if (PMRes.code === 200) {
    //     let data = PMRes.data.data;
    //     //获取预测的数据
    //     let forcastValue = data.map((item) => {
    //       return item.datavalue;
    //     });
    //     // console.log("预测的数据", forcastValue);

    //     let PMTemp = data.map((item) => {
    //       item.time = item.devicetime.substring(10, 16);
    //       item.color = "#f15d5d";
    //       return item;
    //     });
    //     // console.log("数据处理", PMTemp);
    //     let predictPramse = {
    //       feature: "pm2.5",
    //       data: forcastValue,
    //       target_length: 6,
    //     };

    //     let predictRes = await getPredict(predictPramse);
    //     // console.log("预测结果", predictRes);
    //     if (predictRes.success) {
    //       let PMPredict = predictRes.output.map((item, index) => {
    //         // console.log(item);
    //         let temp = {
    //           time: protectTime[index],
    //           name: "预测值" + (index + 1),
    //           dataunit: "μg/m3",
    //           forcastValue: item,
    //           color: "#1C86EE",
    //         };
    //         return temp;
    //       });
    //       //数据赋值
    //       PMOption.dataset.source = PMTemp;
    //       PMOption.dataset.source.push(...PMPredict);
    //       // console.log("PM2.5请求结果", PMRes);
    //     }
    //   }

    //   //PM10
    //   let PM10Res = await getCarbonDioxideData(commonParams, "PM10");
    //   if (PM10Res.code === 200) {
    //     let data = PM10Res.data.data;
    //     //获取预测的数据
    //     let forcastValue = data.map((item) => {
    //       return item.datavalue;
    //     });
    //     // console.log("预测的数据", forcastValue);
    //     let PM10Temp = data.map((item) => {
    //       item.time = item.devicetime.substring(10, 16);
    //       item.color = "#f15d5d";
    //       return item;
    //     });
    //     // console.log("数据处理", PM10Temp);

    //     let predictPramse = {
    //       feature: "pm10",
    //       data: forcastValue,
    //       target_length: 6,
    //     };

    //     let predictRes = await getPredict(predictPramse);
    //     // console.log("预测结果", predictRes);
    //     if (predictRes.success) {
    //       let PM10Predict = predictRes.output.map((item, index) => {
    //         // console.log(item);
    //         let temp = {
    //           time: protectTime[index],
    //           name: "预测值" + (index + 1),
    //           dataunit: "μg/m3",
    //           forcastValue: item,
    //           color: "#1C86EE",
    //         };
    //         return temp;
    //       });
    //       //数据赋值
    //       PM10Option.dataset.source = PM10Temp;
    //       PM10Option.dataset.source.push(...PM10Predict);
    //       // console.log("PM10请求结果", PM10Res);
    //     }
    //   }
    // };

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
      algorithmOptions,
      selectedAlgorith,
      selectAll,
      changeSelect,
      selectAligorith,
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