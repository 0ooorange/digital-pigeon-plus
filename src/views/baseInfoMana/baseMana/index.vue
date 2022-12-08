<template>
  <div>
    <div class="header">
      <el-button @click="showDetail('add')">添加基地</el-button>
      <el-dropdown trigger="click">
        <el-button>{{ selectDivision }}</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(item, key) in divisionDropDownData"
              :key="key"
              @click="handleDepartmentId(item.id, item.name)"
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
        label="部门名称"
        prop="departmentName"
        width="110"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="基地名称"
        prop="baseName"
        width="110"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="负责人"
        prop="userName"
        width="90"
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
        label="车间/棚数量"
        prop="shedNumber"
        width="140"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="规模"
        prop="scale"
        width="100"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="面积"
        prop="area"
        width="100"
        sortable
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <div class="control-btn">
            <el-button
              type="warning"
              plain
              @click="showDetail('editor', scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" plain @click="dataDelete(scope.row)"
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
      <div class="baseInfo">
        <el-form :model="FormData.values" label-width="120px" :rules="rules">
          <el-form-item label="基地名称" prop="baseName">
            <el-input v-model="FormData.values.baseName" />
          </el-form-item>
          <el-form-item label="基地编码" prop="code">
            <el-input v-model="FormData.values.code" />
          </el-form-item>
          <el-form-item label="所属部门" prop="departmentId">
            <el-select
              v-model="FormData.values.departmentId"
              placeholder="选择部门"
              :disabled="disabledDivisionDropDown"
            >
              <el-option
                v-for="(item, key) in divisionDropDownData"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" prop="userId">
            <el-select
              v-model="FormData.values.userId"
              placeholder="选择负责人"
            >
              <el-option
                v-for="(item, key) in userDropDownData"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="规模" prop="scale">
            <el-input v-model="FormData.values.scale" />
          </el-form-item>
          <el-form-item label="面积" prop="area">
            <el-input v-model="FormData.values.area" />
          </el-form-item>
          <el-form-item label="省份" prop="province">
            <el-select
              v-model="FormData.values.province"
              placeholder="选择省份"
            >
              <el-option label="广东省" value="广东省" />
              <el-option label="广西省" value="广西省" />
            </el-select>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-select v-model="FormData.values.city" placeholder="选择城市">
              <el-option label="北京" value="北京" />
              <el-option label="上海" value="上海" />
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input
              v-model="FormData.values.address"
              type="textarea"
              rows="5"
              resize="none"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="otherInfo">
        <div class="introduction">
          <el-form label-position="top" :rules="rules">
            <el-form-item label="基地简介" prop="introduction">
              <el-input
                v-model="FormData.values.introduction"
                type="textarea"
                rows="8"
                resize="none"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="mapChoose">
          <div class="map-title">
            <span>地图选择</span>
          </div>
          <div class="map">
            <SCMap adress="" />
          </div>
          <div class="mapForm">
            <el-form :model="FormData.values" :rules="rules">
              <el-form-item label="经度" prop="longitude">
                <el-input v-model="FormData.values.longitude" />
              </el-form-item>
              <el-form-item label="纬度" prop="latitude">
                <el-input v-model="FormData.values.latitude" />
              </el-form-item>
              <el-form-item>
                <div class="control-btn">
                  <el-button type="primary" plain @click="onSubmit"
                    >确认</el-button
                  >
                  <el-button @click="dialogEditor = false">取消</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBaseInfoApi,
  editBaseInfoApi,
  addBaseInfoApi,
  deleteBaseByIdApi,
  getDivisionDropDownApi,
  getShedDropDownApi,
} from "@api/baseInformation/baseInfoMana";
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import SCMap from "@/components/scMap";

export default {
  name: "baseMana", // 基地管理

  components: { SCMap },

  setup() {
    onMounted(() => {
      getData();
      getDropDown();
    });

    const selectDivision = ref("选择部门");
    const disabledDivisionDropDown = ref(false);
    const total = ref(0);
    const departmentId = ref("");
    const currentPage = ref(1);
    const pageSize = ref(10);

    // 下拉框数据
    let divisionDropDownData = reactive([]);
    let userDropDownData = reactive([]);

    // 表格数据
    let tableList = reactive([]);

    // 表单数据
    let FormData = reactive([]);
    FormData.values = {
		baseId: '',
      address: "",
      area: "",
      baseName: "",
      city: "",
      code: "",
      departmentId: "",
      latitude: "",
      longitude: "",
      province: "",
      userId: "",
      introduction: "",
      scale: "",
    };

    const rules = reactive({
      baseName: [
        {
          required: true,
          message: "请输入基地名称",
		  trigger: 'blur',
        },
      ],
      code: [
        {
          required: true,
          message: "请输入基地编码",
		  trigger: 'blur',
        },
      ],
      departmentId: [
        {
          required: true,
          message: "请选择所属部门",
		  trigger: 'blur',
        },
      ],
      userId: [
        {
          required: true,
          message: "请选择负责人",
		  trigger: 'blur',
        },
      ],
      scale: [
        {
          required: false,
        },
      ],
      area: [
        {
          required: true,
          message: "请输入面积",
		  trigger: 'blur',
        },
      ],
      province: [
        {
          required: true,
          message: "请选择省份",
		  trigger: 'blur',
        },
      ],
      city: [
        {
          required: true,
          message: "请选择城市",
		  trigger: 'blur',
        },
      ],
      address: [
        {
          required: true,
          message: "请输入详细地址",
		  trigger: 'blur',
        },
      ],
      introduction: [
        {
          required: false,
        },
      ],
      longitude: [
        {
          required: true,
          message: "请输入经度",
		  trigger: 'blur',
        },
      ],
      latitude: [
        {
          required: true,
          message: "请输入纬度",
		  trigger: 'blur',
        },
      ],
    });

    let dialogFormType = "";
    const dialogEditor = ref(false);

    async function getData() {
      var params = {
        departmentId: departmentId.value,
        pageNum: currentPage.value,
        pageSize: pageSize.value,
      };
      let res = await getBaseInfoApi(params);
      if (res.code == 200) {
        total.value = Number(res.data.total);
        tableList.length = 0;
        tableList.push(...res.data.baseList);
      }
    }
    const handleSizeChange = () => {
      getData();
    };
    const handleCurrentChange = () => {
      getData();
    };
    const handleDepartmentId = (id, name) => {
      departmentId.value = id;
      selectDivision.value = name;
      getData();
    };

    function showDetail(type, row) {
      dialogEditor.value = true;
      if (type == "editor") {
        console.log("row", row);
        disabledDivisionDropDown.value = true;
        dialogFormType = "editor";
		FormData.values.baseId = row.id
		FormData.values.address = row.detailedAddress
		FormData.values.area = row.area
		FormData.values.baseName = row.baseName
		FormData.values.city = row.city
		FormData.values.code = row.code
		FormData.values.departmentId = row.departmentId
		FormData.values.latitude = row.latitude
		FormData.values.longitude = row.longitude
		FormData.values.province = row.province
		FormData.values.userId = row.userId
		FormData.values.introduction = row.introduction
		FormData.values.scale = row.scale
      } else {
        dialogFormType = "add";
		Object.keys(FormData.values).forEach(key=>{FormData.values[key]=''})
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
          if (row.shedNumber > 0) {
            ElMessage({
              type: "error",
              message: "提示：该基地下还存在有车间/棚，无法删除！",
            });
          } else {
            console.log(row.id);
            let res = await deleteBaseByIdApi({ baseId: row.id });
            console.log(res);
            if (res.code == 200) {
              getData();
              ElMessage({
                type: "success",
                message: "删除成功",
              });
            }
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    }

    async function onSubmit() {
      console.log("submit!", FormData.values);
      if (
        FormData.values.baseName !== "" &&
        FormData.values.userId !== "" &&
        FormData.values.area !== "" &&
        FormData.values.province !== "" &&
        FormData.values.city !== "" &&
        FormData.values.address !== "" &&
        FormData.values.longitude !== "" &&
        FormData.values.latitude !== ""
      ) {
        if (dialogFormType == "editor") {
          let res = await editBaseInfoApi(FormData.values)
          console.log(res)
		  if (res.code == 200) {
			ElMessage({
              type: "success",
              message: res.message,
            });
			getData()
			dialogEditor.value = false;
		  } else {
			ElMessage({
              type: "error",
              message: res.message,
            });
		  }
        } else {
          console.log(FormData.values);
          let res = await addBaseInfoApi(FormData.values);
          console.log(res);
          if (res.code == 200) {
            ElMessage({
              type: "success",
              message: "添加成功！",
            });
            getData();
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

    async function getDropDown() {
      let res = await getDivisionDropDownApi();
      divisionDropDownData.push(...res.data.departments);
      let res2 = await getShedDropDownApi();
      userDropDownData.push(...res2.data.userList);
    }

    return {
      selectDivision,
      disabledDivisionDropDown,
      total,
      currentPage,
      pageSize,
      divisionDropDownData,
      userDropDownData,
      tableList,
      FormData,
      rules,
      dialogEditor,
      handleSizeChange,
      handleCurrentChange,
      handleDepartmentId,
      showDetail,
      dataDelete,
      onSubmit,
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
.control-btn {
  margin: 0 auto;
}
.control-btn button {
  width: 80px;
  height: 35px;
  line-height: 33px;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
}
.control-btn button:hover {
  transition: all 0.3s;
}
/* #endregion */
/* 编辑弹出框样式 */
/* #region */
:deep .dialogEditor {
  width: 1100px;
  border: 1px solid rgb(14, 14, 14);
  border-radius: 10px;
}
:deep .el-dialog__body {
  margin: 0 25px 25px;
  padding: 0;
  height: 500px;
}
.baseInfo {
  float: left;
  width: 370px;
}
.otherInfo {
  float: right;
  padding: 0 20px;
  width: 650px;
  height: 500px;
  border-left: 2px solid rgb(138, 138, 138);

  .introduction {
    width: 100%;
    height: 50%;
  }
  .mapChoose {
    width: 100%;
    height: 50%;
    .map-title {
      border-top: 2px solid rgb(138, 138, 138);
      padding-top: 13px;
      margin-right: 30px;
      height: 20%;
    }
    .map {
      float: left;
      width: 50%;
      height: 80%;
    }
    .mapForm {
      float: right;
      padding: 20px;
      width: 50%;
      height: 80%;
    }
  }
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
