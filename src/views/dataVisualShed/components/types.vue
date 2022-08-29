// 养殖品种介绍
<template>
  <div class="echarts8-content">
    <div class="echarts8-img">
      <img class="image" src="../img/variety1.jpg" alt="error">
    </div>
    <div class="echarts8-text">
      <div><span>种类：</span><span>王鸽</span></div>
      <div><span>描述：</span><span>原产于美国，系使用鸾特鸽、蒙腾鸽、信鸽 和马蒂斯鸽四品种杂交选育成功的多产性肉鸽品种。全身羽毛紧凑，身体短而成块状，体型直立，头中等大稍圆，尾部呈水平状，胸深而长，成鸽平均标准体重806－930克。羽毛有白、蓝、红和黄色，饲养的多为白色。一对种鸽年产蛋12－14个，在生产上倍受人们欢迎的品种。 石歧鸽 原产于广东省中山县石歧一带，是用本地鸽与大王鸽、鸾特鸽和卡尼鸽杂交选育而成的，标准体型似芭蕉的蕉蕾，毛色为灰二线，细雨点花纹为主，公鸽最大体重900克，母鸽750克，一般年产蛋14－16个，是我国著名的肉鸽品种。</span></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.echarts8-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 95%;
  .echarts8-img {
    margin-right: 5px;
    height: 80%;
    .image {
      height: 100%;
    }
  }
  .echarts8-text {
    flex: 1;
    max-height: 80%;
    overflow-y: hidden;
  }
  .echarts8-text:hover {
	  overflow-y: auto;
  }
}
::-webkit-scrollbar {
  width: 4px;
  background-color:#F5F5F5;
}
/*定义滚动条轨道
内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}
/*定义滑块
内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius:10px;
  -webkit-box-shadow: inset 0 0 6px rgba(233, 230, 230, 0.678);
  background-color: #555;
}
</style>