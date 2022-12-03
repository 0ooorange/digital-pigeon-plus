<template>
  <div>
    <div class="header">
      <el-button @click="showDetail('add')">添加基地</el-button>
      <el-button>选择部门</el-button>
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
        prop="principal"
        width="90"
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
        label="车间/棚数量"
        prop="boardNumber"
        width="140"
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
            <el-button
              type="danger"
              plain
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
      <div class="baseInfo">
        <el-form :model="FormData.values" label-width="120px" :rules="rules">
          <el-form-item label="基地名称" prop="baseName">
            <el-input v-model="FormData.values.baseName" />
          </el-form-item>
          <el-form-item label="所属部门" prop="departmentName">
            <el-select
              v-model="FormData.values.departmentName"
              placeholder="选择部门"
              disabled
            >
              <el-option label="部门1" value="shanghai" />
              <el-option label="部门2" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" prop="principal">
            <el-select
              v-model="FormData.values.principal"
              placeholder="选择负责人"
            >
              <el-option label="负责人1" value="小红" />
              <el-option label="负责人2" value="小明" />
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
              <el-option label="负责人1" value="小红" />
              <el-option label="负责人2" value="小明" />
            </el-select>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-select v-model="FormData.values.city" placeholder="选择城市">
              <el-option label="负责人1" value="小红" />
              <el-option label="负责人2" value="小明" />
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="detailAddr">
            <el-input
              v-model="FormData.values.detailAddr"
              type="textarea"
              rows="5"
              resize="none"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="otherInfo">
        <div class="baseIntro">
          <el-form label-position="top" :rules="rules">
            <el-form-item label="基地简介" prop="baseIntro">
              <el-input
                v-model="FormData.values.baseIntro"
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
                  <el-button
                    type="primary"
                    plain
                    @click="onSubmit"
                    >确认</el-button
                  >
                  <el-button
                    @click="dialogEditor = false"
                    >取消</el-button
                  >
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
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import SCMap from "@/components/scMap";

export default {
  name: "baseMana", // 基地管理

  components: { SCMap },

  setup() {
    //表格数据
    let tableList = reactive([]);
    tableList = [
      {
        serialNumber: "1",
        departmentName: "养殖部门",
        baseName: "本田基地",
        principal: "小明",
        telephone: "15760153427",
        boardNumber: "15",
        staffNumber: "15",
        scale: "30万只",
        area: "6000",
      },
      {
        serialNumber: "2",
        departmentName: "养殖部门",
        baseName: "丰田基地",
        principal: "小李",
        telephone: "15453754427",
        boardNumber: "14",
        staffNumber: "14",
        scale: "20万只",
        area: "5000",
      },
      {
        serialNumber: "3",
        departmentName: "屠宰部门",
        baseName: "牛牛基地",
        principal: "小红",
        telephone: "16033154427",
        boardNumber: "0",
        staffNumber: "10",
        scale: "10万只",
        area: "3000",
      },
      {
        serialNumber: "4",
        departmentName: "加工部门",
        baseName: "大田基地",
        principal: "小全",
        telephone: "17015374234",
        boardNumber: "2",
        staffNumber: "8",
        scale: "5万只",
        area: "300",
      },
    ];

    // 表单数据
    let FormData = reactive([]);
    FormData.values = {
      baseName: "",
      departmentName: "",
      principal: "",
      scale: "",
      area: "",
      province: "",
      city: "",
      detailAddr: "",
      baseIntro: "",
      longitude: "",
      latitude: "",
    };

    const rules = reactive({
      baseName: [
        {
          required: true,
          message: "请输入基地名称",
        },
      ],
      departmentName: [
        {
          required: false,
        },
      ],
      principal: [
        {
          required: true,
          message: "请输入负责人",
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
        },
      ],
      province: [
        {
          required: true,
          message: "请输入省份",
        },
      ],
      city: [
        {
          required: true,
          message: "请输入城市",
        },
      ],
      detailAddr: [
        {
          required: true,
          message: "请输入详细地址",
        },
      ],
      baseIntro: [
        {
          required: false,
        },
      ],
      longitude: [
        {
          required: true,
          message: "请输入经度",
        },
      ],
      latitude: [
        {
          required: true,
          message: "请输入纬度",
        },
      ],
    });

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
          if (row.boardNumber > 0) {
            ElMessage({
              type: "error",
              message: "提示：该基地下还存在有车间/棚，无法删除！",
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

    function onSubmit() {
      console.log("submit!", FormData.values);

      if (
        FormData.values.baseName != "" &&
        FormData.values.principal != "" &&
        FormData.values.area != "" &&
        FormData.values.province != "" &&
        FormData.values.city != "" &&
        FormData.values.detailAddr != "" &&
        FormData.values.longitude != "" &&
        FormData.values.latitude != ""
      ) {
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
      } else {
        ElMessage({
          type: "error",
          message: "请按需求填写",
        });
      }
    }

    return {
      tableList,
      FormData,
      rules,
      dialogEditor,
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
  padding-top: 10px;
  width: 370px;
}
.otherInfo {
  float: right;
  padding: 0 20px;
  width: 650px;
  height: 500px;
  border-left: 2px solid rgb(138, 138, 138);

  .baseIntro {
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
