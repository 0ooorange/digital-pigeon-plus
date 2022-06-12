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
					width="150"
					align="center"
				></el-table-column>
				<el-table-column
					label="生蛋时间"
					prop="layEggTime"
					sortable
					width="230"
					align="center"
				></el-table-column>
				<el-table-column
					label="操作"
					prop="takeOrHatch"
					width="170"
					align="center"
				>
					<!-- <template v-slot="scope">
						<el-select
							v-model="scope.row.value"
							class="m-2"
							placeholder="抽蛋"
							style="width: 90px"
						>
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>
					</template> -->
				</el-table-column>
				<el-table-column
					label="生蛋天数"
					prop="layEggDays"
					sortable
					width="170"
					align="center"
				></el-table-column>
				<el-table-column
					label="备注"
					prop="remarks"
					width="270"
					align="center"
				></el-table-column>
			</scTable>
		</el-main>
	</div>
</template>

<script>
import scTable from "../../../../components/scTable/index.vue";
export default {
	name: "examineEggAuxiliary",
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
			cardData :[
			{
				cardText: "查蛋个数",
				cardNumber: "888只",
			},
			{
				cardText: "正常蛋个数",
				cardNumber: "88只",
			},
			{
				cardText: "异常蛋个数",
				cardNumber: "8只",
			},
		],
		options :[
			{
				value: "Option1",
				label: "抽蛋",
			},
			{
				value: "Option2",
				label: "孵化",
			},
		]

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
    
		async checkEggAssistant(){
			const {data:res}=await this.$API.examEgg.checkEggAssistant.post(this.objquery);
            this.tablelist=res.data;
		    console.log("查蛋辅助数据：",this.tablelist );
		},
	},
  created() {
		this.checkEggAssistant();
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
