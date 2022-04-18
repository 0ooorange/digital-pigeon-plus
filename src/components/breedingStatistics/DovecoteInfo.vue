<template>
    <div class="container">
        <el-row id="top" :gutter="15" style="margin-bottom:5px">
            <div>
                <el-card class="mini_card">
                    <i class="el-icon-s-flag" style="font-size: 26px;color:#D32F2F"></i>
                    成鸽数：<i style="font-size: 18px;font-weight:bold;">342对</i>
                </el-card>
            </div>
            <div>
                <el-card class="mini_card">
                    幼鸽数：<i style="font-size: 18px;font-weight:900;color:#03A9F4">3423只</i>
                </el-card>
            </div>
            <div >
                <el-card class="mini_card">
                    抽蛋数：<i style="font-size: 18px;font-weight:900;color:#FF9800">56枚</i>
                </el-card>
            </div>
            <div>
                <el-card class="mini_card">
                    产蛋数：<i style="font-size: 18px;font-weight:900;color:#8BC34A">40枚</i>
                </el-card>
            </div>
             <div >
                <el-card class="mini_card">
                    出仔数：<i style="font-size: 18px;font-weight:900;color:#03A9F4">3423只</i>
                </el-card>
            </div> <div>
                <el-card class="mini_card">           
                    出栏数：<i style="font-size: 18px;font-weight:900;color:#03A9F4">3只</i>
                </el-card>
            </div> 
            <div >
                <el-card class="mini_card">
                    死仔数：<i style="font-size: 18px;font-weight:900;color:#03A9F4">3423只</i>
                </el-card>
            </div>
        </el-row>
    

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
  width: 100%;
  height: 60px;
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


</style>