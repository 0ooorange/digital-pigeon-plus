<template>
  <div>
    <div class="personalInfo">
      <!-- 个人信息编辑（左边） -->
      <div class="personalInfo-edit">
        <!-- 图片 -->
        <div class="personalInfo-edit-img">
          <img :src="personalData.values.avatar" alt="" width="120"/>
        </div>
        <span>{{ personalData.values.name }}</span>
        <!-- 操作按钮 -->
        <div class="personalInfo-edit-btn">
          <el-button plain type="primary" @click="dialog_info"
            >编辑信息</el-button
          >
          <el-button plain type="danger" @click="dialogEditor2 = true"
            >修改密码</el-button
          >
        </div>
      </div>
      <!-- 个人信息详情 -->
      <div class="personalInfo-detail">
        <span class="personalInfo-detail-title">个人信息</span>
        <ul>
          <li>电话号码：{{ personalData.values.phone }}</li>
          <li>所在单位：{{ personalData.values.position }}</li>
          <li>职位：{{ personalData.values.roleName }}</li>
          <li>故乡：{{ personalData.values.address }}</li>
          <li>生日：{{ personalData.values.birth }}</li>
          <li>
            <span class="intro-title">介绍：</span>
            <div class="intro-box">{{ personalData.values.introduce }}</div>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog
      v-model="dialogEditor"
      :show-close="false"
      center
      class="dialogEditor"
    >
      <div class="baseInfo">
        <el-form :model="FormData.values" label-width="120px" :rules="rules">
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="FormData.values.phone" />
          </el-form-item>
          <el-form-item label="故乡" prop="address">
            <el-input v-model="FormData.values.address" />
          </el-form-item>
          <el-form-item label="生日" prop="birth">
            <el-date-picker
              v-model="FormData.values.birth"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="介绍" prop="introduce">
            <el-input
              v-model="FormData.values.introduce"
              type="textarea"
              rows="5"
              resize="none"
            />
          </el-form-item>
          <el-form-item>
            <div class="control-btn">
              <el-button type="primary" plain @click="onSubmit_editorInfo"
                >确认</el-button
              >
              <el-button @click="dialogEditor = false">取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog
      v-model="dialogEditor2"
      :show-close="false"
      center
      class="dialogEditor-2"
    >
      <div class="baseInfo">
        <el-form :model="FormData2.values" label-width="120px" :rules="rules2">
          <el-form-item label="密码" prop="password">
            <el-input v-model="FormData2.values.password" type="password" />
          </el-form-item>
          <el-form-item label="再次输入密码" prop="password2">
            <el-input v-model="FormData2.values.password2" type="password" />
          </el-form-item>
          <el-form-item>
            <div class="control-btn">
              <el-button type="primary" plain @click="onSubmit_editorPasswd"
                >确认</el-button
              >
              <el-button @click="dialogEditor2 = false">取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPersonalInfoApi,
  editorPersonalInfoApi,
  editorUserPasswordApi,
} from "@api/baseInformation/personInfo";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";

export default {
  name: "personalInfo", // 个人信息

  setup() {
    onMounted(() => {
      getPersonalInfo_fn();
    });

    let personalData = reactive([]);

    const dialogEditor = ref(false);
    const dialogEditor2 = ref(false);

    let FormData = reactive([]);
    FormData.values = {
      phone: "",
      address: "",
      birth: "",
      introduce: "",
    };
    let FormData2 = reactive([]);
    FormData2.values = {
      password: "",
      password2: "",
    };

    const rules = reactive({
      phone: [
        {
          required: false,
        },
      ],
      address: [
        {
          required: false,
        },
      ],
      birth: [
        {
          required: false,
        },
      ],
      introduce: [
        {
          required: false,
        },
      ],
    });

    const rules2 = reactive({
      password: [
        {
          required: true,
          message: "请输入密码",
        },
      ],
      password2: [
        {
          required: true,
          message: "请再次输入密码",
        },
      ],
    });

    const getPersonalInfo_fn = async function () {
      let res = await getPersonalInfoApi();
      console.log(res);
      if (res.code == 200) {
        personalData.values = res.data.user;
        personalData.values.birth = personalData.values.birth.split(" ")[0];
      }
    };

    function dialog_info() {
      FormData.values.phone = personalData.values.phone;
      FormData.values.address = personalData.values.address;
      FormData.values.birth = personalData.values.birth;
      FormData.values.introduce = personalData.values.introduce;
      dialogEditor.value = true;
    }

    const onSubmit_editorInfo = async function () {
      let res = await editorPersonalInfoApi(FormData.values);
      if (res.code == 200) {
        getPersonalInfo_fn();
        dialogEditor.value = false;
        ElMessage({
          type: "success",
          message: "修改成功！",
        });
      }
    };

    const onSubmit_editorPasswd = async function () {
      if (FormData2.values.password != FormData2.values.password2) {
        ElMessage({
          type: "error",
          message: "两次密码不一致！",
        });
      } else if (
        FormData2.values.password == "" ||
        FormData2.values.password2 == ""
      ) {
        ElMessage({
          type: "error",
          message: "请按需填写！",
        });
      } else {
        let res = await editorUserPasswordApi(FormData2.values.password);
        console.log(res);
        if (res.code == 200) {
          dialogEditor2.value = false;
          ElMessage({
            type: "success",
            message: "修改成功！",
          });
        }
      }
    };

    return {
      personalData,
      FormData,
      FormData2,
      dialogEditor,
      dialogEditor2,
      rules,
      rules2,
      dialog_info,
      onSubmit_editorInfo,
      onSubmit_editorPasswd,
    };
  },
};
</script>

<style scoped>
/* 整体布局 */
.personalInfo {
  margin: 50px auto;
  width: 750px;
  height: 430px;
  background-color: #e9e9eb;
  border-radius: 15px;
  border: 2px solid #c8c9cc;
}
.personalInfo-edit {
  float: left;
  text-align: center;
  width: 280px;
  height: 100%;
}
.personalInfo-detail {
  float: right;
  margin: 5% 0;
  width: 460px;
  height: 85%;
  border-left: 2px solid #c8c9cc;
}
/* 左箱子（图片+按钮）样式 */
/* #region */
.personalInfo-edit-img {
  display: block;
  margin: 60px 80px 0;
  width: 120px;
  height: 120px;
  background-color: white;
}
.personalInfo-edit-btn {
  margin: 30px;
}
.personalInfo-edit-btn .el-button {
  display: block;
  margin: 0 auto 20px;
  width: 120px;
  height: 40px;
  font-size: 20px;
}
.personalInfo-edit span {
  display: block;
  height: 50px;
  line-height: 50px;
  font-size: 28px;
  font-weight: 600;
}
/* #endregion */
/* 右盒子（详情）样式 */
/* #region */
li {
  padding: 0 20px 15px;
  font-size: 20px;
  list-style: none;
}
.personalInfo-detail .personalInfo-detail-title {
  display: block;
  margin-bottom: 30px;
  padding-left: 30px;
  font-size: 21px;
  font-weight: 600;
}
.intro-title {
  float: left;
}
.intro-box {
  float: left;
  padding: 0 10px;
  width: 320px;
  height: 70px;
  background-color: #faecd8;
  border: 2px solid #f3d19e;
  border-radius: 5px;
}
/* #endregion */
/* 弹出框样式 */
/* #region */
:deep .dialogEditor {
  width: 480px;
  height: 400px;
  border: 1px solid rgb(14, 14, 14);
  border-radius: 10px;
}
:deep .dialogEditor-2 {
  width: 450px;
  height: 230px;
  border: 1px solid rgb(14, 14, 14);
  border-radius: 10px;
}
:deep .el-dialog__body {
  margin: 15px 0 0 20px;
  padding: 0;
}
.baseInfo {
  float: left;
  padding-top: 10px;
  width: 370px;
}
.control-btn {
  margin: 0 auto;
  margin-left: 30%;
  width: 100%;
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
</style>
