<template>
     <div class="time">
             <span>{{dateFormat(newDate)}}</span>
           </div>
</template>
<script>
export default {
    data(){
        return{
            newDate: new Date(),
        }
    },
     mounted() {
      let that = this;
      this.timer = setInterval(function () {
        that.newDate = new Date().toLocaleString();
      });
    },
    // 销毁时清除计时器
     beforeUnmount: function () {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    methods:{
       // 时间格式化
      dateFormat() {
        var date = new Date();
        var year = date.getFullYear();
        var month =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours =
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        let week = date.getDay(); // 星期
        let weekArr = [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
        ];
        // 拼接 时间格式处理
        return (
          year +
          "年" +
          month +
          "月" +
          day +
          "日 " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds +
          " " +
          weekArr[week]
        );
      },
    }
}
</script>
<style scoped>
.time {
  margin-top: 30px;
  margin-left: 65px;
  font-size: 15px;
  color: #fff;
  width: 240px;
}
</style>