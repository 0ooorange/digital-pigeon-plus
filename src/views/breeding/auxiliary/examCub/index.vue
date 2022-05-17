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
						 <scTable ref="table" :data="apiObj"  stripe  highlightCurrentRow 
             class="tablestyle" 
             :default-sort = "{prop: 'date', order: 'descending'}"
              >
							<el-table-column label="鸽笼号" prop="pigeonnumber" sortable width="140" align="center"></el-table-column>
							<el-table-column label="板子编号" prop="boardnumber" width="140" align="center"></el-table-column>
							<el-table-column label="生蛋时间" prop="raweggstime" sortable width="230" align="center"></el-table-column>
              <el-table-column label="孵化天数" prop="incubationdays" width="180" align="center"></el-table-column>
              <el-table-column label="备注" prop="remark" align="center" width="250"  ></el-table-column>
						</scTable>
      
		</el-main>
    
</div>
</template>

<script>
import { defineComponent} from "vue";
  export default defineComponent({
    name: "AxlyExamCub",
    setup(){
      let cardData = [];
		cardData = [
			{
				cardText: "查仔个数",
				cardNumber: "666只",
			},
		];
      let apiObj=[];
       apiObj=[
            {
                pigeonnumber: "A05",
                boardnumber: "3",
                raweggstime: "2022-4-11 20:21:23",
                incubationdays: "19天",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A03",
                boardnumber: "3",
                raweggstime: "2022-04-21 20:21:23",                
                incubationdays: "19天",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A06",
                boardnumber: "3",
                raweggstime: "2022-03-01 20:21:23",
                incubationdays: "19天",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                raweggstime: "2022-02-23 20:21:23",             
                incubationdays: "19天",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            
          
             ];
             	const searchClick = function () {
       console.log('嘻嘻嘻，我被点击啦')
    }

      const outTable = function () {
       console.log('哈哈哈，我被点击了噢')
    }
	return {
		cardData,
		apiObj,

		searchClick,
		 outTable
	}
     
    }
    // data() {
    //   return {
    //     pageSize:8,
    //     total:100,
    //     pageNum:1,
    //     apiObj:[
    //         {
    //             pigeonnumber: "A05",
    //             boardnumber: "3",
    //             raweggstime: "2022-4-11 20:21:23",
    //             incubationdays: "19天",
    //             operator: "李暖暖",
    //             remark: "XXXXX"
    //         } ,
    //         {
    //             pigeonnumber: "A03",
    //             boardnumber: "3",
    //             raweggstime: "2022-04-21 20:21:23",                
    //             incubationdays: "19天",
    //             operator: "李暖暖",
    //             remark: "XXXXX"
    //         } ,
    //         {
    //             pigeonnumber: "A06",
    //             boardnumber: "3",
    //             raweggstime: "2022-03-01 20:21:23",
    //             incubationdays: "19天",
    //             operator: "李暖暖",
    //             remark: "XXXXX"
    //         } ,
    //         {
    //             pigeonnumber: "A10",
    //             boardnumber: "3",
    //             raweggstime: "2022-02-23 20:21:23",             
    //             incubationdays: "19天",
    //             operator: "李暖暖",
    //             remark: "XXXXX"
    //         } ,
            
          
            
    //     ],
    //     // 这是卡片数据数组，一个元素一个卡片，元素超过两个自动渲染到查询模块下方
    //   cardData: [{
    //     cardText: '查仔个数',
    //     cardNumber: "666只"
    //    },],
    //   // 查询类型下拉框列表的数据，格式固定
    //   searchTypes: [{
    //     value: '鸽笼编号',
    //     label: '鸽笼编号',
    //   }, {
    //     value: '鸽板编号',
    //     label: '鸽板编号',
    //   }, {
    //     value: '日期',
    //     label: '日期',
    //   }, {
    //     value: '仔数',
    //     label: '仔数',
    //   }, {
    //     value: '死仔数',
    //     label: '死仔数',
    //   }, {
    //     value: '负责人',
    //     label: '负责人',
    //   }, {
    //     value: '操作',
    //     label: '操作',
    //   }]
       
    // }
    // },
    // methods:{
    //    // 表格查询事件
    // searchClick() {
    //   console.log("嘻嘻嘻，我被点击啦")
    // },
    // // 表格导出事件
    // outTable() {
    //   console.log("哈哈哈，我被点击了噢");
    // }
    // }
  })
</script>

<style scoped>
.container{
  margin:20px 20px
}
.container111{
  margin-left: 10px;
  display: flex;
  flex-direction:row;
}
.card{
  margin-left:10px;
  margin-bottom:20px;
  width:220px;
}
.mini_card {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 60px;
    font-size:20px;
    color:rgb(5, 0, 0);
    margin-right: 20px;
}
.search{
  margin-top: 20px;
  margin-left: 20px;
  width: 80%;
  height: 60px;
  display: flex;
  flex-direction: row;
  
}
.search2{
  margin-left: 20px;

}
.btn{
   display: flex;
  flex-direction: row;
  width: 200px;
  position: relative;
  margin-left: 40px;
  
}
.btnright{
    margin-left: 480px;
    display: flex;
    flex-direction: row;
   
}
.topleft{
  background: cornflowerblue;
}
.operate{
  display: flex;
  flex-direction: row;
  margin: 20px 20px;
  position: relative;
  text-align: center;
}
.operatetip{
  font-size: 18px;
  width: 150px;
  height: 50px;
  line-height: 50px;
  border:1px solid royalblue;
}
.btn{
  width: 80px;
  height: 36px;
  font-size: 20px;
}
.tablestyle{
  font-size: 16px;
}
.page {
  margin-top: 36px;
  margin-left: 195px;
}
.soushuo{
  color: #fff;
  background-color: #409eff;
  border-color:#409eff;
}
</style>