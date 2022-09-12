<template>
  <div class="main">
    <div class="tag">
      <el-button type="primary" plain @click="addInfoDig()">添加员工</el-button>
    </div>
    <scTable :data="tableData" stripe  >
      <el-table-column prop="name" label="员工姓名" align="center" />
      <el-table-column prop="phone" label="手机号码" sortable align="center" />
      <el-table-column prop="code" label="管理鸽棚" align="center" />
      <!-- 报错未处理，头像不能正常显示 -->
      <!-- <el-table-column
        label="头像"
        width="80"
      >
        <template #default="scope">
          <img :src="scope.row.avatar" alt="" class="img_avatar" />
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="240" align="center">
        <template v-slot="scope">
          <el-button
            size="small"
            type="primary"
            plain
            icon="el-icon-edit"
            @click="editInfoBtn(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="removeUesr(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </scTable>
    <!-- 编辑信息 -->
    <el-dialog
      v-model="dialogVisible"
      title="修改员工信息"
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

    <!-- 添加员工窗口 -->
    <el-dialog
      v-model="addVisible"
      title="新增员工"
      width="30%"
      :before-close="addHandleClose"
    >
      <el-descriptions :column="1" border :model="addInfo">
        <el-descriptions-item label="姓名">
          <el-input v-model="addInfo.name" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="手机号码">
          <el-input v-model="addInfo.phone" placeholder="请输入" />
        </el-descriptions-item>
		<el-descriptions-item label="用户密码">
          <el-input v-model="addInfo.passwd" placeholder="请输入" />
        </el-descriptions-item>
        <!-- <el-descriptions-item label="密码">
          <el-input v-model="addInfo.passwd" placeholder="请输入" />
        </el-descriptions-item> -->
        <el-descriptions-item label="选择角色">
          <el-select
            v-model="addInfo.roleId"
            class="m-2"
            placeholder="请选择"
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            />
          </el-select>
          <!-- <el-input v-model="addInfo.roleId" placeholder="请输入" /> -->
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addVisible = false">取消</el-button>
          <el-button type="primary" @click="addInfoFun">确认</el-button>
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
  getUserInfoApi,
  deleteUser,
  getEditInfo,
  updateEditInfo,
  getAllRole,
  addEmployeeApi
} from "@/api/model/baseInformation/employee";
export default {
  name: "employee", // 员工管理
  components: {
    scTable,
  },
  setup() {
    onMounted(() => {
      showPage_methods.showPage();
    });
    const showPage_state = reactive({
      tableData: [],
      //分页数据
      page: {
        current: 1,
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
    });
    const showPage_methods = {
      async showPage() {
        const res = await getUserInfoApi.get(showPage_state.page);
		showPage_state.tableData = res.data.userList
		const userObj = res.data.userList
        const codeArr = [];
        for (let i = 0; i < userObj.length; i++) {
          if (userObj[i].shedList.length === 0){
			codeArr.push("未分配");
		  }
          else {
			let str = ""
			for (const codeobj of userObj[i].shedList) {
				if(str.length==0){
					str = str +codeobj.code
				}else{
					str +=`,${codeobj.code}`
				}
			}
			codeArr.push(str)
          }
        }
		// 添加属性
		for(let i=0;i<showPage_state.tableData.length;i++){
			showPage_state.tableData[i].code = codeArr[i]
		}
        // codeArr.map((item, index) => {
        //   showPage_state.tableData.push(
        //     Object.assign({},{ code: codeArr[index] })
        //   );
        // });
		console.log("鸽棚手机号",showPage_state.tableData);

      },
    };
    const editInfo_state = reactive({
      dialogVisible: false,
      editInfo: {},
      roleOptions: [],
      roleValue: "",
    });
    const editInfo_methods = {
      async editInfoBtn(id) {
        // console.log("sadasda",data);
        // 获取编辑前的信息
        const res = await getEditInfo.get(id);
        editInfo_state.editInfo = res.data.user;

        editInfo_state.dialogVisible = true;
      },
      async editInfoFun() {
        const res = await updateEditInfo.post(editInfo_state.editInfo);
        // console.log(res);
        if (res.code === 200) {
          ElMessage.success("修改信息成功！");
          showPage_methods.showPage();
          editInfo_state.dialogVisible = false;
        } else {
          ElMessage.error("修改出错，请稍后重试！");
          editInfo_state.dialogVisible = false;
        }
      },

      // 确定关闭弹窗
      handleClose() {
        editInfo_state.dialogVisible = false;
      },
    };

    const delete_state = reactive({
      addInfo: {},
    });
    const delete_methods = {
      async removeUesr(id) {
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
        }
        const res = await deleteUser.get(id);
		console.log(res);
        if (res.code === 200) {
          ElMessage.success("删除成功！");
          showPage_methods.showPage();
        } else {
          ElMessage.error(res.message);
        }
      },
    };

    const add_state = reactive({
      addVisible: false,
      addInfo: {},
    });
    const add_methods = {
     async addInfoDig() {
        // 获取所有角色
        const roleData = await getAllRole.get();
        // console.log(role);
        editInfo_state.roleOptions = roleData.data.roleList;
        add_state.addVisible = true;
      },
    // 确认按钮
     async addInfoFun() {
		// let json = JSON.stringify(add_state.addInfo)
		const res =  await addEmployeeApi.post(add_state.addInfo)
		if (res.code === 200) {
          ElMessage.success("添加员工成功");
          showPage_methods.showPage();
        } else {
          ElMessage.error("新增员工出错，请稍后重试！");
        }
        add_state.addVisible = false;
      },
	  addHandleClose() {
        add_state.addVisible = false;
      },
    };
    return {
      ...toRefs(showPage_state),
      ...showPage_methods,
      ...toRefs(editInfo_state),
      ...editInfo_methods,
      ...toRefs(delete_state),
      ...delete_methods,
      ...toRefs(add_state),
      ...add_methods,
    };
  },
};
</script>

<style scoped>
.tag {
  display: flex;
  padding: 10px 15px;
  /* margin-bottom: 0 10px; */
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
