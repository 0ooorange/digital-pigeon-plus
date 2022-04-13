<template>
     <div class="container">
       <header class="header left">
        <div class="left ">
           <showtime></showtime>
        </div>
      <div class="header_center left" style="position:relative">
        <div class="title">
           <span>智慧数字鸽业系统</span>
        </div>
        
    </div>
      </header>
    
        
<div class="con left" style="width: 100%;margin-left: 1%;margin-bottom: 25px;">

     <!-- <div class="operate"> -->
       <div class="nav">
         <div class="operateleft">
         <el-button type="primary" plain>孵蛋</el-button>
        <el-button type="primary" plain>抽蛋</el-button>
        <el-button  type="primary" plain>全部</el-button>
       </div>
      <div class="operateright">
      <el-button type="primary" plain>亮出</el-button>
     <el-button type="primary" plain>导出</el-button>
     <el-button type="primary" plain>打印</el-button>
      </div>
</div>

    <div class="div_any_child">
          <div class="table_p" style="height: 350px;margin-top: 20px;">
					 <table>
                  <thead><tr>
                      <th style="width:50px">鸽笼号</th>
                      <th style="width:60px">板子编号</th>
                      <th style="width:60px">第一次</th>
                      <th style="width:70px">时间间隔</th>
                      <th style="width:60px">第二次</th>
                      <th style="width:70px">时间间隔</th>
                      <th style="width:60px">本次推荐</th>
                      <th style="width:60px">操作员</th>
                      <th style="width:120px">备注</th>
                  </tr>
                  </thead>
                  <tbody>
                     <tr v-for="item in apiObj" :key="item.index" >
                       <td v-text="item.pigeonnumber"></td>
                       <td v-text="item.boardnumber"></td>
                       <td v-text="item.firstime"></td>            
                       <td v-text="item.timeinterval_st"></td>
                       <td v-text="item.secondtime"></td>
                       <td v-text="item.timeinterval_nd"></td>
                       <td v-text="item.recommendation"></td>
                       <td v-text="item.operator"></td>
                       <td v-text="item.remark"></td>
                    </tr>
                  </tbody>
              </table>
    </div>
               <div class="box">
              <el-pagination
                @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="currentPage4"
                layout="total, prev, pager, next, jumper"
               :total="40">
                </el-pagination>
  
      </div>
    </div>
</div>
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
                remark: "超过规定一天，干什么吃的"
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
   font-size: 100%;
    height: 100%;
    background-color: #081832;
    }
.left{
    float: left;
}
.header{
    width: 100%;
    height: 80px;
    background-color: #030829;

}
.header_center{
    width: 30%;
    position: relative;
    margin: 0px 76px;
    color: #FFFFff;
    text-align: center;
    height: 80px;
    background-image: url("../../../assets/icons/images/logoBg.png");
    background-size: 100% 100%;
    font-family: "微软雅黑"!important;
}
.title{
  position: absolute;
  top: 18px;
  left: 63px;
}
.title span{
  font-size: 28px;
  font-weight: 700;
}
.con{
    width: 100%;
    background-color: #081832;
    padding-top: 20px;
    padding-bottom: 20px;
}

.div_any_child{
    width: 98%;
    height: 380px;
    box-shadow: -10px 0px 15px #034c6a inset, 
    0px -10px 15px #034c6a inset, 
    10px 0px 15px #034c6a inset, 
    0px 10px 15px #034c6a inset;
    border: 1px solid #034c6a;
    box-sizing: border-box;
    position: relative;
    margin-top: 25px;
}
.table_p{
    height: 100%;
    margin-top: 7%;
    position: relative;
}
.div_table{
    width: 98%;
    margin-left: 1%;
    margin-bottom: 25px;
    height: 280px;
}
.div_table_box{
    width: 23%;
    margin-right: 2%;
}
.table_p table{
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    position: absolute;
    text-align: center;
}
.table_p table thead th{
    color: #61d2f7;
    font-size: 14px;
    font-weight: 600;
    padding-top: 5px;
    padding-bottom: 5px;
}
.table_p table tbody{
    color: #ffffff;
   font-size: 13px;
}
.table_p table tbody tr:nth-child(2n+1){
    background-color: #072951;
    box-shadow: -10px 0px 15px #034c6a inset,
    10px 0px 15px #034c6a inset;
}
.left_table{
    height: 98%;
    border-radius: 5px;
    width:18%!important;
    background-color:  #081832;

}
.center_table{
    height: 100%;
    border-radius: 5px;
    width:100%;
    background-color:  #081832;
   margin: 0 auto;
}
.box {
	width: 800px;
	margin: 32px 340px;
	height: 34px;
}
.operateright{
  margin-left: 755px;
}
.nav{
  display: flex;
  flex-direction: row;
  padding-left:0;
  margin-bottom:0;
  list-style:none;

  }
 
</style>