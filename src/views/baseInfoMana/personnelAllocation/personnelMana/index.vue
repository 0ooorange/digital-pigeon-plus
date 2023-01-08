<template>
  <div>
    <div class="header">
      <el-button @click="showDetail('add')">添加员工</el-button>
      <el-dropdown trigger="click">
        <el-button>{{ selectDepartment }}</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(item, key) in departmentDropDownData"
              :key="key"
              @click="handleDepartmentId(item.id, item.name, 'form')"
              >{{ item.name }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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
      <el-dropdown trigger="click">
        <el-button>{{ selectWorkshop }}</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(item, key) in workshopDropDownData"
              :key="key"
              @click="handleWorkshopID(item.id, item.code, 'form')"
              >{{ item.code }}</el-dropdown-item
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
      ></el-table-column>
      <el-table-column
        align="center"
        label="所属部门"
        prop="departmentName"
        width="110"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="所属场地"
        prop="baseName"
        width="110"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="所属车间/棚"
        prop="shedCode"
        width="140"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="姓名"
        prop="name"
        width="90"
        sortable
      ></el-table-column>
      <!-- 年龄要计算，暂时不显示 -->
      <!-- <el-table-column
        align="center"
        label="年龄"
        prop="age"
        width="80"
        sortable
      ></el-table-column> -->
      <el-table-column
        align="center"
        label="性别"
        prop="sex"
        width="80"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="职位"
        prop="roleName"
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

    <!-- 这是第二版，暂时用回第一版  -->
    <!-- <el-dialog
      v-model="dialogEditor"
      :show-close="false"
      center
      class="dialogEditor"
    >
      <div class="baseInfo-left">
        <el-form
          :model="FormData.values"
          label-width="120px"
		  :rules="rules"
        >
          <el-form-item label="员工名称" prop="userName">
            <el-input v-model="FormData.values.userName" />
          </el-form-item>
          <el-form-item label="生日日期" prop="birth">
            <el-date-picker
				v-model="FormData.values.birth"
				type="date"
				placeholder="日期选择器"
			/>
          </el-form-item>
		  <el-form-item label="性别" prop="sex">
			<el-radio-group v-model="FormData.values.sex">
				<el-radio label="1" >男</el-radio>
              <el-radio label="0" >女</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="电话号码" prop="phone">
            <el-input v-model="FormData.values.phone" />
          </el-form-item>
          <el-form-item label="家乡地址" prop="address">
            <el-input v-model="FormData.values.address" rows="5" resize="none" type="textarea"/>
          </el-form-item>
        </el-form>
      </div>
	  <div class="baseInfo-right">
		<el-form
          :model="FormData.values"
          label-width="120px"
		  :rules="rules"
        >
          <el-form-item label="所属部门" prop="departmentBelong">
            <el-select v-model="FormData.values.departmentBelong" placeholder="选择部门">
				<el-option v-for="(item, key) in departmentDropDownData2" :key="key" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
		  <el-form-item label="所属单位" prop="unitBelong">
            <el-select v-model="FormData.values.unitBelong" placeholder="选择单位" :disabled="FormData.values.departmentBelong == ''">
				<el-option v-for="(item, key) in baseDropDownData2" :key="key" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
		  <el-form-item label="所属车间/棚" prop="boardBelong">
            <el-select v-model="FormData.values.boardBelong" placeholder="选择车间/棚" :disabled="FormData.values.unitBelong == ''">
              <el-option label="负责人1" value="小红" />
              <el-option label="负责人2" value="小明" />
            </el-select>
          </el-form-item>
		  <el-form-item label="职位" prop="roleId">
            <el-select v-model="FormData.values.roleId" placeholder="选择职位" :disabled="FormData.values.departmentBelong == ''">
              <el-option label="负责人1" value="小红" />
              <el-option label="负责人2" value="小明" />
            </el-select>
          </el-form-item>
          <el-form-item label="介绍" prop="introduce">
            <el-input v-model="FormData.values.introduce" rows="5" resize="none" type="textarea"/>
          </el-form-item>
        </el-form>
	  </div>

	  <div class="footer">
              <div class="control-btn">
                <el-button type="primary" plain @click="onSubmit"
                  >确认</el-button
                >
                <el-button @click="dialogEditor = false">取消</el-button>
              </div>
            </div>
    </el-dialog> -->

    <el-dialog
      v-model="dialogEditor"
      :show-close="false"
      center
      class="dialogEditor"
    >
      <div class="baseInfo-left">
        <el-form :model="FormData.values" label-width="120px" :rules="rules">
          <el-form-item label="员工名称" prop="userName">
            <el-input v-model="FormData.values.userName" />
          </el-form-item>
          <el-form-item label="生日日期" prop="birth">
            <el-date-picker
              v-model="FormData.values.birth"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="FormData.values.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="家乡地址" prop="address">
            <el-input
              v-model="FormData.values.address"
              rows="5"
              resize="none"
              type="textarea"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="baseInfo-right">
        <el-form :model="FormData.values" label-width="120px" :rules="rules">
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="FormData.values.phone" />
          </el-form-item>
          <el-form-item label="所属部门" prop="departmentBelong">
            <el-select
              v-model="FormData.values.departmentBelong"
              placeholder="选择部门"
            >
              <el-option
                v-for="(item, key) in departmentDropDownData2"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="职位" prop="roleId">
            <el-select
              v-model="FormData.values.roleId"
              placeholder="选择职位"
              :disabled="FormData.values.departmentBelong == ''"
            >
              <el-option
                v-for="(item, key) in roleDropDownData"
                :key="key"
                :label="item.roleName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="介绍" prop="introduce">
            <el-input
              v-model="FormData.values.introduce"
              rows="5"
              resize="none"
              type="textarea"
            />
          </el-form-item>
        </el-form>
      </div>

      <div class="footer">
        <div class="control-btn">
          <el-button type="primary" plain @click="onSubmit">确认</el-button>
          <el-button @click="dialogEditor = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getEmployeeManagementInfoByTokenApi,
  updataEmployeeManagementInfoByUserIdApi,
  deleteEmployeeByUserIdApi,
  addUserApi,
  getDepartmentsApi,
  getBasesByDepartmentIdApi,
  getPlantByBaseIdApi,
  getPositionInfoByDepartmentIdApi,
} from "@api/baseInformation/employee";
import { onMounted, reactive, ref, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "personnelMana", // 员工管理

  setup() {
    onMounted(() => {
      getData();
      getDropDown();
    });

    const selectBase = ref("选择场地");
    const selectDepartment = ref("选择部门");
    const selectWorkshop = ref("选择车间/棚");
    const selectBase2 = ref("选择场地");
    const selectDepartment2 = ref("选择部门");
    const selectWorkshop2 = ref("选择车间/棚");
    const total = ref(0);
    const baseId = ref("");
    const departmentId = ref("");
    const workshopId = ref("");
    const currentPage = ref(1);
    const pageSize = ref(10);

    // 下拉框数据
    let baseDropDownData = reactive([]);
    let baseDropDownData2 = reactive([]);
    let departmentDropDownData = reactive([]);
    let departmentDropDownData2 = reactive([]);
    let workshopDropDownData = reactive([]);
    let workshopDropDownData2 = reactive([]);
    let roleDropDownData = reactive([]);

    //表格数据
    let tableList = reactive([]);

    // 表单数据
    let FormData = reactive([]);
    FormData.values = {
      userId: "",
      birth: "",
      phone: "",
      roleId: "",
      sex: "",
      userName: "",
      address: "",
      introduce: "",
      departmentBelong: "",
    };

    const rules = reactive({
      userName: [
        {
          required: true,
          message: "请输入员工名称",
          trigger: "blur",
        },
      ],
      birth: [
        {
          required: true,
          message: "请输入生日日期",
          trigger: "blur",
        },
      ],
      sex: [
        {
          required: true,
          message: "请输入性别",
          trigger: "blur",
        },
      ],
      address: [
        {
          required: false,
        },
      ],
      phone: [
        {
          required: true,
          message: "请输入电话号码",
          trigger: "blur",
        },
      ],
      departmentBelong: [
        {
          required: true,
          message: "请输入所属部门",
          trigger: "blur",
        },
      ],
      roleId: [
        {
          required: true,
          message: "请输入职位",
          trigger: "blur",
        },
      ],
      introduce: [
        {
          required: false,
        },
      ],
    });

    let dialogFormType = "";
    const dialogEditor = ref(false);

    async function getData() {
      var params = {
        baseId: baseId.value,
        departmentId: departmentId.value,
        workshopId: workshopId.value,
        pageNum: currentPage.value,
        pageSize: pageSize.value,
      };
      let res = await getEmployeeManagementInfoByTokenApi(params);
      if (res.code == 200) {
        total.value = Number(res.data.userList.total);
        tableList.length = 0;
        tableList.push(...res.data.userList.records);
        tableList.forEach((elem) => (elem.sex = elem.sex == 1 ? "男" : "女"));
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
      baseId.value = id;
      if (type == "form") {
        selectBase.value = name;
        getData();
      } else {
        selectBase2.value = name;
      }
    };
    const handleDepartmentId = (id, name, type) => {
      departmentId.value = id;
      if (type == "form") {
        selectDepartment.value = name;
        getData();
      } else {
        selectDepartment2.value = name;
      }
    };
    const handleWorkshopID = (id, name, type) => {
      workshopId.value = id;
      if (type == "form") {
        selectWorkshop.value = name;
        getData();
      } else {
        selectWorkshop2.value = name;
      }
    };

    function showDetail(type, row) {
      if (type == "editor") {
        dialogFormType = "editor";
        FormData.values = row;
        FormData.values.sex = FormData.values.sex == "男" ? "1" : "0";
        FormData.values.userName = row.name;
        FormData.values.userId = row.id;
        FormData.values.departmentBelong = FormData.values.departmentId;
        getPositionInfoByDepartmentId();
      } else {
        dialogFormType = "add";
        Object.keys(FormData.values).forEach((key) => {
          FormData.values[key] = "";
        });
      }
      dialogEditor.value = true;
      getData();
    }

    async function onSubmit() {
      if (
        FormData.values.userName !== "" &&
        FormData.values.birth !== "" &&
        FormData.values.sex !== "" &&
        FormData.values.phone !== "" &&
        FormData.values.departmentBelong !== "" &&
        FormData.values.roleId !== ""
      ) {
        FormData.values.sex = Number(FormData.values.sex);
        if (dialogFormType == "editor") {
          let res = await updataEmployeeManagementInfoByUserIdApi(
            FormData.values
          );
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
          let res = await addUserApi(FormData.values);
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
          message: "请按需填写",
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
          let res = await deleteEmployeeByUserIdApi({ userId: row.id });
          console.log(res);
          if (res.code == 200) {
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
          getData();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    }

    async function getPositionInfoByDepartmentId() {
      let params = {
        departmentId: Number(FormData.values.departmentBelong),
      };
      let res = await getPositionInfoByDepartmentIdApi(params);
      if (res.code == 200) {
        roleDropDownData.length = 0;
        roleDropDownData.push(...res.data.roleList);
      }
    }
    watch(
      () => FormData.values.departmentBelong,
      () => {
        getPositionInfoByDepartmentId();
      },
      { deep: true }
    );

    watch(
      () => baseId,
      () => {
        getDropDown();
      },
      { deep: true }
    );
    watch(
      () => departmentId,
      () => {
        getDropDown();
      },
      { deep: true }
    );

    async function getDropDown() {
      let res = await getDepartmentsApi();
      if (res.code == 200) {
        departmentDropDownData.length = 0;
        departmentDropDownData2.length = 0;
        departmentDropDownData.push(...res.data.departments);
        departmentDropDownData2.push(...res.data.departments);
      }
      if (departmentId.value != "") {
        let parmas = {
          departmentId: departmentId.value,
        };
        let res2 = await getBasesByDepartmentIdApi(parmas);
        if (res2.code == 200) {
          baseDropDownData.length = 0;
          baseDropDownData2.length = 0;
          baseDropDownData.push(...res2.data.baseList);
          baseDropDownData2.push(...res2.data.baseList);
          console.log(baseDropDownData2);
        }
      }
      if (departmentId.value != "" && baseId.value != "") {
        let parmas = {
          baseId: baseId.value,
          departmentId: departmentId.value,
        };
        let res3 = await getPlantByBaseIdApi(parmas);
        console.log(res3);
        if (res3.code == 200) {
          workshopDropDownData.length = 0;
          workshopDropDownData2.length = 0;
          workshopDropDownData.push(...res3.data.plantList);
          workshopDropDownData2.push(...res3.data.plantList);
        }
      }
    }

    return {
      selectBase,
      selectBase2,
      selectDepartment,
      selectDepartment2,
      selectWorkshop,
      selectWorkshop2,
      total,
      baseId,
      departmentId,
      workshopId,
      currentPage,
      pageSize,
      baseDropDownData,
      baseDropDownData2,
      departmentDropDownData,
      departmentDropDownData2,
      workshopDropDownData,
      workshopDropDownData2,
      roleDropDownData,
      tableList,
      FormData,
      rules,
      dialogEditor,
      handleSizeChange,
      handleCurrentChange,
      handleBaseId,
      handleDepartmentId,
      handleWorkshopID,
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
.header .el-dropdown {
  margin-left: 10px;
}
/* 按钮样式 */
/* #region */
.header button {
  width: 100px;
  height: 40px;
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
// 这是第二版，先用回第一版
// :deep .dialogEditor {
//   width: 800px;
//   border: 1px solid rgb(14, 14, 14);
//   border-radius: 10px;
// }
// :deep .el-dialog__body {
//   margin: 20px 0 0;
//   padding: 0;
//   padding-right: 25px;
//   height: 410px;
// }
// .baseInfo-left {
//   float: left;
// 	padding-right: 50px;
//   width: 50%;
// }
// .baseInfo-right {
//   float: right;
// 	padding-right: 50px;
//   width: 50%;
//   border-left: 1px solid #b1b3b8;
// }
// .footer {
// 	float: right;
// 	margin-top: 20px;
// }

:deep .dialogEditor {
  width: 800px;
  height: 410px;
  border: 1px solid rgb(14, 14, 14);
  border-radius: 10px;
}
:deep .el-dialog__body {
  margin: 20px 0 0;
  padding: 0;
  padding-right: 25px;
}
.baseInfo-left {
  float: left;
  padding-right: 50px;
  width: 50%;
}
.baseInfo-right {
  float: right;
  padding-right: 50px;
  width: 50%;
  border-left: 1px solid #b1b3b8;
}
.footer {
  float: right;
  margin-top: 20px;
  padding-right: 50px;
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

