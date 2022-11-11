
<template>
  <div class="main">
    <div class="tag">
      <el-button type="primary" plain @click="addBaseFun">添加基地</el-button>
    </div>
    <!-- 主体表格 -->
    <scTable :data="tableData" stripe :hidePagination='true'>
      <el-table-column prop="name" label="基地名称" align="center" />
      <el-table-column prop="latitude" label="纬度" align="center" />
      <el-table-column prop="longitude" label="经度" sortable align="center" />
      <el-table-column
        prop="introduction"
        label="基地介绍"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column prop="area" label="面积(㎡)" align="center" />
      <el-table-column prop="province" label="省份" align="center" />
      <el-table-column prop="city" label="城市" align="center" />
      <el-table-column prop="detailedAddress" label="详细地址" align="center" />
      <el-table-column prop="code" label="编码" align="center" />
      <el-table-column label="操作" width="220" align="center">
        <template v-slot="scope">
          <el-button
            size="small"
            type="primary"
            plain
            icon="el-icon-edit"
            @click="updateForm(scope.row.id)"
            >编辑</el-button
          >
          <!-- <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="tableDelete(scope.row)"
            >删除</el-button
          > -->
        </template>
      </el-table-column>
    </scTable>

    <!-- 编辑信息 -->
    <el-dialog
      v-model="editVisible"
      title="修改基地信息"
      width="30%"
      :before-close="editHandleClose"
    >
      <el-descriptions :column="1" border :model="editInfo">
        <el-descriptions-item label="基地名称">
          <el-input v-model="editInfo.name" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="基地编码">
          <el-input v-model="editInfo.code" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="基地介绍">
          <el-input v-model="editInfo.introduction" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="基地面积">
          <el-input v-model="editInfo.area" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="省份">
          <el-input v-model="editInfo.province" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="城市">
          <el-input v-model="editInfo.city" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="详细地址">
          <el-input v-model="editInfo.detailedAddress" placeholder="请输入" />
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button type="primary" @click="editInfoFun">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 添加鸽棚 -->
    <el-dialog
      v-model="addVisible"
      title="新增基地"
      width="30%"
      :before-close="addBaseClose"
    >
      <el-descriptions :column="1" border :model="addBaseInfo">
        <el-descriptions-item label="基地名称">
          <el-input v-model="addBaseInfo.name" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="基地编码">
          <el-input v-model="addBaseInfo.code" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="基地介绍">
          <el-input v-model="addBaseInfo.introduction" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="基地面积">
          <el-input v-model="addBaseInfo.area" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="省份">
          <el-input v-model="addBaseInfo.province" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="城市">
          <el-input v-model="addBaseInfo.city" placeholder="请输入" />
        </el-descriptions-item>
        <el-descriptions-item label="详细地址">
          <el-input
            v-model="addBaseInfo.detailedAddress"
            placeholder="请输入"
          />
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addVisible = false">取消</el-button>
          <el-button type="primary" @click="addConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import scTable from "@/components/scTable/index.vue";
import { onMounted, reactive, toRefs } from "vue";
import {
  getBaseInfoApi,
  getBaseById,
  editBaseInfo,
  addBaseInfo,
} from "@/api/model/baseInformation/baseInfoMana";
import { ElMessage } from "element-plus";
export default {
  name: "baseInfoMana", // 基地信息管理
  components: {
    scTable,
  },
  setup() {
    onMounted(() => {
      showPage_methods.getAllBaseInfo();
    });
    const showPage_state = reactive({
      tableData: [],
    });
    const showPage_methods = {
      async getAllBaseInfo() {
        const res = await getBaseInfoApi.get();
        // showPage_state.tableData = res.data.PigeonBaselist.splice(5);
        showPage_state.tableData = res.data.PigeonBaselist;
      },
    };
    const edit_state = reactive({
      editVisible: false,
      editInfo: {},
    });
    const edit_methods = {
      async updateForm(id) {
        const res = await getBaseById.get(id);
        console.log(res);
        edit_state.editInfo = res.data.baseInfo;
        edit_state.editVisible = true;
      },
      editHandleClose() {
        edit_state.editVisible = false;
      },
      async editInfoFun() {
        const res = await editBaseInfo.post(edit_state.editInfo);
        if (res.code === 200) {
          ElMessage.success("修改信息成功！");
          showPage_methods.getAllBaseInfo();
          edit_state.editVisible = false;
        } else {
          ElMessage.error("修改出错，请稍后重试！");
          edit_state.editVisible = false;
        }
        edit_state.editVisible = false;
      },
    };
    const add_state = reactive({
      addVisible: false,
      addBaseInfo: {},
    });
    const add_methods = {
      addBaseFun() {
        add_state.addVisible = true;
      },
      addBaseClose() {
        add_state.addVisible = false;
      },
      async addConfirm() {
		const res = await addBaseInfo.post(add_state.addBaseInfo)
		console.log(res);
		if (res.code === 200) {
          ElMessage.success("添加基地成功！");
          showPage_methods.getAllBaseInfo();
        }else{
          ElMessage.error("添加失败");
        }
        add_state.addVisible = false;
      },
    };
    return {
      ...toRefs(showPage_state),
      ...showPage_methods,
      ...toRefs(edit_state),
      ...edit_methods,
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
}
</style>
