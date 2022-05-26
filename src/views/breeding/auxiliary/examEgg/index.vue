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
				:data="apiObj"
				stripe
				highlightCurrentRow
				class="tablestyle"
				:default-sort="{ prop: 'date', order: 'descending' }"
			>
				<el-table-column
					label="鸽笼号"
					prop="pigeonnumber"
					sortable
					width="120"
					align="center"
				></el-table-column>
				<el-table-column
					label="板子编号"
					prop="boardnumber"
					width="150"
					align="center"
				></el-table-column>
				<el-table-column
					label="生蛋时间"
					prop="raweggstime"
					sortable
					width="230"
					align="center"
				></el-table-column>
				<el-table-column
					label="操作"
					prop="recommendation"
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
					prop="raweggday"
					sortable
					width="170"
					align="center"
				></el-table-column>
				<el-table-column
					label="备注"
					prop="remark"
					width="270"
					align="center"
				></el-table-column>
			</scTable>
		</el-main>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "examineEggAuxiliary",
	setup() {
		let cardData = [];
		cardData = [
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
		];
		let apiObj = [];
		apiObj = [
			{
				pigeonnumber: "A02",
				boardnumber: "3",
				raweggstime: "2022-04-11 20:21:23",
				raweggday: "10天",
				recommendation:"孵化",
				operator: "李暖暖",
				remark: "XXXXX",
			},
			{
				pigeonnumber: "A10",
				boardnumber: "3",
				raweggstime: "2022-03-11 20:21:23",
				raweggday: "10天",
				recommendation:"抽蛋",
				operator: "李暖暖",
				remark: "XXXXX",
			},
			{
				pigeonnumber: "A08",
				boardnumber: "3",
				raweggstime: "2022-11-11 20:21:23",
				raweggday: "13天",
				recommendation:"孵化",
				operator: "李暖暖",
				remark: "XXXXX",
			},
			{
				pigeonnumber: "A01",
				boardnumber: "3",
				raweggstime: "2022-04-21 20:21:23",
				raweggday: "10天",
				recommendation:"抽蛋",
				operator: "李暖暖",
				remark: "XXXXX",
			},
			{
				pigeonnumber: "A11",
				boardnumber: "3",
				raweggstime: "2022-09-21 20:21:23",
				raweggday: "21天",
				recommendation:"抽蛋",
				operator: "李暖暖",
				remark: "XXXXX",
			},
			{
				pigeonnumber: "A10",
				boardnumber: "3",
				raweggstime: "2022-04-21 20:21:23",
				raweggday: "8天",
				recommendation:"抽蛋",
				operator: "李暖暖",
				remark: "XXXXX",
			},
		];
		let value = "";
		let options = [];
		options = [
			{
				value: "Option1",
				label: "抽蛋",
			},
			{
				value: "Option2",
				label: "孵化",
			},
		];
		const searchClick = function () {
			console.log("嘻嘻嘻，我被点击啦");
		};

		const outTable = function () {
			console.log("哈哈哈，我被点击了噢");
		};
		return {
			cardData,
			apiObj,
			value,
			options,
			searchClick,
			outTable,
		};
	},
});
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
