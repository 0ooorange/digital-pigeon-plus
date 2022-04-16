<template>
  <div class="nav-box">
    <div class="circle-box">
      <div class="nav-logo"></div>
      <div class="circle"
           :style="`width:${circle_w}px;height:${circle_h}px`">
        <div class="origin"
             :style="`width:${box_w}px;height:${box_h}px;transform: rotate(${stard}deg);`">
          <div :style="`width:${box_w}px;height:${box_h}px;transform: rotate(${-stard}deg);`"
               class="img-box"
               v-for="(item, index) in menus"
               :key="index">
            <router-link class="box"
                         :to="item.path" @click="routerClick(item, index)">
              <div class="content">
                <span class="title">{{ item.name }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["menus"], //菜单数据
  data () {
    return {
      circle_w: parseInt(window.innerHeight * 0.9), //圆盘的宽
      circle_h: parseInt(window.innerHeight * 0.9), //圆盘的高
      box_w: 80, //圆盘上覆盖的小圆点宽
      box_h: 80, //圆盘上覆盖的小圆点高
      PI: 360, //分布角度，默认为360deg
      stard: -180, //起始角度
      boxNum: 6, //圆盘上覆盖的小圆点个数
      descTitle: "", //模块描述标题
      descContent: "", //模块描述内容
      activeIndex: 0, //默认下标
    };
  },
  mounted () {
    this.init();
  },
  methods: {
    //初始化小圆点，根据计算使其分布到对应位置
    init () {
      let box = document.querySelectorAll(".img-box");
      let avd = this.PI / box.length; //每一个 img-box 对应的角度
      let ahd = (avd * Math.PI) / 180; //每一个 img-box 对应的弧度
      let radius = this.circle_w / 2; //圆的半径
      for (let i = 0; i < box.length; i++) {
        box[i].style.left = Math.sin(ahd * i) * radius + "px";
        box[i].style.top = Math.cos(ahd * i) * radius + "px";
      }
    },
    routerClick(item, index) {
      console.log("我是router-link，我被点击了，我的index值是", index);
      console.log("我的值是", item.name);
      localStorage.setItem("currentSystem", JSON.stringify(item));
    }
  },
};
</script>

<style lang="scss" scoped>
.nav-box {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.circle-box {
  position: relative;
  .nav-logo {
    position: absolute;
    top: 49%;
    left: 51%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    background-color: #fff;
    background: url(https://img.qkeep.cn/imgs/logo.png) center no-repeat;
    background-size: contain;
  }
  .circle {
    transform: scale(0.9);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-sizing: border-box;
    /* border: 1px solid #4d4c4c; */
    /* box-shadow: 0 0 8px #ddd; */
    /* -moz-box-shadow: 0 0 8px #ddd;
    -webkit-box-shadow: 0 0 8px #ddd; */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -40px;
    .origin {
      position: relative;
      transition: 0.5s; //控制圆盘的的旋转速率
      .img-box {
        user-select: none;
        position: absolute;
        top: 0;
        left: 0;
        transition: none !important;
        pointer-events: none;
        .box {
          pointer-events: all !important;
          width: 100%;
          height: 100%;
          transition: 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 50%;
          /* transform: scale(0.1); */
          cursor: pointer;
          /* border: 1px solid orange; */
          background: url(https://img.qkeep.cn/imgs/下载.png) no-repeat center
            center;
          background-size: 100%;
          /* overflow: hidden; */
          /* 获得焦点的item */
          &:hover {
            transform: scale(1.2);
          }
          /* 获得焦点的item内容 */
          &:hover .content {
            opacity: 1;
            /* background: #00b3c7 !important; */
          }
          .content {
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.8;
            font-size: 16px;
            .title {
              display: inline-block;
              position: absolute;
              bottom: -20px;
              height: 20px;
              width: 100px;
              color: #fff;
              font-weight: 600;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
