<template>
	<div>
    <div class="header">
      <el-button @click="showDetail('add')">添加员工</el-button>
      <el-button>选择部门</el-button>
      <el-button>选择场地</el-button>
      <el-button>选择车间/棚</el-button>
    </div>

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
        width="80"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="所属部门"
        prop="departmentBelong"
        width="110"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="所属场地"
        prop="siteBelong"
        width="110"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="所属车间/棚"
        prop="boardBelong"
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
	  <el-table-column
        align="center"
        label="年龄"
        prop="age"
        width="80"
        sortable
      ></el-table-column>
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
        prop="position"
        width="140"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="电话号码"
        prop="telephone"
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

    <el-dialog
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
          <el-form-item label="员工名称" prop="staffName">
            <el-input v-model="FormData.values.staffName" />
          </el-form-item>
          <el-form-item label="生日日期" prop="brithDay">
            <el-date-picker
				v-model="FormData.values.brithDay"
				type="date"
				placeholder="日期选择器"
			/>
          </el-form-item>
		  <el-form-item label="性别" prop="sex">
			<el-radio-group v-model="FormData.values.sex">
				<el-radio label="男" />
				<el-radio label="女" />
			</el-radio-group>
		</el-form-item>
		<el-form-item label="电话号码" prop="telephone">
            <el-input v-model="FormData.values.telephone" />
          </el-form-item>
          <el-form-item label="家乡地址" prop="homeAddr">
            <el-input v-model="FormData.values.homeAddr" rows="5" resize="none" type="textarea"/>
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
              <el-option label="负责人1" value="小红" />
              <el-option label="负责人2" value="小明" />
            </el-select>
          </el-form-item>
		  <el-form-item label="所属单位" prop="unitBelong">
            <el-select v-model="FormData.values.unitBelong" placeholder="选择单位" :disabled="FormData.values.departmentBelong == ''">
              <el-option label="负责人1" value="小红" />
              <el-option label="负责人2" value="小明" />
            </el-select>
          </el-form-item>
		  <el-form-item label="所属车间/棚" prop="boardBelong">
            <el-select v-model="FormData.values.boardBelong" placeholder="选择车间/棚" :disabled="FormData.values.unitBelong == ''">
              <el-option label="负责人1" value="小红" />
              <el-option label="负责人2" value="小明" />
            </el-select>
          </el-form-item>
		  <el-form-item label="职位" prop="position">
            <el-select v-model="FormData.values.position" placeholder="选择职位" :disabled="FormData.values.departmentBelong == ''">
              <el-option label="负责人1" value="小红" />
              <el-option label="负责人2" value="小明" />
            </el-select>
          </el-form-item>
          <el-form-item label="介绍" prop="introduction">
            <el-input v-model="FormData.values.introduction" rows="5" resize="none" type="textarea"/>
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
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

	export default {
		name: 'personnelMana',		// 员工管理

		setup() {
    //表格数据
    let tableList = reactive([]);
    tableList = [
      {
        serialNumber: "1",
        departmentBelong: "养殖部门",
		siteBelong: '丰田基地',
		boardBelong: 'A01棚',
		name: '小明',
		age: '32',
		sex: '男',
		position: '养殖人员',
        telephone: "15760153427",
      },
      {
        serialNumber: "1",
        departmentBelong: "养殖部门",
		siteBelong: '丰田基地',
		boardBelong: 'A01棚',
		name: '小明',
		age: '32',
		sex: '男',
		position: '养殖人员',
        telephone: "15760153427",
      },
      {
        serialNumber: "1",
        departmentBelong: "养殖部门",
		siteBelong: '丰田基地',
		boardBelong: '—',
		name: '小明',
		age: '32',
		sex: '男',
		position: '养殖人员',
        telephone: "15760153427",
      },
      {
        serialNumber: "1",
        departmentBelong: "养殖部门",
		siteBelong: '丰田基地',
		boardBelong: 'A01棚',
		name: '小明',
		age: '32',
		sex: '男',
		position: '养殖人员',
        telephone: "15760153427",
      },
    ];

    // 表单数据
    let FormData = reactive([]);
    FormData.values = {
      staffName: "",
		brithDay: "",
		sex: '',
		homeAddr: '',
		telephone: '',
		departmentBelong: '',
		unitBelong: '',
		boardBelong: '',
		position: '',
		introduction: '',
    };

	const rules = reactive({
		staffName: [
			{
				required: true,
				message: '请输入员工名称',
			}
		],
		brithDay: [
			{
				required: true,
				message: '请输入生日日期',
			}
		],
		sex: [
			{
				required: true,
				message: '请输入性别',
			}
		],
		homeAddr: [
			{
				required: false,
			}
		],
		telephone: [
			{
				required: true,
				message: '请输入电话号码',
			}
		],
		departmentBelong: [
			{
				required: true,
				message: '请输入所属部门',
			}
		],
		unitBelong: [
			{
				required: false,
			}
		],
		boardBelong: [
			{
				required: false,
			}
		],
		position: [
			{
				required: true,
				message: '请输入职位',
			}
		],
		introduction: [
			{
				required: false,
			}
		],
	})

    // 对话框
    let dialogFormType = "";
    const dialogEditor = ref(false);

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

    function onSubmit() {
      console.log("submit!", FormData.values);

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
			if (row.boardBelong != '—') {
				ElMessage({
					type: "error",
					message: "该员工还是在有车间/棚的负责人，无法删除！",
				});
			} else {
				ElMessage({
					type: "success",
					message: "删除成功",
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

    return {
      tableList,
      FormData,
	  rules,
      dialogEditor,
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
  width: 800px;
  border: 1px solid rgb(14, 14, 14);
  border-radius: 10px;
}
:deep .el-dialog__body {
  margin: 20px 0 0;
  padding: 0;
  padding-right: 25px;
  height: 410px;
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
}
/* #endregion */
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

