<template>
    <div class="container">
            <div>
                <el-card class="mini_card">
                    <span class="fontcolor">成鸽数:</span>
                    <span style=" color:#EE4000" class="cardnumber">{{getNumber.NumberOfParents}}</span>
                </el-card>
            </div>
            <div>
                <el-card class="mini_card">
                    <span class="fontcolor">幼鸽数:</span>
                    <span style="color:#EE9A49" class="cardnumber">{{getNumber.NumberOfChildren}}</span>
                </el-card>
            </div>
            <div >
                <el-card class="mini_card">
                    <span class="fontcolor">抽蛋数:</span>
                    <span style="color:#7D26CD" class="cardnumber">{{getNumber.NumOfTakeEgg}}</span>
                </el-card>
            </div>
            <div>
                <el-card class="mini_card">
                    <span class="fontcolor"> 产蛋数：</span>
                     <span style="color: #43CD80" class="cardnumber">{{getNumber.NumOfLayEggs}}</span>
                </el-card>
            </div>
             <div >
                <el-card class="mini_card">
                    <span class="fontcolor">出仔数：</span>
                    <span style="color:#76EE00" class="cardnumber">{{getNumber.NumOfCubs}}</span>
                </el-card>
            </div> <div>
                <el-card class="mini_card"> 
                    <span class="fontcolor">出栏数：</span>          
                    <span style="color: #6495ED" class="cardnumber">{{getNumber.NumOfOut}}</span>
                </el-card>
            </div> 
            <div >
                <el-card class="mini_card">
                    <span class="fontcolor">死仔数：</span>
                    <span style=" color:#EE4000" class="cardnumber">{{getNumber.NumOfDeath}}</span>
                </el-card>
            </div>
    

    </div>

</template>

<script>
export default {
    name: 'DovecoteInfo',

    data() {
        return {
          getNumber:{
              NumberOfParents:'',
              NumberOfChildren:'',
              NumOfTakeEgg:'',
              NumOfLayEggs:'',
              NumOfCubs:'',
              NumOfOut:'',
              NumOfDeath:''
          },
          start_time:'',
          end_time:''
        }
    },

	computed: {
	
	},
 
    methods: {
        async getNumberOfParent(){
            const{data:res}=await this.$API.breedStatistics.getNumberOfParents.get('1518124016571797507');
            this.getNumber.NumberOfParents=res.data;      
        },
        async getNumberOfChildren(){
            const{data:res}=await this.$API.breedStatistics.getNumberOfChildren.get('1518124016571797507');
            this.getNumber.NumberOfChildren=res.data;
        },
         async getNumOfTakeEgg(){
            const{data:res}=await this.$API.breedStatistics.getNumOfTakeEgg.get('1518124016571797507','2022-05-22 00:00:00','2022-05-30 23:59:59');
            this.getNumber.NumOfTakeEgg=res.data;
        },
        async getNumOfLayEggs(){
            const{data:res}=await this.$API.breedStatistics.getNumOfLayEggs.get('1518124016571797507','2022-05-22 00:00:00','2022-05-30 23:59:59');
            this.getNumber.NumOfLayEggs=res.data;
        },
        async getNumOfCubs(){
            const{data:res}=await this.$API.breedStatistics.getNumOfCubs.get('1518124016571797507','2022-05-22 00:00:00','2022-05-30 23:59:59');
            this.getNumber.NumOfCubs=res.data;
        },
        async getNumOfOut(){
            const{data:res}=await this.$API.breedStatistics.getNumOfOut.get('1518124016571797507','2022-05-22 00:00:00','2022-05-30 23:59:59');
            this.getNumber.NumOfOut=res.data;
        },
        async getNumOfDeath(){
            const{data:res}=await this.$API.breedStatistics.getNumOfDeath.get('1518124016571797507','2022-05-22 00:00:00','2022-05-30 23:59:59');
            this.getNumber.NumOfDeath=res.data;
        }

    },
    created() {
        this.getNumberOfParent();
        this.getNumberOfChildren();
        this.getNumOfTakeEgg();
        this.getNumOfLayEggs();
        this.getNumOfCubs();
        this.getNumOfOut();
        this.getNumOfDeath()
    },
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