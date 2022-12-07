<template>
  <div>
    <div class="header">
      <el-button @click="showDetail('add')">添加鸽棚</el-button>
	  <el-dropdown trigger="click">
			<el-button>{{ selectBase }}</el-button>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item v-for="(item, key) in baseDropDownData" :key="key" @click="handleBaseId(item.id, item.name, 'form')">{{ item.name }}</el-dropdown-item>
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
		修改鸽棚信息
		<div class="dialogTitle-select">
			<el-dropdown trigger="click">
				<el-button>{{ selectBase2 }}</el-button>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item v-for="(item, key) in baseDropDownData2" :key="key" @click="handleBaseId(item.id, item.name, 'dialog')">{{ item.name }}</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	  </div>
      <div class="baseInfo">
        <el-form
          :model="FormData.values"
          label-width="120px"
		  :rules="rules"
        >
          <el-form-item label="养殖仓编码" prop="breedingHouseNum">
            <el-input v-model="FormData.values.breedingHouseNum" />
          </el-form-item>
          <el-form-item label="鸽棚数量" prop="pigeonShedSum">
            <el-input v-model="FormData.values.pigeonShedSum" />
          </el-form-item>
          <el-form-item label="鸽棚行数" prop="pigeonShedRow">
            <el-input v-model="FormData.values.pigeonShedRow" />
          </el-form-item>
          <el-form-item label="鸽棚列数" prop="pigeonShedColume">
            <el-input v-model="FormData.values.pigeonShedColume" />
          </el-form-item>
          <el-form-item label="鸽棚层数" prop="pigeonShedFloorSum">
            <el-input v-model="FormData.values.pigeonShedFloorSum" />
          </el-form-item>
          <el-form-item label="管理员" prop="admin">
            <el-select
              v-model="FormData.values.admin"
              placeholder="选择管理员"
              label-width="50px"
            >
              <el-option v-for="(item, key) in userDropDownData" :key="key" :label="item.name" :value="item.id" />
            </el-select>
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
import { getShedListByBaseIdApi,
	// updateShedByShedIdApi, addShedApi, deleteShedByIdApi,
	getAllBaseApi, getAllShedUserDropDownApi } from '@api/baseInformation/dovecote'
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "breedMana", // 养殖鸽棚管理

  setup() {
	onMounted(() => {
		getData()
		getDropDown()
	})

	const selectBase = ref('选择基地')
	const selectBase2 = ref('选择基地')
	const total = ref(0)
	const baseId = ref('')
	const currentPage = ref(1)
	const pageSize = ref(10)

	// 下拉框数据
	let baseDropDownData = reactive([])
	let baseDropDownData2 = reactive([])
	let userDropDownData = reactive([])

    //表格数据
    let tableList = reactive([]);

    // 表单数据
    let FormData = reactive([]);
    FormData.values = {
      breedingHouseNum: "",
      pigeonShedSum: "",
      pigeonShedRow: "",
      pigeonShedColume: "",
      pigeonShedFloorSum: "",
      admin: "",
    };

	const rules = reactive({
		breedingHouseNum: [
			{
				required: false,
			}
		],
	    pigeonShedSum: [
			{
				required: false,
			}
		],
      pigeonShedRow: [
			{
				required: false,
			}
		],
      pigeonShedColume: [
			{
				required: false,
			}
		],
      pigeonShedFloorSum: [
			{
				required: false,
			}
		],
      admin: [
			{
				required: true,
				message: '必须选择一个管理员',
			}
		],
  	})

    let dialogFormType = "";
    const dialogEditor = ref(false);

	async function getData() {
		var params = {
			baseId: baseId.value,
			pageNum: currentPage.value,
			pageSize: pageSize.value,
		}
		console.log(params)
		let res = await getShedListByBaseIdApi(params)
		console.log(res)
		if (res.code == 200) {
			total.value = Number(res.data.ShedList.total)
			tableList.length = 0
			tableList.push(...res.data.ShedList.records)
		}
	}
	const handleSizeChange = () => {
		getData()
	}
	const handleCurrentChange = () => {
		getData()
	}
	const handleBaseId = (id, name, type) => {
		baseId.value = id
		if (type == 'form') {
			selectBase.value = name
			getData()
		} else {
			selectBase2.value = name
		}
	}

	function showDetail(type, row) {
      console.log("操作按钮触发", row);
      dialogEditor.value = true;
      if (type == "editor") {
        dialogFormType = "editor";
        ElMessage("编辑对话框触发");
      } else {
        dialogFormType = "add";
        ElMessage("添加对话框触发");
      }
    }

    // 管理员添加与删除按钮（还没写）

    function onSubmit() {
      console.log("submit!", FormData.values);

	  if (FormData.values.admin == '') {
		ElMessage({
          type: "error",
          message: "请按需求填写",
        });
	  } else {
		if (dialogFormType == "editor") {
			ElMessage({
			type: "success",
			message: "编辑对话框提交",
			});
		} else {
			ElMessage({
			type: "success",
			message: "添加对话框提交",
			});
		}
		dialogEditor.value = false;
	  }
    }

    function dataDelete(row) {
      console.log("删除按钮触发", row);
      ElMessage("删除按钮触发");
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
        .then(() => {
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    }

	async function getDropDown() {
		let res = await getAllBaseApi()
		baseDropDownData.push(...res.data.breedBaseList)
		baseDropDownData2.push(...res.data.breedBaseList)
		let res2 = await getAllShedUserDropDownApi()
		userDropDownData.push(...res2.data.userList)
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
  width: 550px;
  border: 1px solid rgb(14, 14, 14);
  border-radius: 10px;
}
:deep .el-dialog__body {
  margin: 0 25px 25px;
  padding: 0;
  padding-right: 25px;
  height: 420px;
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
