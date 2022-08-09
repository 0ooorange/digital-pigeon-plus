
<template>
  <div class="main">
    <div class="tag">
      <el-button type="primary" plain @click="addOutcagedialog = true"
        >添加鸽棚</el-button
      >
    </div>
    <scTable :data="tableData" stripe>
      <el-table-column prop="code" label="鸽棚" sortable align="center" />
      <el-table-column prop="cageNum" label="鸽棚数量" align="center" />
      <el-table-column prop="rowNum" label="鸽棚行数" sortable align="center" />
      <el-table-column prop="columnNum" label="鸽棚列数" align="center" />
      <el-table-column prop="floorNum" label="鸽棚层数" align="center" />
      <el-table-column prop="" label="管理员" align="center" />
      <el-table-column label="管理鸽棚" align="center">
        <template #default="scope">
          <el-button type="warning" size="small" @click="selectShed(scope.row)">
            选择员工</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240" align="center">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            plain
            icon="el-icon-edit"
            @click="showOutcagedialog(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
			@click="deleteShed(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </scTable>

    <!-- 选择鸽棚 -->
    <el-dialog
      v-model="selectShedVisible"
      title="选择员工"
      width="30%"
      :before-close="selectShedhandleClose"
    >
      <el-descriptions :column="1" border :model="selectShedInfo">
        <el-descriptions-item label="可选员工">
          <el-select
            v-model="selectShedValue"
            class="m-2"
            placeholder="请选择"
            size="large"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="selectShedVisible = false">取消</el-button>
          <el-button type="primary" plain  @click="selectShedAffirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import scTable from "@/components/scTable/index.vue";
import { onMounted, reactive, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { showPageApi,selectUserApi,deletedoveApi} from "@/api/model/baseInformation/dovecote";
export default {
  name: "dovecote", // 员工管理
  components: {
    scTable,
  },
  setup() {
    onMounted(() => {
      showPage_methods.showPageApi();
    });
    const showPage_state = reactive({
      tableData: [],
    });
    const showPage_methods = {
      async showPageApi() {
        const res = await showPageApi.get();
        // console.log('页面展示数据',res);
        showPage_state.tableData = res.data.shedList;
      },
    };
    // 新增和选择鸽棚功能
    const add_state = reactive({
      selectShedVisible: false,
      selectShedValue: "",
      options: [],
    });

    const add_methods = {
      async selectShed() {
		const res =await selectUserApi.get()
		const arr =res.data.userList
		const tempArr = []
		 for(let i=0;i<arr.length;i++){
			if(arr[i] !== null){
				tempArr.push(arr[i].name)
			}
		 }
		//  console.log(tempArr,"tempArr");
		if(add_state.options.length ==0){
			tempArr.map((item,index)=>{
			add_state.options.push(
						Object.assign({},item,{value: tempArr[index]})
						)
		});
		}

		// console.log(add_state.options,"options");
        add_state.selectShedVisible = true;

      },
      selectShedhandleClose() {
        add_state.selectShedVisible = false;
      },
	//  确认按钮
	  selectShedAffirm(){
        add_state.selectShedVisible = false;

	  }
    };
	const delete_state = reactive({
		async deleteShed(id){
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
        }else{
			ElMessage.success("已成功删除该订单");
			await deletedoveApi.post(id)
			showPage_methods.showPageApi();
		}



		}
	})
	const delete_methods = {

	}
    return {
      ...toRefs(showPage_state),
      ...showPage_methods,
      ...toRefs(add_state),
      ...add_methods,
	  ...toRefs(delete_state),
      ...delete_methods,
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
