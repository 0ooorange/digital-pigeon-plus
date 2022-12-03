<template>
  <div>
    <!-- 个人信息部分 -->
    <div class="personalInfo">
      <!-- 个人信息编辑（左边） -->
      <div class="personalInfo-edit">
        <!-- 图片 -->
        <div class="personalInfo-edit-img">
          <img src="" alt="" />
        </div>
        <span>刘双印</span>
        <!-- 操作按钮 -->
        <div class="personalInfo-edit-btn">
          <el-button class="personalInfo-edit-btn-1">编辑信息</el-button>
          <el-button class="personalInfo-edit-btn-2">修改密码</el-button>
        </div>
      </div>
      <!-- 个人信息详情 -->
      <div class="personalInfo-detail">
        <span class="personalInfo-detail-title">个人信息</span>
        <ul>
          <li>电话号码：1xxxxxxxxx</li>
          <li>所在单位：养殖部门-金绿基地-A01鸽棚</li>
          <li>职位：养殖人员</li>
          <li>故乡：广东省广州市海珠区仲恺农业工程学院</li>
          <li>生日：2000年9月12日</li>
          <li>
            <span class="intro-title">介绍：</span>
            <div class="intro-box">负责相关鸽棚的饲料喂养，以及设备调控</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "personalInfo", // 个人信息
};
</script>

<style scoped>
/* 整体布局 */
.personalInfo {
  margin: 50px auto;
  width: 750px;
  height: 430px;
  background-color: #e9e9eb;
  border-radius: 15px;
  border: 2px solid #c8c9cc;
}
.personalInfo-edit {
  float: left;
  text-align: center;
  width: 280px;
  height: 100%;
}
.personalInfo-detail {
  float: right;
  margin: 5% 0;
  width: 460px;
  height: 85%;
  border-left: 2px solid #c8c9cc;
}
/* 左箱子（图片+按钮）样式 */
/* #region */
.personalInfo-edit-img {
  display: block;
  margin: 60px 80px 0;
  width: 120px;
  height: 120px;
  background-color: white;
}
.personalInfo-edit-btn {
  margin: 30px;
}
.personalInfo-edit-btn .el-button {
  display: block;
  margin: 0 auto 20px;
  width: 120px;
  height: 40px;
  font-size: 20px;
  color: black;
}
.personalInfo-edit-btn-1 {
  background-color: #d9ecff;
  border: 1px solid #a0cfff;
}
.personalInfo-edit-btn-1:hover {
  background-color: #79bbff;
  color: #73767a;
  transition: all 0.3s;
}
.personalInfo-edit-btn-2 {
  background-color: #fde2e2;
  border: 1px solid #fab6b6;
}
.personalInfo-edit-btn-2:hover {
  background-color: #f89898;
  color: #73767a;
  transition: all 0.3s;
}
.personalInfo-edit span {
  display: block;
  height: 50px;
  line-height: 50px;
  font-size: 28px;
  font-weight: 600;
}
/* #endregion */
/* 右盒子（详情）样式 */
/* #region */
li {
  padding: 0 20px 15px;
  font-size: 20px;
  list-style: none;
}
.personalInfo-detail .personalInfo-detail-title {
  display: block;
  margin-bottom: 30px;
  padding-left: 30px;
  font-size: 21px;
  font-weight: 600;
}
.intro-title {
  float: left;
}
.intro-box {
  float: left;
  padding: 0 10px;
  width: 320px;
  height: 70px;
  background-color: #faecd8;
  border: 2px solid #f3d19e;
  border-radius: 5px;
}
/* #endregion */
</style>
