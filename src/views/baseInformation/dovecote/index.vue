
<template>
  <div class="main">
    <div class="tag">
      <el-button type="primary" plain @click="addShedVisible = true"
        >添加鸽棚</el-button
      >
    </div>
    <scTable :data="tableData" stripe>
      <el-table-column
        prop="code"
        label="
养殖仓编码"
        sortable
        align="center"
      />
      <el-table-column prop="cageNum" label="鸽棚数量" align="center" />
      <el-table-column prop="rowNum" label="鸽棚行数" sortable align="center" />
      <el-table-column prop="columnNum" label="鸽棚列数" align="center" />
      <el-table-column prop="floorNum" label="鸽棚层数" align="center" />
      <el-table-column prop="manager" label="管理员" align="center" />
      <el-table-column label="管理鸽棚" align="center">
        <template #default="scope">
          <el-button
            type="warning"
            size="small"
            @click="selectShed(scope.row.id)"
          >
            选择员工</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240" align="center">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            plain
            icon="el-icon-edit"
            @click="editDovecote(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="deleteShed(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </scTable>

    <!-- 给鸽棚添加管理员-->
    <el-dialog
      v-model="selectShedVisible"
      title="选择员工"
      width="30%"
      :before-close="selectShedhandleClose"
    >
      <el-descriptions :column="1" border>
        <el-descriptions-item label="可选员工">
          <el-select
            v-model="selectShedValue"
            class="m-2"
            placeholder="请选择"
            size="large"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.id"
            />
          </el-select>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="selectShedVisible = false">取消</el-button>
          <el-button type="primary" plain @click="selectShedAffirm"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 编辑信息 -->
    <el-dialog
      v-model="editVisible"
      title="修改鸽棚信息"
      width="30%"
      :before-close="editHandleClose"
    >
      <el-descriptions :column="1" border :model="editInfo">
        <el-descriptions-item
          label="
养殖仓编码"
        >
          <el-input v-model="editInfo.code" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="鸽棚数量">
          <el-input v-model="editInfo.cageNum" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="鸽棚行数">
          <el-input v-model="editInfo.rowNum" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="鸽棚列数">
          <el-input v-model="editInfo.columnNum" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="鸽棚层数">
          <el-input v-model="editInfo.floorNum" placeholder="请输入" />
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button type="primary" @click="editInfoFun">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 添加鸽棚 -->
    <el-dialog
      v-model="addShedVisible"
      title="修改鸽棚信息"
      width="30%"
      :before-close="addShedClose"
    >
      <el-descriptions :column="1" border :model="addShedInfo">
        <el-descriptions-item label="养殖仓编码">
          <el-input v-model="addShedInfo.code" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="鸽棚数量">
          <el-input v-model="addShedInfo.cageNum" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="鸽棚行数">
          <el-input v-model="addShedInfo.rowNum" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="鸽棚列数">
          <el-input v-model="addShedInfo.columnNum" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="鸽棚层数">
          <el-input v-model="addShedInfo.floorNum" placeholder="请输入" />
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addShedVisible = false">取消</el-button>
          <el-button type="primary" @click="addShedConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import scTable from "@/components/scTable/index.vue";
import { onMounted, reactive, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  showPageApi,
  selectUserApi,
  deletedoveApi,
  getEditInfoApi,
  updateInfoApi,
  addAdminApi,
  addShedApi,
} from "@/api/model/baseInformation/dovecote";
export default {
  name: "dovecote", // 员工管理
  components: {
    scTable,
  },
  setup() {
    onMounted(() => {
      showPage_methods.showPage();
    });
    const showPage_state = reactive({
      tableData: [],
      page: {
        current: 1,
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
    });
    const showPage_methods = {
      async showPage() {
        const res = await showPageApi.get(showPage_state.page);
        showPage_state.tableData = res.data.shedAndUserLists;
        // 显示鸽棚管理员
        const shedObj = res.data.shedAndUserLists;
        const personArr = [];
        for (let i = 0; i < shedObj.length; i++) {
          if (shedObj[i].userList === 0) {
            personArr.push("无");
          } else {
            let str = "";
            for (const managerObj of shedObj[i].userList) {
              if (str.length == 0) {
                str = str + managerObj.name;
              } else {
                str += `,${managerObj.name}`;
              }
            }
            personArr.push(str);
          }
        }
        // 添加属性
        for (let i = 0; i < showPage_state.tableData.length; i++) {
          showPage_state.tableData[i].manager = personArr[i];
        }
      },
    };
    // 新增和选择鸽棚功能
    const add_state = reactive({
      // 给鸽棚添加管理员 --------------
      selectShedVisible: false,
      selectShedValue: "",
      options: [],
      ShedId: "",
      //   添加鸽棚
      addShedVisible: false,
      addShedInfo: {
        // 基地id，必须带上
        baseId: "1546756048684097537",
      },
    });

    const add_methods = {
      // 添加鸽棚 -----------------
      async addShedConfirm() {
        await addShedApi.post(add_state.addShedInfo);
      },
      addShedClose() {
        add_state.addShedVisible = false;
      },
      // 给鸽棚添加管理员  --------------
      async selectShed(ShedId) {
        add_state.ShedId = ShedId;
        const res = await selectUserApi.get();
        const arr = res.data.userList;
        const tempArr = [];
        const idArr = [];
        for (let i = 0; i < arr.length; i++) {
          tempArr.push(arr[i].name);
          idArr.push(arr[i].id);
        }
        //  console.log(tempArr,"tempArr");
        if (add_state.options.length == 0) {
          tempArr.map((item, index) => {
            add_state.options.push(
              Object.assign({}, { value: tempArr[index], id: idArr[index] })
            );
          });
        }

        // console.log(add_state.options,"options");
        add_state.selectShedVisible = true;
      },
      selectShedhandleClose() {
        add_state.selectShedVisible = false;
      },
      //  确认按钮
      async selectShedAffirm() {
        console.log(add_state.selectShedValue);
        // 管理员id add_state.selectShedValue
        const userId = add_state.selectShedValue;
        // 鸽棚id
        const ShedId = add_state.ShedId;
        const res = await addAdminApi.post(ShedId, userId);
        if (res.code === 200) {
          ElMessage.success("添加管理员成功！");
          showPage_methods.showPage();
        } else {
          ElMessage.error(res.message);
        }
        add_state.selectShedVisible = false;
      },
    };
    const delete_state = reactive({
      async deleteShed(id) {
        const confirmResult = await ElMessageBox.confirm(
          "此操作将永久删除所选数据，请确认?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).catch((err) => {
          return err;
        });
        if (confirmResult !== "confirm") {
          return ElMessage.info("已取消删除");
        } else {
          const res = await deletedoveApi.post(id);
          if (res.code === 200) {
            ElMessage.success("已成功删除该订单");
            showPage_methods.showPageApi();
          } else {
            ElMessage.error(res.message);
          }
        }
      },
    });
    const delete_methods = {};

    const edit_state = reactive({
      editVisible: false,
      editInfo: {},
    });
    const edit_methods = {
      async editDovecote(id) {
        const res = await getEditInfoApi.get(id);
        edit_state.editInfo = res.data.shed;
        edit_state.editVisible = true;
      },
      async editInfoFun() {
        const res = await updateInfoApi.post(edit_state.editInfo);
        if (res.code === 200) {
          ElMessage.success("修改信息成功！");
          showPage_methods.showPage();
          edit_state.editVisible = false;
        } else {
          ElMessage.error("修改出错，请稍后重试！");
          edit_state.editVisible = false;
        }
      },
      editHandleClose() {
        edit_state.editVisibleL = false;
      },
    };
    return {
      ...toRefs(showPage_state),
      ...showPage_methods,
      ...toRefs(add_state),
      ...add_methods,
      ...toRefs(delete_state),
      ...delete_methods,
      ...toRefs(edit_state),
      ...edit_methods,
    };
  },
};
</script>

<style scoped>
.tag {
  display: flex;
  padding: 10px 15px;
}
</style>
