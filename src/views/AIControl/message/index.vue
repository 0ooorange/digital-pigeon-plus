<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="5">
        <div class="option">
          <div style="margin-right: 5px">选择基地:</div>
          <el-select v-model="baseValue" class="m-2" placeholder="选择基地">
            <el-option
              v-for="item in baseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="option">
          <div style="margin-right: 5px">选择鸽棚:</div>
          <el-select v-model="devValue" class="m-2" placeholder="选择鸽棚">
            <el-option
              v-for="item in devOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="5">
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
      </el-col>
    </el-row>
    <scTable
      class="table"
      ref="table"
      row-key="id"
      stripe
      :hidePagination="false"
      highlightCurrentRow
      :data="resultList"
    >
      <el-table-column
        align="center"
        label="序号"
        prop="num"
        width="180"
      ></el-table-column>
      <el-table-column
        align="center"
        label="预警类型"
        prop="min"
        width="150"
      ></el-table-column>
      <el-table-column
        align="center"
        label="发送时间"
        prop="minmin"
        width="150"
      ></el-table-column>
      <el-table-column
        align="center"
        label="接收人"
        prop="mininfo"
        width="260"
      ></el-table-column>
      <el-table-column
        align="center"
        label="电话号码"
        prop="max"
        width="150"
      ></el-table-column>
      <el-table-column
        align="center"
        label="基地"
        prop="maxmax"
        width="150"
      ></el-table-column>
      <el-table-column
        align="center"
        label="棚"
        prop="maxinfo"
        width="260"
      ></el-table-column>
      <el-table-column align="center" label="操作" prop="weight" width="200">
        <template #default="scope">
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            @click="editData(scope.row)"
            >详情</el-button
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

    <!-- 弹框 -->
    <el-dialog
      v-model="dialogVisible"
      title="短信详情"
      width="30%"
      :before-close="handleClose"
    >
    <p style="font-size: 18px;margin-bottom: 10px;">
      【金绿鸽子有限公司】短信预警系统提示:
    </p>
    <p style="font-size: 16px;">
      当前【A01基地】【B02棚】中【二氧化碳】在未来【10分钟】后会超过标准值【200ml】请注意!
    </p>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
 
<script>
import { defineComponent, reactive, ref, getCurrentInstance } from "vue";
export default defineComponent({
  name: "message", // 短信预警
  setup() {
    const { proxy } = getCurrentInstance();
    //基地选择下拉框
    const baseValue = ref("0");
    const baseOptions = reactive([
      {
        value: "0",
        label: "金绿基地",
      },
    ]);

    //鸽棚下拉框
    const devValue = ref("0");
    const devOptions = reactive([
      {
        value: "0",
        label: "A01",
      },
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
      new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() - 7)
    );

    //时间选择器绑定的值
    const dateValue = ref([
      proxy.$TOOL.dateFormat(startTime.value).substring(0, 10),
      proxy.$TOOL.dateFormat(endTime.value).substring(0, 10),
    ]);

    //日期选择器
    const visibleChange = function (e) {
      console.log("选择日期", e);
      // console.log(
      //     proxy.$TOOL.dateFormat(e[0]),
      //     proxy.$TOOL.dateFormat(e[1]).substring(0, 10) + " 23:59:59"
      // );
      commonParams.start_time = proxy.$TOOL.dateFormat(e[0]);
      commonParams.end_time =
        proxy.$TOOL.dateFormat(e[1]).substring(0, 10) + " 23:59:59";
      console.log("参数", commonParams);
    };

    //表格
    const resultList = reactive([
      {
        num: 1,
        min: "二氧化碳",
        minmin: "2022-11-17 16:47",
        mininfo: "胜平",
        max: "13123451234",
        maxmax: "金绿基地",
        maxinfo: "A01",
      },
      {
        num: 2,
        min: "温度",
        minmin: "2022-11-18 08:45",
        mininfo: "胜平",
        max: "13543211234",
        maxmax: "金绿基地",
        maxinfo: "A01",
      },
      {
        num: 3,
        min: "湿度",
        minmin: "2022-11-19 12:50",
        mininfo: "胜平",
        max: "13123454321",
        maxmax: "金绿基地",
        maxinfo: "A01",
      },
    ]);

    const editData = function () {
      dialogVisible.value = true
    };

    const dialogVisible = ref(false);

    return {
      baseValue,
      baseOptions,
      devValue,
      shortcuts,
      devOptions,
      dateValue,
      resultList,
      visibleChange,
      editData,
      dialogVisible
    };
  },
});
</script>

<style scoped>
.option {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
}
.table {
  margin-top: 15px;
}
</style>