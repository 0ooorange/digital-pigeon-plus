<template>
  <div>
    <div class="header">
      <el-button @click="showDetail('add')">添加鸽棚</el-button>
      <el-button>选择基地</el-button>
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
        label="所属基地"
        prop="baseBelong"
        width="110"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="鸽棚编号"
        prop="pigeonShedNum"
        width="110"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="鸽笼数量"
        prop="pigeonShedSum"
        width="120"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="管理人员"
        prop="admin"
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

      <el-table-column
        align="center"
        label="行数"
        prop="row"
        width="120"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="列数"
        prop="colume"
        width="100"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="层数"
        prop="floorSum"
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

    <el-dialog
      v-model="dialogEditor"
      :show-close="false"
      center
      class="dialogEditor"
    >
      <div class="dialogTitle">
		修改鸽棚信息
		<el-button>选择基地</el-button>
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
              <el-option label="小明" value="shanghai" />
              <el-option label="小王" value="beijing" />
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
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "breedMana", // 养殖鸽棚管理

  setup() {
    //表格数据
    let tableList = reactive([]);
    tableList = [
      {
        serialNumber: "1",
        baseBelong: "本田养殖基地",
        pigeonShedNum: "A01",
        pigeonShedSum: "2208",
        admin: "小明、小周",
        telephone: "15760153427",
        row: "8",
        colume: "92",
        floorSum: "3",
      },
      {
        serialNumber: "1",
        baseBelong: "本田养殖基地",
        pigeonShedNum: "A01",
        pigeonShedSum: "2208",
        admin: "小明、小周",
        telephone: "15760153427",
        row: "8",
        colume: "92",
        floorSum: "3",
      },
      {
        serialNumber: "1",
        baseBelong: "本田养殖基地",
        pigeonShedNum: "A01",
        pigeonShedSum: "2208",
        admin: "小明、小周",
        telephone: "15760153427",
        row: "8",
        colume: "92",
        floorSum: "3",
      },
      {
        serialNumber: "1",
        baseBelong: "本田养殖基地",
        pigeonShedNum: "A01",
        pigeonShedSum: "2208",
        admin: "小明、小周",
        telephone: "15760153427",
        row: "8",
        colume: "92",
        floorSum: "3",
      },
    ];

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
  margin-bottom: 10px;
  padding-left: 30px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  font-weight: 600;
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
