<template>

     <div class="container">
        <div class="container111">
            <div class="card">
                <el-card class="mini_card">
                    <i class="el-icon-s-flag" style="font-size: 26px;color:#D32F2F"></i>
                    总查蛋次数：<i style="font-size: 18px;font-weight:900;color:#03A9F4">888</i>
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
                  <el-button type="primary" class="soushuo">搜索</el-button>
                  </div>
                <div class="btnright">
                   <el-button type="success">重置</el-button>
                   <el-button type="info" >导出</el-button>
                </div>
              </div>
          </div>
        </div>
 
    <el-main class="nopadding">
						 <el-table ref="table" :data="apiObj"  stripe  highlightCurrentRow 
             class="tablestyle" 
             :header-cell-style="{color:'#000000',fontSize:'18px'}"
             :row-style="{height: '50px'}">
							<el-table-column label="鸽笼号" prop="pigeonnumber" width="120" align="center"></el-table-column>
							<el-table-column label="板子编号" prop="boardnumber" width="120" align="center"></el-table-column>
							<el-table-column label="生蛋时间" prop="raweggstime" width="230" align="center"></el-table-column>
              <el-table-column label="本次推荐" prop="recommendation" width="150" align="center"></el-table-column>
              <el-table-column label="生蛋天数" prop="raweggday" width="150" align="center"></el-table-column>
              <el-table-column label="操作员" prop="operator" width="150" align="center"></el-table-column>
              <el-table-column label="备注" prop="remark"  align="center"></el-table-column>
						</el-table>
            <el-pagination layout="total, sizes, prev, pager, next, jumper"
                   :page-sizes="[5, 8, 10, 15]"
                   :page-size="pageSize"
                   :current-page="pageNum"
                   :total="total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   class="page">
       </el-pagination>

		</el-main>


    
</div>
</template>

<script>

  export default {
    name: "ExtractAndIncubateAuxiliary",
    components: {
    

    },
    data() {
      return {
        pageSize:8,
        total:100,
        pageNum:1,
        inputvalue:'',
          selectoptions1: [{
          value: '选项1',
          label: '鸽笼号'
        }, {
          value: '选项2',
          label: '板子编号'
        }, {
          value: '选项3',
          label: '生蛋天数'
        },{
          value: '选项4',
          label: '本次推荐'
        }, {
          value: '选项5',
          label: '操作员'
        }, ],
        value: '',
     
        apiObj:[
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                raweggstime: "2022-4-1 20:21:23",
                recommendation: "抽蛋",
                raweggday: "10天",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                raweggstime: "2022-4-1 20:21:23",
                recommendation: "抽蛋",
                raweggday: "10天",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                raweggstime: "2022-4-1 20:21:23",
                recommendation: "抽蛋",
                raweggday: "10天",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                raweggstime: "2022-4-1 20:21:23",
                recommendation: "抽蛋",
                raweggday: "10天",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                raweggstime: "2022-4-1 20:21:23",
                recommendation: "抽蛋",
                raweggday: "10天",
                operator: "李暖暖",
                remark: "XXXXX"
            } ,
            {
                pigeonnumber: "A10",
                boardnumber: "3",
                raweggstime: "2022-4-1 20:21:23",
                recommendation: "抽蛋",
                raweggday: "10天",
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
.nopadding{
   margin-top: 10px;
   padding-top:5px ;
   margin-left: 20px;
   width: 95%;
   height: 680px;
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