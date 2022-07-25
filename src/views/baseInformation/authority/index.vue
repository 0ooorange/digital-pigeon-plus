
<template>
  <el-main class="main">
    <div class="tag">
      <el-button type="primary" plain @click="addOutcagedialog = true"
        >添加角色</el-button
      >
    </div>
    <scTable :data="tableData" stripe>
      <el-table-column prop="billNum" label="角色标签" align="center" />
      <el-table-column label="查看操作" align="center">
        <template #default="scope" @click="showOutcagedialog(scope.row)">
          <el-button type="warning" @click="roleRightsDialogVisible = true"> 查看权限</el-button>
        </template>
      </el-table-column>
      <el-table-column label="编辑操作" align="center">
        <template #default="scope">
          <el-button

            type="primary"
            plain
            icon="el-icon-edit"
            @click="visible = true"
            >分配权限</el-button
          >
          <el-button

            type="danger"
            icon="el-icon-delete"
            @click="removeOutcage(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </scTable>

	<!-- 查看权限 -->
	 <!-- 查看权限 -->
    <el-dialog title="角色权限" v-model="roleRightsDialogVisible" width="60%">
      <el-row v-for="(item1, index1) in roleRightsData" :key="index1" :class="index1 === 0 ? ['vcenter', 'btTop', 'btBottom', 'padd'] : ['vcenter', 'btBottom', 'padd']">
        <!-- 渲染一级权限 -->
        <el-col :span="5">
          <el-tag>{{item1.title}}</el-tag>
          <i class="el-icon-caret-right"></i>
        </el-col>
        <!-- 渲染二、三权限 -->
        <el-col :span="19">
          <el-row v-for="(item2, index2) in item1.childPermission" :key="index2" :class="index1 === 0 ? ['vcenter', 'btTop', 'btBottom', 'padd'] : ['vcenter', 'btBottom', 'padd']">
            <!-- 渲染二级权限 -->
            <el-col :span="5" class="bdHeight vcenter">
              <el-tag type="success">{{item2.title}}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <span class="dialog-footer">
        <el-button type="primary" @click="roleRightsDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限开始 -->
    <el-drawer v-model="visible" :show-close="false">
      <template #header="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">分配权限窗口</h4>
        <el-button size="mini" type="primary" icon="el-icon-delete"
          >分配权限</el-button
        >
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </template>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[1,2]"
        :default-checked-keys="[5]"
        :props="defaultProps"
      />
    </el-drawer>
    <!-- 分配权限结束 -->

  </el-main>
</template>

<script>
import scTable from "@/components/scTable/index.vue";
import { onMounted, reactive, toRefs } from "vue";
import { getAllAuthorityApi } from "@/api/model/baseInformation/authority";

export default {
  name: "authority", // 权限管理
  components: {
    scTable,
  },
  setup() {
    onMounted(() => {
      authority_methods.getAllAuthority();
    });
    const showPage_state = reactive({
      tableData: [
        {
          date: "111",
          dovecoteNumber: "111",
          number: "assda",
          billNum: "12341",
          batchNum: "asdas",
        },
      ],
      visible: false,
    });
    const showPage_methods = {};
    const authority_state = reactive({

		//   查看权限
		roleRightsDialogVisible:false,
		roleRightsData:[
			{
				title:"系统权限",
				childPermission:[
					{title:"可视化界面"},
					{title:"养殖系统"},
					{title:"加工销售"},
					{title:"屠宰系统"},

				]
			}
		],
      // 获取所有权限
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
    });
    const authority_methods = {
	//   查看权限
      // 获取所有权限
      async getAllAuthority() {
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


      },


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
