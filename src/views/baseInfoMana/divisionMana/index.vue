<template>
  <div>
    <scTable
      class="table"
      ref="table"
      row-key="id"
      :data="tableList"
      hidePagination
	  stripe
    >
      <el-table-column
        align="center"
        label="序号"
        type="index"
        width="120"
      ></el-table-column>
      <el-table-column
        align="center"
        label="部门名称"
        prop="name"
        width="120"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="负责人"
        prop="userName"
        width="120"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="电话号码"
        prop="phone"
        width="220"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="基地数量"
        prop="baseNumber"
        width="120"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="车间/棚数量"
        prop="shedNumber"
        width="160"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="员工数量"
        prop="employees"
        width="120"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="介绍"
        prop="description"
        show-overflow-tooltip
      >
        <template #default="scope">
          <el-button
            type="warning"
            plain
            class="introduction-detail"
            @click="showDetail(scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </scTable>
    <el-dialog
      v-model="dialogDetail"
      :show-close="false"
      :title="dialogDetailTitle"
      center
      class="dialogDetail"
    >
      <div class="dialogDetailContent">
        <span>{{ dialogDetailContent }}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { getDivisionListApi } from "@api/baseInformation/divisionMana";
export default {
  name: "divisionMana", // 部门管理

  setup() {
    onMounted(() => {
      getData();
    });

    let serialNumber = reactive([]);

    //表格数据
    let tableList = reactive([]);

    async function getData() {
      let res = await getDivisionListApi();
      console.log(res.data.departments);
      tableList.push(...res.data.departments);
      for (var i = 0; i < tableList.values.length; i++) {
        serialNumber.values[i] = i + 1;
      }
    }

    // 对话框
    const dialogDetail = ref(false);
    let dialogDetailTitle = ref("");
    let dialogDetailContent = ref("");

    function showDetail(row) {
      dialogDetailTitle.value = row.name;
      dialogDetailContent.value = row.description;
      dialogDetail.value = true;
    }

    return {
      serialNumber,
      tableList,
      dialogDetail,
      dialogDetailTitle,
      dialogDetailContent,
      showDetail,
    };
  },
};
</script>

<style scoped>
.introduction-detail {
  margin: 0 auto;
  width: 80px;
  height: 35px;
  line-height: 33px;
  font-size: 15px;
  cursor: pointer;
}
.introduction-detail:hover {
  transition: all 0.3s;
}
:deep .dialogDetail {
  padding: 20px;
  width: 380px;
  border: 1px solid rgb(14, 14, 14);
  border-radius: 10px;
}
:deep .el-dialog__body {
  margin: 0 30px;
  padding: 20px 0;
  border-top: 2px solid black;
}
</style>
