<template>

     <div class="container">
   
        <table-search
			:cardData="cardData"
			:showSearch="false"
			:showDatePk="false"
			@searchClick="searchClick" 
			@outTable="outTable" 
      class="title"
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
      {
				cardText: "正常仔个数",
				cardNumber: "566只",
			},
      {
				cardText: "异常仔个数",
				cardNumber: "466只",
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

  })
</script>

<style scoped>
.container{
  margin:20px 20px
}
/* .title{
  display: flex;
  flex-direction: row;
}
.title el-card{
  width: 100px;
} */
.tablestyle{
  font-size: 16px;
}

</style>