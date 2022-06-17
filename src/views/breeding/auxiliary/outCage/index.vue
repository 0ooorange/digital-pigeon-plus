<template>
	<div class="container">
		<table-search
			:cardData="cardData"
			:showSearch="false"
			:showDatePk="false"
			
			@searchClick="searchClick"
			@outTable="outTable"
		/>
		<el-main class="nopadding">
			<scTable
				ref="table"
				:data="tablelist"
				stripe
				highlightCurrentRow
				class="tablestyle"

				:default-sort="{ prop: 'date', order: 'descending' }"
			>
				<el-table-column
					label="鸽笼号"
					prop="codes"
					sortable
					width="120"
					align="center"
				></el-table-column>
				<el-table-column
					label="板子编号"
					prop="panelCode"
					width="120"
					align="center"
				></el-table-column>
				<el-table-column
					label="出仔时间"
					prop="checkCubTime"
					sortable
					width="230"
					align="center"
				></el-table-column>
				<el-table-column
					label="喂养天数"
					prop="days"
					sortable
					width="180"
					align="center"
				></el-table-column>
				<el-table-column
					label="出栏个数"
					prop="cubNumber"
					width="180"
					align="center"
				></el-table-column>
				<el-table-column
					label="备注"
					prop="remarks"
					width="240"
					align="center"
				></el-table-column>
			</scTable>
		</el-main>
	</div>
</template>

<script>
import scTable from "../../../../components/scTable/index.vue";
export default {
	name: "outCageAuxiliary",
	components: {
		scTable,
	},
	data() {
		return {
      objquery:{
                pageNum: 1,
                pageSize:10,
			},
			pageSize: 8,
			total: 100,
			pageNum: 1,
			tablelist:[],
			// 这是卡片数据数组，一个元素一个卡片，元素超过两个自动渲染到查询模块下方
			cardData: [
			{
				cardText: "出栏个数",
				cardNumber: "999个",
			},
		 ],
		};
	},
	methods: {
		// 表格查询事件
		searchClick() {
			console.log("嘻嘻嘻，我被点击啦");
		},
		// 表格导出事件
		outTable() {
			console.log("哈哈哈，我被点击了噢");
		},
    
		async getMarketingAssistanc(){
			const {data:res}=await this.$API.outCage.getMarketingAssistance.post(this.objquery);
            this.tablelist=res.data;
		    console.log("出栏辅助数据：",this.tablelist );
		}
	},
  created() {
		this.getMarketingAssistanc();
	},
};
</script>

<style scoped>
.container {
	margin: 20px 20px;
}
.container111 {
	margin-left: 10px;
	display: flex;
	flex-direction: row;
}
.card {
	margin-left: 10px;
	margin-bottom: 20px;
	width: 220px;
}
.mini_card {
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 60px;
	font-size: 20px;
	color: rgb(5, 0, 0);
	margin-right: 20px;
}
.search {
	margin-top: 20px;
	margin-left: 20px;
	width: 80%;
	height: 60px;
	display: flex;
	flex-direction: row;
}
.search2 {
	margin-left: 20px;
}
.btn {
	display: flex;
	flex-direction: row;
	width: 200px;
	position: relative;
	margin-left: 40px;
}
.btnleft {
	margin-left: -4px;
}
.btnright {
	margin-left: 480px;
	display: flex;
	flex-direction: row;
}
.topleft {
	background: cornflowerblue;
}
.operate {
	display: flex;
	flex-direction: row;
	margin: 20px 20px;
	position: relative;
	text-align: center;
}
.operatetip {
	font-size: 18px;
	width: 150px;
	height: 50px;
	line-height: 50px;
	border: 1px solid royalblue;
}
.btn {
	width: 80px;
	height: 36px;
	font-size: 20px;
}
.tablestyle {
	font-size: 16px;
}
.page {
	margin-top: 36px;
	margin-left: 195px;
}
.soushuo {
	color: #fff;
	background-color: #409eff;
	border-color: #409eff;
}
</style>
