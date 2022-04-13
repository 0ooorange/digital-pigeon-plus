<template>
     <div class="container">
       <div class="topleft">
              <showtime></showtime>
       </div>
     
        <div class="operate">
         <div class="operatetip">总查蛋次数:666</div>
        </div>
 
    <el-main class="nopadding">
						<scTable ref="table" :data="apiObj"   stripe highlightCurrentRow class="tablestyle">
							<el-table-column label="鸽笼号" prop="pigeonnumber" width="120" class="tablestyle"></el-table-column>
							<el-table-column label="板子编号" prop="boardnumber" width="120"></el-table-column>
							<el-table-column label="第一次" prop="firstime" width="120"></el-table-column>
							<el-table-column label="时间间隔" prop="timeinterval_st" width="120"></el-table-column>
							<el-table-column label="第二次" prop="secondtime" width="120"></el-table-column>
							<el-table-column label="时间间隔" prop="timeinterval_nd" width="120"></el-table-column>
							<el-table-column label="本次推荐" prop="recommendation" width="120"></el-table-column>
              <el-table-column label="操作员" prop="operator" width="120"></el-table-column>
              <el-table-column label="备注" prop="remark" width="170"></el-table-column>
						</scTable>

		</el-main>

     </div>
    

</template>

<script>
import showtime from '@/components/showtime/index.vue';
  export default {
    name: "ExtractAndIncubateAuxiliary",
    components: {
      showtime
    },
    data() {
      return {
        // newDate:new Date(),
     
        apiObj:[
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                firstime: "孵化",
                timeinterval_st: "20天",
                secondtime: "抽蛋",
                timeinterval_nd: "10天",
                recommendation: "抽蛋",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                firstime: "孵化",
                timeinterval_st: "20天",
                secondtime: "抽蛋",
                timeinterval_nd: "10天",
                recommendation: "抽蛋",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                firstime: "孵化",
                timeinterval_st: "20天",
                secondtime: "抽蛋",
                timeinterval_nd: "10天",
                recommendation: "抽蛋",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                firstime: "孵化",
                timeinterval_st: "20天",
                secondtime: "抽蛋",
                timeinterval_nd: "10天",
                recommendation: "抽蛋",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                firstime: "孵化",
                timeinterval_st: "20天",
                secondtime: "抽蛋",
                timeinterval_nd: "10天",
                recommendation: "抽蛋",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                firstime: "孵化",
                timeinterval_st: "20天",
                secondtime: "抽蛋",
                timeinterval_nd: "10天",
                recommendation: "抽蛋",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                firstime: "孵化",
                timeinterval_st: "20天",
                secondtime: "抽蛋",
                timeinterval_nd: "10天",
                recommendation: "抽蛋",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                firstime: "孵化",
                timeinterval_st: "20天",
                secondtime: "抽蛋",
                timeinterval_nd: "10天",
                recommendation: "抽蛋",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                firstime: "孵化",
                timeinterval_st: "20天",
                secondtime: "抽蛋",
                timeinterval_nd: "10天",
                recommendation: "抽蛋",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                firstime: "孵化",
                timeinterval_st: "20天",
                secondtime: "抽蛋",
                timeinterval_nd: "10天",
                recommendation: "抽蛋",
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
  font-size: 18px;
}
</style>