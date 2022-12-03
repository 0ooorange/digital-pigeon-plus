<template>
  <div>
    <scTable
      class="table"
      ref="table"
      row-key="id"
      :data="tableList"
      requestMethods="post"
    >
      <el-table-column
        align="center"
        label="序号"
        prop="serialNumber"
        width="120"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="部门名称"
        prop="departmentName"
        width="120"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="负责人"
        prop="principal"
        width="120"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="电话号码"
        prop="telephone"
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
        prop="boardNumber"
        width="160"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="员工数量"
        prop="staffNumber"
        width="120"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="介绍"
        prop="introduction"
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
import { reactive, ref } from "vue";
export default {
  name: "divisionMana", // 部门管理

  setup() {
    //表格数据
    let tableList = reactive([]);
    tableList = [
      {
        serialNumber: "1",
        departmentName: "养殖部门",
        principal: "小明",
        telephone: "15760153427",
        baseNumber: "3",
        boardNumber: "40",
        staffNumber: "30",
        introduction:
          "肉鸽养殖技术是指通过人工养殖的方法，运用各种学科措施来进行肉用鸽子的科学养殖与疾病防护等的一种技术手段",
      },
      {
        serialNumber: "2",
        departmentName: "屠宰部门",
        principal: "王五",
        telephone: "14436853497",
        baseNumber: "2",
        boardNumber: "10",
        staffNumber: "15",
        introduction: "这里是屠宰部门",
      },
      {
        serialNumber: "3",
        departmentName: "加工部门",
        principal: "小红",
        telephone: "16780127442",
        baseNumber: "1",
        boardNumber: "4",
        staffNumber: "10",
        introduction: "这里是加工部门",
      },
      {
        serialNumber: "4",
        departmentName: "物流部门",
        principal: "小李",
        telephone: "17834047468",
        baseNumber: "1",
        boardNumber: "2",
        staffNumber: "10",
        introduction: "这里是物流部门",
      },
    ];

    // 对话框
    const dialogDetail = ref(false);
    let dialogDetailTitle = ref("");
    let dialogDetailContent = ref("");

    function showDetail(row) {
      dialogDetailTitle.value = row.departmentName;
      dialogDetailContent.value = row.introduction;
      dialogDetail.value = true;
    }

    return {
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
  background-color: #fdf6ec;
  border: 2px solid #f3d19e;
  border-radius: 20px;
}
:deep .el-dialog__body {
  margin: 0 30px;
  padding: 20px 0;
  border-top: 2px solid black;
}
</style>
