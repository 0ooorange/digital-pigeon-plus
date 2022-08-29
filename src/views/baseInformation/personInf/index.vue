<template>
  <el-card class="box-card">
    <div class="text item">
      <img :src="userInfo.avatar" alt="" class="img_avatar" />
    </div>
    <div class="text item"><span>姓名 :</span>{{ userInfo.name }}</div>
    <div class="text item"><span>手机号码 :</span>{{ userInfo.phone }}</div>
    <el-button type="danger"  @click="passwordDialogVisible = true">修改密码</el-button>
	<el-button type="warning" @click="dialogVisible = true">编辑信息</el-button>
  </el-card>
  <!-- 修改个人信息 -->
  <el-dialog
    v-model="dialogVisible"
    title="修改个人信息"
    width="30%"
    :before-close="handleClose"
  >
    <el-descriptions :column="1" border :model="editInfo">
      <el-descriptions-item label="姓名">
        <el-input v-model="editInfo.name" placeholder="请输入" />
      </el-descriptions-item>
      <el-descriptions-item label="手机号码">
        <el-input v-model="editInfo.phone" placeholder="请输入" />
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editInfoFun">确认</el-button>
      </span>
    </template>
  </el-dialog>
<!-- 修改密码 -->
  <el-dialog
    v-model="passwordDialogVisible"
    title="修改密码"
    width="30%"
    :before-close="passwordHandleClose"
  >
    <el-descriptions :column="1" border >
      <el-descriptions-item label="新密码">
        <el-input v-model="newPassword" placeholder="请输入" />
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="passwordDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editPassword">确认</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>

import { onMounted, reactive, toRefs } from "vue";
import {
  getUserInfoApi,
  updateUserInfoApi,
  updatePasswordApi,
} from "@/api/model/baseInformation/personInfo";
import { ElMessage } from "element-plus";
export default {
  name: "personInf", // 个人信息管理
  setup() {
    onMounted(() => {
      showPage_methods.showPage();
    });
    const showPage_state = reactive({
      userInfo: {},
      //编辑信息
      editInfo: {},
      dialogVisible: false,
	//   修改密码
	passwordDialogVisible:false,
		newPassword:'',
    });
    const showPage_methods = {
      async showPage() {
        const res = await getUserInfoApi.get();
        showPage_state.userInfo = res.data.userInfo;
        showPage_state.editInfo = res.data.userInfo;
      },
      //编辑个人信息
      async editInfoFun() {
        // console.log(showPage_state.editInfo);
        const res = await updateUserInfoApi.post(showPage_state.editInfo);
        // console.log("asdasd",res);
        if (res.code === 200) {
          ElMessage.success("编辑成功！");
          showPage_methods.showPage();
        } else {
          ElMessage.error("编辑失败，请稍后重试");
        }
        showPage_state.dialogVisible = false;
      },
	  async editPassword(){
		const newPassword = showPage_state.newPassword

		if(newPassword ==''){
			ElMessage.error("密码不能为空");
			return
		}
		// 调用接口修改密码
		const res = await updatePasswordApi.post(newPassword);
		// console.log(res);
		 if (res.code === 200) {
          ElMessage.success("修改成功！");
          showPage_methods.showPage();
		showPage_state.passwordDialogVisible = false;
        } else {
          ElMessage.error("编辑失败，请稍后重试");
		showPage_state.passwordDialogVisible = false;
        }

	  },
	  openPasswordDialog(){
		showPage_state.newPassword = ''
		showPage_state.passwordDialogVisible = true

	  },
      // 确定关闭弹窗
      handleClose() {
        showPage_state.dialogVisible = false;
      },
	  passwordHandleClose(){
		showPage_state.passwordDialogVisible = false;

	  },
    };
    return {
      ...toRefs(showPage_state),
      ...showPage_methods,
    };
  },
};
</script>

<style scoped>
.text {
  font-size: 20px;
}

.item {
  padding: 18px 0;
}

.box-card {
  margin: 0 auto;
  width: 800px;
}
.img_avatar {
  width: 150px;
  height: 150px;
  border: 1px solid black;
  border-radius: 100px;
  overflow: hidden;
}
.img_avatar img {
  width: 100%;
  height: 100%;
}
</style>
