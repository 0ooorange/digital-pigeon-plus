<template>
  <div class="rightMain">
    <div class="rightMain_bottomIn">
      <div class="biaoge biaoge_list">
        <div class="biaoge_listIn">
          <ul class="ul_title">
            <li style="width: 150px">养殖仓编号</li>
            <li style="width: 150px">负责人</li>
            <li style="width: 150px">养殖种鸽总数</li>
            <li style="width: 150px">养殖品种</li>
          </ul>
          <div class="ul_list">
            <div class="ul_listIn">
              <ul class="ul_con" v-for="(item, index) in slideTableData" :key=index>
                <li>{{item.baseId}}</li>
                <li>{{item.chargeName}}</li>
                <li>{{item.doveNum}}</li>
                <li>{{item.doveType}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const slideTableData = [
      {
        baseId: 'A1仓',
        chargeName: '陈文浩',
        doveNum: '2200对',
        doveType: '米玛思',
      },
      {
        baseId: 'A1仓',
        chargeName: '陈文浩',
        doveNum: '2200对',
        doveType: '米玛思',
      },
      {
        baseId: 'A1仓',
        chargeName: '陈文浩',
        doveNum: '2200对',
        doveType: '米玛思',
      },
      {
        baseId: 'A1仓',
        chargeName: '陈文浩',
        doveNum: '2200对',
        doveType: '米玛思',
      },
      {
        baseId: 'A1仓',
        chargeName: '陈文浩',
        doveNum: '2200对',
        doveType: '米玛思',
      },
      {
        baseId: 'A1仓',
        chargeName: '陈文浩',
        doveNum: '2200对',
        doveType: '米玛思',
      },
      {
        baseId: 'A1仓',
        chargeName: '陈文浩',
        doveNum: '2200对',
        doveType: '米玛思',
      },
      {
        baseId: 'A1仓',
        chargeName: '陈文浩',
        doveNum: '2200对',
        doveType: '米玛思',
      },
    ]
    return {
      slideTableData,
    }
  },
}
</script>

<style lang="scss" scoped>
.rightMain {
  width: 350px;
  height: 150px;
  margin-left: 35px;
}
.rightMain .rightMain_bottom {
  width: 100%;
  height: 150px;
  margin-top: -7px;
  margin-left: 58px;
  border: 0.008rem solid rgba(0, 8, 8, 0.5);
}
.rightMain .rightMain_bottomIn {
  width: 100%;
  height: 25px;
  min-height: 90px;
  position: relative;
  margin-top: 3px;
}
/*右下角表格*/
.rightMain .rightMain_bottomIn .biaoge {
  min-height: 150px;
}
.rightMain .rightMain_bottomIn .biaoge_list {
  width: 100%;
  height: 150px;
  overflow: hidden;
  position: relative;
}
.rightMain .rightMain_bottomIn .biaoge_list .biaoge_listIn .ul_list {
  overflow: hidden;
  position: relative;
  margin-left: 5px;
}
.rightMain .rightMain_bottomIn .biaoge_list .biaoge_listIn .ul_listIn {
  -webkit-animation: 14s gundong linear infinite normal;
  animation: 14s gundong linear infinite normal;
  position: relative;
}
@keyframes gundong {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -30vh, 0);
    transform: translate3d(0, -30vh, 0);
  }
}

.rightMain .rightMain_bottomIn .biaoge_list ul {
  display: flex;
  display: -webkit-flex;
  width: 100%;
  height: 25px;
}
.rightMain .rightMain_bottomIn .biaoge_list .ul_con {
  border-bottom: 0.008rem solid rgba(10, 10, 10, 0.5);
}
.rightMain .rightMain_bottomIn .biaoge_list ul li {
  width: 90px;
  text-align: center;
  font-size: 0.06rem;
  height: 25px;
  line-height: 26px;
  list-style: none;
}
.rightMain .rightMain_bottomIn .biaoge_list ul li:frist-child {
  text-align: left;
}
</style>