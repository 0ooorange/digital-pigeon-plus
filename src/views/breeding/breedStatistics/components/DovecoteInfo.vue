<template>
    <div class="container">
            <div>
                <el-card class="mini_card">
                    <span class="fontcolor">成鸽数:</span>
                    <span style=" color:#EE4000" class="cardnumber">234对</span>
                </el-card>
            </div>
            <div>
                <el-card class="mini_card">
                    <span class="fontcolor">幼鸽数:</span>
                    <span style="color:#EE9A49" class="cardnumber">234对</span>
                </el-card>
            </div>
            <div >
                <el-card class="mini_card">
                    <span class="fontcolor">抽蛋数:</span>
                    <span style="color:#7D26CD" class="cardnumber">234对</span>
                </el-card>
            </div>
            <div>
                <el-card class="mini_card">
                    <span class="fontcolor"> 产蛋数：</span>
                     <span style="color: #43CD80" class="cardnumber">234对</span>
                </el-card>
            </div>
             <div >
                <el-card class="mini_card">
                    <span class="fontcolor">出仔数：</span>
                    <span style="color:#76EE00" class="cardnumber">234对</span>
                </el-card>
            </div> <div>
                <el-card class="mini_card"> 
                    <span class="fontcolor">出栏数：</span>          
                    <span style="color: #6495ED" class="cardnumber">234对</span>
                </el-card>
            </div> 
            <div >
                <el-card class="mini_card">
                    <span class="fontcolor">死仔数：</span>
                    <span style=" color:#EE4000" class="cardnumber">234对</span>
                </el-card>
            </div>
    

    </div>

</template>

<script>

export default {
    name: 'DovecoteInfo',

    data() {
        return {
        
        }
    },

	computed: {
	
	},

    methods: {

    }
}
</script>
<style scoped>
.container{
  margin-left: 10px;
  height: 60px;
  display: flex;
  flex-direction: row;
  margin-left: 35px;
  }
.mini_card {
    display: flex;
    flex-direction: column;
     justify-content: center;
    align-items: center;
    width: 95%;
    height: 100%;
    font-size:15px;
    margin-right: 40px;
}
.fontcolor{
    /* color: #38424a; */
    font-weight: 400;
    font-size: 14px;
}
.cardnumber{
    font-weight: 700;
    font-size: 16px;
}

</style>