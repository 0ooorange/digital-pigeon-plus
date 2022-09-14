
<template>
  <el-main class="main">
    <!-- <div class="tag">
      <el-button type="primary" plain @click="addOutcagedialog = true"
        >添加角色</el-button
      >
    </div> -->
    <scTable :data="tableData" stripe :hidePagination="true">
      <el-table-column prop="roleName" label="角色标签" align="center" />
      <el-table-column label="查看操作" align="center">
        <template #default="scope">
          <el-button type="warning" @click="watchAuthority(scope.row.id)">
            查看权限</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="编辑操作" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            @click="getAllAuthority(scope.row.id)"
            >分配权限</el-button
          >
          <!-- <el-button
            type="danger"
            icon="el-icon-delete"
            @click="removeOutcage(scope.row.id)"
            >删除</el-button
          > -->
        </template>
      </el-table-column>
    </scTable>

    <!-- 查看权限 -->
    <!-- 查看权限 -->
    <el-dialog title="角色权限" v-model="roleRightsDialogVisible" width="60%">
      <el-row
        v-for="(item1, index1) in roleRightsData"
        :key="index1"
        :class="
          index1 === 0
            ? ['vcenter', 'btTop', 'btBottom', 'padd']
            : ['vcenter', 'btBottom', 'padd']
        "
      >
        <!-- 渲染一级权限 -->
        <el-col :span="5">
          <el-tag>{{ item1.title }}</el-tag>
          <i class="el-icon-caret-right"></i>
        </el-col>
        <!-- 渲染二 权限 -->
        <el-col :span="19">
          <el-row
            v-for="(item2, index2) in item1.childPermission"
            :key="index2"
            :class="
              index1 === 0
                ? ['vcenter', 'btTop', 'btBottom', 'padd']
                : ['vcenter', 'btBottom', 'padd']
            "
          >
            <!-- 渲染二级权限 -->
            <el-col :span="5" class="bdHeight vcenter">
              <el-tag type="success">{{ item2.title }}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <span class="dialog-footer">
        <el-button type="primary" @click="roleRightsDialogVisible = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
    <!-- 分配权限开始 -->
    <el-drawer v-model="visible" :show-close="false">
      <template #header="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">分配权限窗口</h4>
        <el-button
          size="mini"
          type="success"
          icon="el-icon-delete"
          @click="distributeAuthority"
          >分配权限</el-button
        >
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          关闭
        </el-button>
      </template>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[1, 2]"
        :default-checked-keys="curNodes"
        :props="defaultProps"
        @getCheckedNodes="getCurNodes"
        @check="currentChecked"
      />
    </el-drawer>
    <!-- 分配权限结束 -->
  </el-main>
</template>

<script>
import scTable from "@/components/scTable/index.vue";
import { onMounted, reactive, toRefs } from "vue";
import { ElMessage } from "element-plus";
import {
  getAllAuthorityApi,
  getAllRole,
  getRoleById,
  affiropDistribution,
} from "@/api/model/baseInformation/authority";

export default {
  name: "authority", // 权限管理
  components: {
    scTable,
  },
  setup() {
    onMounted(() => {
    //   authority_methods.getAllAuthority();
      showPage_methods.getAllRole();
    });
    const showPage_state = reactive({
      tableData: [],
      visible: false,
    });
    const showPage_methods = {
      async getAllRole() {
        const res = await getAllRole.get();
        showPage_state.tableData = res.data.roleList;
        // console.log(res);
      },
    };
    const authority_state = reactive({
      //   查看权限
      roleRightsDialogVisible: false,
      roleRightsData: [
        {
          title: "系统权限",
          childPermission: [
          ],
        },
		// {
        //   title: "基础信息管理",
        //   childPermission: [
        //     { title: "鸽棚管理" },
        //   ],
        // },

      ],
      // 分配权限
      defaultProps: { children: "children", label: "label" },
      data: [
        {
          id: 1,
          label: "系统权限",
          children: [],
        },
        {
          id: 2,
          label: "基础信息管理",
          children: [],
        },
      ],
	//   当前显示的勾选的结点
	//   curNodes:['1543790819843096578','1543791029071757314']
	curNodes:[],

	curId:'',	//分配权限时的id
	allCheckNodes:[]
    });
    const authority_methods = {
      //   查看权限
	 async watchAuthority(id){
		const res = await getRoleById.get(id)
		// console.log(res);

		let data = res.data.permission[0]
		authority_state.roleRightsData[0].childPermission = []
		data.forEach(item => {
			authority_state.roleRightsData[0].childPermission.push({'title':item.subPermission})

			// console.log(authority_state.roleRightsData[0].childPermission,"这是测试");
		});
		authority_state.roleRightsDialogVisible = true
	  },
    //   分配权限
      async getAllAuthority(id) {
		authority_state.curId = id
		// 获取和展示所有结点
        const res = await getAllAuthorityApi.get();
        const systemArr = res.data.permissionList[0];
        // 系统权限赋值
        const tempArr1 = [];
        const tempArr2 = [];
        for (let i = 0; i < systemArr.length; i++) {
          tempArr1.push(systemArr[i].id);
          tempArr2.push(systemArr[i].subPermission);
        }
        // console.log(tempArr1,'tempArr1');
        if (authority_state.data[0].children.length == 0) {
          tempArr1.map((item, index) => {
            authority_state.data[0].children.push(
              Object.assign({}, { id: tempArr1[index], label: tempArr2[index] })
            );
          });
        }
        // 基础信息权限赋值
        const tempArr3 = [];
        const tempArr4 = [];
        const systemArr1 = res.data.permissionList[1];
        for (let i = 0; i < systemArr1.length; i++) {
          tempArr3.push(systemArr1[i].id);
          tempArr4.push(systemArr1[i].subPermission);
        }
        if (authority_state.data[1].children.length == 0) {
          systemArr1.map((item, index) => {
            authority_state.data[1].children.push(
              Object.assign({}, { id: tempArr3[index], label: tempArr4[index] })
            );
          });
        }
		// 获取和展示当前结点
		const res1 = await getRoleById.get(id)
		let temp1 = res1.data.permission[0]
		authority_state.curNodes=[]
		temp1.forEach(item1 => {
			authority_state.curNodes.push(item1.id)

			// console.log(authority_state.roleRightsData[0].childPermission,"这是测试");
		});
		showPage_state.visible = true
      },
	//   确认分配权限
	  async distributeAuthority(){
		// authority_state.allCheckNodes 权限列表
		//authority_state.curId		当前id
		const id = authority_state.curId
		const authorityArr = authority_state.allCheckNodes
		console.log(id,authorityArr);
		const res = await affiropDistribution.post(id,authorityArr)
		console.log(res);
		if(res.code === 200) {
          ElMessage.success("分配权限成功！");

          showPage_state.visible = false
        } else {
          ElMessage.error("分配权限出错，请稍后重试！");
          showPage_state.visible = false
        }

	  },
	  getCurNodes(){
		// console.log(111111);
	  },
	//   param：当前结点。paramArr：包含了所有结点
	  currentChecked(param,paramArr){

		authority_state.allCheckNodes = paramArr.checkedKeys
		// console.log(authority_state.allCheckNodes);

		// console.log(param);
		// console.log(paramArr);

	  }
    };
    return {
      ...toRefs(showPage_state),
      ...showPage_methods,
      ...toRefs(authority_state),
      ...authority_methods,
    };
  },
};
</script>

<style scoped>
.tag {
  /* display: flex; */
  margin-bottom: 20px;
  padding: 0 15px;
}
/* 查看权限样式 */
.vcenter {
  display: flex;
  align-items: center;
}

.btTop {
  border-top: 1px dashed #ccc;
}
.btBottom {
  border-bottom: 1px dashed #ccc;
}

.padd {
  padding: 20px 0;
}

/* /deep/ .el-drawer__body {
  overflow: auto !important;
} */

.drawerBtn {
  margin: 40px 20px;
  display: flex;
  justify-content: flex-end;
}

.addRoleBtn {
  display: flex;
  justify-content: flex-start;
}
</style>
