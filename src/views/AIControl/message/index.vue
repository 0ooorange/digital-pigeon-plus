<template>
  <div>
    <!-- <el-row :gutter="5">
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
    </el-row> -->
    <div class="option">
          <el-select v-model="baseValue" class="m-2" placeholder="选择基地" @change="changeBase">
            <el-option
              v-for="item in baseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="devValue" class="m-2" placeholder="选择鸽棚" @change="changeDev">
            <el-option
              v-for="item in devOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
    <scTable
      class="table"
      ref="table"
      row-key="id"
      stripe
      highlightCurrentRow
      :data="[]"
      :apiObj="getListApi"
      :params="getListParams"
      requestMethods="post"
    >
      <!-- <el-table-column
        align="center"
        label="序号"
        prop="num"
        width="180"
      ></el-table-column> -->
      <el-table-column
        align="center"
        label="预警类型"
        prop="warningType"
        width="200"
      ></el-table-column>
      <el-table-column
        align="center"
        label="发送时间"
        prop="gmtCreate"
        width="200"
      ></el-table-column>
      <el-table-column
        align="center"
        label="接收人"
        prop="name"
        width="200"
      ></el-table-column>
      <el-table-column
        align="center"
        label="电话号码"
        prop="telephone"
        width="200"
      ></el-table-column>
      <el-table-column
        align="center"
        label="基地"
        prop="base"
        width="200"
      ></el-table-column>
      <el-table-column
        align="center"
        label="棚"
        prop="shed"
        width="200"
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
      <!-- <p style="font-size: 18px; margin-bottom: 10px">
        【金绿鸽子有限公司】短信预警系统提示:
      </p> -->
      <!-- <p style="font-size: 16px">
        当前【A01基地】【B02棚】中【二氧化碳】在未来【10分钟】后会超过标准值【200ml】请注意!
      </p> -->
      <p style="font-size: 18px;line-height: 40px;">
        {{ content }}
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
import { getBreedBaseAndShedByToken,getList } from "@api/AiControl/message";
import tool from "@utils/tool";
export default defineComponent({
  name: "message", // 短信预警
  setup() {
    const { proxy } = getCurrentInstance();
    //基地选择下拉框
    const baseValue = ref(0);
    const baseOptions = ref([]);

    //鸽棚下拉框
    const devValue = ref(0);
    const devOptions = ref([]);

    //下拉框事件
    const changeBase = function(e) {
      getListParams.base = baseOptions.value[e].label
      // console.log(baseOptions.value[e].label,'参数')
    }

    const changeDev = function(e) {
      getListParams.shed = devOptions.value[e].label
      // console.log(devOptions.value[e].label,'参数')
    }


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
      // new Date(
      //   nowTime.getFullYear(),
      //   nowTime.getMonth(),
      //   nowTime.getDate(),
      //   23,
      //   59,
      //   59
      // )
      new Date(
        nowTime.getFullYear() - 1,
        11,
        30,
        23,
        59,
        59
      )
    );

    const startTime = ref(
      // new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() - 7)
      new Date(nowTime.getFullYear() - 1, 10
      , 5)
    );

    //时间选择器绑定的值
    const dateValue = ref([
      proxy.$TOOL.dateFormat(startTime.value).substring(0, 10),
      proxy.$TOOL.dateFormat(endTime.value).substring(0, 10),
    ]);

    //日期选择器
    const visibleChange = function (e) {
      // console.log("选择日期", e);
      getListParams.startTime = tool.dateFormat(e[0]);
      getListParams.endTime = tool.dateFormat(e[1]);
      // console.log(
      //     proxy.$TOOL.dateFormat(e[0]),
      //     proxy.$TOOL.dateFormat(e[1]).substring(0, 10) + " 23:59:59"
      // );
      // commonParams.start_time = proxy.$TOOL.dateFormat(e[0]);
      // commonParams.end_time =
      //   proxy.$TOOL.dateFormat(e[1]).substring(0, 10) + " 23:59:59";
      // console.log("参数", commonParams);/
    };

    //表格



    const getListApi = getList;
    const getListParams = reactive({
      startTime: tool.dateFormat(startTime.value),
      endTime: tool.dateFormat(endTime.value),
      base: "",
      shed: ""
    });

    const getData = async () => {
      const res = await getBreedBaseAndShedByToken();
      // console.log(res, "获取基地和鸽棚");
        const baseList = res.data.BaseList;
        const shedList = res.data.ShedList;
        // console.log(baseList, shedList);
        baseList.forEach((item, index) => {
          let temp = {
            value: "",
            label: "",
          };
          temp.value = index;
          temp.label = item.name;
          baseOptions.value.push(temp);
        });
        shedList.forEach((item, index) => {
          let temp = {
            value: "",
            label: "",
          };
          temp.value = index;
          temp.label = item.code;
          devOptions.value.push(temp);
          getListParams.base = baseOptions.value[0].label;
          getListParams.shed = devOptions.value[0].label
        });

    };
    getData();

    //弹框
    const dialogVisible = ref(false);
    const content = ref("") 
    const editData = function (row) {
      // console.log(row.content,'短信内容')
      content.value = row.content
      dialogVisible.value = true;
    };
    


    return {
      baseValue,
      baseOptions,
      devValue,
      shortcuts,
      devOptions,
      dateValue,
      getListApi,
      getListParams,
      content,
      visibleChange,
      editData,
      changeBase,
      changeDev,
      dialogVisible,
    };
  },
});
</script>

<style scoped>
.option {
  display: flex;
  /* align-items: center; */
  justify-content: center;
  width: 50%;

}
.table {
  margin-top: 15px;
}
</style>