<template>
     <div class="container">
        <div class="container111">
            <div class="card">
                <el-card class="mini_card">
                    <i class="el-icon-s-flag" style="font-size: 26px;color:#D32F2F"></i>
                    总查蛋次数：<i style="font-size: 18px;font-weight:900;color:#03A9F4">999</i>
                </el-card>
            </div>
           <div class="search">
             <div class="search1">
                <el-select v-model="value" clearable placeholder="请选择查询类型">
                 <el-option v-for="item in selectoptions1" :key="item.value" :label="item.label" :value="item.value">
                 </el-option>
                </el-select>
             </div>
             <div class="search2">
                 <el-select v-model="value" filterable placeholder="请输入具体内容">
                 <el-option v-for="item in selectoptions1" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
             </div>
              <div class="btn">
                <div class="btnleft">
                  <el-button type="primary">搜索</el-button>
                  </div>
                <div class="btnright">
                   <el-button type="success">重置</el-button>
                   <el-button type="info">导出</el-button>
                </div>
              </div>
          </div>
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
        inputvalue:'',
          selectoptions1: [{
          value: '选项1',
          label: '鸽笼号'
        }, {
          value: '选项2',
          label: '板子编号'
        }, {
          value: '选项3',
          label: '第一次操作'
        },{
          value: '选项4',
          label: '第二次操作'
        },{
          value: '选项5',
          label: '本次推荐'
        }, {
          value: '选项6',
          label: '操作员'
        }, ],
        value: '',
     
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
.container111{
  margin-left: 10px;
  display: flex;
  flex-direction:row;
}
.card{
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
  margin-left: 20px;
  border:1px solid red;
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
    margin-left: 365px;
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
  font-size: 18px;
}
</style>