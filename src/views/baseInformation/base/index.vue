
<template>
  <div class="main">
    <div class="tag">
      <el-button type="primary" plain
        >添加基地</el-button
      >
    </div>
    <scTable :data="tableData" stripe>
      <el-table-column prop="name" label="基地名称" sortable align="center" />
      <el-table-column prop="latitude" label="维度" align="center" />
      <el-table-column prop="longitude" label="精度" sortable align="center" />
      <el-table-column prop="introduction" label="基地介绍" align="center" />
      <el-table-column prop="area" label="面积(㎡)" align="center" />
      <el-table-column prop="province" label="省份" align="center" />
      <el-table-column prop="city" label="城市" align="center" />
      <el-table-column prop="detailedAddress" label="详细地址" align="center" />
      <el-table-column prop="code" label="邮政编码" sortable align="center" />
      <el-table-column label="操作" width="240" align="center">
        <template v-slot="scope">
          <el-button
            size="small"
            type="primary"
            plain
            icon="el-icon-edit"
			 @click="updateForm(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
			@click="tableDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </scTable>
  </div>
</template>

<script>
import scTable from "@/components/scTable/index.vue";
import { onMounted, reactive, toRefs } from "vue";
export default {
  name: 'base', // 基地信息管理
  components: {
    scTable,
  },
  setup(){
	onMounted(() => {

    });
	const showPage_state = reactive({
      tableData: [{
name:'基地A',
		code:'561000',
		latitude:"116.1",
		longitude:'24.55',
		introduction:'智慧养鸽',
		province:"广东",
		area:'10000',
		city:"梅州",
		detailedAddress:'广东梅州xx镇'
	  }],
    });
    const showPage_methods = {
      async showPageApi() {

      },
    };
	return{
		 ...toRefs(showPage_state),
      ...showPage_methods,
	}
  }
}
</script>

<style scoped>
.tag {
  display: flex;
  padding: 10px 15px;
}
</style>
