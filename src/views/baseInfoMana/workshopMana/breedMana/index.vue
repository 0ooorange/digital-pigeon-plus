<template>
  <div>
    <div class="header">
      <el-button @click="showDetail('add')">添加鸽棚</el-button>
      <el-dropdown trigger="click">
        <el-button>{{ selectBase }}</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(item, key) in baseDropDownData"
              :key="key"
              @click="handleBaseId(item.id, item.name, 'form')"
              >{{ item.name }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

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
        width="80"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="所属基地"
        prop="baseName"
        width="110"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="鸽棚编号"
        prop="code"
        width="110"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="鸽笼数量"
        prop="cageNum"
        width="120"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="管理人员"
        prop="username"
        width="140"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="电话号码"
        prop="phone"
        width="120"
        sortable
      ></el-table-column>

      <el-table-column
        align="center"
        label="行数"
        prop="rowNum"
        width="120"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="列数"
        prop="columnNum"
        width="100"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="层数"
        prop="floorNum"
        width="100"
        sortable
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <div class="control-btn">
            <el-button
              class="control-btn-editor"
              type="warning"
              plain
              @click="showDetail('editor', scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              plain
              class="control-btn-delete"
              @click="dataDelete(scope.row)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </scTable>
    <div class="pagination">
      <el-pagination
        background
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        :small="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog
      v-model="dialogEditor"
      :show-close="false"
      center
      class="dialogEditor"
    >
      <div class="dialogTitle">
        修改或添加鸽棚信息
        <div class="dialogTitle-select">
          <el-dropdown trigger="click">
            <el-button type="primary" plain class="dialog-top-btn">{{ selectBase2 }}</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(item, key) in baseDropDownData2"
                  :key="key"
                  @click="handleBaseId(item.id, item.name, 'dialog')"
                  >{{ item.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="baseInfo">
        <el-form :model="FormData.values" label-width="120px" :rules="rules">
          <el-form-item label="养殖仓编码" prop="code">
            <el-input v-model="FormData.values.code" />
          </el-form-item>
          <el-form-item label="鸽棚数量" prop="cage_num">
            <el-input v-model="FormData.values.cage_num" />
          </el-form-item>
          <el-form-item label="鸽棚行数" prop="row_num">
            <el-input v-model="FormData.values.row_num" />
          </el-form-item>
          <el-form-item label="鸽棚列数" prop="column_num">
            <el-input v-model="FormData.values.column_num" />
          </el-form-item>
          <el-form-item label="鸽棚层数" prop="floor_num">
            <el-input v-model="FormData.values.floor_num" />
          </el-form-item>
          <el-form-item label="管理员" prop="user_id">
            <el-select
              v-model="FormData.values.user_id"
              placeholder="选择管理员"
              label-width="50px"
            >
              <el-option
                v-for="(item, key) in userDropDownData"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="为全抽蛋鸽棚" prop="sex">
            <el-radio-group v-model="FormData.values.if_take">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="鸽棚抽蛋/孵化" prop="sex">
            <el-slider v-model="FormData.values.take_hatch_perc" />
          </el-form-item>
          <el-form-item>
            <div class="footer">
              <div class="control-btn">
                <el-button type="primary" plain @click="onSubmit"
                  >确认</el-button
                >
                <el-button @click="dialogEditor = false">取消</el-button>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getShedListByBaseIdApi,
  updateShedByShedIdApi,
  addShedApi,
  deleteShedByIdApi,
  getAllBaseApi,
  getAllShedUserDropDownApi,
} from "@api/baseInformation/dovecote";
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "breedMana", // 养殖鸽棚管理

  setup() {
    onMounted(() => {
      getData();
      getDropDown();
    });

    const selectBase = ref("选择基地");
    const selectBase2 = ref("请选择基地");
    const total = ref(0);
    const baseId = ref("");
    const currentPage = ref(1);
    const pageSize = ref(10);

    // 下拉框数据
    let baseDropDownData = reactive([]);
    let baseDropDownData2 = reactive([]);
    let userDropDownData = reactive([]);

    //表格数据
    let tableList = reactive([]);

    // 表单数据
    let FormData = reactive([]);
    FormData.values = {
      base_id: "",
      cage_num: "",
      code: "",
      column_num: "",
      floor_num: "",
      row_num: "",
      user_id: "",
      if_take: "",
      take_hatch_perc: "",
    };

    const rules = reactive({
      code: [
        {
          required: true,
          message: "请输入养殖仓编码",
          trigger: "blur",
        },
      ],
      cage_num: [
        {
          required: true,
          message: "请输入鸽棚数量",
          trigger: "blur",
        },
      ],
      row_num: [
        {
          required: true,
          message: "请输入鸽棚行数",
          trigger: "blur",
        },
      ],
      column_num: [
        {
          required: true,
          message: "请输入鸽棚列数",
          trigger: "blur",
        },
      ],
      floor_num: [
        {
          required: true,
          message: "请输入鸽棚层数",
          trigger: "blur",
        },
      ],
      user_id: [
        {
          required: true,
          message: "必须选择一个管理员",
          trigger: "blur",
        },
      ],
    });

    let dialogFormType = "";
    const dialogEditor = ref(false);

    async function getData() {
      var params = {
        baseId: baseId.value,
        pageNum: currentPage.value,
        pageSize: pageSize.value,
      };
      let res = await getShedListByBaseIdApi(params);
      if (res.code == 200) {
        total.value = Number(res.data.ShedList.total);
        tableList.length = 0;
        tableList.push(...res.data.ShedList.records);
        tableList.forEach((elem) => {
          let objKeys = Object.keys(elem);
          let objValues = Object.values(elem);
          for (var i = 0; i < objKeys.length; i++) {
            elem[objKeys[i]] = objValues[i] || "暂无";
          }
        });
      }
    }
    const handleSizeChange = () => {
      getData();
    };
    const handleCurrentChange = () => {
      getData();
    };
    const handleBaseId = (id, name, type) => {
      if (type == "form") {
        baseId.value = id;
        selectBase.value = name;
        getData();
      } else {
        selectBase2.value = name;
        FormData.values.base_id = id;
      }
    };

    function showDetail(type, row) {
      dialogEditor.value = true;
      if (type == "editor") {
        dialogFormType = "editor";
        selectBase2.value = row.baseName;
        FormData.values.base_id = row.baseId;
        FormData.values.cage_num = row.cageNum;
        FormData.values.code = row.code;
        FormData.values.column_num = row.columnNum;
        FormData.values.floor_num = row.floorNum;
        FormData.values.row_num = row.rowNum;
        FormData.values.user_id = row.id;
        FormData.values.if_take = row.ifTake == 0 ? "0" : "1";
        FormData.values.take_hatch_perc = row.takeHatchPerc;
      } else {
        dialogFormType = "add";
        Object.keys(FormData.values).forEach((key) => {
          FormData.values[key] = "";
        });
      }
    }

    async function onSubmit() {
      console.log("submit!", FormData.values);
      if (
        FormData.values.base_id !== "" &&
        FormData.values.cage_num !== "" &&
        FormData.values.code !== "" &&
        FormData.values.column_num !== "" &&
        FormData.values.floor_num !== "" &&
        FormData.values.row_num !== "" &&
        FormData.values.user_id !== ""
      ) {
        if (dialogFormType == "editor") {
          let res = await updateShedByShedIdApi(FormData.values);
          console.log(res);
          if (res.code == 200) {
            getData();
            ElMessage({
              type: "success",
              message: res.message,
            });
            dialogEditor.value = false;
          } else {
            ElMessage({
              type: "error",
              message: res.message,
            });
          }
        } else {
          let res = await addShedApi(FormData.values);
          if (res.code == 200) {
            getData();
            ElMessage({
              type: "success",
              message: res.message,
            });
            dialogEditor.value = false;
          } else {
            ElMessage({
              type: "error",
              message: res.message,
            });
          }
        }
      } else {
        ElMessage({
          type: "error",
          message: "请按需求填写",
        });
      }
    }

    function dataDelete(row) {
      ElMessageBox.confirm("是否删除", {
        customClass: "confirmBox",
        autofocus: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "confirmBtn",
        cancelButtonClass: "cancelBtn",
        center: true,
        showClose: false,
      })
        .then(async () => {
          let res = await deleteShedByIdApi({ id: row.id });
          if (res.code == 200) {
            getData();
            ElMessage({
              type: "success",
              message: res.message,
            });
          } else {
            ElMessage({
              type: "error",
              message: res.message,
            });
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    }

    async function getDropDown() {
      let res = await getAllBaseApi();
      baseDropDownData.push(...res.data.breedBaseList);
      baseDropDownData2.push(...res.data.breedBaseList);
      let res2 = await getAllShedUserDropDownApi();
      userDropDownData.push(...res2.data.userList);
    }

    return {
      selectBase,
      selectBase2,
      total,
      currentPage,
      pageSize,
      baseDropDownData,
      baseDropDownData2,
      userDropDownData,
      tableList,
      FormData,
      rules,
      dialogEditor,
      handleSizeChange,
      handleCurrentChange,
      handleBaseId,
      showDetail,
      onSubmit,
      dataDelete,
    };
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  line-height: 30px;
}
.header button {
  width: 100px;
  height: 40px;
}
/* 按钮样式 */
/* #region */
.dialog-top-btn {
	width: 150px;
}
.control-btn {
  margin: 0 auto;
}
.control-btn button {
  width: 80px;
  height: 35px;
  line-height: 33px;
  border-radius: 5px;
  font-size: 15px;
}
.control-btn button:hover {
  transition: all 0.3s;
}
/* #endregion */
/* 编辑弹出框样式 */
/* #region */
:deep .dialogEditor {
  width: 580px;
  border: 1px solid rgb(14, 14, 14);
  border-radius: 10px;
}
:deep .el-dialog__body {
  margin: 0 25px 25px;
  padding: 0;
  padding-right: 25px;
  height: 510px;
}
.dialogTitle {
  float: left;
  margin-bottom: 10px;
  padding-left: 30px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  font-weight: 600;
}
.dialogTitle-select {
  float: right;
  padding: 10px;
}
.baseInfo {
  float: left;
  padding-top: 10px;
  width: 100%;
}
.footer {
  padding-left: 50%;
  width: 100%;
}
/* #endregion */
.pagination {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
}
</style>
<style>
/* 删除确认框样式 */
/* #region */
.confirmBox {
  width: 300px;
}
.confirmBtn {
  background-color: #409eff;
}
.confirmBtn:hover {
  background-color: #79bbff;
}
/* #endregion */
</style>
