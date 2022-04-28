<template>
    <div class="container">
            <div>
                <el-card class="mini_card">
                    <span class="fontcolor">成鸽数:</span>
                    <span>234对</span>
                </el-card>
            </div>
            <div>
                <el-card class="mini_card">
                    <span class="fontcolor">幼鸽数:</span>
                    <span>234对</span>
                </el-card>
            </div>
            <div >
                <el-card class="mini_card">
                    <span class="fontcolor">抽蛋数:</span>
                    <span>234对</span>
                </el-card>
            </div>
            <div>
                <el-card class="mini_card">
                    <span class="fontcolor"> 产蛋数：</span>
                     <span>234对</span>
                </el-card>
            </div>
             <div >
                <el-card class="mini_card">
                    <span class="fontcolor">出仔数：</span>
                    <span>234对</span>
                </el-card>
            </div> <div>
                <el-card class="mini_card"> 
                    <span class="fontcolor">出栏数：</span>          
                    <span>234对</span>
                </el-card>
            </div> 
            <div >
                <el-card class="mini_card">
                    <span class="fontcolor">死仔数：</span>
                    <span>234对</span>
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
    width: 85%;
    height: 70%;
    font-size:15px;
    margin-right: 30px;
}
.fontcolor{
    color: #38424a;
    font-weight: 600;
    font-size: 14px;
}

</style>