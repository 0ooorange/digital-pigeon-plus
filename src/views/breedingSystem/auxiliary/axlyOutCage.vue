<template>

     <div class="container">
         <table-search :searchTypes="searchTypes" :cardData="cardData"  @searchClick="searchClick" @outTable="outTable" />
    <el-main class="nopadding">
						 <scTable ref="table" :data="apiObj"  stripe  highlightCurrentRow 
             class="tablestyle" 
              :default-sort = "{prop: 'date', order: 'descending'}"
             >
							<el-table-column label="鸽笼号" prop="pigeonnumber" sortable width="120" align="center"></el-table-column>
							<el-table-column label="板子编号" prop="boardnumber" width="120" align="center"></el-table-column>
							<el-table-column label="出仔时间" prop="cubouttime" sortable width="230" align="center"></el-table-column>
              <el-table-column label="喂养天数" prop="feedday" sortable width="180" align="center"></el-table-column>
              <el-table-column label="出栏个数" prop="baroutnumber" width="180" align="center"></el-table-column>
              <el-table-column label="备注" prop="remark" width="240" align="center"></el-table-column>
						</scTable>
		</el-main>


    
</div>
</template>

<script>
import tableSearch from "../../../components/tableSearch/index.vue";
import scTable from '../../../components/scTable/index.vue'
  export default {
    name: "outCageAuxiliary",
    components: {
    tableSearch,
    scTable

    },
    data() {
      return {
        pageSize:8,
        total:100,
        pageNum:1,
         // 这是卡片数据数组，一个元素一个卡片，元素超过两个自动渲染到查询模块下方
      cardData: [{
        cardText: '出栏个数',
        cardNumber: "999个"
       },],
      // 查询类型下拉框列表的数据，格式固定
      searchTypes: [{
        value: '鸽笼编号',
        label: '鸽笼编号',
      }, {
        value: '鸽板编号',
        label: '鸽板编号',
      }, {
        value: '日期',
        label: '日期',
      }, {
        value: '仔数',
        label: '仔数',
      }, {
        value: '死仔数',
        label: '死仔数',
      }, {
        value: '负责人',
        label: '负责人',
      }, {
        value: '操作',
        label: '操作',
      }],
        apiObj:[
            {
                pigeonnumber: "A12",
                boardnumber: "3",
                cubouttime: "2022-04-12 20:21:23",
                feedday: "10天",
                baroutnumber: "199只",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
           {
                pigeonnumber: "A02",
                boardnumber: "3",
                cubouttime: "2022-11-12 20:21:23",
                feedday: "10天",
                baroutnumber: "199只",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A12",
                boardnumber: "3",
                cubouttime: "2022-04-12 20:21:23",
                feedday: "10天",
                baroutnumber: "199只",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                cubouttime: "2022-06-12 20:21:23",
                feedday: "8天",
                baroutnumber: "199只",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                cubouttime: "2022-04-30 20:21:23",
                feedday: "10天",
                baroutnumber: "199只",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A12",
                boardnumber: "3",
                cubouttime: "2022-04-11 20:21:23",
                feedday: "10天",
                baroutnumber: "199只",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            
            {
                pigeonnumber: "A03",
                boardnumber: "3",
                cubouttime: "2022-04-21 20:21:23",
                feedday: "13天",
                baroutnumber: "199只",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            
            {
                pigeonnumber: "A06",
                boardnumber: "3",
                cubouttime: "2022-05-12 20:21:23",
                feedday: "10天",
                baroutnumber: "199只",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            
            
          
            
        ]
    }
    },
  }
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
.btnleft{
  margin-left: -4px;
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